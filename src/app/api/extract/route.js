import { NextResponse } from 'next/server';
import { groqClient } from '@/app/lib/groq';
import {
  load, text, roleFrom, locationFrom,
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

// Job platforms / ATS
const ALLOWED_JOB_PLATFORMS = new Set([
  'naukri.com', 'linkedin.com', 'indeed.com', 'glassdoor.com', 'monster.com',
  'shine.com', 'timesjobs.com', 'foundit.in', 'instahyre.com', 'angellist.com',
  'wellfound.com', 'stackoverflow.com', 'dice.com', 'ziprecruiter.com',
  'careerbuilder.com', 'simplyhired.com', 'jobstreet.com', 'seek.com',
  'smartrecruiters.com', 'workday.com', 'successfactors.com', 'oracle.com',
  'taleo.net', 'icims.com', 'greenhouse.io', 'lever.co', 'bamboohr.com',
  'recruitee.com', 'personio.com', 'breezy.hr', 'crelate.com', 'eightfold.ai',
  'myworkday.com', 'myworkdayjobs.com', 'oracle-jobs.com', 'oraclecloud.com',
  'successfactors.eu', 'sap.com', 'cornerstonedemand.com', 'ultipro.com',
  'adp.com', 'ceridian.com', 'paychex.com', 'paycom.com', 'paylocity.com',
  'namely.com', 'zenefits.com', 'gusto.com', 'rippling.com', 'hibob.com',
  // extra
  'joinsuperset.com', 'superset.com', 'ea2.oracle.com', 'oracle-cloud.com', 'ea.com',
  'apply.workable.com', 'jobs.ashbyhq.com', 'boards.greenhouse.io',
  'apply.lever.co', 'jobs.polymer.co', 'jobs.netflix.com', 'careers.google.com',
  'careers.microsoft.com', 'jobs.apple.com', 'amazon.jobs', 'careers.meta.com',
  'careers.spotify.com', 'careers.uber.com', 'careers.airbnb.com',
  'heizen.work', 'cutshort.io', 'hirist.com', 'freshersworld.com'
]);

// --- helpers --------------------------------------------------------------
function isJobPlatformDomain(hostname) {
  return [...ALLOWED_JOB_PLATFORMS].some(platform =>
    hostname.includes(platform) || platform.includes(hostname)
  );
}

function looksLikeSupersetJobUrl(u) {
  return /joinsuperset\.com$/i.test(u.hostname) &&
    /#\/signup\/student\/jobprofiles\/[a-f0-9-]+$/i.test(u.hash || '');
}

function looksLikeJobTitle(text) {
  const jobTitlePatterns = [
    /\b(engineer|developer|manager|analyst|director|lead|senior|junior|intern|associate|specialist|coordinator|executive|officer|consultant|architect|designer|scientist|researcher|technician|administrator|supervisor|assistant)\b/i,
    /\b(software|frontend|backend|full.?stack|mobile|web|data|cloud|devops|qa|testing|security|network|system|database|ai|ml|machine\.?learning|product|project|business|marketing|sales|hr|finance|accounting|legal|operations)\b/i,
    /\b(position|role|opening|vacancy|job|career|opportunity)\b/i
  ];
  return jobTitlePatterns.some(p => p.test(text));
}

function isUselessSalary(s) {
  if (!s) return true;
  const t = String(s).trim();
  return (
    t === '' ||
    /^[-–—]$/.test(t) ||
    /^\s*(rs|₹)\s*[,:-]*\s*$/i.test(t) || // "rs", "rs,", "₹," ...
    /^n\/?a$/i.test(t)
  );
}

const looksIndianSalary = (s) =>
  /₹|rupees?|lpa|lakhs?|per\s*month|stipend/i.test(s || '');

const looksForeignSalary = (s) =>
  /(\$|usd|eur|€|gbp|£)/i.test(s || '');

// -------------------------------------------------------------------------

// Enhanced company name extraction from domain
function extractCompanyFromDomain(hostname, fullUrl = '') {
  const parsed = parseDomain(hostname);
  const domainOnly = parsed.domain; // e.g., "accenture.com"
  if (!domainOnly) return '';

  const domain = domainOnly.split('.')[0].toLowerCase();

  const domainMappings = {
    'google': 'Google', 'microsoft': 'Microsoft', 'amazon': 'Amazon', 'apple': 'Apple',
    'meta': 'Meta', 'facebook': 'Facebook', 'netflix': 'Netflix', 'uber': 'Uber',
    'airbnb': 'Airbnb', 'spotify': 'Spotify', 'linkedin': 'LinkedIn', 'twitter': 'Twitter',
    'adobe': 'Adobe', 'salesforce': 'Salesforce', 'oracle': 'Oracle', 'ibm': 'IBM',
    'intel': 'Intel', 'nvidia': 'NVIDIA', 'tesla': 'Tesla', 'paypal': 'PayPal',
    'shopify': 'Shopify', 'atlassian': 'Atlassian', 'slack': 'Slack', 'zoom': 'Zoom',
    'dropbox': 'Dropbox', 'github': 'GitHub', 'gitlab': 'GitLab', 'stackoverflow': 'Stack Overflow',
    'reddit': 'Reddit', 'pinterest': 'Pinterest', 'snapchat': 'Snapchat', 'tiktok': 'TikTok',
    'whatsapp': 'WhatsApp', 'instagram': 'Instagram', 'youtube': 'YouTube',
    // Indian
    'infosys': 'Infosys', 'tcs': 'Tata Consultancy Services', 'wipro': 'Wipro',
    'hcl': 'HCL Technologies', 'techmahindra': 'Tech Mahindra', 'mindtree': 'Mindtree',
    'capgemini': 'Capgemini', 'accenture': 'Accenture', 'cognizant': 'Cognizant',
    'flipkart': 'Flipkart', 'paytm': 'Paytm', 'zomato': 'Zomato', 'swiggy': 'Swiggy',
    'ola': 'Ola', 'byjus': "BYJU'S", 'freshworks': 'Freshworks', 'zoho': 'Zoho',
    'phonepe': 'PhonePe', 'razorpay': 'Razorpay', 'policybazaar': 'PolicyBazaar',
    'nykaa': 'Nykaa', 'bigbasket': 'BigBasket', 'grofers': 'Grofers', 'myntra': 'Myntra',
    'makemytrip': 'MakeMyTrip', 'goibibo': 'Goibibo', 'cleartrip': 'Cleartrip',
    'redbus': 'redBus', 'practo': 'Practo', 'lenskart': 'Lenskart',
    'urbancompany': 'Urban Company', 'dunzo': 'Dunzo', 'shadowfax': 'Shadowfax',
    'delhivery': 'Delhivery', 'heizen': 'Heizen', 'superset': 'Superset'
  };

  if (domainMappings[domain]) return domainMappings[domain];

  let cleanName = domain
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();

  cleanName = cleanName.replace(/careers?/i, '').replace(/jobs?/i, '').trim();

  return cleanName || domain;
}

// Extract company name from job platform URLs
function extractCompanyFromJobPlatformUrl(fullUrl, hostname) {
  try {
    const url = new URL(fullUrl);
    const path = url.pathname;
    const searchParams = url.searchParams;

    const platformPatterns = {
      'naukri.com': [
        { regex: /\/([^/]+)-jobs/, transform: (m) => m.replace(/-/g, ' ') },
        { param: 'company', transform: (m) => m.replace(/-/g, ' ') }
      ],
      'linkedin.com': [
        { regex: /\/company\/([^/]+)/, transform: (m) => m.replace(/-/g, ' ') }
      ],
      'indeed.com': [
        { param: 'cmp', transform: (m) => m.replace(/\+/g, ' ') }
      ],
      'oracle': [
        { regex: /([^\.]+)\.(?:oracle|taleo)/, fromHostname: true }
      ],
      'workday': [
        { regex: /([^\.]+)\.(?:myworkday|workday)/, fromHostname: true }
      ],
      'successfactors': [
        { regex: /([^\.]+)\.successfactors/, fromHostname: true }
      ],
      'superset': [
        { regex: /\/([^/]+)\/jobs/, transform: (m) => m.replace(/-/g, ' ') }
      ]
    };

    const platform = Object.keys(platformPatterns).find(key => hostname.includes(key));
    if (platform && platformPatterns[platform]) {
      for (const pattern of platformPatterns[platform]) {
        if (pattern.regex) {
          const source = pattern.fromHostname ? hostname : path;
          const match = source.match(pattern.regex);
          if (match && match[1] && match[1] !== 'www' && match[1] !== 'jobs') {
            const result = pattern.transform ? pattern.transform(match[1]) : match[1];
            return result.replace(/\b\w/g, l => l.toUpperCase());
          }
        } else if (pattern.param) {
          const pv = searchParams.get(pattern.param);
          if (pv) {
            const result = pattern.transform ? pattern.transform(pv) : pv;
            return result.replace(/\b\w/g, l => l.toUpperCase());
          }
        }
      }
    }
  } catch (e) {
    console.log('Error parsing job platform URL:', e.message);
  }
  return '';
}

// Smart content extraction via DOM selectors
function extractFromPageStructure($, hostname, fullUrl) {
  const extractors = {
    company: [
      'meta[property="og:site_name"]',
      'meta[name="application-name"]',
      'meta[property="og:title"]',
      'script[type="application/ld+json"]',
      '.navbar-brand', '.header-logo', '.brand-name', '.logo-text',
      '[data-company]:not([data-company*="engineer"]):not([data-company*="developer"])',
      '[data-company-name]',
      '.company-name:not(.job-title)',
      '.employer-name',
      '.organization-name',
      '.companyName a', '.company-name a', '.comp-name',
      '.jobs-unified-top-card__company-name',
      '.jobsearch-InlineCompanyRating a'
    ],
    role: [
      'h1', '.job-title', '.position-title', '[data-job-title]',
      '.role-title', '.vacancy-title', 'title'
    ],
    location: [
      '[data-location]', '.job-location', '.location', '.work-location',
      '.address', '.job-address', '[class*="location" i]'
    ],
    salary: [
      '[class*="salary" i]', '[data-salary]', '.compensation', '.pay-range',
      '[class*="compensation" i]', '.salary-range', '[class*="ctc" i]',
      '[class*="package" i]', '.job-salary', '.salary-info'
    ]
  };

  const results = {};

  for (const [field, selectors] of Object.entries(extractors)) {
    for (const selector of selectors) {
      try {
        if (selector === 'script[type="application/ld+json"]' && field === 'company') {
          $(selector).each((i, el) => {
            try {
              const json = JSON.parse($(el).html());
              const findCompany = (obj) => {
                if (typeof obj !== 'object' || obj === null) return null;
                if (obj.hiringOrganization?.name) return obj.hiringOrganization.name;
                if (obj.name && !obj.name.toLowerCase().includes('job')) return obj.name;
                for (const key in obj) {
                  const res = findCompany(obj[key]);
                  if (res) return res;
                }
                return null;
              };
              const company = findCompany(json);
              if (company && !results[field]) results[field] = company;
            } catch {}
          });
        } else {
          const el = $(selector).first();
          if (el.length) {
            let val = el.attr('content') || el.attr('data-' + field) || el.text().trim();
            if (val && val.length > 1 && val.length < 200 && !results[field]) {
              val = val.replace(/\s+/g, ' ').trim();
              if (field === 'company' && !looksLikeJobTitle(val)) results[field] = val;
              else if (field !== 'company') results[field] = val;
            }
          }
        }
      } catch {}
    }
  }
  return results;
}

// GROQ expected salary (India)
async function getExpectedSalary(groq, company, role, location) {
  try {
    const prompt = `Generate expected salary range for "${role}" position at "${company}" in "${location}" India.

Instructions:
- Research typical salary ranges for this role, company size, and location
- Consider Indian market standards (LPA - Lakhs Per Annum)
- Return ONLY a clean salary range like: "₹8,00,000–₹15,00,000" or "6-12 LPA"
- No explanations, just the range

Company: ${company}
Role: ${role}
Location: ${location}`;

    const res = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_completion_tokens: 100,
      messages: [
        { role: 'system', content: 'You are a salary research expert for Indian job market. Provide accurate salary ranges based on company, role, and location.' },
        { role: 'user', content: prompt },
      ],
    });

    const salary = res.choices?.[0]?.message?.content?.trim();
    console.log('AI-generated expected salary:', salary);
    return salary || '';
  } catch (err) {
    console.warn('Expected salary generation failed:', err.message);
    return '';
  }
}

