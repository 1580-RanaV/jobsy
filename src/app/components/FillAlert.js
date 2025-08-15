import { NextResponse } from 'next/server';
import { groqClient } from '@/app/lib/groq';
import {
  load, text, companyFrom, roleFrom, locationFrom,
  salaryFrom, experienceFrom, deadlineFrom
} from '@/app/lib/extract';
import {
  BLOCKED_DOMAINS, AGGREGATOR_BLOCK, ATS_ALLOW,
  APPLY_SELECTORS, looksLikeCareerDomain
} from '@/app/lib/domains';
import { parse as parseDomain } from 'tldts';
import { z } from 'zod';

export const runtime = 'nodejs';

const OutSchema = z.object({
  url: z.string().url(),
  company: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  salaryText: z.string().optional().nullable(),
  experienceText: z.string().optional().nullable(),
  deadlineText: z.string().optional().nullable(),
  expectedSalaryText: z.string().optional().nullable(),
  createdAt: z.number(),
});

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('url');
    if (!target) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    const u = new URL(target);
    const parsed = parseDomain(u.hostname);
    const root = parsed.domain ? `${parsed.domain}.${parsed.publicSuffix}` : u.hostname;

    if (BLOCKED_DOMAINS.has(root)) {
      return NextResponse.json({ 
        error: 'LinkedIn and other job aggregators require authentication. Please use the direct company career page URL instead.' 
      }, { status: 400 });
    }
    if (AGGREGATOR_BLOCK.has(root)) {
      return NextResponse.json({ error: 'Use the original company/ATS posting' }, { status: 400 });
    }

    const isATS = [...ATS_ALLOW].some((d) => root.endsWith(d));
    const isCareer = looksLikeCareerDomain(u.hostname);

    const resp = await fetch(target, {
      headers: { 
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      cache: 'no-store',
    });
    if (!resp.ok) {
      console.error('Fetch failed', resp.status, root);
      return NextResponse.json({ error: 'Failed to fetch page' }, { status: 400 });
    }
    const html = await resp.text();

    const $ = load(html);
    const pageText = text($);
    
    // Debug logging
    console.log('=== DEBUG INFO ===');
    console.log('URL:', target);
    console.log('Root domain:', root);
    console.log('Page title:', $('title').text());
    console.log('Page text length:', pageText.length);
    console.log('Page text preview:', pageText.slice(0, 200));
    console.log('isATS:', isATS);
    console.log('isCareer:', isCareer);
    
    // Check for sign-in pages or authentication required
    const authPatterns = [
      /sign.in/i,
      /log.in/i,
      /authentication required/i,
      /please log in/i,
      /access denied/i,
      /unauthorized/i
    ];
    
    const requiresAuth = authPatterns.some(pattern => {
      const titleMatch = pattern.test($('title').text());
      const textMatch = pattern.test(pageText);
      if (titleMatch || textMatch) {
        console.log('Auth pattern matched:', pattern, 'title:', titleMatch, 'text:', textMatch);
      }
      return titleMatch || textMatch;
    });
    
    if (requiresAuth) {
      console.log('Blocked: Requires authentication');
      return NextResponse.json({ 
        error: 'This page requires authentication. Please use a direct company career page URL.' 
      }, { status: 400 });
    }
    
    // Check if job posting is inactive/filled (made less aggressive)
    const inactivePatterns = [
      /job.*has been filled/i,
      /posting.*expired/i,
      /application.*closed/i,
      /sorry.*job.*filled/i,
      /this position is no longer accepting applications/i
      // Removed the broad "position no longer available" pattern for now
    ];
    
    const isInactive = inactivePatterns.some(pattern => {
      const match = pattern.test(pageText);
      if (match) {
        console.log('Inactive pattern matched:', pattern);
      }
      return match;
    });
    
    if (isInactive) {
      console.log('Blocked: Job inactive');
      return NextResponse.json({ error: 'Job posting is no longer active or has been filled' }, { status: 400 });
    }

    const hasApply =
      APPLY_SELECTORS.some((sel) => {
        try {
          const found = $(sel).length > 0;
          if (found) {
            console.log('Apply selector found:', sel, 'count:', $(sel).length);
          }
          return found;
        } catch (e) {
          console.log('Selector error:', sel, e.message);
          return false;
        }
      }) || /apply now|apply today|submit application|start application/i.test(pageText);
    
    console.log('hasApply:', hasApply);
    console.log('Final check - isATS || isCareer || hasApply:', isATS || isCareer || hasApply);

    if (!(isATS || isCareer || hasApply)) {
      console.log('Blocked: Not recognized as job posting');
      return NextResponse.json({ error: 'Not a job posting link' }, { status: 400 });
    }

    // Extract
    let company = companyFrom($, u.hostname);
    let role = roleFrom($);
    let location = locationFrom($);
    let salaryText = salaryFrom($, pageText);
    let experienceText = experienceFrom(pageText);
    let deadlineISO = deadlineFrom($, pageText);
    let deadlineText = deadlineISO ? new Date(deadlineISO).toDateString() : '';
    let expectedSalaryText = '';

    // GROQ fallback only if needed
    if (!company || !role || !location || !salaryText || !experienceText || !deadlineText) {
      try {
        const groq = groqClient();
        const sys =
          'You are a strict information extractor for job postings. Return ONLY a valid JSON object with no markdown formatting, no code blocks, no explanations. Just pure JSON starting with { and ending with }. Do not invent dates that are not present. If a field does not exist, set it to "".';
        const prompt = `
Extract:
- company
- role
- location (e.g., "Bengaluru, India")
- experienceText (e.g., "2–4 years" or "")
- deadlineText (human-readable if present; "" if none)
- salaryText (verbatim salary like "₹12,00,000–₹18,00,000" or "")
- expectedSalaryText (estimate INR range for this role/company/location like "₹X–₹Y")

Text:
"""${pageText.slice(0, 16000)}"""
        `.trim();

        const res = await groq.chat.completions.create({
          model: 'gemma2-9b-it',
          temperature: 0.2,
          max_completion_tokens: 600,
          top_p: 1,
          stream: false,
          stop: null,
          messages: [
            { role: 'system', content: sys },
            { role: 'user', content: prompt },
          ],
        });

        const raw = res.choices?.[0]?.message?.content?.trim() || '{}';
        
        // Clean up markdown formatting from GROQ response
        let cleanJson = raw;
        if (cleanJson.includes('```json')) {
          cleanJson = cleanJson.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        } else if (cleanJson.includes('```')) {
          cleanJson = cleanJson.replace(/```\s*/g, '').replace(/```\s*$/g, '');
        }
        
        const j = JSON.parse(cleanJson);

        company ||= j.company || '';
        role ||= j.role || '';
        location ||= j.location || '';
        experienceText ||= j.experienceText || '';
        deadlineText ||= j.deadlineText || '';
        salaryText ||= j.salaryText || '';
        expectedSalaryText = j.expectedSalaryText || '';
      } catch (err) {
        console.warn('GROQ fallback failed:', err?.message);
        if (!expectedSalaryText && role) expectedSalaryText = '₹—';
      }
    }

    const out = OutSchema.parse({
      url: target,
      company: company || '',
      role: role || '',
      location: location || '',
      salaryText: salaryText || '',
      experienceText: experienceText || '',
      deadlineText: deadlineText || '',
      expectedSalaryText: expectedSalaryText || '',
      createdAt: Date.now(),
    });

    return NextResponse.json(out);
  } catch (e) {
    console.error('Extractor error:', e);
    return NextResponse.json({ error: e.message || 'Extraction failed' }, { status: 500 });
  }
}