// lib/time.js
const IST_OFFSET_MIN = 330;

export function decorateDeadline(job){
  const d = parseISO(job.deadlineISO);
  const now = Date.now();
  let badge='ok', text='', eta=null;
  if (d) {
    const ms = d - now;
    const days = Math.floor(ms/86400000);
    if (ms < 0) { badge='overdue'; text=`Overdue (${formatDate(d)})`; }
    else if (days <= 3) { badge='due'; text= days===0? 'Due today' : `Due in ${days} day${days>1?'s':''}`; }
    else { badge='ok'; text=formatDate(d); }
    eta = days;
  }
  return { ...job, deadlineBadge: badge, deadlineText: text, deadlineEtaDays: eta };
}

export function parseISO(s){
  if (!s) return null;
  const t = Date.parse(s);
  return Number.isNaN(t) ? null : t;
}

export function formatDate(t){
  const d = new Date(t);
  return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

export function computeAlerts(jobs){
  const out=[];
  for (const j of jobs) {
    if (j.deadlineBadge==='due') {
      const days = j.deadlineEtaDays ?? 0;
      if (days===1) out.push({ type:'warn', title:`Due tomorrow: ${j.role} @ ${j.company}`, anchorId:j.id });
      if (days===2) out.push({ type:'warn', title:`Apply to ${j.role} @ ${j.company} — due in 2 days.`, anchorId:j.id });
    }
    if (j.deadlineBadge==='overdue') {
      out.push({ type:'danger', title:`Overdue: ${j.role} @ ${j.company} closed`, anchorId:j.id });
    }
  }
  return out;
}
