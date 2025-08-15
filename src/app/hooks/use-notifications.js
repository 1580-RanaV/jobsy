// hooks/use-notifications.js
'use client';
import { useEffect, useState } from 'react';

export function useNotifications() {
  const [permission, setPerm] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');
  function request(){ Notification.requestPermission().then(p=>setPerm(p)); }
  useEffect(()=>{
    // fire “1 day prior at 09:00 IST” only when tab is open; check on focus
    function onFocus(){ /* compute and fire notifications for due-tomorrow */ }
    window.addEventListener('focus', onFocus);
    return ()=> window.removeEventListener('focus', onFocus);
  },[]);
  return { permission, request };
}
