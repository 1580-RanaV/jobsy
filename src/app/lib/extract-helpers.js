// lib/extract-helpers.js
export function guessCompanyFromDomain(urlStr){
  try {
    const u = new URL(urlStr); const host = u.hostname.replace(/^www\./,'');
    const base = host.split('.').slice(-2)[0];
    return base.charAt(0).toUpperCase()+base.slice(1);
  } catch { return ''; }
}

export function extractSalary(text){
  const m = text.match(/(?:₹|Rs\.?|INR|\$|USD|€)\s?[\d,]+(?:\s*-\s*|\s*to\s*)?(?:₹|Rs\.?|INR|\$|USD|€)?\s?[\d,]*/i);
  return m ? m[0].replace(/\s+/g,' ').trim() : '';
}

export function extractExperience(text){
  const m = text.match(/(\d+)\s*(?:\+|–|-|to)\s*(\d+)?\s*(?:yrs?|years)/i) || text.match(/(\d+)\s*\+?\s*(?:yrs?|years)/i);
  return m ? m[0].replace(/\s+/g,' ').trim() : '';
}

export function extractDeadline(text){
  const m = text.match(/(apply by|last date|deadline|closing|closes on)\s*[:\-]?\s*([A-Za-z0-9 ,\-\/]+)/i);
  if (!m) return '';
  const dateGuess = Date.parse(m[2]);
  return Number.isNaN(dateGuess) ? '' : new Date(dateGuess).toISOString();
}
