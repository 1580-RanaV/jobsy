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

// Enhanced list of job platforms and ATS systems that should be allowed
const ALLOWED_JOB_PLATFORMS = new Set([
  'naukri.com',
  'linkedin.com',
  'indeed.com',
  'glassdoor.com',
  'monster.com',
  'shine.com',
  'timesjobs.com',
  'foundit.in', // formerly monster.in
  'instahyre.com',
  'angellist.com',
  'wellfound.com',
  'stackoverflow.com',
  'dice.com',
  'zip-recruiter.com',
  'careerbuilder.com',
  'simplyhired.com',
  'jobstreet.com',
  'seek.com',
  'smartrecruiters.com',
  'workday.com',
  'successfactors.com',
  'oracle.com',
  'taleo.net',
  'icims.com',
  'greenhouse.io',
  'lever.co',
  'bamboohr.com',
  'recruitee.com',
  'personio.com',
  'breezy.hr',
  'crelate.com',
  'eightfold.ai',
  'myworkday.com',
  'myworkdayjobs.com',
  'oracle-jobs.com',
  'oraclecloud.com',
  'successfactors.eu',
  'successfactors.com',
  'sap.com',
  'cornerstonedemand.com',
  'ultipro.com',
  'adp.com',
  'ceridian.com',
  'paychex.com',
  'paycom.com',
  'paylocity.com',
  'namely.com',
  'zenefits.com',
  'gusto.com',
  'rippling.com',
  'hibob.com'
]);

// Enhanced company name extraction from domain
function extractCompanyFromDomain(hostname, fullUrl = '') {
  const parsed = parseDomain(hostname);
  const domain = parsed.domain;
  
  if (!domain) return '';
  
  // Common domain-to-company mappings (enhanced)
  const domainMappings = {
    'google': 'Google',
    'microsoft': 'Microsoft',
    'amazon': 'Amazon',
    'apple': 'Apple',
    'meta': 'Meta',
    'facebook': 'Facebook',
    'netflix': 'Netflix',
    'uber': 'Uber',
    'airbnb': 'Airbnb',
    'spotify': 'Spotify',
    'linkedin': 'LinkedIn',
    'twitter': 'Twitter',
    'adobe': 'Adobe',
    'salesforce': 'Salesforce',
    'oracle': 'Oracle',
    'ibm': 'IBM',
    'intel': 'Intel',
    'nvidia': 'NVIDIA',
    'tesla': 'Tesla',
    'paypal': 'PayPal',
    'shopify': 'Shopify',
    'atlassian': 'Atlassian',
    'slack': 'Slack',
    'zoom': 'Zoom',
    'dropbox': 'Dropbox',
    'github': 'GitHub',
    'gitlab': 'GitLab',
    'stackoverflow': 'Stack Overflow',
    'reddit': 'Reddit',
    'pinterest': 'Pinterest',
    'snapchat': 'Snapchat',
    'tiktok': 'TikTok',
    'whatsapp': 'WhatsApp',
    'instagram': 'Instagram',
    'youtube': 'YouTube',
    // Indian companies
    'infosys': 'Infosys',
    'tcs': 'Tata Consultancy Services',
    'wipro': 'Wipro',
    'hcl': 'HCL Technologies',
    'techMahindra': 'Tech Mahindra',
    'mindtree': 'Mindtree',
    'capgemini': 'Capgemini',
    'accenture': 'Accenture',
    'cognizant': 'Cognizant',
    'flipkart': 'Flipkart',
    'paytm': 'Paytm',
    'zomato': 'Zomato',
    'swiggy': 'Swiggy',
    'ola': 'Ola',
    'byju': "BYJU'S",
    'fresworks': 'Freshworks',
    'zoho': 'Zoho',
    'phonepe': 'PhonePe',
    'razorpay': 'Razorpay',
    'policybazaar': 'PolicyBazaar',
    'nykaa': 'Nykaa',
    'bigbasket': 'BigBasket',
    'grofers': 'Grofers',
    'myntra': 'Myntra',
    'jabong': 'Jabong',
    'snapdeal': 'Snapdeal',
    'makemytrip': 'MakeMyTrip',
    'goibibo': 'Goibibo',
    'cleartrip': 'Cleartrip',
    'redbus': 'redBus',
    'practo': 'Practo',
    'lenskart': 'Lenskart',
    'urbancompany': 'Urban Company',
    'dunzo': 'Dunzo',
    'shadowfax': 'Shadowfax',
    'delhivery': 'Delhivery'
  };

  // Extract company from URL path for job platforms
  if (isJobPlatformDomain(hostname)) {
    console.log('Detected job platform domain:', hostname);
    
    // Try to extract company from URL path
    const pathCompany = extractCompanyFromJobPlatformUrl(fullUrl, hostname);
    if (pathCompany) {
      console.log('Extracted company from job platform URL:', pathCompany);
      return pathCompany;
    }
  }

  // Direct mapping
  const lowerDomain = domain.toLowerCase();
  if (domainMappings[lowerDomain]) {
    return domainMappings[lowerDomain];
  }

  // Handle compound words and variations
  for (const [key, value] of Object.entries(domainMappings)) {
    if (lowerDomain.includes(key) || key.includes(lowerDomain)) {
      return value;
    }
  }

  // Clean up domain name for better presentation
  let cleanName = domain
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
    .replace(/\s+/g, ' ') // Remove extra spaces
    .trim();

  // Handle common patterns
  if (cleanName.toLowerCase().includes('careers')) {
    cleanName = cleanName.replace(/careers/i, '').trim();
  }
  if (cleanName.toLowerCase().includes('jobs')) {
    cleanName = cleanName.replace(/jobs/i, '').trim();
  }

  return cleanName || domain;
}

