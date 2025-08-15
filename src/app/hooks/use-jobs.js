// hooks/use-jobs.js
'use client';
import { useEffect, useState, useCallback } from 'react';
import * as store from '@/app/lib/jobs-store';

export function useJobs() {
  const [jobs,setJobs] = useState([]);
  const [hydrated,setHydrated] = useState(false);
  const [search,setSearch] = useState('');
  const [filters,setFilters] = useState('all');

  const refresh = useCallback(async()=> {
    const all = await store.allJobs();
    setJobs(all);
    setHydrated(true);
  },[]);

  useEffect(()=>{ refresh(); }, [refresh]);

  useEffect(()=>{
    const add = async e => { await store.addOrMerge(e.detail); refresh(); };
    const upd = async e => { await store.updateJob(e.detail); refresh(); };
    const del = async e => { await store.deleteJob(e.detail.id); refresh(); };
    const undo= async e => { await store.updateJob(e.detail); refresh(); };
    add && window.addEventListener('jobs:add', add);
    upd && window.addEventListener('jobs:update', upd);
    del && window.addEventListener('jobs:delete', del);
    undo&& window.addEventListener('jobs:undo-delete', undo);
    return ()=>{
      window.removeEventListener('jobs:add', add);
      window.removeEventListener('jobs:update', upd);
      window.removeEventListener('jobs:delete', del);
      window.removeEventListener('jobs:undo-delete', undo);
    };
  }, [refresh]);

  function toggleApplied(id){
    const j = jobs.find(x=>x.id===id);
    if (!j) return;
    window.dispatchEvent(new CustomEvent('jobs:update', { detail: {...j, applied: !j.applied} }));
  }

  return { jobs, hydrated, search, setSearch, filters, setFilters, toggleApplied };
}
