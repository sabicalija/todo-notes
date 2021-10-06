const version = "v1.0.0-beta.5";
const base = "/todo-notes";
const assetUrls = [
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/browserconfig.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/manifest.json",
  "/mstile-70x70.png",
  "/mstile-144x144.png",
  "/mstile-150x150.png",
  "/mstile-310x150.png",
  "/safari-pinned-tab.svg",
].map((entry) => "/assets/favicon" + entry);
const urls = ["/", "/style.css", "/index.mvc.js", "/favicon.svg", ...assetUrls].map((entry) => base + entry);

self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
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
