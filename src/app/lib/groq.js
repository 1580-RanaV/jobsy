// server-only
import { Groq } from 'groq-sdk';

export function groqClient() {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('Missing GROQ_API_KEY in .env.local');
  return new Groq({ apiKey: key });
}
