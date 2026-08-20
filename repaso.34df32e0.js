// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"3dtlh":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "4b8ea06834df32e0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gH3Lb":[function(require,module,exports,__globalThis) {
var _index = require("./components/hand-option/index");
var _index1 = require("./components/countdown-circle/index");
var _index2 = require("./components/custom-button/index");
var _index3 = require("./components/game-title/index");
var _index4 = require("./components/result-star/index");
var _index5 = require("./components/score-board/index");
var _index6 = require("./pages/game/index");
var _index7 = require("./pages/instructions/index");
var _index8 = require("./pages/result/index");
var _index9 = require("./pages/welcome/index");
var _router = require("./router");
(0, _index.initHandOption)();
(0, _index1.initCountdownCircle)();
(0, _index2.initCustomButton)();
(0, _index3.initGameTitle)();
(0, _index4.initResultStar)();
(0, _index5.initScoreBoard)();
(0, _index6.initGamePage)();
(0, _index7.initInstructionsPage)();
(0, _index8.initResultPage)();
(0, _index9.initWelcomePage)();
const container = document.querySelector("#root");
(0, _router.initRouter)(container);

},{"./components/hand-option/index":"1W0ow","./components/countdown-circle/index":"haSle","./components/custom-button/index":"fiC3o","./components/game-title/index":"fvB9B","./components/result-star/index":"3SVKM","./components/score-board/index":"gRAKB","./pages/game/index":"lITg0","./pages/instructions/index":"4eg7C","./pages/result/index":"BWeXA","./pages/welcome/index":"cIpmw","./router":"4wVP1"}],"1W0ow":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initHandOption", ()=>initHandOption);
var _piedraPng = require("url:../../../assets/piedra.png");
var _piedraPngDefault = parcelHelpers.interopDefault(_piedraPng);
var _papelPng = require("url:../../../assets/papel.png");
var _papelPngDefault = parcelHelpers.interopDefault(_papelPng);
var _tijeraPng = require("url:../../../assets/tijera.png");
var _tijeraPngDefault = parcelHelpers.interopDefault(_tijeraPng);
const hands = {
    piedra: (0, _piedraPngDefault.default),
    papel: (0, _papelPngDefault.default),
    tijera: (0, _tijeraPngDefault.default)
};
function initHandOption() {
    class HandOption extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({
                mode: "open"
            });
            const type = this.getAttribute("type") || "piedra";
            const image = hands[type];
            shadow.innerHTML = `
            <style>
            :host {
                 display: block;
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: fill;
                cursor: pointer;
            }
            </style>
            <img src="${image}" alt="${type}"/>
            `;
            const imgEl = shadow.querySelector("img");
            imgEl?.addEventListener("click", ()=>{
                this.dispatchEvent(new CustomEvent("hand-click", {
                    detail: {
                        type
                    },
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
    customElements.define("hand-option", HandOption);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","url:../../../assets/piedra.png":"5qg02","url:../../../assets/papel.png":"2uxpM","url:../../../assets/tijera.png":"lJEL6"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5qg02":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("piedra.cfa222fb.png") + "?" + Date.now();

},{}],"2uxpM":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("papel.58e51d4f.png") + "?" + Date.now();

},{}],"lJEL6":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("tijera.f7370d26.png") + "?" + Date.now();

},{}],"haSle":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initCountdownCircle", ()=>initCountdownCircle);
function initCountdownCircle() {
    class CountdownCircle extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({
                mode: "open"
            });
            const seconds = Number(this.getAttribute("seconds")) || 3;
            shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 200px;
                    height: 200px;
                }

                svg {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <svg viewBox="0 0 100 100" >
                <circle cx="50" cy="50" r="45" stroke="#ccc" stroke-width="10" fill="none"/>
                <circle id="progress" cx="50" cy="50" r="45" stroke="#00f" stroke-width="10" fill="none"
                stroke-dasharray="282.743" stroke-dashoffset="282.743"/>
                <text x="50" y="55" text-anchor="middle" font-size="20" fill="#000">${seconds}</text>
            </svg>
            `;
            const progressCircle = shadow.getElementById("progress");
            const textElement = shadow.querySelector("text");
            const circumference = 2 * Math.PI * 45;
            const step = circumference / seconds;
            let currentSecond = seconds;
            const timer = setInterval(()=>{
                currentSecond--;
                if (currentSecond >= 0) {
                    textElement.textContent = currentSecond.toString();
                    progressCircle?.setAttribute("stroke-dashoffset", (circumference - step * (seconds - currentSecond)).toString());
                } else {
                    clearInterval(timer);
                    this.dispatchEvent(new CustomEvent("countdown-finished", {
                        bubbles: true,
                        composed: true
                    }));
                }
            }, 1000);
        }
    }
    customElements.define('countdown-circle', CountdownCircle);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fiC3o":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initCustomButton", ()=>initCustomButton);
function initCustomButton() {
    class CustomButton extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({
                mode: "open"
            });
            const type = this.getAttribute("type") || "button";
            shadow.innerHTML = `
            <style>
            button{
            background-color: #006CFC;
            width: 322px;
            height: 87px;
            border-radius: 10px;
            border: 10px solid #001997;
            font-family: "Odibee Sans", sans-serif;
            font-size: 45px;
            font-weight: 400;
            cursor: pointer;
            }
            </style>

            <button type="${type}">
              <slot></slot>
            </button>
            `;
        }
    }
    customElements.define("custom-button", CustomButton);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fvB9B":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initGameTitle", ()=>initGameTitle);
function initGameTitle() {
    class GameTitle extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({
                mode: "open"
            });
            const variant = this.getAttribute("variant") || "paragraph";
            let tag = "p";
            switch(variant){
                case "title":
                    tag = "h1";
                    break;
                case "subtitle":
                    tag = "h2";
                    break;
                case "txt":
                    tag = "h3";
                    break;
                default:
                    tag = "p";
            }
            shadow.innerHTML = `
            <style>
            .title{
                font-family: "Special Elite", system-ui;
                font-weight: 700;
                font-size: 80px;
                margin: 0;
                color: #009048;
                text-align: center;
            }
            .subtitle{
                font-family: "Special Elite", system-ui;
                font-weight: 600;
                font-size: 40px;
                margin: 0;
            }
            .paragraph{
                font-family: "Special Elite", system-ui;
                font-weight: 600;
                font-size: 55px;
                margin: 0;
                color: #FFFFFF; 
            }
            .txt{
                font-family: "Special Elite", system-ui;
                font-weight: 400;
                font-size: 45px;
                margin: 0;
            }
            </style>

            <${tag} class=${variant}>
            <slot></slot>
            </${tag}>
            `;
        }
    }
    customElements.define("game-title", GameTitle);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3SVKM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initResultStar", ()=>initResultStar);
var _star1Png = require("url:../../../assets/star1.png");
var _star1PngDefault = parcelHelpers.interopDefault(_star1Png);
var _star2Png = require("url:../../../assets/star2.png");
var _star2PngDefault = parcelHelpers.interopDefault(_star2Png);
const stars = {
    win: (0, _star1PngDefault.default),
    lose: (0, _star2PngDefault.default),
    draw: (0, _star2PngDefault.default)
};
const text = {
    win: "Ganaste",
    lose: "Perdiste",
    draw: "Empate"
};
function initResultStar() {
    class ResultStar extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({
                mode: "open"
            });
            const result = this.getAttribute("result") || "draw";
            const star = stars[result] || stars["draw"];
            const textResult = text[result] || text["draw"];
            shadow.innerHTML = `
                <style>
                    .result-star{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: center;
                        width: 255px;
                        height: 260px;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    game-title{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2;
                    }
                </style>

                <div class="result-star">
                    <img src="${star}" alt="${result}" />
                    <game-title variant="subtitle">${textResult}</game-title>
                </div>
            `;
        }
    }
    customElements.define("result-star", ResultStar);
}

},{"url:../../../assets/star1.png":"7Xgyl","url:../../../assets/star2.png":"3z25o","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7Xgyl":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("star1.b3b66519.png") + "?" + Date.now();

},{}],"3z25o":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("star2.a7157f30.png") + "?" + Date.now();

},{}],"gRAKB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initScoreBoard", ()=>initScoreBoard);
function initScoreBoard() {
    class ScoreBoard extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({
                mode: "open"
            });
            const playerScore = this.getAttribute("player-score") || "0";
            const computerScore = this.getAttribute("computer-score") || "0";
            shadow.innerHTML = `
            <style>
            .score-board{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 259px;
                height: 217px;
                background-color: white;
                border-radius: 10px;
                border: 10px solid #000000;
            }
            .score{
                display:flex;
                flex-direction: column;
                align-items: flex-end;
                padding: 20px;
            }
            </style>

            <div class="score-board">
                <game-title variant="title">Score</game-title>
                <div class="score">
                    <game-title variant="subtitle">Vos: ${playerScore}</game-title>
                    <game-title variant="subtitle">M\xe1quina: ${computerScore}</game-title>
                </div>
            </div>
            `;
        }
    }
    customElements.define("score-board", ScoreBoard);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lITg0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initGamePage", ()=>initGamePage);
var _state = require("../../state");
function initGamePage() {
    class GamePage extends HTMLElement {
        constructor(){
            super(), this.phase = "choosing", this.round = 1;
        }
        connectedCallback() {
            this.render();
            this.addEventListener("countdown-finished", ()=>{
                const plays = [
                    "piedra",
                    "papel",
                    "tijera"
                ];
                const randomIndex = Math.floor(Math.random() * plays.length);
                const computerPlay = plays[randomIndex];
                (0, _state.state).setComputerMove(computerPlay);
                this.phase = "showing-plays";
                this.render();
                setTimeout(()=>{
                    const currentState = (0, _state.state).getState();
                    (0, _state.state).pushToHistory({
                        myPlay: currentState.currentGame.myPlay,
                        computerPlay: currentState.currentGame.computerPlay
                    });
                    if (this.round < 3) {
                        this.round++;
                        this.phase = "choosing";
                        this.render();
                    } else this.goTo("/result");
                }, 2000);
            });
            this.addEventListener("hand-click", (event)=>{
                const customEvent = event;
                const handType = customEvent.detail.type;
                (0, _state.state).setMove(handType);
                const hands = this.querySelectorAll("hand-option");
                for (const hand of hands){
                    const type = hand.getAttribute("type");
                    if (type === handType) hand.classList.add("selected");
                    else hand.classList.add("not-selected");
                }
                this.phase = "selected";
            });
        }
        render() {
            const currentState = (0, _state.state).getState();
            const myPlay = currentState.currentGame?.myPlay;
            const computerPlay = currentState.currentGame?.computerPlay;
            if (this.phase === "showing-plays" && myPlay && computerPlay) this.innerHTML = `
                <style>
                .game-page{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100vh;
                    background:
                    radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                    #101010;
                }
                .computer-play{
                    transform: rotate(180deg);
                }
                hand-option {
                    width: 103px;
                    height: 235px;
                }
                </style>

                <div class="game-page">
                    <hand-option class="computer-play" type="${computerPlay}"></hand-option>
                    <hand-option class="my-play" type="${myPlay}"></hand-option>
                </div>
                `;
            else if (this.phase === "choosing") this.innerHTML = `
                <style>
                .game-page{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100vh;
                    background:
                    radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                    #101010;
                }
                countdown-circle{
                    margin-top: 150px;
                }
                .hand-options{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    width: 100%;
                }
                hand-option {
                    width: 103px;
                    height: 235px;
                    transition: transform 0.3s, opacity 0.3s;
                }
                hand-option.not-selected {
                    transform: scale(0.7);
                    opacity: 0.4;
                }

                hand-option.selected {
                    transform: scale(1);
                    opacity: 1;
                }
                </style>

                <div class="game-page">
                    <countdown-circle></countdown-circle>

                    <div class="hand-options">
                        <hand-option type="tijera"></hand-option>
                        <hand-option type="piedra"></hand-option>
                        <hand-option type="papel"></hand-option>
                    </div>
                </div>
                `;
            else if (this.phase === "selected" && myPlay) {
                const piedraClass = myPlay === "piedra" ? "selected" : "not-selected";
                const papelClass = myPlay === "papel" ? "selected" : "not-selected";
                const tijeraClass = myPlay === "tijera" ? "selected" : "not-selected";
                this.innerHTML = `
                <style>
                .game-page{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100vh;
                    background:
                    radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                    #101010;
                }
                .hand-options{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    width: 100%;
                }
                hand-option {
                    transition: transform 0.3s, opacity 0.3s;
                }

                hand-option.not-selected {
                    transform: scale(0.7);
                    opacity: 0.4;
                }

                hand-option.selected {
                    transform: scale(1);
                    opacity: 1;
                }
                </style>

                <div class="game-page">
                    <countdown-circle></countdown-circle>

                    <div class="hand-options">
                        <hand-option class="${tijeraClass}" type="tijera"></hand-option>
                        <hand-option class="${piedraClass}" type="piedra"></hand-option>
                        <hand-option class="${papelClass}" type="papel"></hand-option>
                    </div>
                </div>
                `;
            }
        }
    }
    customElements.define("game-page", GamePage);
}

},{"../../state":"dWXvP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dWXvP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
const state = {
    data: {
        currentGame: {
            computerPlay: null,
            myPlay: null
        },
        history: []
    },
    listeners: [],
    getState () {
        return this.data;
    },
    setState (newState) {
        this.data = newState;
        for (const cb of this.listeners)cb(this.data);
    },
    subscribe (callback) {
        const onChange = ()=>{
            callback(this.data);
        };
        this.listeners.push(onChange);
    },
    setMove (move) {
        const currentState = this.getState();
        currentState.currentGame.myPlay = move;
        this.setState(currentState);
    },
    setComputerMove (move) {
        const currentState = this.getState();
        currentState.currentGame.computerPlay = move;
        this.setState(currentState);
    },
    pushToHistory (play) {
        const currentState = this.getState();
        currentState.history.push(play);
        this.setState(currentState);
    },
    getScore () {
        let playerScore = 0;
        let computerScore = 0;
        for (const game of this.data.history)if (game.myPlay && game.computerPlay) {
            const result = this.whoWins(game.myPlay, game.computerPlay);
            if (result === "win") playerScore++;
            if (result === "lose") computerScore++;
        }
        return {
            playerScore,
            computerScore
        };
    },
    getResult () {
        const score = this.getScore();
        if (score.playerScore > score.computerScore) return "win";
        return "lose";
    },
    whoWins (myPlay, computerPlay) {
        const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";
        const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
        const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
        const gane = [
            ganeConPapel,
            ganeConPiedra,
            ganeConTijera
        ].includes(true);
        if (myPlay === computerPlay) return "draw";
        if (gane) return "win";
        return "lose";
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4eg7C":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initInstructionsPage", ()=>initInstructionsPage);
function initInstructionsPage() {
    class InstructionsPage extends HTMLElement {
        constructor(){
            super();
        }
        connectedCallback() {
            this.render();
            const button = this.querySelector("custom-button");
            button?.addEventListener("click", ()=>{
                this.goTo("/game");
            });
        }
        render() {
            this.innerHTML = `
            <style>
                .instruction-page{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    min-height: 100vh;
                    background:
                    radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                    #101010;
                }
                .scc{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    margin-top: 100px;
                }
                game-title{
                text-align: center;
                padding: 20px;
                }
                custom-button{
                padding: 20px;
                }
                .hand-options{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    width: 100%;
                }
            </style>

            <div class="instruction-page">
                <div class="scc">
                    <game-title varian="subtitle">Presion\xe1 jugar
                    y eleg\xed: piedra, papel o tijera antes de que pasen los 3 segundos.
                    </game-title>

                    <custom-button>\xa1Jugar!</custom-button>
                </div>

                <div class="hand-options">
                    <hand-option type="tijera"></hand-option>
                    <hand-option type="piedra"></hand-option>
                    <hand-option type="papel"></hand-option>
                </div>
            
            </div>
            `;
        }
    }
    customElements.define("instructions-page", InstructionsPage);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"BWeXA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initResultPage", ()=>initResultPage);
var _state = require("../../state");
function initResultPage() {
    class ResultPage extends HTMLElement {
        constructor(){
            super(), this.result = "lose";
        }
        connectedCallback() {
            this.render();
            const button = this.querySelector("custom-button");
            button?.addEventListener("click", ()=>{
                this.goTo("/game");
            });
        }
        render() {
            const score = (0, _state.state).getScore();
            const playerScore = score?.playerScore;
            const computerScore = score?.computerScore;
            const result = (0, _state.state).getResult();
            this.result = result;
            if (this.result === "win") this.innerHTML = `
                    <style>
                        .win-result{
                            width: 100%;
                            height: 100vh;
                            background-color: #888949E5;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                        }
                    </style>

                    <div class="win-result">

                        <result-star result="win"></result-star>

                        <score-board player-score="${playerScore}" computer-score="${computerScore}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>

                `;
            else if (this.result === "lose") this.innerHTML = `
                <style>
                        .lose-result{
                            width: 100%;
                            height: 100vh;
                            background-color: #894949E5;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                        }
                    </style>

                    <div class="lose-result">

                        <result-star result="lose"></result-star>

                        <score-board player-score="${playerScore}" computer-score="${computerScore}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>
                `;
        }
    }
    customElements.define("result-page", ResultPage);
}

},{"../../state":"dWXvP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cIpmw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initWelcomePage", ()=>initWelcomePage);
function initWelcomePage() {
    class WelcomePage extends HTMLElement {
        constructor(){
            super();
        }
        connectedCallback() {
            this.render();
            const button = this.querySelector("custom-button");
            button?.addEventListener("click", ()=>{
                this.goTo("/instructions");
            });
        }
        render() {
            this.innerHTML = `
        <style>
            .welcome-page{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                min-height: 100vh;
                background:
                radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                #101010;
            }
            .scc{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 50px;
                margin-top: 200px;
            }
            
            .hand-options{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                width: 100%;
                align-items: flex-end;
            }
            hand-option {
                width: 56px;
                height: 128px;
            }
        </style>

        <div class="welcome-page">

            <div class="scc">
                <game-title variant="title">Piedra, Papel \xf3 Tijera
                </game-title>

                <custom-button>Empezar</custom-button>
            </div>

            <div class="hand-options">
                <hand-option type="tijera"></hand-option>
                <hand-option type="piedra"></hand-option>
                <hand-option type="papel"></hand-option>
            </div>
        </div>
        `;
        }
    }
    customElements.define('welcome-page', WelcomePage);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4wVP1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRouter", ()=>initRouter);
const routes = [
    {
        path: /^\/$/,
        component: (props)=>{
            const el = document.createElement("welcome-page");
            el.goTo = props.goTo;
            return el;
        }
    },
    {
        path: /\/instruction/,
        component: (props)=>{
            const el = document.createElement("instructions-page");
            el.goTo = props.goTo;
            return el;
        }
    },
    {
        path: /\/game/,
        component: (props)=>{
            const el = document.createElement("game-page");
            el.goTo = props.goTo;
            return el;
        }
    },
    {
        path: /\/result/,
        component: (props)=>{
            const el = document.createElement("result-page");
            el.goTo = props.goTo;
            return el;
        }
    }
];
function initRouter(container) {
    function goTo(path) {
        history.pushState({}, "", path);
        handleRoute(path);
    }
    function handleRoute(route) {
        for (const r of routes)if (r.path.test(route)) {
            const el = r.component({
                goTo
            });
            if (container.firstChild) container.firstChild.remove();
            container.appendChild(el);
        }
    }
    handleRoute(location.pathname);
    window.onpopstate = ()=>{
        handleRoute(location.pathname);
    };
    return {
        goTo
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["3dtlh","gH3Lb"], "gH3Lb", "parcelRequirec517", {}, "./", "/")

//# sourceMappingURL=repaso.34df32e0.js.map
