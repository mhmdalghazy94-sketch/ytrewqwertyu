const CACHE_NAME = "itqan-shell-v34";
const APP_FILES = [
	"./",
	"./index.html",
	"./style.css",
	"./main.js",
	"./firebase-sync.js?v=34",
	"./lesson-interactions.js",
	"./quiz-lesson-1.js",
	"./english-questions.js",
	"./english-game.js",
	"./student-features.js",
	"./manifest.webmanifest",
	"./app-icon.svg"
];

self.addEventListener("install", (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
	event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((name) => name.startsWith("itqan-") && name !== CACHE_NAME).map((name) => caches.delete(name)))).then(() => self.clients.claim()));
});

self.addEventListener("message", (event) => {
	if (event.data?.type !== "CACHE_LESSON_RESOURCES") return;
	const port = event.ports[0];
	event.waitUntil(caches.open(CACHE_NAME).then(async (cache) => {
		const results = [];
		for (const resource of event.data.resources || []) {
			try {
				const url = new URL(resource, self.location.href);
				if (url.origin !== self.location.origin) throw new Error("المورد من مصدر خارجي.");
				const response = await fetch(url.href);
				if (!response.ok) throw new Error(`حالة HTTP ${response.status}`);
				await cache.put(url.href, response);
				results.push({ url: resource, cached: true });
			} catch (error) {
				results.push({ url: resource, cached: false, error: error.message });
			}
		}
		port?.postMessage(results);
	}));
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
	event.respondWith(caches.match(event.request).then((cached) => {
		if (cached) return cached;
		return fetch(event.request).then((response) => {
			if (!response.ok) return response;
			const clone = response.clone();
			caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
			return response;
		}).catch(() => {
			if (event.request.mode === "navigate") return caches.match("./index.html");
			throw new Error("المورد غير مخزن ولا يمكن الوصول إلى الشبكة.");
		});
	}));
});
