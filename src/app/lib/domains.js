// Enhanced domains and selectors configuration
// lib/domains.js - Updated version

export const BLOCKED_DOMAINS = new Set([
  // Only block domains that truly can't be accessed without authentication
  // and don't provide useful job information
]);

export const AGGREGATOR_BLOCK = new Set([
  // Only block pure aggregators that don't add value
  // Remove job platforms from this list
]);

// Expanded ATS and job platform domains that should be allowed
export const ATS_ALLOW = new Set([
  'workday.com',
  'myworkday.com',
  'myworkdayjobs.com',
  'successfactors.com',
  'successfactors.eu',
  'taleo.net',
  'oracle.com',
  'oraclecloud.com',
  'icims.com',
  'greenhouse.io',
  'lever.co',
  'bamboohr.com',
  'smartrecruiters.com',
  'recruitee.com',
  'personio.com',
  'breezy.hr',
  'crelate.com',
  'eightfold.ai',
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
  'hibob.com',
  'sap.com'
]);

// Major job platforms that should be allowed
export const JOB_PLATFORMS = new Set([
  'naukri.com',
  'linkedin.com',
  'indeed.com',
  'glassdoor.com',
  'monster.com',
  'shine.com',
  'timesjobs.com',
  'foundit.in',
  'instahyre.com',
  'angellist.com',
  'wellfound.com',
  'stackoverflow.com',
  'dice.com',
  'ziprecruiter.com',
  'careerbuilder.com',
  'simplyhired.com',
  'jobstreet.com',
  'seek.com'
]);

// Enhanced apply button selectors
export const APPLY_SELECTORS = [
  // Generic apply buttons
  'button[class*="apply" i]',
  'a[class*="apply" i]',
  'input[value*="apply" i]',
  '[data-testid*="apply"]',
  '[data-qa*="apply"]',
  
  // Specific platform selectors
  // LinkedIn
  '.jobs-apply-button',
  '.jobs-s-apply button',
  '.jobs-apply-form button',
  
  // Indeed
  '.jobsearch-IndeedApplyButton',
  '.jobsearch-ApplyButton',
  '.indeed-apply-button',
  
  // Naukri
  '.apply-button',
  '.applyButton',
  '#apply_button',
  
  // Workday
  '[data-automation-id="applyButton"]',
  '.css-1hwfws3', // Common Workday apply button class
  
  // Oracle/Taleo
  '.taleo-apply-button',
  '.apply-now-button',
  
  // Greenhouse
  '#submit_application',
  '.template-btn-submit',
  
  // SmartRecruiters
  '.apply-button-submit',
  '.sr-apply-button',
  
  // Generic patterns
  '[href*="apply"]',
  '[onclick*="apply"]',
  'button:contains("Apply")',
  'a:contains("Apply")',
  'button:contains("Submit Application")',
  'a:contains("Submit Application")',
  'button:contains("Start Application")',
  'a:contains("Start Application")',
  
  // Form submit buttons on job pages
  'form[action*="apply"] input[type="submit"]',
  'form[action*="apply"] button[type="submit"]',
  'form[id*="apply"] input[type="submit"]',
  'form[id*="apply"] button[type="submit"]'
];

// Company extraction selectors for different platforms
export const COMPANY_SELECTORS = {
  'linkedin.com': [
    '.jobs-unified-top-card__company-name',
    '.job-details-jobs-unified-top-card__company-name',
    '.jobs-poster__company-name',
    '[data-test="job-company-name"]'
  ],
  'naukri.com': [
    '.companyName a',
    '.company-name a',
    '.comp-name',
    '.comp-dtls h2',
    '.comp-name-wrap .comp-name'
  ],
  'indeed.com': [
    '.jobsearch-InlineCompanyRating a',
    '.jobsearch-CompanyReview--heading',
    '[data-testid="company-name"]',
    '.icl-u-lg-mr--sm'
  ],
  'glassdoor.com': [
    '.e1tk4kwz1',
    '.employerName',
    '[data-test="employer-name"]'
  ],
  'monster.com': [
    '.company-name',
    '.jobview-company-name'
  ],
  'shine.com': [
    '.job-company-name',
    '.company-name-link'
  ],
  'workday.com': [
    '[data-automation-id="jobPostingCompanyName"]',
    '.css-1id4k8'
  ],
  'greenhouse.io': [
    '.company-name',
    '.header-company-name'
  ],
  'lever.co': [
    '.postings-title-company',
    '.company-name'
  ],
  'smartrecruiters.com': [
    '.company-information h1',
    '.sr-company-name'
  ]
};

// Enhanced career domain detection
export function looksLikeCareerDomain(hostname) {
  const careerPatterns = [
    /careers?/i,
    /jobs?/i,
    /hiring/i,
    /employment/i,
    /opportunities/i,
    /talent/i,
    /recruit/i,
    /apply/i,
    /vacancies/i,
    /openings/i
  ];
  
  return careerPatterns.some(pattern => pattern.test(hostname));
}

// Enhanced job content detection patterns
export const JOB_CONTENT_PATTERNS = [
  // Direct job indicators
  /job description|job details|job summary|position description/i,
  /job title|position title|role|opening/i,
  /apply now|apply today|submit application|start application/i,
  
  // Requirements and qualifications
  /requirements?|qualifications?|skills? required|must have/i,
  /years? of experience|experience required|minimum experience/i,
  /bachelor|master|degree|diploma|certification/i,
  
  // Compensation and benefits
  /salary|compensation|ctc|package|benefits/i,
  /per annum|lpa|lakhs?|₹|rupees?/i,
  
  // Location and work details
  /work location|job location|office location|remote|hybrid/i,
  /full.?time|part.?time|contract|permanent|temporary/i,
  
  // Application process
  /deadline|last date|apply before|closing date/i,
  /how to apply|application process|selection process/i,
  
  // Company information
  /about (?:the )?company|company overview|organization/i,
  /team|culture|values|mission/i
];

// Platform-specific URL patterns for company extraction
export const PLATFORM_URL_PATTERNS = {
  'naukri.com': {
    companyInPath: /\/([^\/]+)-jobs/,
    companyInQuery: 'company'
  },
  'linkedin.com': {
    companyInPath: /\/company\/([^\/]+)/
  },
  'indeed.com': {
    companyInQuery: 'cmp'
  },
  'glassdoor.com': {
    companyInPath: /\/([^\/]+)-jobs/
  },
  'monster.com': {
    companyInQuery: 'company'
  }
};

// Enhanced blocked patterns - only block truly non-job content
export const NON_JOB_PATTERNS = [
  /privacy policy|terms of service|cookie policy/i,
  /contact us|about us|our story|company history/i,
  /news|press release|blog|article/i,
  /login|sign up|register|authentication/i,
  /shopping|cart|checkout|payment/i,
  /products|services|solutions(?! engineer)/i // Don't block "solutions engineer"
];

// Enhanced inactive job patterns
export const INACTIVE_JOB_PATTERNS = [
  /job.*has been filled|position.*filled/i,
  /no longer available|not available|unavailable/i,
  /expired|closed|ended/i,
  /application.*closed|applications? closed/i,
  /deadline.*passed|past.*deadline/i,
  /sorry.*position.*filled/i,
  /this.*job.*no longer/i,
  /recruitment.*ended|hiring.*ended/i
];