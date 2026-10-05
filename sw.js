// Funciona sin internet una vez abierto. Para publicar cambios, subí el número de versión.
const V='juegos-gio-v2';
const FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    const u=e.request.url; if(res.ok||u.includes('fonts.g')){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));}
    return res;}).catch(()=>caches.match('index.html'))));
});