// Check if domain is a job platform
function isJobPlatformDomain(hostname) {
  return [...ALLOWED_JOB_PLATFORMS].some(platform => 
    hostname.includes(platform) || platform.includes(hostname)
  );
}

// Extract company name from job platform URLs
function extractCompanyFromJobPlatformUrl(fullUrl, hostname) {
  try {
    const url = new URL(fullUrl);
    const path = url.pathname;
    const searchParams = url.searchParams;

    // Naukri.com patterns
    if (hostname.includes('naukri.com')) {
      // Pattern: /company-name-jobs
      const naukriMatch = path.match(/\/([^\/]+)-jobs/);
      if (naukriMatch) {
        return naukriMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      
      // Pattern: company parameter
      const companyParam = searchParams.get('company');
      if (companyParam) {
        return companyParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // LinkedIn patterns
    if (hostname.includes('linkedin.com')) {
      // Pattern: /company/company-name/jobs
      const linkedinMatch = path.match(/\/company\/([^\/]+)/);
      if (linkedinMatch) {
        return linkedinMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // Indeed patterns
    if (hostname.includes('indeed.com')) {
      const companyParam = searchParams.get('cmp');
      if (companyParam) {
        return companyParam.replace(/\+/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // Oracle Cloud/Taleo patterns
    if (hostname.includes('oracle') || hostname.includes('taleo')) {
      // Often has company in subdomain or path
      const oracleMatch = hostname.match(/([^\.]+)\.(?:oracle|taleo)/);
      if (oracleMatch && oracleMatch[1] !== 'www' && oracleMatch[1] !== 'jobs') {
        return oracleMatch[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // Workday patterns
    if (hostname.includes('myworkday') || hostname.includes('workday')) {
      // Pattern: company.myworkday.com or company-myworkday.com
      const workdayMatch = hostname.match(/([^\.]+)\.(?:myworkday|workday)/);
      if (workdayMatch && workdayMatch[1] !== 'www' && workdayMatch[1] !== 'jobs') {
        return workdayMatch[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // SuccessFactors patterns
    if (hostname.includes('successfactors')) {
      const sfMatch = hostname.match(/([^\.]+)\.successfactors/);
      if (sfMatch && sfMatch[1] !== 'www' && sfMatch[1] !== 'jobs') {
        return sfMatch[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    // Generic subdomain extraction for ATS systems
    if (isJobPlatformDomain(hostname)) {
      const subdomainMatch = hostname.match(/([^\.]+)\./);
      if (subdomainMatch && subdomainMatch[1] !== 'www' && subdomainMatch[1] !== 'jobs' && subdomainMatch[1] !== 'careers') {
        const potential = subdomainMatch[1].replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        // Check if it looks like a company name (not too generic)
        if (potential.length > 2 && !['Jobs', 'Careers', 'Apply', 'Www'].includes(potential)) {
          return potential;
        }
      }
    }

  } catch (e) {
    console.log('Error parsing job platform URL:', e.message);
  }
  
  return '';
}

// Check if text looks like a job title rather than company name
function looksLikeJobTitle(text) {
  const jobTitlePatterns = [
    /\b(engineer|developer|manager|analyst|director|lead|senior|junior|intern|associate|specialist|coordinator|executive|officer|consultant|architect|designer|scientist|researcher|technician|administrator|supervisor|assistant)\b/i,
    /\b(software|frontend|backend|full.?stack|mobile|web|data|cloud|devops|qa|testing|security|network|system|database|ai|ml|machine.learning|product|project|business|marketing|sales|hr|finance|accounting|legal|operations)\b/i,
    /\b(position|role|opening|vacancy|job|career|opportunity)\b/i,
    /\bin\b.*(india|bangalore|mumbai|delhi|hyderabad|pune|chennai|kolkata|ahmedabad|gurugram|noida)/i
  ];
  
  return jobTitlePatterns.some(pattern => pattern.test(text));
}

// Enhanced company name extraction from page content with job platform awareness
function extractCompanyFromPage($, hostname, fullUrl) {
  // Special handling for job platforms
  if (isJobPlatformDomain(hostname)) {
    console.log('Using job platform-specific extraction for:', hostname);
    
    // Job platform specific selectors
    const jobPlatformSelectors = [
      // Naukri
      '.companyName a', '.company-name a', '.comp-name', '.comp-dtls h2',
      // LinkedIn
      '.jobs-unified-top-card__company-name', '.job-details-jobs-unified-top-card__company-name',
      // Indeed
      '.jobsearch-InlineCompanyRating a', '.jobsearch-CompanyReview--heading',
      // Generic job platforms
      '[data-company-name]', '.employer-name', '.hiring-company', '.company-title',
      '.job-company', '.company-info .name', '.recruiter-name'
    ];

    for (const selector of jobPlatformSelectors) {
      try {
        const element = $(selector).first();
        if (element.length) {
          let text = element.text().trim();
          if (text && text.length > 1 && text.length < 80 && !looksLikeJobTitle(text)) {
            console.log('Company found via job platform selector:', selector, '→', text);
            return text;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }
  }

  // Priority order selectors - most specific first
  const highPrioritySelectors = [
    // Direct company data attributes
    '[data-company]:not([data-company*="engineer"]):not([data-company*="developer"]):not([data-company*="manager"])',
    '[data-company-name]:not([data-company-name*="engineer"]):not([data-company-name*="developer"])',
    // Meta tags (usually reliable)
    'meta[property="og:site_name"]',
    'meta[name="application-name"]',
    // Brand/logo elements
    '.navbar-brand:not(:has(.job)):not(:has(.career))',
    '.header-logo',
    '.brand-name',
    '.logo-text',
    // Company specific selectors
    '.company-name:not(.job-title)',
    '.employer-name',
    '.organization-name'
  ];

  const mediumPrioritySelectors = [
    // Structured data
    '[itemtype*="Organization"] [itemprop="name"]',
    '[itemtype*="Corporation"] [itemprop="name"]',
    // Header elements
    'header .company:not(.job)',
    'header .brand',
    '.site-title:not(:contains("job")):not(:contains("career"))',
    // Less specific company selectors
    '.company-header',
    '.company-title:not(.job-title)'
  ];

  // Try high priority selectors first
  for (const selector of highPrioritySelectors) {
    try {
      const element = $(selector).first();
      if (element.length) {
        let text = element.attr('content') || element.attr('data-company') || 
                  element.attr('data-company-name') || element.text();
        
        text = text?.trim() || '';
        if (text && text.length > 1 && text.length < 80 && !looksLikeJobTitle(text)) {
          // Clean up the text
          text = text.replace(/\s+/g, ' ').trim();
          // Skip generic terms
          if (!/^(careers?|jobs?|hiring|apply|work|employment|opportunities?|home|about|contact)$/i.test(text)) {
            console.log('Company found via high priority selector:', selector, '→', text);
            return text;
          }
        }
      }
    } catch (e) {
      // Continue to next selector
    }
  }

  // Try medium priority selectors
  for (const selector of mediumPrioritySelectors) {
    try {
      const element = $(selector).first();
      if (element.length) {
        let text = element.attr('content') || element.text();
        text = text?.trim() || '';
        
        if (text && text.length > 1 && text.length < 80 && !looksLikeJobTitle(text)) {
          text = text.replace(/\s+/g, ' ').trim();
          if (!/^(careers?|jobs?|hiring|apply|work|employment|opportunities?|home|about|contact)$/i.test(text)) {
            console.log('Company found via medium priority selector:', selector, '→', text);
            return text;
          }
        }
      }
    } catch (e) {
      // Continue to next selector
    }
  }

  // Try extracting from page title with better patterns
  const title = $('title').text();
  if (title) {
    console.log('Analyzing page title:', title);
    
    // Pattern 1: "Job Title at Company Name"
    const atMatch = title.match(/\sat\s+([^|•\-–—\n]+?)(?:\s*[\|•\-–—\n]|$)/i);
    if (atMatch && atMatch[1]) {
      const company = atMatch[1].trim();
      if (company.length > 1 && company.length < 60 && !looksLikeJobTitle(company)) {
        console.log('Company found via "at" pattern:', company);
        return company;
      }
    }

    // Pattern 2: "Company Name | Job Title" or "Company Name - Job Title"
    const beforeSeparator = title.match(/^([^|•\-–—\n]+?)[\s]*[\|•\-–—]/);
    if (beforeSeparator && beforeSeparator[1]) {
      const company = beforeSeparator[1].trim();
      if (company.length > 1 && company.length < 60 && 
          !looksLikeJobTitle(company) &&
          !/^(job|career|position|role|opening|vacancy|apply)s?\b/i.test(company)) {
        console.log('Company found via separator pattern:', company);
        return company;
      }
    }

    // Pattern 3: "Company Name Jobs" or "Company Name Careers"
    const jobsCareerMatch = title.match(/^(.+?)\s+(?:jobs?|careers?)\b/i);
    if (jobsCareerMatch && jobsCareerMatch[1]) {
      const company = jobsCareerMatch[1].trim();
      if (company.length > 1 && company.length < 60 && !looksLikeJobTitle(company)) {
        console.log('Company found via jobs/careers pattern:', company);
        return company;
      }
    }
  }

  return '';
}

// Enhanced company extraction function
function enhancedCompanyFrom($, hostname, fullUrl) {
  // First try to extract from page content
  const fromPage = extractCompanyFromPage($, hostname, fullUrl);
  if (fromPage) {
    console.log('Company extracted from page:', fromPage);
    return fromPage;
  }

  // Fallback to domain/URL extraction
  const fromDomain = extractCompanyFromDomain(hostname, fullUrl);
  console.log('Company extracted from domain/URL:', fromDomain);
  return fromDomain;
}

// Enhanced platform detection
function isAcceptableJobPlatform(hostname, pageText, $) {
  // Check if it's a known job platform
  if (isJobPlatformDomain(hostname)) {
    console.log('Accepted as known job platform:', hostname);
    return true;
  }

  // Check for job platform indicators in content
  const platformIndicators = [
    /apply now|apply today|submit application|start application/i,
    /job description|job details|job summary/i,
    /years? of experience|experience required/i,
    /salary|compensation|ctc|package/i,
    /location|work location|job location/i,
    /qualifications|requirements|skills required/i,
    /deadline|last date|apply before/i
  ];

  const indicatorCount = platformIndicators.reduce((count, pattern) => {
    return count + (pattern.test(pageText) ? 1 : 0);
  }, 0);

  if (indicatorCount >= 3) {
    console.log('Accepted based on job content indicators, count:', indicatorCount);
    return true;
  }

  return false;
}

// Enhanced salary extraction with debugging
function debugSalaryExtraction($, pageText, url) {
  console.log('\n=== SALARY EXTRACTION DEBUG START ===');
  console.log('URL:', url);
  
  // Initial extraction
  let salaryText = salaryFrom($, pageText);
  console.log('1. Initial salaryText from salaryFrom():', JSON.stringify(salaryText));
  
  // Check if page contains salary-related keywords
  const hasKeywords = /salary|pay|compensation|₹|rs\.?|rupees?|lpa|lakhs?|per annum|ctc|package/i.test(pageText);
  console.log('2. Page contains salary keywords:', hasKeywords);
  
  // Look for salary patterns in page text
  const salaryPatterns = [
    { name: 'Rupee symbol with numbers', regex: /₹[\d,]+(?:\s*-\s*₹?[\d,]+)?(?:\s*(?:per|\/)\s*(?:month|annum|year))?/gi },
    { name: 'Rs with numbers', regex: /rs\.?\s*[\d,]+(?:\s*-\s*rs\.?[\d,]+)?(?:\s*(?:per|\/)\s*(?:month|annum|year))?/gi },
    { name: 'LPA/Lakhs pattern', regex: /\d+(?:\.\d+)?\s*-?\s*\d*(?:\.\d+)?\s*(?:lpa|lakhs?|per annum)/gi },
    { name: 'CTC pattern', regex: /ctc:?\s*[\d₹rs,.\s-]+(?:lpa|lakhs?|per annum)?/gi },
    { name: 'Package pattern', regex: /package:?\s*[\d₹rs,.\s-]+(?:lpa|lakhs?|per annum)?/gi },
    { name: 'Salary colon pattern', regex: /salary:?\s*[\d₹rs,.\s-]+(?:lpa|lakhs?|per annum)?/gi },
    { name: 'Compensation pattern', regex: /compensation:?\s*[\d₹rs,.\s-]+(?:lpa|lakhs?|per annum)?/gi }
  ];

  let foundPatterns = [];
  salaryPatterns.forEach(({ name, regex }) => {
    const matches = pageText.match(regex);
    if (matches && matches.length > 0) {
      console.log(`3. ${name} matches:`, matches.slice(0, 3)); // Show first 3 matches
      foundPatterns = foundPatterns.concat(matches.slice(0, 3));
    }
  });
  
  // Check specific salary-related selectors
  const salarySelectors = [
    { selector: '[class*="salary" i]', description: 'Class contains salary' },
    { selector: '[data-salary]', description: 'Data salary attribute' },
    { selector: '.compensation', description: 'Compensation class' },
    { selector: '.pay-range', description: 'Pay range class' },
    { selector: '[class*="compensation" i]', description: 'Class contains compensation' },
    { selector: '.salary-range', description: 'Salary range class' },
    { selector: '[class*="ctc" i]', description: 'Class contains CTC' },
    { selector: '[class*="package" i]', description: 'Class contains package' },
    { selector: '.job-salary', description: 'Job salary class' },
    { selector: '.salary-info', description: 'Salary info class' },
    { selector: '[id*="salary" i]', description: 'ID contains salary' },
    { selector: 'span:contains("₹")', description: 'Spans containing rupee symbol' },
    { selector: 'div:contains("LPA")', description: 'Divs containing LPA' }
  ];

  let foundSelectors = [];
  salarySelectors.forEach(({ selector, description }) => {
    try {
      const elements = $(selector);
      if (elements.length > 0) {
        const text = elements.first().text().trim();
        if (text && text.length > 0 && text.length < 200) {
          console.log(`4. ${description} selector "${selector}" found:`, JSON.stringify(text));
          foundSelectors.push({ selector, text, description });
        }
      }
    } catch (e) {
      console.log(`4. Selector "${selector}" error:`, e.message);
    }
  });
  
  // Try to extract salary from structured data
  const structuredSalary = $('script[type="application/ld+json"]').map((i, el) => {
    try {
      const json = JSON.parse($(el).html());
      const findSalary = (obj) => {
        if (typeof obj !== 'object' || obj === null) return null;
        if (obj.salary || obj.baseSalary || obj.salaryRange) {
          return obj.salary || obj.baseSalary || obj.salaryRange;
        }
        for (const key in obj) {
          const result = findSalary(obj[key]);
          if (result) return result;
        }
        return null;
      };
      return findSalary(json);
    } catch (e) {
      return null;
    }
  }).get().filter(Boolean);
  
  if (structuredSalary.length > 0) {
    console.log('5. Structured data salary found:', structuredSalary);
  }

  // Fallback extraction if original failed
  let fallbackSalary = '';
  if (!salaryText || salaryText === 'rs,' || salaryText === '₹' || salaryText.length < 3) {
    console.log('6. Original extraction failed/incomplete, trying fallback...');
    
    // Try the best pattern matches first
    if (foundPatterns.length > 0) {
      // Sort by length (longer is usually more complete)
      foundPatterns.sort((a, b) => b.length - a.length);
      fallbackSalary = foundPatterns[0];
      console.log('6a. Using best pattern match:', fallbackSalary);
    }
    // Try selector results
    else if (foundSelectors.length > 0) {
      // Find the most promising selector result
      const bestSelector = foundSelectors.find(s => 
        s.text.match(/\d/) && (s.text.includes('₹') || s.text.includes('rs') || s.text.includes('lpa'))
      );
      if (bestSelector) {
        fallbackSalary = bestSelector.text;
        console.log('6b. Using best selector result:', fallbackSalary);
      }
    }
    // Try structured data
    else if (structuredSalary.length > 0) {
      fallbackSalary = JSON.stringify(structuredSalary[0]);
      console.log('6c. Using structured data:', fallbackSalary);
    }
  }

  const finalSalary = fallbackSalary || salaryText || '';
  console.log('7. Final salary result:', JSON.stringify(finalSalary));
  console.log('=== SALARY EXTRACTION DEBUG END ===\n');
  
  return finalSalary;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('url');
    if (!target) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    const u = new URL(target);
    const parsed = parseDomain(u.hostname);
    const root = parsed.domain ? `${parsed.domain}.${parsed.publicSuffix}` : u.hostname;

    // Modified blocking logic - be more lenient with job platforms
    if (BLOCKED_DOMAINS.has(root) && !isJobPlatformDomain(u.hostname)) {
      return NextResponse.json({ 
        error: 'This domain is blocked. Please use the direct company career page URL instead.' 
      }, { status: 400 });
    }

    // Only block obvious aggregators, not legitimate job platforms
    if (AGGREGATOR_BLOCK.has(root) && !isJobPlatformDomain(u.hostname)) {
      return NextResponse.json({ error: 'Use the original company/ATS posting' }, { status: 400 });
    }

    const isATS = [...ATS_ALLOW].some((d) => root.endsWith(d)) || isJobPlatformDomain(u.hostname);
    const isCareer = looksLikeCareerDomain(u.hostname);

    console.log('=== URL ANALYSIS ===');
    console.log('URL:', target);
    console.log('Root domain:', root);
    console.log('isJobPlatformDomain:', isJobPlatformDomain(u.hostname));
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
    
    // Enhanced inactive job detection patterns
    const inactivePatterns = [
      { pattern: /job.*has been filled/i, description: 'Job has been filled variations' },
      { pattern: /position.*no longer available/i, description: 'Position no longer available' },
      { pattern: /posting.*expired/i, description: 'Expired job postings' },
      { pattern: /application.*closed/i, description: 'Closed application notices' },
      { pattern: /sorry.*job.*filled/i, description: 'Apologetic filled job messages' },
      { pattern: /this position is no longer accepting applications/i, description: 'No longer accepting applications' },
      { pattern: /we're sorry.*this specific position is no longer available/i, description: 'Mastercard-style unavailable message' },
      { pattern: /this job is no longer active/i, description: 'Job no longer active' },
      { pattern: /position has been closed/i, description: 'Position closed' },
      { pattern: /applications are no longer being accepted/i, description: 'Applications no longer accepted' },
      { pattern: /this opportunity has expired/i, description: 'Expired opportunity' },
      { pattern: /job opening is closed/i, description: 'Job opening closed' },
      { pattern: /recruitment for this position has ended/i, description: 'Recruitment ended' }
    ];
    
    let detectedPattern = null;
    const isInactive = inactivePatterns.some(({ pattern, description }) => {
      const titleMatch = pattern.test($('title').text());
      const textMatch = pattern.test(pageText);
      const match = titleMatch || textMatch;
      if (match) {
        console.log('Inactive pattern matched:', pattern.source, 'description:', description);
        detectedPattern = pattern.source;
      }
      return match;
    });
    
    if (isInactive) {
      console.log('Blocked: Job inactive, detected pattern:', detectedPattern);
      return NextResponse.json({ 
        error: 'Job posting is no longer active or has been filled',
        type: 'job_filled',
        url: target,
        detectedPattern: detectedPattern
      }, { status: 422 });
    }

    // Enhanced job posting detection
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
    
    // Use enhanced platform detection
    const isAcceptablePlatform = isAcceptableJobPlatform(u.hostname, pageText, $);
    console.log('isAcceptablePlatform:', isAcceptablePlatform);
    console.log('Final check - isATS || isCareer || hasApply || isAcceptablePlatform:', isATS || isCareer || hasApply || isAcceptablePlatform);

    if (!(isATS || isCareer || hasApply || isAcceptablePlatform)) {
      console.log('Blocked: Not recognized as job posting');
      return NextResponse.json({ error: 'Not a job posting link' }, { status: 400 });
    }

    // Extract using enhanced company extraction with full URL
    let company = enhancedCompanyFrom($, u.hostname, target);
    let role = roleFrom($);
    let location = locationFrom($);
    
    // Enhanced salary extraction with debugging
    let salaryText = debugSalaryExtraction($, pageText, target);
    
    let experienceText = experienceFrom(pageText);
    let deadlineISO = deadlineFrom($, pageText);
    let deadlineText = deadlineISO ? new Date(deadlineISO).toDateString() : '';
    let expectedSalaryText = '';

    console.log('\n=== EXTRACTION SUMMARY BEFORE GROQ ===');
    console.log('Company:', JSON.stringify(company));
    console.log('Role:', JSON.stringify(role));
    console.log('Location:', JSON.stringify(location));
    console.log('SalaryText:', JSON.stringify(salaryText));
    console.log('ExperienceText:', JSON.stringify(experienceText));
    console.log('DeadlineText:', JSON.stringify(deadlineText));

    // Enhanced GROQ fallback with better prompting for job platforms
    if (!company || !role || !location || !salaryText || !experienceText || !deadlineText) {
      console.log('\n=== GROQ FALLBACK TRIGGERED ===');
      console.log('Missing fields - Company:', !company, 'Role:', !role, 'Location:', !location, 'Salary:', !salaryText, 'Experience:', !experienceText, 'Deadline:', !deadlineText);
      
      try {
        const groq = groqClient();
        const isJobPlatform = isJobPlatformDomain(u.hostname);
        
        const sys = `You are a strict information extractor for job postings. Extract ONLY the company name, not job titles or roles. Return ONLY a valid JSON object with no markdown formatting, no code blocks, no explanations. Just pure JSON starting with { and ending with }.

${isJobPlatform ? 'IMPORTANT: This is from a job platform (like Naukri, LinkedIn, Indeed, etc.). The actual hiring company will be mentioned in the job description, not the platform name. Extract the real company that is hiring.' : ''}

Do not invent dates that are not present. If a field does not exist, set it to "". For company field: extract only the actual company/employer name (like "Google", "Microsoft", "Infosys"), NOT job titles, roles, or positions (avoid terms like "Engineer", "Developer", "Manager", "Analyst", etc.).`;

        const prompt = `
Extract from this job posting:
- company (ONLY the company/employer name like "Google", "Infosys", "Microsoft" - NOT job titles or roles${isJobPlatform ? '. This is from a job platform, so find the actual hiring company, not the platform name.' : ''})
- role (job title/position)
- location (e.g., "Bengaluru, India")
- experienceText (e.g., "2–4 years" or "")
- deadlineText (human-readable if present; "" if none)
- salaryText (verbatim COMPLETE salary like "₹12,00,000–₹18,00,000" or "5-8 LPA" - include full range, not just currency symbol)
- expectedSalaryText (estimate INR range for this role/company/location like "₹X–₹Y")

IMPORTANT: For "company" field, extract ONLY the employer/organization name. Do NOT include job titles, positions, or roles.
IMPORTANT: For "salaryText" field, extract the COMPLETE salary information, not just currency symbols like "rs," or "₹".
${isJobPlatform ? 'IMPORTANT: This URL is from a job platform. Look for the actual company that posted the job, not the platform name.' : ''}

URL: ${target}
Platform: ${u.hostname}

Text:
"""${pageText.slice(0, 16000)}"""
        `.trim();

        const res = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
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
        console.log('GROQ raw response:', raw);
        
        // Clean up markdown formatting from GROQ response
        let cleanJson = raw;
        if (cleanJson.includes('```json')) {
          cleanJson = cleanJson.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        } else if (cleanJson.includes('```')) {
          cleanJson = cleanJson.replace(/```\s*/g, '').replace(/```\s*$/g, '');
        }
        
        const j = JSON.parse(cleanJson);
        console.log('GROQ parsed JSON:', j);

        // Use GROQ results with better validation
        if (!company || /^(careers?|jobs?|hiring|work|employment|naukri|linkedin|indeed)$/i.test(company)) {
          company = j.company || company;
        }
        role ||= j.role || '';
        location ||= j.location || '';
        experienceText ||= j.experienceText || '';
        deadlineText ||= j.deadlineText || '';
        
        // Enhanced salary handling from GROQ
        if (!salaryText || salaryText === 'rs,' || salaryText === '₹' || salaryText.length < 3) {
          console.log('Using GROQ salary because original was incomplete:', JSON.stringify(salaryText));
          salaryText = j.salaryText || salaryText;
          console.log('GROQ provided salary:', JSON.stringify(j.salaryText));
        }
        
        expectedSalaryText = j.expectedSalaryText || '';
        
        console.log('=== AFTER GROQ PROCESSING ===');
        console.log('Final Company:', JSON.stringify(company));
        console.log('Final Role:', JSON.stringify(role));
        console.log('Final Location:', JSON.stringify(location));
        console.log('Final SalaryText:', JSON.stringify(salaryText));
        console.log('Final ExperienceText:', JSON.stringify(experienceText));
        console.log('Final DeadlineText:', JSON.stringify(deadlineText));
        console.log('Final ExpectedSalaryText:', JSON.stringify(expectedSalaryText));
        
      } catch (err) {
        console.warn('GROQ fallback failed:', err?.message);
        console.warn('GROQ error details:', err);
        if (!expectedSalaryText && role) expectedSalaryText = '₹—';
      }
    } else {
      console.log('=== GROQ FALLBACK SKIPPED ===');
      console.log('All required fields present, skipping GROQ');
    }

    // Final salary validation and cleanup
    console.log('\n=== FINAL SALARY VALIDATION ===');
    console.log('Salary before final cleanup:', JSON.stringify(salaryText));
    
    // If we still have incomplete salary, try one more extraction attempt
    if (!salaryText || salaryText === 'Rs.' || salaryText === '₹' || salaryText.trim() === '') {
      console.log('Attempting final salary extraction...');
      
      // Look for any number patterns with currency
      const finalSalaryMatch = pageText.match(/(?:₹|rs\.?)\s*[\d,]+(?:\s*-\s*(?:₹|rs\.?)?[\d,]+)?|\d+(?:\.\d+)?\s*-?\s*\d*(?:\.\d+)?\s*(?:lpa|lakhs?)/i);
      if (finalSalaryMatch) {
        salaryText = finalSalaryMatch[0].trim();
        console.log('Final salary extraction found:', JSON.stringify(salaryText));
      } else {
        console.log('No salary information found anywhere');
        salaryText = '';
      }
    }
    
    console.log('Final salary result:', JSON.stringify(salaryText));

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

    console.log('\n=== FINAL OUTPUT ===');
    console.log('Output object:', JSON.stringify(out, null, 2));

    return NextResponse.json(out);
  } catch (e) {
    console.error('Extractor error:', e);
    console.error('Error stack:', e.stack);
    return NextResponse.json({ error: e.message || 'Extraction failed' }, { status: 500 });
  }
}