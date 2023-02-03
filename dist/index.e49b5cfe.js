// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
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

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
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
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

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

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jy5Bl":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d207d595e49b5cfe";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
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
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
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
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"hulwz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _guitartunerMjs = require("../dist/guitartuner.mjs");
var _guitartunerMjsDefault = parcelHelpers.interopDefault(_guitartunerMjs);
const guitarTuner = new _guitartunerMjsDefault.default();
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
startButton.addEventListener("click", ()=>{
    guitarTuner.start();
});
stopButton.addEventListener("click", ()=>{
    guitarTuner.stop();
});
guitarTuner.setCallback(function(frequency, note) {
    console.log(frequency, note);
});

},{"../dist/guitartuner.mjs":"8Oqwl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8Oqwl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>$fcbdc18d8cf91bb6$export$2e2bcd8739ae039
);
var _helpers = require("@swc/helpers");
var _rms = /*#__PURE__*/ new WeakSet(), _startPosition = /*#__PURE__*/ new WeakSet(), _endPosition = /*#__PURE__*/ new WeakSet();
class $b98cf007752bba5c$var$Autocorrelation {
    // Using the strategy defined here.
    // https://github.com/cwilso/PitchDetect/pull/23
    execute() {
        // Reject if RMS is too small.
        const rms1 = _helpers.classPrivateMethodGet(this, _rms, rms).call(this, this.buffer);
        if (rms1 < 0.05) return -1;
        // Trim the buffer so that it starts and ends at "zero".
        const startPosition1 = _helpers.classPrivateMethodGet(this, _startPosition, startPosition).call(this, this.buffer, 0.2);
        const endPosition1 = _helpers.classPrivateMethodGet(this, _endPosition, endPosition).call(this, this.buffer, 0.2);
        this.buffer = this.buffer.slice(startPosition1, endPosition1);
        // Take the dot product of the offsets
        var c = new Array(this.buffer.length).fill(0);
        for(var i = 0; i < this.buffer.length; i++)for(var j = 0; j < this.buffer.length - i; j++)c[i] = c[i] + this.buffer[j] * this.buffer[j + i];
        // Find the maximum value and its position
        var d = 0;
        while(c[d] > c[d + 1])d++;
        var maxval = -1, maxpos = -1;
        for(var i = d; i < this.buffer.length; i++)if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
        var T0 = maxpos;
        // Some type of smoothing
        // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
        var x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);
        // Return the frequency / pitch
        return this.sampleRate / T0;
    }
    constructor(buffer, sampleRate){
        _helpers.classPrivateMethodInit(this, _rms);
        _helpers.classPrivateMethodInit(this, _startPosition);
        _helpers.classPrivateMethodInit(this, _endPosition);
        this.buffer = buffer;
        this.sampleRate = sampleRate;
    }
}
function rms(array) {
    const squares = array.map((value)=>value * value
    );
    const sum = squares.reduce((accumulator, value)=>accumulator + value
    );
    const mean = sum / array.length;
    return Math.sqrt(mean);
}
function startPosition(array, threshold) {
    for(var i = 0; i < array.length / 2; i++){
        if (Math.abs(array[i]) < threshold) return i;
    }
}
function endPosition(array, threshold) {
    for(var i = 1; i < array.length / 2; i++){
        if (Math.abs(array[array.length - i]) < threshold) return array.length - i;
    }
}
var $b98cf007752bba5c$export$2e2bcd8739ae039 = $b98cf007752bba5c$var$Autocorrelation;
var _stream = /*#__PURE__*/ new WeakMap(), _audioContext = /*#__PURE__*/ new WeakMap(), _mediaStreamSource = /*#__PURE__*/ new WeakMap(), _analyser = /*#__PURE__*/ new WeakMap(), _fft_size = /*#__PURE__*/ new WeakMap(), _notes = /*#__PURE__*/ new WeakMap(), _requestMicrophoneAccess = /*#__PURE__*/ new WeakSet(), _createAnalyser = /*#__PURE__*/ new WeakSet(), _draw = /*#__PURE__*/ new WeakSet(), _frequencyToNote = /*#__PURE__*/ new WeakSet();
class $fcbdc18d8cf91bb6$var$GuitarTuner {
    start() {
        _helpers.classPrivateMethodGet(this, _requestMicrophoneAccess, requestMicrophoneAccess).call(this);
    }
    stop() {
        const recorder = new MediaRecorder(_helpers.classPrivateFieldGet(this, _stream));
        recorder.stream.getAudioTracks().forEach(function(track) {
            track.stop();
        });
    }
    setCallback(callback) {
        this.callback = callback;
    }
    constructor(){
        _helpers.classPrivateMethodInit(this, _requestMicrophoneAccess);
        _helpers.classPrivateMethodInit(this, _createAnalyser);
        _helpers.classPrivateMethodInit(this, _draw);
        _helpers.classPrivateMethodInit(this, _frequencyToNote);
        _helpers.classPrivateFieldInit(this, _stream, {
            writable: true,
            value: void 0
        });
        _helpers.classPrivateFieldInit(this, _audioContext, {
            writable: true,
            value: void 0
        });
        _helpers.classPrivateFieldInit(this, _mediaStreamSource, {
            writable: true,
            value: void 0
        });
        _helpers.classPrivateFieldInit(this, _analyser, {
            writable: true,
            value: void 0
        });
        _helpers.classPrivateFieldInit(this, _fft_size, {
            writable: true,
            value: 2048
        });
        _helpers.classPrivateFieldInit(this, _notes, {
            writable: true,
            value: [
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B"
            ]
        });
    }
}
function requestMicrophoneAccess() {
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    }).then((stream)=>{
        _helpers.classPrivateFieldSet(this, _stream, stream);
        _helpers.classPrivateMethodGet(this, _createAnalyser, createAnalyser).call(this);
        _helpers.classPrivateMethodGet(this, _draw, draw).call(this);
    }).catch((error)=>{
        console.log(error);
    });
}
function createAnalyser() {
    _helpers.classPrivateFieldSet(this, _audioContext, new AudioContext());
    _helpers.classPrivateFieldSet(this, _mediaStreamSource, _helpers.classPrivateFieldGet(this, _audioContext).createMediaStreamSource(_helpers.classPrivateFieldGet(this, _stream)));
    _helpers.classPrivateFieldSet(this, _analyser, _helpers.classPrivateFieldGet(this, _audioContext).createAnalyser());
    _helpers.classPrivateFieldGet(this, _analyser).fftSize = _helpers.classPrivateFieldGet(this, _fft_size);
    _helpers.classPrivateFieldGet(this, _mediaStreamSource).connect(_helpers.classPrivateFieldGet(this, _analyser));
}
function draw() {
    requestAnimationFrame(()=>{
        _helpers.classPrivateMethodGet(this, _draw, draw).call(this);
    });
    const bufferLength = _helpers.classPrivateFieldGet(this, _analyser).fftSize;
    const buffer = new Float32Array(bufferLength);
    _helpers.classPrivateFieldGet(this, _analyser).getFloatTimeDomainData(buffer);
    const sampleRate = _helpers.classPrivateFieldGet(this, _audioContext).sampleRate;
    const autocorrelation = new $b98cf007752bba5c$export$2e2bcd8739ae039(buffer, sampleRate);
    const frequency = autocorrelation.execute();
    if (frequency === -1) return;
    const note = _helpers.classPrivateMethodGet(this, _frequencyToNote, frequencyToNote).call(this, frequency);
    if (typeof this.callback === "function") this.callback(frequency, note);
}
function frequencyToNote(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return _helpers.classPrivateFieldGet(this, _notes)[(Math.round(noteNum) + 69) % 12];
}
var $fcbdc18d8cf91bb6$export$2e2bcd8739ae039 = $fcbdc18d8cf91bb6$var$GuitarTuner;

},{"@swc/helpers":"6Uysx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Uysx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyDecoratedDescriptor", ()=>_applyDecoratedDescriptorDefault.default
);
parcelHelpers.export(exports, "arrayLikeToArray", ()=>_arrayLikeToArrayDefault.default
);
parcelHelpers.export(exports, "arrayWithHoles", ()=>_arrayWithHolesDefault.default
);
parcelHelpers.export(exports, "arrayWithoutHoles", ()=>_arrayWithoutHolesDefault.default
);
parcelHelpers.export(exports, "assertThisInitialized", ()=>_assertThisInitializedDefault.default
);
parcelHelpers.export(exports, "asyncGenerator", ()=>_asyncGeneratorDefault.default
);
parcelHelpers.export(exports, "asyncGeneratorDelegate", ()=>_asyncGeneratorDelegateDefault.default
);
parcelHelpers.export(exports, "asyncIterator", ()=>_asyncIteratorDefault.default
);
parcelHelpers.export(exports, "asyncToGenerator", ()=>_asyncToGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitAsyncGenerator", ()=>_awaitAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitValue", ()=>_awaitValueDefault.default
);
parcelHelpers.export(exports, "checkPrivateRedeclaration", ()=>_checkPrivateRedeclarationDefault.default
);
parcelHelpers.export(exports, "classApplyDescriptorDestructureSet", ()=>_classApplyDescriptorDestructureDefault.default
);
parcelHelpers.export(exports, "classApplyDescriptorGet", ()=>_classApplyDescriptorGetDefault.default
);
parcelHelpers.export(exports, "classApplyDescriptorSet", ()=>_classApplyDescriptorSetDefault.default
);
parcelHelpers.export(exports, "classCallCheck", ()=>_classCallCheckDefault.default
);
parcelHelpers.export(exports, "classCheckPrivateStaticFieldDescriptor", ()=>_classCheckPrivateStaticFieldDescriptorDefault.default
);
parcelHelpers.export(exports, "classCheckPrivateStaticAccess", ()=>_classCheckPrivateStaticAccessDefault.default
);
parcelHelpers.export(exports, "classNameTDZError", ()=>_classNameTdzErrorDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldDestructureSet", ()=>_classPrivateFieldDestructureDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldGet", ()=>_classPrivateFieldGetDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldInit", ()=>_classPrivateFieldInitDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldLooseBase", ()=>_classPrivateFieldLooseBaseDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldLooseKey", ()=>_classPrivateFieldLooseKeyDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldSet", ()=>_classPrivateFieldSetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodGet", ()=>_classPrivateMethodGetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodInit", ()=>_classPrivateMethodInitDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodSet", ()=>_classPrivateMethodSetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldDestructureSet", ()=>_classStaticPrivateFieldDestructureDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecGet", ()=>_classStaticPrivateFieldSpecGetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecSet", ()=>_classStaticPrivateFieldSpecSetDefault.default
);
parcelHelpers.export(exports, "construct", ()=>_constructDefault.default
);
parcelHelpers.export(exports, "createClass", ()=>_createClassDefault.default
);
parcelHelpers.export(exports, "createSuper", ()=>_createSuperDefault.default
);
parcelHelpers.export(exports, "decorate", ()=>_decorateDefault.default
);
parcelHelpers.export(exports, "defaults", ()=>_defaultsDefault.default
);
parcelHelpers.export(exports, "defineEnumerableProperties", ()=>_defineEnumerablePropertiesDefault.default
);
parcelHelpers.export(exports, "defineProperty", ()=>_definePropertyDefault.default
);
parcelHelpers.export(exports, "extends", ()=>_extendsDefault.default
);
parcelHelpers.export(exports, "get", ()=>_getDefault.default
);
parcelHelpers.export(exports, "getPrototypeOf", ()=>_getPrototypeOfDefault.default
);
parcelHelpers.export(exports, "inherits", ()=>_inheritsDefault.default
);
parcelHelpers.export(exports, "inheritsLoose", ()=>_inheritsLooseDefault.default
);
parcelHelpers.export(exports, "initializerDefineProperty", ()=>_initializerDefinePropertyDefault.default
);
parcelHelpers.export(exports, "initializerWarningHelper", ()=>_initializerWarningHelperDefault.default
);
parcelHelpers.export(exports, "_instanceof", ()=>_instanceofDefault.default
);
parcelHelpers.export(exports, "interopRequireDefault", ()=>_interopRequireDefaultDefault.default
);
parcelHelpers.export(exports, "interopRequireWildcard", ()=>_interopRequireWildcardDefault.default
);
parcelHelpers.export(exports, "isNativeFunction", ()=>_isNativeFunctionDefault.default
);
parcelHelpers.export(exports, "isNativeReflectConstruct", ()=>_isNativeReflectConstructDefault.default
);
parcelHelpers.export(exports, "iterableToArray", ()=>_iterableToArrayDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimit", ()=>_iterableToArrayLimitDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimitLoose", ()=>_iterableToArrayLimitLooseDefault.default
);
parcelHelpers.export(exports, "jsx", ()=>_jsxDefault.default
);
parcelHelpers.export(exports, "newArrowCheck", ()=>_newArrowCheckDefault.default
);
parcelHelpers.export(exports, "nonIterableRest", ()=>_nonIterableRestDefault.default
);
parcelHelpers.export(exports, "nonIterableSpread", ()=>_nonIterableSpreadDefault.default
);
parcelHelpers.export(exports, "objectSpread", ()=>_objectSpreadDefault.default
);
parcelHelpers.export(exports, "objectWithoutProperties", ()=>_objectWithoutPropertiesDefault.default
);
parcelHelpers.export(exports, "objectWithoutPropertiesLoose", ()=>_objectWithoutPropertiesLooseDefault.default
);
parcelHelpers.export(exports, "possibleConstructorReturn", ()=>_possibleConstructorReturnDefault.default
);
parcelHelpers.export(exports, "readOnlyError", ()=>_readOnlyErrorDefault.default
);
parcelHelpers.export(exports, "set", ()=>_setDefault.default
);
parcelHelpers.export(exports, "setPrototypeOf", ()=>_setPrototypeOfDefault.default
);
parcelHelpers.export(exports, "skipFirstGeneratorNext", ()=>_skipFirstGeneratorNextDefault.default
);
parcelHelpers.export(exports, "slicedToArray", ()=>_slicedToArrayDefault.default
);
parcelHelpers.export(exports, "slicedToArrayLoose", ()=>_slicedToArrayLooseDefault.default
);
parcelHelpers.export(exports, "superPropBase", ()=>_superPropBaseDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteral", ()=>_taggedTemplateLiteralDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteralLoose", ()=>_taggedTemplateLiteralLooseDefault.default
);
parcelHelpers.export(exports, "_throw", ()=>_throwDefault.default
);
parcelHelpers.export(exports, "toArray", ()=>_toArrayDefault.default
);
parcelHelpers.export(exports, "toConsumableArray", ()=>_toConsumableArrayDefault.default
);
parcelHelpers.export(exports, "toPrimitive", ()=>_toPrimitiveDefault.default
);
parcelHelpers.export(exports, "toPropertyKey", ()=>_toPropertyKeyDefault.default
);
parcelHelpers.export(exports, "typeOf", ()=>_typeOfDefault.default
);
parcelHelpers.export(exports, "unsupportedIterableToArray", ()=>_unsupportedIterableToArrayDefault.default
);
parcelHelpers.export(exports, "wrapAsyncGenerator", ()=>_wrapAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "wrapNativeSuper", ()=>_wrapNativeSuperDefault.default
);
var _applyDecoratedDescriptor = require("./_apply_decorated_descriptor");
var _applyDecoratedDescriptorDefault = parcelHelpers.interopDefault(_applyDecoratedDescriptor);
var _arrayLikeToArray = require("./_array_like_to_array");
var _arrayLikeToArrayDefault = parcelHelpers.interopDefault(_arrayLikeToArray);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
var _asyncGeneratorDelegate = require("./_async_generator_delegate");
var _asyncGeneratorDelegateDefault = parcelHelpers.interopDefault(_asyncGeneratorDelegate);
var _asyncIterator = require("./_async_iterator");
var _asyncIteratorDefault = parcelHelpers.interopDefault(_asyncIterator);
var _asyncToGenerator = require("./_async_to_generator");
var _asyncToGeneratorDefault = parcelHelpers.interopDefault(_asyncToGenerator);
var _awaitAsyncGenerator = require("./_await_async_generator");
var _awaitAsyncGeneratorDefault = parcelHelpers.interopDefault(_awaitAsyncGenerator);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
var _checkPrivateRedeclaration = require("./_check_private_redeclaration");
var _checkPrivateRedeclarationDefault = parcelHelpers.interopDefault(_checkPrivateRedeclaration);
var _classApplyDescriptorDestructure = require("./_class_apply_descriptor_destructure");
var _classApplyDescriptorDestructureDefault = parcelHelpers.interopDefault(_classApplyDescriptorDestructure);
var _classApplyDescriptorGet = require("./_class_apply_descriptor_get");
var _classApplyDescriptorGetDefault = parcelHelpers.interopDefault(_classApplyDescriptorGet);
var _classApplyDescriptorSet = require("./_class_apply_descriptor_set");
var _classApplyDescriptorSetDefault = parcelHelpers.interopDefault(_classApplyDescriptorSet);
var _classCallCheck = require("./_class_call_check");
var _classCallCheckDefault = parcelHelpers.interopDefault(_classCallCheck);
var _classCheckPrivateStaticFieldDescriptor = require("./_class_check_private_static_field_descriptor");
var _classCheckPrivateStaticFieldDescriptorDefault = parcelHelpers.interopDefault(_classCheckPrivateStaticFieldDescriptor);
var _classCheckPrivateStaticAccess = require("./_class_check_private_static_access");
var _classCheckPrivateStaticAccessDefault = parcelHelpers.interopDefault(_classCheckPrivateStaticAccess);
var _classNameTdzError = require("./_class_name_tdz_error");
var _classNameTdzErrorDefault = parcelHelpers.interopDefault(_classNameTdzError);
var _classPrivateFieldDestructure = require("./_class_private_field_destructure");
var _classPrivateFieldDestructureDefault = parcelHelpers.interopDefault(_classPrivateFieldDestructure);
var _classPrivateFieldGet = require("./_class_private_field_get");
var _classPrivateFieldGetDefault = parcelHelpers.interopDefault(_classPrivateFieldGet);
var _classPrivateFieldInit = require("./_class_private_field_init");
var _classPrivateFieldInitDefault = parcelHelpers.interopDefault(_classPrivateFieldInit);
var _classPrivateFieldLooseBase = require("./_class_private_field_loose_base");
var _classPrivateFieldLooseBaseDefault = parcelHelpers.interopDefault(_classPrivateFieldLooseBase);
var _classPrivateFieldLooseKey = require("./_class_private_field_loose_key");
var _classPrivateFieldLooseKeyDefault = parcelHelpers.interopDefault(_classPrivateFieldLooseKey);
var _classPrivateFieldSet = require("./_class_private_field_set");
var _classPrivateFieldSetDefault = parcelHelpers.interopDefault(_classPrivateFieldSet);
var _classPrivateMethodGet = require("./_class_private_method_get");
var _classPrivateMethodGetDefault = parcelHelpers.interopDefault(_classPrivateMethodGet);
var _classPrivateMethodInit = require("./_class_private_method_init");
var _classPrivateMethodInitDefault = parcelHelpers.interopDefault(_classPrivateMethodInit);
var _classPrivateMethodSet = require("./_class_private_method_set");
var _classPrivateMethodSetDefault = parcelHelpers.interopDefault(_classPrivateMethodSet);
var _classStaticPrivateFieldDestructure = require("./_class_static_private_field_destructure");
var _classStaticPrivateFieldDestructureDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldDestructure);
var _classStaticPrivateFieldSpecGet = require("./_class_static_private_field_spec_get");
var _classStaticPrivateFieldSpecGetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecGet);
var _classStaticPrivateFieldSpecSet = require("./_class_static_private_field_spec_set");
var _classStaticPrivateFieldSpecSetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecSet);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _createClass = require("./_create_class");
var _createClassDefault = parcelHelpers.interopDefault(_createClass);
var _createSuper = require("./_create_super");
var _createSuperDefault = parcelHelpers.interopDefault(_createSuper);
var _decorate = require("./_decorate");
var _decorateDefault = parcelHelpers.interopDefault(_decorate);
var _defaults = require("./_defaults");
var _defaultsDefault = parcelHelpers.interopDefault(_defaults);
var _defineEnumerableProperties = require("./_define_enumerable_properties");
var _defineEnumerablePropertiesDefault = parcelHelpers.interopDefault(_defineEnumerableProperties);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _extends = require("./_extends");
var _extendsDefault = parcelHelpers.interopDefault(_extends);
var _get = require("./_get");
var _getDefault = parcelHelpers.interopDefault(_get);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _inherits = require("./_inherits");
var _inheritsDefault = parcelHelpers.interopDefault(_inherits);
var _inheritsLoose = require("./_inherits_loose");
var _inheritsLooseDefault = parcelHelpers.interopDefault(_inheritsLoose);
var _initializerDefineProperty = require("./_initializer_define_property");
var _initializerDefinePropertyDefault = parcelHelpers.interopDefault(_initializerDefineProperty);
var _initializerWarningHelper = require("./_initializer_warning_helper");
var _initializerWarningHelperDefault = parcelHelpers.interopDefault(_initializerWarningHelper);
var _instanceof = require("./_instanceof");
var _instanceofDefault = parcelHelpers.interopDefault(_instanceof);
var _interopRequireDefault = require("./_interop_require_default");
var _interopRequireDefaultDefault = parcelHelpers.interopDefault(_interopRequireDefault);
var _interopRequireWildcard = require("./_interop_require_wildcard");
var _interopRequireWildcardDefault = parcelHelpers.interopDefault(_interopRequireWildcard);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _isNativeReflectConstruct = require("./_is_native_reflect_construct");
var _isNativeReflectConstructDefault = parcelHelpers.interopDefault(_isNativeReflectConstruct);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _iterableToArrayLimit = require("./_iterable_to_array_limit");
var _iterableToArrayLimitDefault = parcelHelpers.interopDefault(_iterableToArrayLimit);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _jsx = require("./_jsx");
var _jsxDefault = parcelHelpers.interopDefault(_jsx);
var _newArrowCheck = require("./_new_arrow_check");
var _newArrowCheckDefault = parcelHelpers.interopDefault(_newArrowCheck);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
var _objectSpread = require("./_object_spread");
var _objectSpreadDefault = parcelHelpers.interopDefault(_objectSpread);
var _objectWithoutProperties = require("./_object_without_properties");
var _objectWithoutPropertiesDefault = parcelHelpers.interopDefault(_objectWithoutProperties);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
var _possibleConstructorReturn = require("./_possible_constructor_return");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
var _readOnlyError = require("./_read_only_error");
var _readOnlyErrorDefault = parcelHelpers.interopDefault(_readOnlyError);
var _set = require("./_set");
var _setDefault = parcelHelpers.interopDefault(_set);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
var _skipFirstGeneratorNext = require("./_skip_first_generator_next");
var _skipFirstGeneratorNextDefault = parcelHelpers.interopDefault(_skipFirstGeneratorNext);
var _slicedToArray = require("./_sliced_to_array");
var _slicedToArrayDefault = parcelHelpers.interopDefault(_slicedToArray);
var _slicedToArrayLoose = require("./_sliced_to_array_loose");
var _slicedToArrayLooseDefault = parcelHelpers.interopDefault(_slicedToArrayLoose);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
var _taggedTemplateLiteral = require("./_tagged_template_literal");
var _taggedTemplateLiteralDefault = parcelHelpers.interopDefault(_taggedTemplateLiteral);
var _taggedTemplateLiteralLoose = require("./_tagged_template_literal_loose");
var _taggedTemplateLiteralLooseDefault = parcelHelpers.interopDefault(_taggedTemplateLiteralLoose);
var _throw = require("./_throw");
var _throwDefault = parcelHelpers.interopDefault(_throw);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toConsumableArray = require("./_to_consumable_array");
var _toConsumableArrayDefault = parcelHelpers.interopDefault(_toConsumableArray);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _unsupportedIterableToArray = require("./_unsupported_iterable_to_array");
var _unsupportedIterableToArrayDefault = parcelHelpers.interopDefault(_unsupportedIterableToArray);
var _wrapAsyncGenerator = require("./_wrap_async_generator");
var _wrapAsyncGeneratorDefault = parcelHelpers.interopDefault(_wrapAsyncGenerator);
var _wrapNativeSuper = require("./_wrap_native_super");
var _wrapNativeSuperDefault = parcelHelpers.interopDefault(_wrapNativeSuper);

},{"./_apply_decorated_descriptor":false,"./_array_like_to_array":false,"./_array_with_holes":false,"./_array_without_holes":false,"./_assert_this_initialized":false,"./_async_generator":false,"./_async_generator_delegate":false,"./_async_iterator":false,"./_async_to_generator":false,"./_await_async_generator":false,"./_await_value":false,"./_check_private_redeclaration":"4QUTM","./_class_apply_descriptor_destructure":false,"./_class_apply_descriptor_get":"46vPA","./_class_apply_descriptor_set":"3O4Vp","./_class_call_check":false,"./_class_check_private_static_field_descriptor":false,"./_class_check_private_static_access":false,"./_class_name_tdz_error":false,"./_class_private_field_destructure":false,"./_class_private_field_get":"6QAu8","./_class_private_field_init":"isyZN","./_class_private_field_loose_base":false,"./_class_private_field_loose_key":false,"./_class_private_field_set":"cnufZ","./_class_private_method_get":"36P3z","./_class_private_method_init":"bkIiA","./_class_private_method_set":false,"./_class_static_private_field_destructure":false,"./_class_static_private_field_spec_get":false,"./_class_static_private_field_spec_set":false,"./_construct":false,"./_create_class":false,"./_create_super":false,"./_decorate":false,"./_defaults":false,"./_define_enumerable_properties":false,"./_define_property":"5RMOb","./_extends":false,"./_get":false,"./_get_prototype_of":false,"./_inherits":false,"./_inherits_loose":false,"./_initializer_define_property":false,"./_initializer_warning_helper":false,"./_instanceof":false,"./_interop_require_default":false,"./_interop_require_wildcard":false,"./_is_native_function":false,"./_is_native_reflect_construct":false,"./_iterable_to_array":false,"./_iterable_to_array_limit":false,"./_iterable_to_array_limit_loose":false,"./_jsx":false,"./_new_arrow_check":false,"./_non_iterable_rest":false,"./_non_iterable_spread":false,"./_object_spread":false,"./_object_without_properties":false,"./_object_without_properties_loose":false,"./_possible_constructor_return":false,"./_read_only_error":false,"./_set":false,"./_set_prototype_of":false,"./_skip_first_generator_next":false,"./_sliced_to_array":false,"./_sliced_to_array_loose":false,"./_super_prop_base":false,"./_tagged_template_literal":false,"./_tagged_template_literal_loose":false,"./_throw":false,"./_to_array":false,"./_to_consumable_array":false,"./_to_primitive":false,"./_to_property_key":false,"./_type_of":false,"./_unsupported_iterable_to_array":false,"./_wrap_async_generator":false,"./_wrap_native_super":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4QUTM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
exports.default = _checkPrivateRedeclaration;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
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
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
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

},{}],"46vPA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
exports.default = _classApplyDescriptorGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3O4Vp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
        descriptor.value = value;
    }
}
exports.default = _classApplyDescriptorSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6QAu8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _classExtractFieldDescriptor = require("./_class_extract_field_descriptor");
var _classExtractFieldDescriptorDefault = parcelHelpers.interopDefault(_classExtractFieldDescriptor);
var _classApplyDescriptorGet = require("./_class_apply_descriptor_get");
var _classApplyDescriptorGetDefault = parcelHelpers.interopDefault(_classApplyDescriptorGet);
function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptorDefault.default(receiver, privateMap, "get");
    return _classApplyDescriptorGetDefault.default(receiver, descriptor);
}
exports.default = _classPrivateFieldGet;

},{"./_class_extract_field_descriptor":"gurxg","./_class_apply_descriptor_get":"46vPA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gurxg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
exports.default = _classExtractFieldDescriptor;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"isyZN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkPrivateRedeclaration = require("./_check_private_redeclaration");
var _checkPrivateRedeclarationDefault = parcelHelpers.interopDefault(_checkPrivateRedeclaration);
function _classPrivateFieldInit(obj, privateMap, value) {
    _checkPrivateRedeclarationDefault.default(obj, privateMap);
    privateMap.set(obj, value);
}
exports.default = _classPrivateFieldInit;

},{"./_check_private_redeclaration":"4QUTM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cnufZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _classExtractFieldDescriptor = require("./_class_extract_field_descriptor");
var _classExtractFieldDescriptorDefault = parcelHelpers.interopDefault(_classExtractFieldDescriptor);
var _classApplyDescriptorSet = require("./_class_apply_descriptor_set");
var _classApplyDescriptorSetDefault = parcelHelpers.interopDefault(_classApplyDescriptorSet);
function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptorDefault.default(receiver, privateMap, "set");
    _classApplyDescriptorSetDefault.default(receiver, descriptor, value);
    return value;
}
exports.default = _classPrivateFieldSet;

},{"./_class_extract_field_descriptor":"gurxg","./_class_apply_descriptor_set":"3O4Vp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"36P3z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
exports.default = _classPrivateMethodGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bkIiA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkPrivateRedeclaration = require("./_check_private_redeclaration");
var _checkPrivateRedeclarationDefault = parcelHelpers.interopDefault(_checkPrivateRedeclaration);
function _classPrivateMethodInit(obj, privateSet) {
    _checkPrivateRedeclarationDefault.default(obj, privateSet);
    privateSet.add(obj);
}
exports.default = _classPrivateMethodInit;

},{"./_check_private_redeclaration":"4QUTM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5RMOb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
exports.default = _defineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jy5Bl","hulwz"], "hulwz", "parcelRequirec3cd")

//# sourceMappingURL=index.e49b5cfe.js.map
