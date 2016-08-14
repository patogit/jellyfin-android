function getStaticFileList(){return staticFileList?Promise.resolve(staticFileList):fetch("staticfiles").then(function(t){return t.json().then(function(t){return staticFileList=t,t})})}function isCacheable(t){if("GET"!==(t.method||"").toUpperCase())return!1;var e=t.url||"";return 0!=e.indexOf(baseUrl)?!1:0==e.indexOf(staticFileBaseUrl)?!1:!0}var staticFileCacheName="staticfiles",staticFileList,baseUrl=self.location.toString().substring(0,self.location.toString().lastIndexOf("/")),staticFileBaseUrl=baseUrl+"/staticfiles";self.addEventListener("install",function(t){t.waitUntil(caches.open(staticFileCacheName).then(function(t){return getStaticFileList().then(function(e){return t.addAll(e)})}))}),-1==self.location.toString().indexOf("localhost")&&self.addEventListener("fetch",function(t){isCacheable(t.request)&&t.respondWith(caches.open(staticFileCacheName).then(function(e){return e.match(t.request).then(function(n){return n||fetch(t.request).then(function(n){return e.put(t.request,n.clone()),n})})}))}),self.addEventListener("activate",function(t){t.waitUntil(caches.open(staticFileCacheName).then(function(t){return getStaticFileList().then(function(e){var n=new Set(e);return t.keys().then(function(e){var i=baseUrl+"/";return Promise.all(e.map(function(e){return n.has(e.url.replace(i,""))?void 0:t.delete(e)}))})})}).then(function(){return self.clients.claim()}))}),self.addEventListener("notificationclick",function(t){var e=t.notification;e.close();var n,i=e.data,a=(i.serverId,t.action);switch(a){case"cancel-install":{i.id}break;case"restart":break;default:clients.openWindow("/")}n=n||Promise.resolve(),t.waitUntil(n)},!1);