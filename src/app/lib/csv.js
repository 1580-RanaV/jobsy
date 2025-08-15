// lib/csv.js
export function toCSV(rows){
  const cols = ['company','role','salaryText','experienceText','deadlineText','applied','url','createdAt'];
  const head = cols.join(',');
  const lines = rows.map(r=> cols.map(c=> csvCell(r[c])).join(','));
  return [head, ...lines].join('\n');
}
function csvCell(v){
  if (v==null) return '';
  const s = String(v).replace(/"/g,'""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}
