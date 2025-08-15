// app/api/extract/route.js
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import { guessCompanyFromDomain, extractSalary, extractExperience, extractDeadline } from '@/app/lib/extract-helpers';
import { groqFallback } from '@/app/lib/groq';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36' }});
  const html = await res.text();
  const $ = cheerio.load(html);

  const metaTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
  const siteName  = $('meta[property="og:site_name"]').attr('content');
  const h1        = $('h1').first().text();
  const text      = $('body').text().replace(/\s+/g,' ').slice(0, 20000);

  const company = siteName || $('.company,.job-company').first().text().trim() || guessCompanyFromDomain(url);
  const role    = (h1 || metaTitle || '').trim();
  const salaryText = extractSalary(text);
  const experienceText = extractExperience(text);
  const deadlineISO = extractDeadline(text);

  let result = { id: crypto.randomUUID(), url, company, role, salaryText, experienceText, deadlineISO, createdAt: Date.now(), applied: false };

  // If key fields missing, ask Groq to strictly fill JSON
  const needsGroq = !company || !role || (!salaryText && !experienceText && !deadlineISO);
  if (needsGroq) {
    try {
      const enriched = await groqFallback({ url, text, htmlSnippet: html.slice(0, 20000) });
      result = { ...result, ...enriched };
    } catch {}
  }

  return NextResponse.json(result);
}
