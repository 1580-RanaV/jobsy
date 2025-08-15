// lib/url-heuristics.js
const BLOCK = ['linkedin.com','indeed.com','naukri.com','foundit.in','glassdoor.com','monster.com','ziprecruiter.com'];
const ATS = ['greenhouse.io','lever.co','workable.com','ashbyhq.com'];
export function isLikelyJobDomain(urlStr){
  try {
    const u = new URL(urlStr);
    const host = u.hostname;
    if (BLOCK.some(b=>host.endsWith(b))) return false;
    if (ATS.some(a=>host.endsWith(a))) return true;
    // company domains: allow by default
    return true;
  } catch { return false; }
}
