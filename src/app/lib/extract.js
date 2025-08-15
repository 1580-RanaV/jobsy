// Fix: Use named import instead of default import
import { load as cheerioLoad } from 'cheerio';

const RX_SAL = /(?:₹|INR|Rs\.?)\s?([\d,]+)(?:\s*[-–]\s*([\d,]+))?|(?:\$|USD|€)\s?([\d,]+)(?:\s*[-–]\s*([\d,]+))?/i;

export function load(html) { 
  return cheerioLoad(html); 
}

export function text($) {
  return $('body').text().replace(/\s+/g, ' ').trim();
}

export function companyFrom($, hostname) {
  // Try various selectors for company name
  const selectors = [
    '[data-testid*="company"]',
    '[class*="company"]',
    '[class*="employer"]',
    'h1, h2, h3',
    '.company-name',
    '.employer-name'
  ];
  
  for (const selector of selectors) {
    try {
      const text = $(selector).first().text().trim();
      if (text && text.length > 0) {
        return text;
      }
    } catch (e) {
      continue;
    }
  }
  
  // Fallback to hostname
  return hostname.split('.')[0];
}

export function roleFrom($) {
  // Try various selectors for job title/role
  const selectors = [
    'h1',
    '[data-testid*="title"]',
    '[data-testid*="job"]',
    '[class*="job-title"]',
    '[class*="position"]',
    '.title',
    '.job-title',
    '.position-title'
  ];
  
  for (const selector of selectors) {
    try {
      const text = $(selector).first().text().trim();
      if (text && text.length > 0 && !text.toLowerCase().includes('company')) {
        return text;
      }
    } catch (e) {
      continue;
    }
  }
  
  return '';
}

export function locationFrom($) {
  // Try various selectors for location
  const selectors = [
    '[data-testid*="location"]',
    '[class*="location"]',
    '[class*="city"]',
    '.location',
    '.job-location',
    '.city'
  ];
  
  for (const selector of selectors) {
    try {
      const text = $(selector).first().text().trim();
      if (text && text.length > 0) {
        return text;
      }
    } catch (e) {
      continue;
    }
  }
  
  return '';
}

export function salaryFrom($, pageText) {
  // Try to find salary in the page text
  const match = pageText.match(RX_SAL);
  if (match) {
    return match[0];
  }
  
  // Try specific selectors
  const selectors = [
    '[data-testid*="salary"]',
    '[class*="salary"]',
    '[class*="compensation"]',
    '.salary',
    '.compensation',
    '.pay'
  ];
  
  for (const selector of selectors) {
    try {
      const text = $(selector).first().text().trim();
      if (text && text.length > 0) {
        return text;
      }
    } catch (e) {
      continue;
    }
  }
  
  return '';
}

export function experienceFrom(pageText) {
  // Look for experience patterns in text
  const expPatterns = [
    /(\d+)[\s-]*(?:to|-)[\s-]*(\d+)[\s-]*years?/i,
    /(\d+)\+?\s*years?\s*(?:of\s*)?experience/i,
    /experience:?\s*(\d+)[\s-]*(?:to|-)[\s-]*(\d+)[\s-]*years?/i,
    /(\d+)[\s-]*(\d+)[\s-]*years?\s*experience/i
  ];
  
  for (const pattern of expPatterns) {
    const match = pageText.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return '';
}

export function deadlineFrom($, pageText) {
  // Look for deadline/closing date patterns
  const datePatterns = [
    /(?:deadline|closes?|apply\s*by|last\s*date):?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
    /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/
  ];
  
  for (const pattern of datePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      try {
        return new Date(match[1]).toISOString();
      } catch (e) {
        continue;
      }
    }
  }
  
  // Try specific selectors
  const selectors = [
    '[data-testid*="deadline"]',
    '[class*="deadline"]',
    '[class*="closing"]',
    '.deadline',
    '.closing-date'
  ];
  
  for (const selector of selectors) {
    try {
      const text = $(selector).first().text().trim();
      if (text && text.length > 0) {
        try {
          return new Date(text).toISOString();
        } catch (e) {
          continue;
        }
      }
    } catch (e) {
      continue;
    }
  }
  
  return '';
}