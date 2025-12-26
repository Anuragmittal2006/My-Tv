const DB_NAME = "iptv-db";
const STORE = "favorites";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getFavorites() {
  const db = await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.getAllKeys();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function toggleFavorite(id) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  const exists = await new Promise(res => {
    const r = store.get(id);
    r.onsuccess = () => res(!!r.result);
  });

  exists ? store.delete(id) : store.put(true, id);
}