// -------------------------------------------------------------------------

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('url');
    if (!target) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    const u = new URL(target);
    const parsed = parseDomain(u.hostname);
    // parsed.domain already includes public suffix (e.g., "accenture.com")
    const root = parsed.domain || u.hostname;

    console.log('=== URL ANALYSIS ===');
    console.log('URL:', target);
    console.log('Root domain:', root);
    console.log('Hostname:', u.hostname);

    const isJobPlatform = isJobPlatformDomain(u.hostname);
    const supersetHashJob = looksLikeSupersetJobUrl(u);

    if (BLOCKED_DOMAINS.has(root) && !isJobPlatform) {
      return NextResponse.json({
        error: 'This domain is blocked. Please use the direct company career page URL instead.'
      }, { status: 400 });
    }

    if (AGGREGATOR_BLOCK.has(root) && !isJobPlatform) {
      return NextResponse.json({ error: 'Use the original company/ATS posting' }, { status: 400 });
    }

    const isATS = [...ATS_ALLOW].some((d) => root.endsWith(d)) || isJobPlatform;
    const isCareer = looksLikeCareerDomain(u.hostname);

    console.log('isJobPlatform:', isJobPlatform);
    console.log('isATS:', isATS);
    console.log('isCareer:', isCareer);

    const resp = await fetch(target, {
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'no-cache',
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

    console.log('=== PAGE INFO ===');
    console.log('Page title:', $('title').text());
    console.log('Page text length:', pageText.length);

    // auth detection (skip for Superset hash job pages)
    const authPatterns = [
      /\bsign\s+in\b/i,
      /\blog\s+in\b/i,
      /authentication\s+required/i,
      /please\s+log\s+in/i,
      /access\s+denied/i,
      /unauthorized\s+access/i,
      /login\s+required/i
    ];

    const requiresAuth = authPatterns.some(pattern => {
      const titleMatch = pattern.test($('title').text());
      const bodyMatch = $('body').text() && pattern.test($('body').text());
      if (titleMatch || bodyMatch) console.log('Auth pattern matched:', pattern.source);
      return titleMatch || bodyMatch;
    });

    if (!supersetHashJob && requiresAuth) {
      return NextResponse.json({
        error: 'This page requires authentication. Please use a direct company career page URL.'
      }, { status: 400 });
    }

    // inactive job detection
    const inactivePatterns = [
      /\bjob\s+(?:has\s+been\s+)?filled\b/i,
      /\bposition\s+(?:is\s+)?no\s+longer\s+available\b/i,
      /\bposting\s+(?:has\s+)?expired\b/i,
      /\bapplication\s+(?:is\s+)?closed\b/i,
      /\bno\s+longer\s+accepting\s+applications\b/i,
      /\bthis\s+job\s+is\s+no\s+longer\s+active\b/i,
      /\bposition\s+has\s+been\s+closed\b/i,
      /\brecruitment\s+(?:for\s+this\s+position\s+)?has\s+ended\b/i
    ];

    const isInactive = inactivePatterns.some(p => p.test(pageText));
    if (isInactive) {
      return NextResponse.json({
        error: 'Job posting is no longer active or has been filled',
        type: 'job_filled',
        url: target
      }, { status: 422 });
    }

    // job posting detection
    const hasApply = APPLY_SELECTORS.some((sel) => {
      try { return $(sel).length > 0; } catch { return false; }
    }) || /apply\s+now|apply\s+today|submit\s+application|start\s+application/i.test(pageText);

    const isAcceptablePlatform =
      isJobPlatform || hasApply || isATS || isCareer || supersetHashJob ||
      /job\s+description|position\s+overview|role\s+summary|years?\s+of\s+experience/i.test(pageText);

    if (!isAcceptablePlatform) {
      return NextResponse.json({ error: 'Not a job posting link' }, { status: 400 });
    }

    // extraction
    const structuredData = extractFromPageStructure($, u.hostname, target);

    let company = structuredData.company || extractCompanyFromDomain(u.hostname, target);
    if (isJobPlatform) {
      const platformCompany = extractCompanyFromJobPlatformUrl(target, u.hostname);
      if (platformCompany) company = platformCompany;
    }

    let role = structuredData.role || roleFrom($);
    let location = structuredData.location || locationFrom($);
    let salaryText = structuredData.salary || salaryFrom($, pageText);
    let experienceText = experienceFrom(pageText);
    const deadlineISO = deadlineFrom($, pageText);
    let deadlineText = deadlineISO ? new Date(deadlineISO).toDateString() : '';

    console.log('=== BEFORE GROQ ===');
    console.log('Company:', company);
    console.log('Role:', role);
    console.log('Location:', location);
    console.log('Salary:', salaryText);

    // GROQ fallback
    if (!company || !role || !location || !salaryText || !experienceText || !deadlineText) {
      try {
        const groq = groqClient();

        const systemPrompt = `You are a job posting data extractor. Extract ONLY the requested information. Return valid JSON with no markdown formatting.

${isJobPlatform ? 'IMPORTANT: This is from a job platform. Find the actual hiring company, not the platform name.' : ''}

Rules:
- Company: employer/organization name
- Role: job title
- Location: City/region (e.g., Bangalore, Mumbai, Remote)
- Salary: complete info if present (e.g., "₹12,00,000-₹18,00,000" or "5-8 LPA")
- Experience: e.g., "2-4 years"
- Deadline: application deadline if present
- If field not found, use ""`;

        const userPrompt = `Extract from this job posting:

URL: ${target}
Platform: ${u.hostname}

Content:
"""${pageText.slice(0, 16000)}"""

Return JSON:
{
  "company": "",
  "role": "",
  "location": "",
  "salaryText": "",
  "experienceText": "",
  "deadlineText": ""
}`;

        const res = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.2,
          max_completion_tokens: 600,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        });

        let raw = res.choices?.[0]?.message?.content?.trim() || '{}';
        if (raw.includes('```json')) raw = raw.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        else if (raw.includes('```')) raw = raw.replace(/```\s*/g, '');
        const j = JSON.parse(raw);

        if (j.company && (!company || /^(careers?|jobs?|hiring|work|employment)$/i.test(company))) {
          company = j.company;
        }
        if (j.role && (!role || role.length < j.role.length || /intern/i.test(j.role))) {
          role = j.role;
        }
        if (j.location && (!location || /book|call|apply|contact/i.test(location) ||
          j.location.includes(',') || /remote|hyderabad|bangalore|bengaluru|mumbai|delhi|pune|chennai|gurgaon|noida/i.test(j.location))) {
          location = j.location;
        }

        if (j.salaryText && (
          isUselessSalary(salaryText) ||
          salaryText.length < 5 ||
          (looksForeignSalary(salaryText) && looksIndianSalary(j.salaryText)) ||
          j.salaryText.length > (salaryText || '').length ||
          looksIndianSalary(j.salaryText)
        )) {
          salaryText = j.salaryText;
        }

        if (j.experienceText && !experienceText) experienceText = j.experienceText;
        if (j.deadlineText && !deadlineText) deadlineText = j.deadlineText;

      } catch (err) {
        console.warn('GROQ fallback failed:', err.message);
      }
    }

    // AI expected salary (always optional)
    let expectedSalaryText = '';
    if (company && role) {
      const groq = groqClient();
      expectedSalaryText = await getExpectedSalary(groq, company, role, location || 'India');
    }

    // FINAL: prefer AI range when extracted salary is junk/blank
    if (isUselessSalary(salaryText) && expectedSalaryText) {
      salaryText = expectedSalaryText;
    }

    console.log('=== FINAL RESULTS ===');
    console.log('Company:', company);
    console.log('Role:', role);
    console.log('Location:', location);
    console.log('Salary:', salaryText);
    console.log('Expected Salary:', expectedSalaryText);

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
