// lib/jobs-store.js
import { openDB, tx } from './idb';
import { decorateDeadline } from './time';

export async function addOrMerge(job) {
  const db = await openDB();
  return new Promise((resolve,reject)=>{
    const store = tx(db,'readwrite');
    const idx = store.index('by_url');
    const req = idx.get(job.url);
    req.onsuccess = ()=>{
      const existing = req.result;
      const now = Date.now();
      const base = decorateDeadline({ ...job, createdAt: existing?.createdAt||now, id: existing?.id||crypto.randomUUID() });
      const final = existing ? { ...existing, ...base } : base;
      const put = store.put(final);
      put.onsuccess = ()=> resolve(final);
      put.onerror = ()=> reject(put.error);
    };
    req.onerror = ()=> reject(req.error);
  });
}

export async function allJobs() {
  const db = await openDB();
  return new Promise((resolve,reject)=>{
    const store = tx(db);
    const req = store.getAll();
    req.onsuccess = ()=> resolve(req.result.map(decorateDeadline));
    req.onerror = ()=> reject(req.error);
  });
}

export async function updateJob(job) {
  const db = await openDB();
  const store = tx(db,'readwrite');
  job = decorateDeadline(job);
  await new Promise((res,rej)=>{ const r=store.put(job); r.onsuccess=res; r.onerror=()=>rej(r.error); });
  return job;
}

export async function deleteJob(id) {
  const db = await openDB();
  const store = tx(db,'readwrite');
  await new Promise((res,rej)=>{ const r=store.delete(id); r.onsuccess=res; r.onerror=()=>rej(r.error); });
}
