import "./chunk-P2LSHJDD.js";

// ../../../../Desktop/CHIDAO-UNIAPP/node_modules/@fingerprintjs/fingerprintjs/node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// ../../../../Desktop/CHIDAO-UNIAPP/node_modules/@fingerprintjs/fingerprintjs/dist/fp.esm.js
var version = "4.5.1";
function wait(durationMs, resolveWith) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, durationMs, resolveWith);
  });
}
function releaseEventLoop() {
  return new Promise(function(resolve) {
    var channel = new MessageChannel();
    channel.port1.onmessage = function() {
      return resolve();
    };
    channel.port2.postMessage(null);
  });
}
function requestIdleCallbackIfAvailable(fallbackTimeout, deadlineTimeout) {
  if (deadlineTimeout === void 0) {
    deadlineTimeout = Infinity;
  }
  var requestIdleCallback = window.requestIdleCallback;
  if (requestIdleCallback) {
    return new Promise(function(resolve) {
      return requestIdleCallback.call(window, function() {
        return resolve();
      }, { timeout: deadlineTimeout });
    });
  } else {
    return wait(Math.min(fallbackTimeout, deadlineTimeout));
  }
}
function isPromise(value) {
  return !!value && typeof value.then === "function";
}
function awaitIfAsync(action, callback) {
  try {
    var returnedValue = action();
    if (isPromise(returnedValue)) {
      returnedValue.then(function(result) {
        return callback(true, result);
      }, function(error) {
        return callback(false, error);
      });
    } else {
      callback(true, returnedValue);
    }
  } catch (error) {
    callback(false, error);
  }
}
function mapWithBreaks(items, callback, loopReleaseInterval) {
  if (loopReleaseInterval === void 0) {
    loopReleaseInterval = 16;
  }
  return __awaiter(this, void 0, void 0, function() {
    var results, lastLoopReleaseTime, i, now;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          results = Array(items.length);
          lastLoopReleaseTime = Date.now();
          i = 0;
          _a.label = 1;
        case 1:
          if (!(i < items.length))
            return [3, 4];
          results[i] = callback(items[i], i);
          now = Date.now();
          if (!(now >= lastLoopReleaseTime + loopReleaseInterval))
            return [3, 3];
          lastLoopReleaseTime = now;
          return [4, releaseEventLoop()];
        case 2:
          _a.sent();
          _a.label = 3;
        case 3:
          ++i;
          return [3, 1];
        case 4:
          return [2, results];
      }
    });
  });
}
function suppressUnhandledRejectionWarning(promise) {
  promise.then(void 0, function() {
    return void 0;
  });
  return promise;
}
function includes(haystack, needle) {
  for (var i = 0, l = haystack.length; i < l; ++i) {
    if (haystack[i] === needle) {
      return true;
    }
  }
  return false;
}
function excludes(haystack, needle) {
  return !includes(haystack, needle);
}
function toInt(value) {
  return parseInt(value);
}
function toFloat(value) {
  return parseFloat(value);
}
function replaceNaN(value, replacement) {
  return typeof value === "number" && isNaN(value) ? replacement : value;
}
function countTruthy(values) {
  return values.reduce(function(sum, value) {
    return sum + (value ? 1 : 0);
  }, 0);
}
function round(value, base) {
  if (base === void 0) {
    base = 1;
  }
  if (Math.abs(base) >= 1) {
    return Math.round(value / base) * base;
  } else {
    var counterBase = 1 / base;
    return Math.round(value * counterBase) / counterBase;
  }
}
function parseSimpleCssSelector(selector) {
  var _a, _b;
  var errorMessage = "Unexpected syntax '".concat(selector, "'");
  var tagMatch = /^\s*([a-z-]*)(.*)$/i.exec(selector);
  var tag = tagMatch[1] || void 0;
  var attributes = {};
  var partsRegex = /([.:#][\w-]+|\[.+?\])/gi;
  var addAttribute = function(name, value) {
    attributes[name] = attributes[name] || [];
    attributes[name].push(value);
  };
  for (; ; ) {
    var match = partsRegex.exec(tagMatch[2]);
    if (!match) {
      break;
    }
    var part = match[0];
    switch (part[0]) {
      case ".":
        addAttribute("class", part.slice(1));
        break;
      case "#":
        addAttribute("id", part.slice(1));
        break;
      case "[": {
        var attributeMatch = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(part);
        if (attributeMatch) {
          addAttribute(attributeMatch[1], (_b = (_a = attributeMatch[4]) !== null && _a !== void 0 ? _a : attributeMatch[5]) !== null && _b !== void 0 ? _b : "");
        } else {
          throw new Error(errorMessage);
        }
        break;
      }
      default:
        throw new Error(errorMessage);
    }
  }
  return [tag, attributes];
}
function getUTF8Bytes(input) {
  var result = new Uint8Array(input.length);
  for (var i = 0; i < input.length; i++) {
    var charCode = input.charCodeAt(i);
    if (charCode > 127) {
      return new TextEncoder().encode(input);
    }
    result[i] = charCode;
  }
  return result;
}
function x64Add(m, n) {
  var m0 = m[0] >>> 16, m1 = m[0] & 65535, m2 = m[1] >>> 16, m3 = m[1] & 65535;
  var n0 = n[0] >>> 16, n1 = n[0] & 65535, n2 = n[1] >>> 16, n3 = n[1] & 65535;
  var o0 = 0, o1 = 0, o2 = 0, o3 = 0;
  o3 += m3 + n3;
  o2 += o3 >>> 16;
  o3 &= 65535;
  o2 += m2 + n2;
  o1 += o2 >>> 16;
  o2 &= 65535;
  o1 += m1 + n1;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o0 += m0 + n0;
  o0 &= 65535;
  m[0] = o0 << 16 | o1;
  m[1] = o2 << 16 | o3;
}
function x64Multiply(m, n) {
  var m0 = m[0] >>> 16, m1 = m[0] & 65535, m2 = m[1] >>> 16, m3 = m[1] & 65535;
  var n0 = n[0] >>> 16, n1 = n[0] & 65535, n2 = n[1] >>> 16, n3 = n[1] & 65535;
  var o0 = 0, o1 = 0, o2 = 0, o3 = 0;
  o3 += m3 * n3;
  o2 += o3 >>> 16;
  o3 &= 65535;
  o2 += m2 * n3;
  o1 += o2 >>> 16;
  o2 &= 65535;
  o2 += m3 * n2;
  o1 += o2 >>> 16;
  o2 &= 65535;
  o1 += m1 * n3;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o1 += m2 * n2;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o1 += m3 * n1;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o0 += m0 * n3 + m1 * n2 + m2 * n1 + m3 * n0;
  o0 &= 65535;
  m[0] = o0 << 16 | o1;
  m[1] = o2 << 16 | o3;
}
function x64Rotl(m, bits) {
  var m0 = m[0];
  bits %= 64;
  if (bits === 32) {
    m[0] = m[1];
    m[1] = m0;
  } else if (bits < 32) {
    m[0] = m0 << bits | m[1] >>> 32 - bits;
    m[1] = m[1] << bits | m0 >>> 32 - bits;
  } else {
    bits -= 32;
    m[0] = m[1] << bits | m0 >>> 32 - bits;
    m[1] = m0 << bits | m[1] >>> 32 - bits;
  }
}
function x64LeftShift(m, bits) {
  bits %= 64;
  if (bits === 0) {
    return;
  } else if (bits < 32) {
    m[0] = m[1] >>> 32 - bits;
    m[1] = m[1] << bits;
  } else {
    m[0] = m[1] << bits - 32;
    m[1] = 0;
  }
}
function x64Xor(m, n) {
  m[0] ^= n[0];
  m[1] ^= n[1];
}
var F1 = [4283543511, 3981806797];
var F2 = [3301882366, 444984403];
function x64Fmix(h) {
  var shifted = [0, h[0] >>> 1];
  x64Xor(h, shifted);
  x64Multiply(h, F1);
  shifted[1] = h[0] >>> 1;
  x64Xor(h, shifted);
  x64Multiply(h, F2);
  shifted[1] = h[0] >>> 1;
  x64Xor(h, shifted);
}
var C1 = [2277735313, 289559509];
var C2 = [1291169091, 658871167];
var M$1 = [0, 5];
var N1 = [0, 1390208809];
var N2 = [0, 944331445];
function x64hash128(input, seed) {
  var key = getUTF8Bytes(input);
  seed = seed || 0;
  var length = [0, key.length];
  var remainder = length[1] % 16;
  var bytes = length[1] - remainder;
  var h1 = [0, seed];
  var h2 = [0, seed];
  var k1 = [0, 0];
  var k2 = [0, 0];
  var i;
  for (i = 0; i < bytes; i = i + 16) {
    k1[0] = key[i + 4] | key[i + 5] << 8 | key[i + 6] << 16 | key[i + 7] << 24;
    k1[1] = key[i] | key[i + 1] << 8 | key[i + 2] << 16 | key[i + 3] << 24;
    k2[0] = key[i + 12] | key[i + 13] << 8 | key[i + 14] << 16 | key[i + 15] << 24;
    k2[1] = key[i + 8] | key[i + 9] << 8 | key[i + 10] << 16 | key[i + 11] << 24;
    x64Multiply(k1, C1);
    x64Rotl(k1, 31);
    x64Multiply(k1, C2);
    x64Xor(h1, k1);
    x64Rotl(h1, 27);
    x64Add(h1, h2);
    x64Multiply(h1, M$1);
    x64Add(h1, N1);
    x64Multiply(k2, C2);
    x64Rotl(k2, 33);
    x64Multiply(k2, C1);
    x64Xor(h2, k2);
    x64Rotl(h2, 31);
    x64Add(h2, h1);
    x64Multiply(h2, M$1);
    x64Add(h2, N2);
  }
  k1[0] = 0;
  k1[1] = 0;
  k2[0] = 0;
  k2[1] = 0;
  var val = [0, 0];
  switch (remainder) {
    case 15:
      val[1] = key[i + 14];
      x64LeftShift(val, 48);
      x64Xor(k2, val);
    case 14:
      val[1] = key[i + 13];
      x64LeftShift(val, 40);
      x64Xor(k2, val);
    case 13:
      val[1] = key[i + 12];
      x64LeftShift(val, 32);
      x64Xor(k2, val);
    case 12:
      val[1] = key[i + 11];
      x64LeftShift(val, 24);
      x64Xor(k2, val);
    case 11:
      val[1] = key[i + 10];
      x64LeftShift(val, 16);
      x64Xor(k2, val);
    case 10:
      val[1] = key[i + 9];
      x64LeftShift(val, 8);
      x64Xor(k2, val);
    case 9:
      val[1] = key[i + 8];
      x64Xor(k2, val);
      x64Multiply(k2, C2);
      x64Rotl(k2, 33);
      x64Multiply(k2, C1);
      x64Xor(h2, k2);
    case 8:
      val[1] = key[i + 7];
      x64LeftShift(val, 56);
      x64Xor(k1, val);
    case 7:
      val[1] = key[i + 6];
      x64LeftShift(val, 48);
      x64Xor(k1, val);
    case 6:
      val[1] = key[i + 5];
      x64LeftShift(val, 40);
      x64Xor(k1, val);
    case 5:
      val[1] = key[i + 4];
      x64LeftShift(val, 32);
      x64Xor(k1, val);
    case 4:
      val[1] = key[i + 3];
      x64LeftShift(val, 24);
      x64Xor(k1, val);
    case 3:
      val[1] = key[i + 2];
      x64LeftShift(val, 16);
      x64Xor(k1, val);
    case 2:
      val[1] = key[i + 1];
      x64LeftShift(val, 8);
      x64Xor(k1, val);
    case 1:
      val[1] = key[i];
      x64Xor(k1, val);
      x64Multiply(k1, C1);
      x64Rotl(k1, 31);
      x64Multiply(k1, C2);
      x64Xor(h1, k1);
  }
  x64Xor(h1, length);
  x64Xor(h2, length);
  x64Add(h1, h2);
  x64Add(h2, h1);
  x64Fmix(h1);
  x64Fmix(h2);
  x64Add(h1, h2);
  x64Add(h2, h1);
  return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
}
function errorToObject(error) {
  var _a;
  return __assign({ name: error.name, message: error.message, stack: (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n") }, error);
}
function isFunctionNative(func) {
  return /^function\s.*?\{\s*\[native code]\s*}$/.test(String(func));
}
function isFinalResultLoaded(loadResult) {
  return typeof loadResult !== "function";
}
function loadSource(source, sourceOptions) {
  var sourceLoadPromise = suppressUnhandledRejectionWarning(new Promise(function(resolveLoad) {
    var loadStartTime = Date.now();
    awaitIfAsync(source.bind(null, sourceOptions), function() {
      var loadArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        loadArgs[_i] = arguments[_i];
      }
      var loadDuration = Date.now() - loadStartTime;
      if (!loadArgs[0]) {
        return resolveLoad(function() {
          return { error: loadArgs[1], duration: loadDuration };
        });
      }
      var loadResult = loadArgs[1];
      if (isFinalResultLoaded(loadResult)) {
        return resolveLoad(function() {
          return { value: loadResult, duration: loadDuration };
        });
      }
      resolveLoad(function() {
        return new Promise(function(resolveGet) {
          var getStartTime = Date.now();
          awaitIfAsync(loadResult, function() {
            var getArgs = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              getArgs[_i2] = arguments[_i2];
            }
            var duration = loadDuration + Date.now() - getStartTime;
            if (!getArgs[0]) {
              return resolveGet({ error: getArgs[1], duration });
            }
            resolveGet({ value: getArgs[1], duration });
          });
        });
      });
    });
  }));
  return function getComponent() {
    return sourceLoadPromise.then(function(finalizeSource) {
      return finalizeSource();
    });
  };
}
function loadSources(sources2, sourceOptions, excludeSources, loopReleaseInterval) {
  var includedSources = Object.keys(sources2).filter(function(sourceKey) {
    return excludes(excludeSources, sourceKey);
  });
  var sourceGettersPromise = suppressUnhandledRejectionWarning(mapWithBreaks(includedSources, function(sourceKey) {
    return loadSource(sources2[sourceKey], sourceOptions);
  }, loopReleaseInterval));
  return function getComponents() {
    return __awaiter(this, void 0, void 0, function() {
      var sourceGetters, componentPromises, componentArray, components, index2;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, sourceGettersPromise];
          case 1:
            sourceGetters = _a.sent();
            return [4, mapWithBreaks(sourceGetters, function(sourceGetter) {
              return suppressUnhandledRejectionWarning(sourceGetter());
            }, loopReleaseInterval)];
          case 2:
            componentPromises = _a.sent();
            return [
              4,
              Promise.all(componentPromises)
              // Keeping the component keys order the same as the source keys order
            ];
          case 3:
            componentArray = _a.sent();
            components = {};
            for (index2 = 0; index2 < includedSources.length; ++index2) {
              components[includedSources[index2]] = componentArray[index2];
            }
            return [2, components];
        }
      });
    });
  };
}
function transformSource(source, transformValue) {
  var transformLoadResult = function(loadResult) {
    if (isFinalResultLoaded(loadResult)) {
      return transformValue(loadResult);
    }
    return function() {
      var getResult = loadResult();
      if (isPromise(getResult)) {
        return getResult.then(transformValue);
      }
      return transformValue(getResult);
    };
  };
  return function(options) {
    var loadResult = source(options);
    if (isPromise(loadResult)) {
      return loadResult.then(transformLoadResult);
    }
    return transformLoadResult(loadResult);
  };
}
function isTrident() {
  var w = window;
  var n = navigator;
  return countTruthy([
    "MSCSSMatrix" in w,
    "msSetImmediate" in w,
    "msIndexedDB" in w,
    "msMaxTouchPoints" in n,
    "msPointerEnabled" in n
  ]) >= 4;
}
function isEdgeHTML() {
  var w = window;
  var n = navigator;
  return countTruthy(["msWriteProfilerMark" in w, "MSStream" in w, "msLaunchUri" in n, "msSaveBlob" in n]) >= 3 && !isTrident();
}
function isChromium() {
  var w = window;
  var n = navigator;
  return countTruthy([
    "webkitPersistentStorage" in n,
    "webkitTemporaryStorage" in n,
    n.vendor.indexOf("Google") === 0,
    "webkitResolveLocalFileSystemURL" in w,
    "BatteryManager" in w,
    "webkitMediaStream" in w,
    "webkitSpeechGrammar" in w
  ]) >= 5;
}
function isWebKit() {
  var w = window;
  var n = navigator;
  return countTruthy([
    "ApplePayError" in w,
    "CSSPrimitiveValue" in w,
    "Counter" in w,
    n.vendor.indexOf("Apple") === 0,
    "RGBColor" in w,
    "WebKitMediaKeys" in w
  ]) >= 4;
}
function isDesktopWebKit() {
  var w = window;
  var HTMLElement = w.HTMLElement, Document = w.Document;
  return countTruthy([
    "safari" in w,
    !("ongestureend" in w),
    !("TouchEvent" in w),
    !("orientation" in w),
    HTMLElement && !("autocapitalize" in HTMLElement.prototype),
    Document && "pointerLockElement" in Document.prototype
  ]) >= 4;
}
function isSafariWebKit() {
  var w = window;
  return (
    // Filters-out Chrome, Yandex, DuckDuckGo (macOS and iOS), Edge
    isFunctionNative(w.print) && // Doesn't work in Safari < 15.4
    String(w.browser) === "[object WebPageNamespace]"
  );
}
function isGecko() {
  var _a, _b;
  var w = window;
  return countTruthy([
    "buildID" in navigator,
    "MozAppearance" in ((_b = (_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : {}),
    "onmozfullscreenchange" in w,
    "mozInnerScreenX" in w,
    "CSSMozDocumentRule" in w,
    "CanvasCaptureMediaStream" in w
  ]) >= 4;
}
function isChromium86OrNewer() {
  var w = window;
  return countTruthy([
    !("MediaSettingsRange" in w),
    "RTCEncodedAudioFrame" in w,
    "" + w.Intl === "[object Intl]",
    "" + w.Reflect === "[object Reflect]"
  ]) >= 3;
}
function isChromium122OrNewer() {
  var w = window;
  var URLPattern = w.URLPattern;
  return countTruthy([
    "union" in Set.prototype,
    "Iterator" in w,
    URLPattern && "hasRegExpGroups" in URLPattern.prototype,
    "RGB8" in WebGLRenderingContext.prototype
  ]) >= 3;
}
function isWebKit606OrNewer() {
  var w = window;
  return countTruthy([
    "DOMRectList" in w,
    "RTCPeerConnectionIceEvent" in w,
    "SVGGeometryElement" in w,
    "ontransitioncancel" in w
  ]) >= 3;
}
function isWebKit616OrNewer() {
  var w = window;
  var n = navigator;
  var CSS = w.CSS, HTMLButtonElement = w.HTMLButtonElement;
  return countTruthy([
    !("getStorageUpdates" in n),
    HTMLButtonElement && "popover" in HTMLButtonElement.prototype,
    "CSSCounterStyleRule" in w,
    CSS.supports("font-size-adjust: ex-height 0.5"),
    CSS.supports("text-transform: full-width")
  ]) >= 4;
}
function isIPad() {
  if (navigator.platform === "iPad") {
    return true;
  }
  var s = screen;
  var screenRatio = s.width / s.height;
  return countTruthy([
    // Since iOS 13. Doesn't work in Chrome on iPadOS <15, but works in desktop mode.
    "MediaSource" in window,
    // Since iOS 12. Doesn't work in Chrome on iPadOS.
    !!Element.prototype.webkitRequestFullscreen,
    // iPhone 4S that runs iOS 9 matches this, but it is not supported
    // Doesn't work in incognito mode of Safari ≥17 with split screen because of tracking prevention
    screenRatio > 0.65 && screenRatio < 1.53
  ]) >= 2;
}
function getFullscreenElement() {
  var d = document;
  return d.fullscreenElement || d.msFullscreenElement || d.mozFullScreenElement || d.webkitFullscreenElement || null;
}
function exitFullscreen() {
  var d = document;
  return (d.exitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen).call(d);
}
function isAndroid() {
  var isItChromium = isChromium();
  var isItGecko = isGecko();
  var w = window;
  var n = navigator;
  var c = "connection";
  if (isItChromium) {
    return countTruthy([
      !("SharedWorker" in w),
      // `typechange` is deprecated, but it's still present on Android (tested on Chrome Mobile 117)
      // Removal proposal https://bugs.chromium.org/p/chromium/issues/detail?id=699892
      // Note: this expression returns true on ChromeOS, so additional detectors are required to avoid false-positives
      n[c] && "ontypechange" in n[c],
      !("sinkId" in new Audio())
    ]) >= 2;
  } else if (isItGecko) {
    return countTruthy(["onorientationchange" in w, "orientation" in w, /android/i.test(n.appVersion)]) >= 2;
  } else {
    return false;
  }
}
function isSamsungInternet() {
  var n = navigator;
  var w = window;
  var audioPrototype = Audio.prototype;
  var visualViewport = w.visualViewport;
  return countTruthy([
    "srLatency" in audioPrototype,
    "srChannelCount" in audioPrototype,
    "devicePosture" in n,
    visualViewport && "segments" in visualViewport,
    "getTextInformation" in Image.prototype
    // Not available in Samsung Internet 21
  ]) >= 3;
}
function getAudioFingerprint() {
  if (doesBrowserPerformAntifingerprinting$1()) {
    return -4;
  }
  return getUnstableAudioFingerprint();
}
function getUnstableAudioFingerprint() {
  var w = window;
  var AudioContext2 = w.OfflineAudioContext || w.webkitOfflineAudioContext;
  if (!AudioContext2) {
    return -2;
  }
  if (doesBrowserSuspendAudioContext()) {
    return -1;
  }
  var hashFromIndex = 4500;
  var hashToIndex = 5e3;
  var context = new AudioContext2(1, hashToIndex, 44100);
  var oscillator = context.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.value = 1e4;
  var compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  oscillator.connect(compressor);
  compressor.connect(context.destination);
  oscillator.start(0);
  var _a = startRenderingAudio(context), renderPromise = _a[0], finishRendering = _a[1];
  var fingerprintPromise = suppressUnhandledRejectionWarning(renderPromise.then(function(buffer) {
    return getHash(buffer.getChannelData(0).subarray(hashFromIndex));
  }, function(error) {
    if (error.name === "timeout" || error.name === "suspended") {
      return -3;
    }
    throw error;
  }));
  return function() {
    finishRendering();
    return fingerprintPromise;
  };
}
function doesBrowserSuspendAudioContext() {
  return isWebKit() && !isDesktopWebKit() && !isWebKit606OrNewer();
}
function doesBrowserPerformAntifingerprinting$1() {
  return (
    // Safari ≥17
    isWebKit() && isWebKit616OrNewer() && isSafariWebKit() || // Samsung Internet ≥26
    isChromium() && isSamsungInternet() && isChromium122OrNewer()
  );
}
function startRenderingAudio(context) {
  var renderTryMaxCount = 3;
  var renderRetryDelay = 500;
  var runningMaxAwaitTime = 500;
  var runningSufficientTime = 5e3;
  var finalize = function() {
    return void 0;
  };
  var resultPromise = new Promise(function(resolve, reject) {
    var isFinalized = false;
    var renderTryCount = 0;
    var startedRunningAt = 0;
    context.oncomplete = function(event) {
      return resolve(event.renderedBuffer);
    };
    var startRunningTimeout = function() {
      setTimeout(function() {
        return reject(makeInnerError(
          "timeout"
          /* InnerErrorName.Timeout */
        ));
      }, Math.min(runningMaxAwaitTime, startedRunningAt + runningSufficientTime - Date.now()));
    };
    var tryRender = function() {
      try {
        var renderingPromise = context.startRendering();
        if (isPromise(renderingPromise)) {
          suppressUnhandledRejectionWarning(renderingPromise);
        }
        switch (context.state) {
          case "running":
            startedRunningAt = Date.now();
            if (isFinalized) {
              startRunningTimeout();
            }
            break;
          case "suspended":
            if (!document.hidden) {
              renderTryCount++;
            }
            if (isFinalized && renderTryCount >= renderTryMaxCount) {
              reject(makeInnerError(
                "suspended"
                /* InnerErrorName.Suspended */
              ));
            } else {
              setTimeout(tryRender, renderRetryDelay);
            }
            break;
        }
      } catch (error) {
        reject(error);
      }
    };
    tryRender();
    finalize = function() {
      if (!isFinalized) {
        isFinalized = true;
        if (startedRunningAt > 0) {
          startRunningTimeout();
        }
      }
    };
  });
  return [resultPromise, finalize];
}
function getHash(signal) {
  var hash = 0;
  for (var i = 0; i < signal.length; ++i) {
    hash += Math.abs(signal[i]);
  }
  return hash;
}
function makeInnerError(name) {
  var error = new Error(name);
  error.name = name;
  return error;
}
function withIframe(action, initialHtml, domPollInterval) {
  var _a, _b, _c;
  if (domPollInterval === void 0) {
    domPollInterval = 50;
  }
  return __awaiter(this, void 0, void 0, function() {
    var d, iframe;
    return __generator(this, function(_d) {
      switch (_d.label) {
        case 0:
          d = document;
          _d.label = 1;
        case 1:
          if (!!d.body)
            return [3, 3];
          return [4, wait(domPollInterval)];
        case 2:
          _d.sent();
          return [3, 1];
        case 3:
          iframe = d.createElement("iframe");
          _d.label = 4;
        case 4:
          _d.trys.push([4, , 10, 11]);
          return [4, new Promise(function(_resolve, _reject) {
            var isComplete = false;
            var resolve = function() {
              isComplete = true;
              _resolve();
            };
            var reject = function(error) {
              isComplete = true;
              _reject(error);
            };
            iframe.onload = resolve;
            iframe.onerror = reject;
            var style = iframe.style;
            style.setProperty("display", "block", "important");
            style.position = "absolute";
            style.top = "0";
            style.left = "0";
            style.visibility = "hidden";
            if (initialHtml && "srcdoc" in iframe) {
              iframe.srcdoc = initialHtml;
            } else {
              iframe.src = "about:blank";
            }
            d.body.appendChild(iframe);
            var checkReadyState = function() {
              var _a2, _b2;
              if (isComplete) {
                return;
              }
              if (((_b2 = (_a2 = iframe.contentWindow) === null || _a2 === void 0 ? void 0 : _a2.document) === null || _b2 === void 0 ? void 0 : _b2.readyState) === "complete") {
                resolve();
              } else {
                setTimeout(checkReadyState, 10);
              }
            };
            checkReadyState();
          })];
        case 5:
          _d.sent();
          _d.label = 6;
        case 6:
          if (!!((_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body))
            return [3, 8];
          return [4, wait(domPollInterval)];
        case 7:
          _d.sent();
          return [3, 6];
        case 8:
          return [4, action(iframe, iframe.contentWindow)];
        case 9:
          return [2, _d.sent()];
        case 10:
          (_c = iframe.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(iframe);
          return [
            7
            /*endfinally*/
          ];
        case 11:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function selectorToElement(selector) {
  var _a = parseSimpleCssSelector(selector), tag = _a[0], attributes = _a[1];
  var element = document.createElement(tag !== null && tag !== void 0 ? tag : "div");
  for (var _i = 0, _b = Object.keys(attributes); _i < _b.length; _i++) {
    var name_1 = _b[_i];
    var value = attributes[name_1].join(" ");
    if (name_1 === "style") {
      addStyleString(element.style, value);
    } else {
      element.setAttribute(name_1, value);
    }
  }
  return element;
}
function addStyleString(style, source) {
  for (var _i = 0, _a = source.split(";"); _i < _a.length; _i++) {
    var property = _a[_i];
    var match = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(property);
    if (match) {
      var name_2 = match[1], value = match[2], priority = match[4];
      style.setProperty(name_2, value, priority || "");
    }
  }
}
function isAnyParentCrossOrigin() {
  var currentWindow = window;
  for (; ; ) {
    var parentWindow = currentWindow.parent;
    if (!parentWindow || parentWindow === currentWindow) {
      return false;
    }
    try {
      if (parentWindow.location.origin !== currentWindow.location.origin) {
        return true;
      }
    } catch (error) {
      if (error instanceof Error && error.name === "SecurityError") {
        return true;
      }
      throw error;
    }
    currentWindow = parentWindow;
  }
}
var testString = "mmMwWLliI0O&1";
var textSize = "48px";
var baseFonts = ["monospace", "sans-serif", "serif"];
var fontList = [
  // This is android-specific font from "Roboto" family
  "sans-serif-thin",
  "ARNO PRO",
  "Agency FB",
  "Arabic Typesetting",
  "Arial Unicode MS",
  "AvantGarde Bk BT",
  "BankGothic Md BT",
  "Batang",
  "Bitstream Vera Sans Mono",
  "Calibri",
  "Century",
  "Century Gothic",
  "Clarendon",
  "EUROSTILE",
  "Franklin Gothic",
  "Futura Bk BT",
  "Futura Md BT",
  "GOTHAM",
  "Gill Sans",
  "HELV",
  "Haettenschweiler",
  "Helvetica Neue",
  "Humanst521 BT",
  "Leelawadee",
  "Letter Gothic",
  "Levenim MT",
  "Lucida Bright",
  "Lucida Sans",
  "Menlo",
  "MS Mincho",
  "MS Outlook",
  "MS Reference Specialty",
  "MS UI Gothic",
  "MT Extra",
  "MYRIAD PRO",
  "Marlett",
  "Meiryo UI",
  "Microsoft Uighur",
  "Minion Pro",
  "Monotype Corsiva",
  "PMingLiU",
  "Pristina",
  "SCRIPTINA",
  "Segoe UI Light",
  "Serifa",
  "SimHei",
  "Small Fonts",
  "Staccato222 BT",
  "TRAJAN PRO",
  "Univers CE 55 Medium",
  "Vrinda",
  "ZWAdobeF"
];
function getFonts() {
  var _this = this;
  return withIframe(function(_, _a) {
    var document2 = _a.document;
    return __awaiter(_this, void 0, void 0, function() {
      var holder, spansContainer, defaultWidth, defaultHeight, createSpan, createSpanWithFonts, initializeBaseFontsSpans, initializeFontsSpans, isFontAvailable, baseFontsSpans, fontsSpans, index2;
      return __generator(this, function(_b) {
        holder = document2.body;
        holder.style.fontSize = textSize;
        spansContainer = document2.createElement("div");
        spansContainer.style.setProperty("visibility", "hidden", "important");
        defaultWidth = {};
        defaultHeight = {};
        createSpan = function(fontFamily) {
          var span = document2.createElement("span");
          var style = span.style;
          style.position = "absolute";
          style.top = "0";
          style.left = "0";
          style.fontFamily = fontFamily;
          span.textContent = testString;
          spansContainer.appendChild(span);
          return span;
        };
        createSpanWithFonts = function(fontToDetect, baseFont) {
          return createSpan("'".concat(fontToDetect, "',").concat(baseFont));
        };
        initializeBaseFontsSpans = function() {
          return baseFonts.map(createSpan);
        };
        initializeFontsSpans = function() {
          var spans = {};
          var _loop_1 = function(font2) {
            spans[font2] = baseFonts.map(function(baseFont) {
              return createSpanWithFonts(font2, baseFont);
            });
          };
          for (var _i = 0, fontList_1 = fontList; _i < fontList_1.length; _i++) {
            var font = fontList_1[_i];
            _loop_1(font);
          }
          return spans;
        };
        isFontAvailable = function(fontSpans) {
          return baseFonts.some(function(baseFont, baseFontIndex) {
            return fontSpans[baseFontIndex].offsetWidth !== defaultWidth[baseFont] || fontSpans[baseFontIndex].offsetHeight !== defaultHeight[baseFont];
          });
        };
        baseFontsSpans = initializeBaseFontsSpans();
        fontsSpans = initializeFontsSpans();
        holder.appendChild(spansContainer);
        for (index2 = 0; index2 < baseFonts.length; index2++) {
          defaultWidth[baseFonts[index2]] = baseFontsSpans[index2].offsetWidth;
          defaultHeight[baseFonts[index2]] = baseFontsSpans[index2].offsetHeight;
        }
        return [2, fontList.filter(function(font) {
          return isFontAvailable(fontsSpans[font]);
        })];
      });
    });
  });
}
function getPlugins() {
  var rawPlugins = navigator.plugins;
  if (!rawPlugins) {
    return void 0;
  }
  var plugins = [];
  for (var i = 0; i < rawPlugins.length; ++i) {
    var plugin = rawPlugins[i];
    if (!plugin) {
      continue;
    }
    var mimeTypes = [];
    for (var j = 0; j < plugin.length; ++j) {
      var mimeType = plugin[j];
      mimeTypes.push({
        type: mimeType.type,
        suffixes: mimeType.suffixes
      });
    }
    plugins.push({
      name: plugin.name,
      description: plugin.description,
      mimeTypes
    });
  }
  return plugins;
}
function getCanvasFingerprint() {
  return getUnstableCanvasFingerprint(doesBrowserPerformAntifingerprinting());
}
function getUnstableCanvasFingerprint(skipImages) {
  var _a;
  var winding = false;
  var geometry;
  var text;
  var _b = makeCanvasContext(), canvas = _b[0], context = _b[1];
  if (!isSupported(canvas, context)) {
    geometry = text = "unsupported";
  } else {
    winding = doesSupportWinding(context);
    if (skipImages) {
      geometry = text = "skipped";
    } else {
      _a = renderImages(canvas, context), geometry = _a[0], text = _a[1];
    }
  }
  return { winding, geometry, text };
}
function makeCanvasContext() {
  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return [canvas, canvas.getContext("2d")];
}
function isSupported(canvas, context) {
  return !!(context && canvas.toDataURL);
}
function doesSupportWinding(context) {
  context.rect(0, 0, 10, 10);
  context.rect(2, 2, 6, 6);
  return !context.isPointInPath(5, 5, "evenodd");
}
function renderImages(canvas, context) {
  renderTextImage(canvas, context);
  var textImage1 = canvasToString(canvas);
  var textImage2 = canvasToString(canvas);
  if (textImage1 !== textImage2) {
    return [
      "unstable",
      "unstable"
      /* ImageStatus.Unstable */
    ];
  }
  renderGeometryImage(canvas, context);
  var geometryImage = canvasToString(canvas);
  return [geometryImage, textImage1];
}
function renderTextImage(canvas, context) {
  canvas.width = 240;
  canvas.height = 60;
  context.textBaseline = "alphabetic";
  context.fillStyle = "#f60";
  context.fillRect(100, 1, 62, 20);
  context.fillStyle = "#069";
  context.font = '11pt "Times New Roman"';
  var printedText = "Cwm fjordbank gly ".concat(
    String.fromCharCode(55357, 56835)
    /* 😃 */
  );
  context.fillText(printedText, 2, 15);
  context.fillStyle = "rgba(102, 204, 0, 0.2)";
  context.font = "18pt Arial";
  context.fillText(printedText, 4, 45);
}
function renderGeometryImage(canvas, context) {
  canvas.width = 122;
  canvas.height = 110;
  context.globalCompositeOperation = "multiply";
  for (var _i = 0, _a = [
    ["#f2f", 40, 40],
    ["#2ff", 80, 40],
    ["#ff2", 60, 80]
  ]; _i < _a.length; _i++) {
    var _b = _a[_i], color = _b[0], x = _b[1], y = _b[2];
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, 40, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
  context.fillStyle = "#f9c";
  context.arc(60, 60, 60, 0, Math.PI * 2, true);
  context.arc(60, 60, 20, 0, Math.PI * 2, true);
  context.fill("evenodd");
}
function canvasToString(canvas) {
  return canvas.toDataURL();
}
function doesBrowserPerformAntifingerprinting() {
  return isWebKit() && isWebKit616OrNewer() && isSafariWebKit();
}
function getTouchSupport() {
  var n = navigator;
  var maxTouchPoints = 0;
  var touchEvent;
  if (n.maxTouchPoints !== void 0) {
    maxTouchPoints = toInt(n.maxTouchPoints);
  } else if (n.msMaxTouchPoints !== void 0) {
    maxTouchPoints = n.msMaxTouchPoints;
  }
  try {
    document.createEvent("TouchEvent");
    touchEvent = true;
  } catch (_a) {
    touchEvent = false;
  }
  var touchStart = "ontouchstart" in window;
  return {
    maxTouchPoints,
    touchEvent,
    touchStart
  };
}
function getOsCpu() {
  return navigator.oscpu;
}
function getLanguages() {
  var n = navigator;
  var result = [];
  var language = n.language || n.userLanguage || n.browserLanguage || n.systemLanguage;
  if (language !== void 0) {
    result.push([language]);
  }
  if (Array.isArray(n.languages)) {
    if (!(isChromium() && isChromium86OrNewer())) {
      result.push(n.languages);
    }
  } else if (typeof n.languages === "string") {
    var languages = n.languages;
    if (languages) {
      result.push(languages.split(","));
    }
  }
  return result;
}
function getColorDepth() {
  return window.screen.colorDepth;
}
function getDeviceMemory() {
  return replaceNaN(toFloat(navigator.deviceMemory), void 0);
}
function getScreenResolution() {
  if (isWebKit() && isWebKit616OrNewer() && isSafariWebKit()) {
    return void 0;
  }
  return getUnstableScreenResolution();
}
function getUnstableScreenResolution() {
  var s = screen;
  var parseDimension = function(value) {
    return replaceNaN(toInt(value), null);
  };
  var dimensions = [parseDimension(s.width), parseDimension(s.height)];
  dimensions.sort().reverse();
  return dimensions;
}
var screenFrameCheckInterval = 2500;
var roundingPrecision = 10;
var screenFrameBackup;
var screenFrameSizeTimeoutId;
function watchScreenFrame() {
  if (screenFrameSizeTimeoutId !== void 0) {
    return;
  }
  var checkScreenFrame = function() {
    var frameSize = getCurrentScreenFrame();
    if (isFrameSizeNull(frameSize)) {
      screenFrameSizeTimeoutId = setTimeout(checkScreenFrame, screenFrameCheckInterval);
    } else {
      screenFrameBackup = frameSize;
      screenFrameSizeTimeoutId = void 0;
    }
  };
  checkScreenFrame();
}
function getUnstableScreenFrame() {
  var _this = this;
  watchScreenFrame();
  return function() {
    return __awaiter(_this, void 0, void 0, function() {
      var frameSize;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            frameSize = getCurrentScreenFrame();
            if (!isFrameSizeNull(frameSize))
              return [3, 2];
            if (screenFrameBackup) {
              return [2, __spreadArray([], screenFrameBackup, true)];
            }
            if (!getFullscreenElement())
              return [3, 2];
            return [4, exitFullscreen()];
          case 1:
            _a.sent();
            frameSize = getCurrentScreenFrame();
            _a.label = 2;
          case 2:
            if (!isFrameSizeNull(frameSize)) {
              screenFrameBackup = frameSize;
            }
            return [2, frameSize];
        }
      });
    });
  };
}
function getScreenFrame() {
  var _this = this;
  if (isWebKit() && isWebKit616OrNewer() && isSafariWebKit()) {
    return function() {
      return Promise.resolve(void 0);
    };
  }
  var screenFrameGetter = getUnstableScreenFrame();
  return function() {
    return __awaiter(_this, void 0, void 0, function() {
      var frameSize, processSize;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, screenFrameGetter()];
          case 1:
            frameSize = _a.sent();
            processSize = function(sideSize) {
              return sideSize === null ? null : round(sideSize, roundingPrecision);
            };
            return [2, [processSize(frameSize[0]), processSize(frameSize[1]), processSize(frameSize[2]), processSize(frameSize[3])]];
        }
      });
    });
  };
}
function getCurrentScreenFrame() {
  var s = screen;
  return [
    replaceNaN(toFloat(s.availTop), null),
    replaceNaN(toFloat(s.width) - toFloat(s.availWidth) - replaceNaN(toFloat(s.availLeft), 0), null),
    replaceNaN(toFloat(s.height) - toFloat(s.availHeight) - replaceNaN(toFloat(s.availTop), 0), null),
    replaceNaN(toFloat(s.availLeft), null)
  ];
}
function isFrameSizeNull(frameSize) {
  for (var i = 0; i < 4; ++i) {
    if (frameSize[i]) {
      return false;
    }
  }
  return true;
}
function getHardwareConcurrency() {
  return replaceNaN(toInt(navigator.hardwareConcurrency), void 0);
}
function getTimezone() {
  var _a;
  var DateTimeFormat = (_a = window.Intl) === null || _a === void 0 ? void 0 : _a.DateTimeFormat;
  if (DateTimeFormat) {
    var timezone = new DateTimeFormat().resolvedOptions().timeZone;
    if (timezone) {
      return timezone;
    }
  }
  var offset = -getTimezoneOffset();
  return "UTC".concat(offset >= 0 ? "+" : "").concat(offset);
}
function getTimezoneOffset() {
  var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return Math.max(
    // `getTimezoneOffset` returns a number as a string in some unidentified cases
    toFloat(new Date(currentYear, 0, 1).getTimezoneOffset()),
    toFloat(new Date(currentYear, 6, 1).getTimezoneOffset())
  );
}
function getSessionStorage() {
  try {
    return !!window.sessionStorage;
  } catch (error) {
    return true;
  }
}
function getLocalStorage() {
  try {
    return !!window.localStorage;
  } catch (e) {
    return true;
  }
}
function getIndexedDB() {
  if (isTrident() || isEdgeHTML()) {
    return void 0;
  }
  try {
    return !!window.indexedDB;
  } catch (e) {
    return true;
  }
}
function getOpenDatabase() {
  return !!window.openDatabase;
}
function getCpuClass() {
  return navigator.cpuClass;
}
function getPlatform() {
  var platform = navigator.platform;
  if (platform === "MacIntel") {
    if (isWebKit() && !isDesktopWebKit()) {
      return isIPad() ? "iPad" : "iPhone";
    }
  }
  return platform;
}
function getVendor() {
  return navigator.vendor || "";
}
function getVendorFlavors() {
  var flavors = [];
  for (var _i = 0, _a = [
    // Blink and some browsers on iOS
    "chrome",
    // Safari on macOS
    "safari",
    // Chrome on iOS (checked in 85 on 13 and 87 on 14)
    "__crWeb",
    "__gCrWeb",
    // Yandex Browser on iOS, macOS and Android (checked in 21.2 on iOS 14, macOS and Android)
    "yandex",
    // Yandex Browser on iOS (checked in 21.2 on 14)
    "__yb",
    "__ybro",
    // Firefox on iOS (checked in 32 on 14)
    "__firefox__",
    // Edge on iOS (checked in 46 on 14)
    "__edgeTrackingPreventionStatistics",
    "webkit",
    // Opera Touch on iOS (checked in 2.6 on 14)
    "oprt",
    // Samsung Internet on Android (checked in 11.1)
    "samsungAr",
    // UC Browser on Android (checked in 12.10 and 13.0)
    "ucweb",
    "UCShellJava",
    // Puffin on Android (checked in 9.0)
    "puffinDevice"
    // UC on iOS and Opera on Android have no specific global variables
    // Edge for Android isn't checked
  ]; _i < _a.length; _i++) {
    var key = _a[_i];
    var value = window[key];
    if (value && typeof value === "object") {
      flavors.push(key);
    }
  }
  return flavors.sort();
}
function areCookiesEnabled() {
  var d = document;
  try {
    d.cookie = "cookietest=1; SameSite=Strict;";
    var result = d.cookie.indexOf("cookietest=") !== -1;
    d.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return result;
  } catch (e) {
    return false;
  }
}
function getFilters() {
  var fromB64 = atob;
  return {
    abpIndo: [
      "#Iklan-Melayang",
      "#Kolom-Iklan-728",
      "#SidebarIklan-wrapper",
      '[title="ALIENBOLA" i]',
      fromB64("I0JveC1CYW5uZXItYWRz")
    ],
    abpvn: [".quangcao", "#mobileCatfish", fromB64("LmNsb3NlLWFkcw=="), '[id^="bn_bottom_fixed_"]', "#pmadv"],
    adBlockFinland: [
      ".mainostila",
      fromB64("LnNwb25zb3JpdA=="),
      ".ylamainos",
      fromB64("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")
    ],
    adBlockPersian: [
      "#navbar_notice_50",
      ".kadr",
      'TABLE[width="140px"]',
      "#divAgahi",
      fromB64("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")
    ],
    adBlockWarningRemoval: [
      "#adblock-honeypot",
      ".adblocker-root",
      ".wp_adblock_detect",
      fromB64("LmhlYWRlci1ibG9ja2VkLWFk"),
      fromB64("I2FkX2Jsb2NrZXI=")
    ],
    adGuardAnnoyances: [
      ".hs-sosyal",
      "#cookieconsentdiv",
      'div[class^="app_gdpr"]',
      ".as-oil",
      '[data-cypress="soft-push-notification-modal"]'
    ],
    adGuardBase: [
      ".BetterJsPopOverlay",
      fromB64("I2FkXzMwMFgyNTA="),
      fromB64("I2Jhbm5lcmZsb2F0MjI="),
      fromB64("I2NhbXBhaWduLWJhbm5lcg=="),
      fromB64("I0FkLUNvbnRlbnQ=")
    ],
    adGuardChinese: [
      fromB64("LlppX2FkX2FfSA=="),
      fromB64("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
      "#widget-quan",
      fromB64("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
      fromB64("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")
    ],
    adGuardFrench: [
      "#pavePub",
      fromB64("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
      ".mobile_adhesion",
      ".widgetadv",
      fromB64("LmFkc19iYW4=")
    ],
    adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
    adGuardJapanese: [
      "#kauli_yad_1",
      fromB64("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
      fromB64("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
      fromB64("LmFkZ29vZ2xl"),
      fromB64("Ll9faXNib29zdFJldHVybkFk")
    ],
    adGuardMobile: [
      fromB64("YW1wLWF1dG8tYWRz"),
      fromB64("LmFtcF9hZA=="),
      'amp-embed[type="24smi"]',
      "#mgid_iframe1",
      fromB64("I2FkX2ludmlld19hcmVh")
    ],
    adGuardRussian: [
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
      fromB64("LnJlY2xhbWE="),
      'div[id^="smi2adblock"]',
      fromB64("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
      "#psyduckpockeball"
    ],
    adGuardSocial: [
      fromB64("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),
      fromB64("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
      ".etsy-tweet",
      "#inlineShare",
      ".popup-social"
    ],
    adGuardSpanishPortuguese: ["#barraPublicidade", "#Publicidade", "#publiEspecial", "#queTooltip", ".cnt-publi"],
    adGuardTrackingProtection: [
      "#qoo-counter",
      fromB64("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
      fromB64("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),
      fromB64("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
      "#top100counter"
    ],
    adGuardTurkish: [
      "#backkapat",
      fromB64("I3Jla2xhbWk="),
      fromB64("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
      fromB64("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
      fromB64("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")
    ],
    bulgarian: [fromB64("dGQjZnJlZW5ldF90YWJsZV9hZHM="), "#ea_intext_div", ".lapni-pop-over", "#xenium_hot_offers"],
    easyList: [
      ".yb-floorad",
      fromB64("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
      fromB64("LnRyYWZmaWNqdW5reS1hZA=="),
      ".textad_headline",
      fromB64("LnNwb25zb3JlZC10ZXh0LWxpbmtz")
    ],
    easyListChina: [
      fromB64("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
      fromB64("LmZyb250cGFnZUFkdk0="),
      "#taotaole",
      "#aafoot.top_box",
      ".cfa_popup"
    ],
    easyListCookie: [
      ".ezmob-footer",
      ".cc-CookieWarning",
      "[data-cookie-number]",
      fromB64("LmF3LWNvb2tpZS1iYW5uZXI="),
      ".sygnal24-gdpr-modal-wrap"
    ],
    easyListCzechSlovak: [
      "#onlajny-stickers",
      fromB64("I3Jla2xhbW5pLWJveA=="),
      fromB64("LnJla2xhbWEtbWVnYWJvYXJk"),
      ".sklik",
      fromB64("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")
    ],
    easyListDutch: [
      fromB64("I2FkdmVydGVudGll"),
      fromB64("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
      ".adstekst",
      fromB64("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
      "#semilo-lrectangle"
    ],
    easyListGermany: [
      "#SSpotIMPopSlider",
      fromB64("LnNwb25zb3JsaW5rZ3J1ZW4="),
      fromB64("I3dlcmJ1bmdza3k="),
      fromB64("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")
    ],
    easyListItaly: [
      fromB64("LmJveF9hZHZfYW5udW5jaQ=="),
      ".sb-box-pubbliredazionale",
      fromB64("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")
    ],
    easyListLithuania: [
      fromB64("LnJla2xhbW9zX3RhcnBhcw=="),
      fromB64("LnJla2xhbW9zX251b3JvZG9z"),
      fromB64("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
      fromB64("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
      fromB64("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")
    ],
    estonian: [fromB64("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
    fanboyAnnoyances: ["#ac-lre-player", ".navigate-to-top", "#subscribe_popup", ".newsletter_holder", "#back-top"],
    fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
    fanboyEnhancedTrackers: [
      ".open.pushModal",
      "#issuem-leaky-paywall-articles-zero-remaining-nag",
      "#sovrn_container",
      'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
      ".BlockNag__Card"
    ],
    fanboySocial: ["#FollowUs", "#meteored_share", "#social_follow", ".article-sharer", ".community__social-desc"],
    frellwitSwedish: [
      fromB64("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),
      fromB64("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
      "article.category-samarbete",
      fromB64("ZGl2LmhvbGlkQWRz"),
      "ul.adsmodern"
    ],
    greekAdBlock: [
      fromB64("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
      fromB64("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),
      fromB64("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),
      "DIV.agores300",
      "TABLE.advright"
    ],
    hungarian: [
      "#cemp_doboz",
      ".optimonk-iframe-container",
      fromB64("LmFkX19tYWlu"),
      fromB64("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
      "#hirdetesek_box"
    ],
    iDontCareAboutCookies: [
      '.alert-info[data-block-track*="CookieNotice"]',
      ".ModuleTemplateCookieIndicator",
      ".o--cookies--container",
      "#cookies-policy-sticky",
      "#stickyCookieBar"
    ],
    icelandicAbp: [fromB64("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
    latvian: [
      fromB64("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="),
      fromB64("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")
    ],
    listKr: [
      fromB64("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
      fromB64("I2xpdmVyZUFkV3JhcHBlcg=="),
      fromB64("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
      fromB64("aW5zLmZhc3R2aWV3LWFk"),
      ".revenue_unit_item.dable"
    ],
    listeAr: [
      fromB64("LmdlbWluaUxCMUFk"),
      ".right-and-left-sponsers",
      fromB64("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
      fromB64("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
      fromB64("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")
    ],
    listeFr: [
      fromB64("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
      fromB64("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
      fromB64("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
      ".site-pub-interstitiel",
      'div[id^="crt-"][data-criteo-id]'
    ],
    officialPolish: [
      "#ceneo-placeholder-ceneo-12",
      fromB64("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
      fromB64("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),
      fromB64("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),
      fromB64("ZGl2I3NrYXBpZWNfYWQ=")
    ],
    ro: [
      fromB64("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
      'a[href^="/url/"]'
    ],
    ruAd: [
      fromB64("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
      fromB64("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
      fromB64("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
      "#pgeldiz",
      ".yandex-rtb-block"
    ],
    thaiAds: [
      "a[href*=macau-uta-popup]",
      fromB64("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
      fromB64("LmFkczMwMHM="),
      ".bumq",
      ".img-kosana"
    ],
    webAnnoyancesUltralist: [
      "#mod-social-share-2",
      "#social-tools",
      fromB64("LmN0cGwtZnVsbGJhbm5lcg=="),
      ".zergnet-recommend",
      ".yt.btn-link.btn-md.btn"
    ]
  };
}
function getDomBlockers(_a) {
  var _b = _a === void 0 ? {} : _a, debug = _b.debug;
  return __awaiter(this, void 0, void 0, function() {
    var filters, filterNames, allSelectors, blockedSelectors, activeBlockers;
    var _c;
    return __generator(this, function(_d) {
      switch (_d.label) {
        case 0:
          if (!isApplicable()) {
            return [2, void 0];
          }
          filters = getFilters();
          filterNames = Object.keys(filters);
          allSelectors = (_c = []).concat.apply(_c, filterNames.map(function(filterName) {
            return filters[filterName];
          }));
          return [4, getBlockedSelectors(allSelectors)];
        case 1:
          blockedSelectors = _d.sent();
          if (debug) {
            printDebug(filters, blockedSelectors);
          }
          activeBlockers = filterNames.filter(function(filterName) {
            var selectors = filters[filterName];
            var blockedCount = countTruthy(selectors.map(function(selector) {
              return blockedSelectors[selector];
            }));
            return blockedCount > selectors.length * 0.6;
          });
          activeBlockers.sort();
          return [2, activeBlockers];
      }
    });
  });
}
function isApplicable() {
  return isWebKit() || isAndroid();
}
function getBlockedSelectors(selectors) {
  var _a;
  return __awaiter(this, void 0, void 0, function() {
    var d, root, elements, blockedSelectors, i, element, holder, i;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          d = document;
          root = d.createElement("div");
          elements = new Array(selectors.length);
          blockedSelectors = {};
          forceShow(root);
          for (i = 0; i < selectors.length; ++i) {
            element = selectorToElement(selectors[i]);
            if (element.tagName === "DIALOG") {
              element.show();
            }
            holder = d.createElement("div");
            forceShow(holder);
            holder.appendChild(element);
            root.appendChild(holder);
            elements[i] = element;
          }
          _b.label = 1;
        case 1:
          if (!!d.body)
            return [3, 3];
          return [4, wait(50)];
        case 2:
          _b.sent();
          return [3, 1];
        case 3:
          d.body.appendChild(root);
          try {
            for (i = 0; i < selectors.length; ++i) {
              if (!elements[i].offsetParent) {
                blockedSelectors[selectors[i]] = true;
              }
            }
          } finally {
            (_a = root.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(root);
          }
          return [2, blockedSelectors];
      }
    });
  });
}
function forceShow(element) {
  element.style.setProperty("visibility", "hidden", "important");
  element.style.setProperty("display", "block", "important");
}
function printDebug(filters, blockedSelectors) {
  var message = "DOM blockers debug:\n```";
  for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
    var filterName = _a[_i];
    message += "\n".concat(filterName, ":");
    for (var _b = 0, _c = filters[filterName]; _b < _c.length; _b++) {
      var selector = _c[_b];
      message += "\n  ".concat(blockedSelectors[selector] ? "🚫" : "➡️", " ").concat(selector);
    }
  }
  console.log("".concat(message, "\n```"));
}
function getColorGamut() {
  for (var _i = 0, _a = ["rec2020", "p3", "srgb"]; _i < _a.length; _i++) {
    var gamut = _a[_i];
    if (matchMedia("(color-gamut: ".concat(gamut, ")")).matches) {
      return gamut;
    }
  }
  return void 0;
}
function areColorsInverted() {
  if (doesMatch$5("inverted")) {
    return true;
  }
  if (doesMatch$5("none")) {
    return false;
  }
  return void 0;
}
function doesMatch$5(value) {
  return matchMedia("(inverted-colors: ".concat(value, ")")).matches;
}
function areColorsForced() {
  if (doesMatch$4("active")) {
    return true;
  }
  if (doesMatch$4("none")) {
    return false;
  }
  return void 0;
}
function doesMatch$4(value) {
  return matchMedia("(forced-colors: ".concat(value, ")")).matches;
}
var maxValueToCheck = 100;
function getMonochromeDepth() {
  if (!matchMedia("(min-monochrome: 0)").matches) {
    return void 0;
  }
  for (var i = 0; i <= maxValueToCheck; ++i) {
    if (matchMedia("(max-monochrome: ".concat(i, ")")).matches) {
      return i;
    }
  }
  throw new Error("Too high value");
}
function getContrastPreference() {
  if (doesMatch$3("no-preference")) {
    return 0;
  }
  if (doesMatch$3("high") || doesMatch$3("more")) {
    return 1;
  }
  if (doesMatch$3("low") || doesMatch$3("less")) {
    return -1;
  }
  if (doesMatch$3("forced")) {
    return 10;
  }
  return void 0;
}
function doesMatch$3(value) {
  return matchMedia("(prefers-contrast: ".concat(value, ")")).matches;
}
function isMotionReduced() {
  if (doesMatch$2("reduce")) {
    return true;
  }
  if (doesMatch$2("no-preference")) {
    return false;
  }
  return void 0;
}
function doesMatch$2(value) {
  return matchMedia("(prefers-reduced-motion: ".concat(value, ")")).matches;
}
function isTransparencyReduced() {
  if (doesMatch$1("reduce")) {
    return true;
  }
  if (doesMatch$1("no-preference")) {
    return false;
  }
  return void 0;
}
function doesMatch$1(value) {
  return matchMedia("(prefers-reduced-transparency: ".concat(value, ")")).matches;
}
function isHDR() {
  if (doesMatch("high")) {
    return true;
  }
  if (doesMatch("standard")) {
    return false;
  }
  return void 0;
}
function doesMatch(value) {
  return matchMedia("(dynamic-range: ".concat(value, ")")).matches;
}
var M = Math;
var fallbackFn = function() {
  return 0;
};
function getMathFingerprint() {
  var acos = M.acos || fallbackFn;
  var acosh = M.acosh || fallbackFn;
  var asin = M.asin || fallbackFn;
  var asinh = M.asinh || fallbackFn;
  var atanh = M.atanh || fallbackFn;
  var atan = M.atan || fallbackFn;
  var sin = M.sin || fallbackFn;
  var sinh = M.sinh || fallbackFn;
  var cos = M.cos || fallbackFn;
  var cosh = M.cosh || fallbackFn;
  var tan = M.tan || fallbackFn;
  var tanh = M.tanh || fallbackFn;
  var exp = M.exp || fallbackFn;
  var expm1 = M.expm1 || fallbackFn;
  var log1p = M.log1p || fallbackFn;
  var powPI = function(value) {
    return M.pow(M.PI, value);
  };
  var acoshPf = function(value) {
    return M.log(value + M.sqrt(value * value - 1));
  };
  var asinhPf = function(value) {
    return M.log(value + M.sqrt(value * value + 1));
  };
  var atanhPf = function(value) {
    return M.log((1 + value) / (1 - value)) / 2;
  };
  var sinhPf = function(value) {
    return M.exp(value) - 1 / M.exp(value) / 2;
  };
  var coshPf = function(value) {
    return (M.exp(value) + 1 / M.exp(value)) / 2;
  };
  var expm1Pf = function(value) {
    return M.exp(value) - 1;
  };
  var tanhPf = function(value) {
    return (M.exp(2 * value) - 1) / (M.exp(2 * value) + 1);
  };
  var log1pPf = function(value) {
    return M.log(1 + value);
  };
  return {
    acos: acos(0.12312423423423424),
    acosh: acosh(1e308),
    acoshPf: acoshPf(1e154),
    asin: asin(0.12312423423423424),
    asinh: asinh(1),
    asinhPf: asinhPf(1),
    atanh: atanh(0.5),
    atanhPf: atanhPf(0.5),
    atan: atan(0.5),
    sin: sin(-1e300),
    sinh: sinh(1),
    sinhPf: sinhPf(1),
    cos: cos(10.000000000123),
    cosh: cosh(1),
    coshPf: coshPf(1),
    tan: tan(-1e300),
    tanh: tanh(1),
    tanhPf: tanhPf(1),
    exp: exp(1),
    expm1: expm1(1),
    expm1Pf: expm1Pf(1),
    log1p: log1p(10),
    log1pPf: log1pPf(10),
    powPI: powPI(-100)
  };
}
var defaultText = "mmMwWLliI0fiflO&1";
var presets = {
  /**
   * The default font. User can change it in desktop Chrome, desktop Firefox, IE 11,
   * Android Chrome (but only when the size is ≥ than the default) and Android Firefox.
   */
  default: [],
  /** OS font on macOS. User can change its size and weight. Applies after Safari restart. */
  apple: [{ font: "-apple-system-body" }],
  /** User can change it in desktop Chrome and desktop Firefox. */
  serif: [{ fontFamily: "serif" }],
  /** User can change it in desktop Chrome and desktop Firefox. */
  sans: [{ fontFamily: "sans-serif" }],
  /** User can change it in desktop Chrome and desktop Firefox. */
  mono: [{ fontFamily: "monospace" }],
  /**
   * Check the smallest allowed font size. User can change it in desktop Chrome, desktop Firefox and desktop Safari.
   * The height can be 0 in Chrome on a retina display.
   */
  min: [{ fontSize: "1px" }],
  /** Tells one OS from another in desktop Chrome. */
  system: [{ fontFamily: "system-ui" }]
};
function getFontPreferences() {
  return withNaturalFonts(function(document2, container) {
    var elements = {};
    var sizes = {};
    for (var _i = 0, _a = Object.keys(presets); _i < _a.length; _i++) {
      var key = _a[_i];
      var _b = presets[key], _c = _b[0], style = _c === void 0 ? {} : _c, _d = _b[1], text = _d === void 0 ? defaultText : _d;
      var element = document2.createElement("span");
      element.textContent = text;
      element.style.whiteSpace = "nowrap";
      for (var _e = 0, _f = Object.keys(style); _e < _f.length; _e++) {
        var name_1 = _f[_e];
        var value = style[name_1];
        if (value !== void 0) {
          element.style[name_1] = value;
        }
      }
      elements[key] = element;
      container.append(document2.createElement("br"), element);
    }
    for (var _g = 0, _h = Object.keys(presets); _g < _h.length; _g++) {
      var key = _h[_g];
      sizes[key] = elements[key].getBoundingClientRect().width;
    }
    return sizes;
  });
}
function withNaturalFonts(action, containerWidthPx) {
  if (containerWidthPx === void 0) {
    containerWidthPx = 4e3;
  }
  return withIframe(function(_, iframeWindow) {
    var iframeDocument = iframeWindow.document;
    var iframeBody = iframeDocument.body;
    var bodyStyle = iframeBody.style;
    bodyStyle.width = "".concat(containerWidthPx, "px");
    bodyStyle.webkitTextSizeAdjust = bodyStyle.textSizeAdjust = "none";
    if (isChromium()) {
      iframeBody.style.zoom = "".concat(1 / iframeWindow.devicePixelRatio);
    } else if (isWebKit()) {
      iframeBody.style.zoom = "reset";
    }
    var linesOfText = iframeDocument.createElement("div");
    linesOfText.textContent = __spreadArray([], Array(containerWidthPx / 20 << 0), true).map(function() {
      return "word";
    }).join(" ");
    iframeBody.appendChild(linesOfText);
    return action(iframeDocument, iframeBody);
  }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
}
function isPdfViewerEnabled() {
  return navigator.pdfViewerEnabled;
}
function getArchitecture() {
  var f = new Float32Array(1);
  var u8 = new Uint8Array(f.buffer);
  f[0] = Infinity;
  f[0] = f[0] - f[0];
  return u8[3];
}
function getApplePayState() {
  var ApplePaySession = window.ApplePaySession;
  if (typeof (ApplePaySession === null || ApplePaySession === void 0 ? void 0 : ApplePaySession.canMakePayments) !== "function") {
    return -1;
  }
  if (willPrintConsoleError()) {
    return -3;
  }
  try {
    return ApplePaySession.canMakePayments() ? 1 : 0;
  } catch (error) {
    return getStateFromError(error);
  }
}
var willPrintConsoleError = isAnyParentCrossOrigin;
function getStateFromError(error) {
  if (error instanceof Error && error.name === "InvalidAccessError" && /\bfrom\b.*\binsecure\b/i.test(error.message)) {
    return -2;
  }
  throw error;
}
function getPrivateClickMeasurement() {
  var _a;
  var link = document.createElement("a");
  var sourceId = (_a = link.attributionSourceId) !== null && _a !== void 0 ? _a : link.attributionsourceid;
  return sourceId === void 0 ? void 0 : String(sourceId);
}
var STATUS_NO_GL_CONTEXT = -1;
var STATUS_GET_PARAMETER_NOT_A_FUNCTION = -2;
var validContextParameters = /* @__PURE__ */ new Set([
  10752,
  2849,
  2884,
  2885,
  2886,
  2928,
  2929,
  2930,
  2931,
  2932,
  2960,
  2961,
  2962,
  2963,
  2964,
  2965,
  2966,
  2967,
  2968,
  2978,
  3024,
  3042,
  3088,
  3089,
  3106,
  3107,
  32773,
  32777,
  32777,
  32823,
  32824,
  32936,
  32937,
  32938,
  32939,
  32968,
  32969,
  32970,
  32971,
  3317,
  33170,
  3333,
  3379,
  3386,
  33901,
  33902,
  34016,
  34024,
  34076,
  3408,
  3410,
  3411,
  3412,
  3413,
  3414,
  3415,
  34467,
  34816,
  34817,
  34818,
  34819,
  34877,
  34921,
  34930,
  35660,
  35661,
  35724,
  35738,
  35739,
  36003,
  36004,
  36005,
  36347,
  36348,
  36349,
  37440,
  37441,
  37443,
  7936,
  7937,
  7938
  // SAMPLE_ALPHA_TO_COVERAGE (32926) and SAMPLE_COVERAGE (32928) are excluded because they trigger a console warning
  // in IE, Chrome ≤ 59 and Safari ≤ 13 and give no entropy.
]);
var validExtensionParams = /* @__PURE__ */ new Set([
  34047,
  35723,
  36063,
  34852,
  34853,
  34854,
  34229,
  36392,
  36795,
  38449
  // MAX_VIEWS_OVR
]);
var shaderTypes = ["FRAGMENT_SHADER", "VERTEX_SHADER"];
var precisionTypes = ["LOW_FLOAT", "MEDIUM_FLOAT", "HIGH_FLOAT", "LOW_INT", "MEDIUM_INT", "HIGH_INT"];
var rendererInfoExtensionName = "WEBGL_debug_renderer_info";
var polygonModeExtensionName = "WEBGL_polygon_mode";
function getWebGlBasics(_a) {
  var _b, _c, _d, _e, _f, _g;
  var cache = _a.cache;
  var gl = getWebGLContext(cache);
  if (!gl) {
    return STATUS_NO_GL_CONTEXT;
  }
  if (!isValidParameterGetter(gl)) {
    return STATUS_GET_PARAMETER_NOT_A_FUNCTION;
  }
  var debugExtension = shouldAvoidDebugRendererInfo() ? null : gl.getExtension(rendererInfoExtensionName);
  return {
    version: ((_b = gl.getParameter(gl.VERSION)) === null || _b === void 0 ? void 0 : _b.toString()) || "",
    vendor: ((_c = gl.getParameter(gl.VENDOR)) === null || _c === void 0 ? void 0 : _c.toString()) || "",
    vendorUnmasked: debugExtension ? (_d = gl.getParameter(debugExtension.UNMASKED_VENDOR_WEBGL)) === null || _d === void 0 ? void 0 : _d.toString() : "",
    renderer: ((_e = gl.getParameter(gl.RENDERER)) === null || _e === void 0 ? void 0 : _e.toString()) || "",
    rendererUnmasked: debugExtension ? (_f = gl.getParameter(debugExtension.UNMASKED_RENDERER_WEBGL)) === null || _f === void 0 ? void 0 : _f.toString() : "",
    shadingLanguageVersion: ((_g = gl.getParameter(gl.SHADING_LANGUAGE_VERSION)) === null || _g === void 0 ? void 0 : _g.toString()) || ""
  };
}
function getWebGlExtensions(_a) {
  var cache = _a.cache;
  var gl = getWebGLContext(cache);
  if (!gl) {
    return STATUS_NO_GL_CONTEXT;
  }
  if (!isValidParameterGetter(gl)) {
    return STATUS_GET_PARAMETER_NOT_A_FUNCTION;
  }
  var extensions = gl.getSupportedExtensions();
  var contextAttributes = gl.getContextAttributes();
  var unsupportedExtensions = [];
  var attributes = [];
  var parameters = [];
  var extensionParameters = [];
  var shaderPrecisions = [];
  if (contextAttributes) {
    for (var _i = 0, _b = Object.keys(contextAttributes); _i < _b.length; _i++) {
      var attributeName = _b[_i];
      attributes.push("".concat(attributeName, "=").concat(contextAttributes[attributeName]));
    }
  }
  var constants = getConstantsFromPrototype(gl);
  for (var _c = 0, constants_1 = constants; _c < constants_1.length; _c++) {
    var constant = constants_1[_c];
    var code = gl[constant];
    parameters.push("".concat(constant, "=").concat(code).concat(validContextParameters.has(code) ? "=".concat(gl.getParameter(code)) : ""));
  }
  if (extensions) {
    for (var _d = 0, extensions_1 = extensions; _d < extensions_1.length; _d++) {
      var name_1 = extensions_1[_d];
      if (name_1 === rendererInfoExtensionName && shouldAvoidDebugRendererInfo() || name_1 === polygonModeExtensionName && shouldAvoidPolygonModeExtensions()) {
        continue;
      }
      var extension = gl.getExtension(name_1);
      if (!extension) {
        unsupportedExtensions.push(name_1);
        continue;
      }
      for (var _e = 0, _f = getConstantsFromPrototype(extension); _e < _f.length; _e++) {
        var constant = _f[_e];
        var code = extension[constant];
        extensionParameters.push("".concat(constant, "=").concat(code).concat(validExtensionParams.has(code) ? "=".concat(gl.getParameter(code)) : ""));
      }
    }
  }
  for (var _g = 0, shaderTypes_1 = shaderTypes; _g < shaderTypes_1.length; _g++) {
    var shaderType = shaderTypes_1[_g];
    for (var _h = 0, precisionTypes_1 = precisionTypes; _h < precisionTypes_1.length; _h++) {
      var precisionType = precisionTypes_1[_h];
      var shaderPrecision = getShaderPrecision(gl, shaderType, precisionType);
      shaderPrecisions.push("".concat(shaderType, ".").concat(precisionType, "=").concat(shaderPrecision.join(",")));
    }
  }
  extensionParameters.sort();
  parameters.sort();
  return {
    contextAttributes: attributes,
    parameters,
    shaderPrecisions,
    extensions,
    extensionParameters,
    unsupportedExtensions
  };
}
function getWebGLContext(cache) {
  if (cache.webgl) {
    return cache.webgl.context;
  }
  var canvas = document.createElement("canvas");
  var context;
  canvas.addEventListener("webglCreateContextError", function() {
    return context = void 0;
  });
  for (var _i = 0, _a = ["webgl", "experimental-webgl"]; _i < _a.length; _i++) {
    var type = _a[_i];
    try {
      context = canvas.getContext(type);
    } catch (_b) {
    }
    if (context) {
      break;
    }
  }
  cache.webgl = { context };
  return context;
}
function getShaderPrecision(gl, shaderType, precisionType) {
  var shaderPrecision = gl.getShaderPrecisionFormat(gl[shaderType], gl[precisionType]);
  return shaderPrecision ? [shaderPrecision.rangeMin, shaderPrecision.rangeMax, shaderPrecision.precision] : [];
}
function getConstantsFromPrototype(obj) {
  var keys = Object.keys(obj.__proto__);
  return keys.filter(isConstantLike);
}
function isConstantLike(key) {
  return typeof key === "string" && !key.match(/[^A-Z0-9_x]/);
}
function shouldAvoidDebugRendererInfo() {
  return isGecko();
}
function shouldAvoidPolygonModeExtensions() {
  return isChromium() || isWebKit();
}
function isValidParameterGetter(gl) {
  return typeof gl.getParameter === "function";
}
function getAudioContextBaseLatency() {
  var _a;
  var isAllowedPlatform = isAndroid() || isWebKit();
  if (!isAllowedPlatform) {
    return -2;
  }
  if (!window.AudioContext) {
    return -1;
  }
  return (_a = new AudioContext().baseLatency) !== null && _a !== void 0 ? _a : -1;
}
var sources = {
  // READ FIRST:
  // See https://github.com/fingerprintjs/fingerprintjs/blob/master/contributing.md#how-to-make-an-entropy-source
  // to learn how entropy source works and how to make your own.
  // The sources run in this exact order.
  // The asynchronous sources are at the start to run in parallel with other sources.
  fonts: getFonts,
  domBlockers: getDomBlockers,
  fontPreferences: getFontPreferences,
  audio: getAudioFingerprint,
  screenFrame: getScreenFrame,
  canvas: getCanvasFingerprint,
  osCpu: getOsCpu,
  languages: getLanguages,
  colorDepth: getColorDepth,
  deviceMemory: getDeviceMemory,
  screenResolution: getScreenResolution,
  hardwareConcurrency: getHardwareConcurrency,
  timezone: getTimezone,
  sessionStorage: getSessionStorage,
  localStorage: getLocalStorage,
  indexedDB: getIndexedDB,
  openDatabase: getOpenDatabase,
  cpuClass: getCpuClass,
  platform: getPlatform,
  plugins: getPlugins,
  touchSupport: getTouchSupport,
  vendor: getVendor,
  vendorFlavors: getVendorFlavors,
  cookiesEnabled: areCookiesEnabled,
  colorGamut: getColorGamut,
  invertedColors: areColorsInverted,
  forcedColors: areColorsForced,
  monochrome: getMonochromeDepth,
  contrast: getContrastPreference,
  reducedMotion: isMotionReduced,
  reducedTransparency: isTransparencyReduced,
  hdr: isHDR,
  math: getMathFingerprint,
  pdfViewerEnabled: isPdfViewerEnabled,
  architecture: getArchitecture,
  applePay: getApplePayState,
  privateClickMeasurement: getPrivateClickMeasurement,
  audioBaseLatency: getAudioContextBaseLatency,
  // Some sources can affect other sources (e.g. WebGL can affect canvas), so it's important to run these sources
  // after other sources.
  webGlBasics: getWebGlBasics,
  webGlExtensions: getWebGlExtensions
};
function loadBuiltinSources(options) {
  return loadSources(sources, options, []);
}
var commentTemplate = "$ if upgrade to Pro: https://fpjs.dev/pro";
function getConfidence(components) {
  var openConfidenceScore = getOpenConfidenceScore(components);
  var proConfidenceScore = deriveProConfidenceScore(openConfidenceScore);
  return { score: openConfidenceScore, comment: commentTemplate.replace(/\$/g, "".concat(proConfidenceScore)) };
}
function getOpenConfidenceScore(components) {
  if (isAndroid()) {
    return 0.4;
  }
  if (isWebKit()) {
    return isDesktopWebKit() && !(isWebKit616OrNewer() && isSafariWebKit()) ? 0.5 : 0.3;
  }
  var platform = "value" in components.platform ? components.platform.value : "";
  if (/^Win/.test(platform)) {
    return 0.6;
  }
  if (/^Mac/.test(platform)) {
    return 0.5;
  }
  return 0.7;
}
function deriveProConfidenceScore(openConfidenceScore) {
  return round(0.99 + 0.01 * openConfidenceScore, 1e-4);
}
function componentsToCanonicalString(components) {
  var result = "";
  for (var _i = 0, _a = Object.keys(components).sort(); _i < _a.length; _i++) {
    var componentKey = _a[_i];
    var component = components[componentKey];
    var value = "error" in component ? "error" : JSON.stringify(component.value);
    result += "".concat(result ? "|" : "").concat(componentKey.replace(/([:|\\])/g, "\\$1"), ":").concat(value);
  }
  return result;
}
function componentsToDebugString(components) {
  return JSON.stringify(components, function(_key, value) {
    if (value instanceof Error) {
      return errorToObject(value);
    }
    return value;
  }, 2);
}
function hashComponents(components) {
  return x64hash128(componentsToCanonicalString(components));
}
function makeLazyGetResult(components) {
  var visitorIdCache;
  var confidence = getConfidence(components);
  return {
    get visitorId() {
      if (visitorIdCache === void 0) {
        visitorIdCache = hashComponents(this.components);
      }
      return visitorIdCache;
    },
    set visitorId(visitorId) {
      visitorIdCache = visitorId;
    },
    confidence,
    components,
    version
  };
}
function prepareForSources(delayFallback) {
  if (delayFallback === void 0) {
    delayFallback = 50;
  }
  return requestIdleCallbackIfAvailable(delayFallback, delayFallback * 2);
}
function makeAgent(getComponents, debug) {
  var creationTime = Date.now();
  return {
    get: function(options) {
      return __awaiter(this, void 0, void 0, function() {
        var startTime, components, result;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              startTime = Date.now();
              return [4, getComponents()];
            case 1:
              components = _a.sent();
              result = makeLazyGetResult(components);
              if (debug || (options === null || options === void 0 ? void 0 : options.debug)) {
                console.log("Copy the text below to get the debug data:\n\n```\nversion: ".concat(result.version, "\nuserAgent: ").concat(navigator.userAgent, "\ntimeBetweenLoadAndGet: ").concat(startTime - creationTime, "\nvisitorId: ").concat(result.visitorId, "\ncomponents: ").concat(componentsToDebugString(components), "\n```"));
              }
              return [2, result];
          }
        });
      });
    }
  };
}
function monitor() {
  if (window.__fpjs_d_m || Math.random() >= 1e-3) {
    return;
  }
  try {
    var request = new XMLHttpRequest();
    request.open("get", "https://m1.openfpcdn.io/fingerprintjs/v".concat(version, "/npm-monitoring"), true);
    request.send();
  } catch (error) {
    console.error(error);
  }
}
function load(options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  return __awaiter(this, void 0, void 0, function() {
    var delayFallback, debug, getComponents;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          if ((_a = options.monitoring) !== null && _a !== void 0 ? _a : true) {
            monitor();
          }
          delayFallback = options.delayFallback, debug = options.debug;
          return [4, prepareForSources(delayFallback)];
        case 1:
          _b.sent();
          getComponents = loadBuiltinSources({ cache: {}, debug });
          return [2, makeAgent(getComponents, debug)];
      }
    });
  });
}
var index = { load, hashComponents, componentsToDebugString };
var murmurX64Hash128 = x64hash128;
export {
  componentsToDebugString,
  index as default,
  getFullscreenElement,
  getUnstableAudioFingerprint,
  getUnstableCanvasFingerprint,
  getUnstableScreenFrame,
  getUnstableScreenResolution,
  getWebGLContext,
  hashComponents,
  isAndroid,
  isChromium,
  isDesktopWebKit,
  isEdgeHTML,
  isGecko,
  isSamsungInternet,
  isTrident,
  isWebKit,
  load,
  loadSources,
  murmurX64Hash128,
  prepareForSources,
  sources,
  transformSource,
  withIframe
};
//# sourceMappingURL=@fingerprintjs_fingerprintjs.js.map
