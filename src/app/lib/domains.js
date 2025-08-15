export const BLOCKED_DOMAINS = new Set([
  'youtube.com', 'youtu.be', 'google.com', 'docs.google.com',
  'facebook.com', 'twitter.com', 'x.com', 'instagram.com',
  'medium.com', 'reddit.com', 'notion.so',
  // Add job aggregators that require authentication
  'linkedin.com', 'indeed.com', 'glassdoor.com'
]);

// big aggregators you said to block for auto-capture:
export const AGGREGATOR_BLOCK = new Set([
  'linkedin.com', 'indeed.com', 'naukri.com', 'foundit.in',
  'glassdoor.com', 'monster.com', 'ziprecruiter.com'
]);

// ATS / career platforms to allow
export const ATS_ALLOW = new Set([
  'greenhouse.io', 'lever.co', 'workable.com', 'ashbyhq.com',
  'smartrecruiters.com', 'icims.com', 'workday.com',
  'bamboohr.com', 'jazzhr.com', 'successfactors.com', 'taleo.net',
  'applytojob.com', 'recruitee.com', 'teamtailor.com'
]);

// quick apply button selectors / keywords
export const APPLY_SELECTORS = [
  'a[href*="apply"]', 'button[type="submit"]', 'button:contains("Apply")',
  'a:contains("Apply")', '[data-qa*="apply"]', '[data-testid*="apply"]',
  // Add more Adobe-specific selectors
  '.apply-button', '.btn-apply', '[role="button"]', 'input[type="submit"]'
];

export function looksLikeCareerDomain(hostname) {
  // allow subdomains like jobs.company.com, careers.company.com, boards.greenhouse.io/acme
  // Also add specific company careers domains
  return (
    hostname.startsWith('careers.') ||
    hostname.startsWith('jobs.') ||
    hostname.includes('.careers.') ||
    hostname.includes('careers.adobe.com') ||
    hostname.includes('careers.mastercard.com') ||
    hostname.includes('careers.microsoft.com') ||
    hostname.includes('careers.google.com') ||
    // Generic patterns
    hostname.includes('career') ||
    hostname.includes('jobs')
  );
}