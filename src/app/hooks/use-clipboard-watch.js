// hooks/use-clipboard-watch.js
'use client';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { isLikelyJobDomain } from '@/app/lib/url-heuristics';

export function useClipboardWatch() {
  const [watching, setWatching] = useState(false);
  const last = useRef('');
  useEffect(()=>{
    if (!watching) return;
    let t = null;
    const loop = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const txt = await navigator.clipboard.readText();
        if (txt && txt !== last.current && /^https?:\/\//i.test(txt) && isLikelyJobDomain(txt)) {
          last.current = txt;
          const r = await fetch('/api/extract?url='+encodeURIComponent(txt));
          if (r.ok) {
            const data = await r.json();
            window.dispatchEvent(new CustomEvent('jobs:add', { detail: data }));
            toast.success('Saved from clipboard.');
          }
        }
      } catch {
        toast.error('Clipboard blocked — click ‘Enable Clipboard Watch’ again.');
        setWatching(false);
      }
    };
    t = setInterval(loop, 3000);
    return ()=> clearInterval(t);
  }, [watching]);
  return { watching, toggle: ()=>setWatching(v=>!v) };
}
