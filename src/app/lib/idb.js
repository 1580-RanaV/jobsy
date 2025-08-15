// lib/idb.js
export function openDB() {
  return new Promise((resolve, reject)=>{
    const req = indexedDB.open('app-tracker-db', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('jobs')) {
        const store = db.createObjectStore('jobs', { keyPath: 'id' });
        store.createIndex('by_url','url',{ unique: true });
      }
    };
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = ()=> reject(req.error);
  });
}
export function tx(db, mode='readonly'){ return db.transaction('jobs', mode).objectStore('jobs'); }
