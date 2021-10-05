const version = "v1.0.0-beta.0";
const urls = ["/", "/style.css", "/index.mvc.js", "/favicon.svg", "/favicon.ico"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urls);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const keep = [version];
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (keep.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
