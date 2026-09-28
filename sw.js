/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "wllama.wasm",
    "revision": "fea977e57276d93178e7c6a7bb38c418"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "2b997e54174150109a6cadd94e41a1d0"
  }, {
    "url": "pwa-512x512.png",
    "revision": "348a02e42a05cffba101910cd5a05dcd"
  }, {
    "url": "pwa-192x192.png",
    "revision": "5d9b91e08238e0ba09c0b07f8d087ffe"
  }, {
    "url": "index.html",
    "revision": "93679a3c4fc5d3e7fec80750d3629cbe"
  }, {
    "url": "icon.svg",
    "revision": "17d2b2c0295ab0ba10f014f6e05be901"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "1f10249b08b96dc0572eaf039669fefd"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-Ne5w-PmM.js",
    "revision": null
  }, {
    "url": "assets/index-DraKuo0h.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "1f10249b08b96dc0572eaf039669fefd"
  }, {
    "url": "icon.svg",
    "revision": "17d2b2c0295ab0ba10f014f6e05be901"
  }, {
    "url": "pwa-192x192.png",
    "revision": "5d9b91e08238e0ba09c0b07f8d087ffe"
  }, {
    "url": "pwa-512x512.png",
    "revision": "348a02e42a05cffba101910cd5a05dcd"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "2b997e54174150109a6cadd94e41a1d0"
  }, {
    "url": "manifest.webmanifest",
    "revision": "b28a872a137b1ab544cf05c722898200"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
