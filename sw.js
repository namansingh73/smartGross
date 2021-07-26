const staticAssest = [
    './',
    '/img/cookingOil.jpg',
    '/img/coriander.jpg',
    '/img/flour.jpg',
    '/img/jam.jpg',
    '/img/onions.jpg',
    '/img/potato.jpg',
    '/img/salt.jpg',
    '/img/soup.jpg',
    '/index.css',
    '/index.js',
    '/manifest.json',
    '/public/img/gross.png'
];


self.addEventListener('install',async evt=>{
    const cache = await caches.open('gross-static');
    cache.addAll(staticAssest);
});

self.addEventListener('activate',evt=>{
    console.log("Activate");
});

self.addEventListener('fetch',event=>{
    const req = event.request;
    const url = new URL(req.url);
    if(url.origin ===location.origin)
    {
        event.respondWith(cacheFirst(req));
    }
    else
    {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req){
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function cacheFirst(req){
    const cache = await caches.open('gross-dynamic');
    try{
        const res = await fetch(req);
        cache.put(req,res.clone());
        return res;
    }catch(error)
    {
        return await cache.match(req);
    }
}