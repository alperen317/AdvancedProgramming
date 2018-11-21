//Version

var appVersion = 'v1.00'



//Fetch to cache
var files=[

  './',
  './index.html',
  './cw7.html'



]



//Install
self.addEventListener('install',event=> {
	
	event.waitUntil(
	   caches.open(appVersion)
	   .then(cache=>{
		   return cache.addAll(files)
		   .catch(err=>{
			   console.err('Error adding files to cache',err)
			   
		   })
		   
	   })
	)
	console.info('SW Installed')
	self.skipWaiting();
})


//Active
self.addEventListener('active',event=>{
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
			   cacheNames.map(cache => {
				   if(cache !== appVersion){
					   console.info('Deleting Old Cache',cache)
					   return caches.delete(cache);
				   }
			   })
			)
		})
	)
	return self.clients.claim();
})



//self
self.addEventListener('fetch', event=> {
	console.info('SW fetch',event.request.url);
	event.respondWith(
	 caches.match(event.request)
	 .then(res =>{
		 return res || fetch(event.request)   
	 })
	)
})



//Fetch