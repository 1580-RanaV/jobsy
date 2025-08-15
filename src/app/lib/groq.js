// lib/groq.js
export async function groqFallback({ url, text }) {
  const prompt = `
You are given a job posting text. Return strict JSON with keys:
company, role, salaryText, experienceText, deadlineISO (ISO string or empty), url.
Do not invent dates if not present.

TEXT:
${text.slice(0, 12000)}
  `.trim();

  const key = process.env.GROQ_API_KEY;
  if (!key) return {};
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages:[{role:'user', content: prompt}],
      temperature: 0,
      response_format: { type: 'json_object' }
    })
  });
  const j = await r.json();
  try { return JSON.parse(j.choices?.[0]?.message?.content || '{}'); } catch { return {}; }
}
