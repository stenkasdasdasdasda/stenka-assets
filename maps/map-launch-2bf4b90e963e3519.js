/* Small standards-based fallbacks for older Telegram Android WebViews. */
(function () {
  'use strict';
  var scope = typeof globalThis !== 'undefined' ? globalThis : window;
  var Signal = scope.AbortSignal, Controller = scope.AbortController;
  var define = function (target, name, value) { Object.defineProperty(target, name, { value: value, writable: true, configurable: true }); };
  var abortError = function (name) { return new DOMException(name === 'TimeoutError' ? 'The operation timed out.' : 'The operation was aborted.', name); };
  if (Signal && Controller) {
    if (!('reason' in Signal.prototype)) {
      var reasons = new WeakMap(), nativeAbort = Controller.prototype.abort;
      Object.defineProperty(Signal.prototype, 'reason', { configurable: true, get: function () { return reasons.get(this); } });
      define(Controller.prototype, 'abort', function (reason) {
        if (!this.signal.aborted) reasons.set(this.signal, reason === undefined ? abortError('AbortError') : reason);
        nativeAbort.call(this);
      });
    }
    if (!Signal.abort) define(Signal, 'abort', function (reason) { var controller = new Controller(); controller.abort(reason); return controller.signal; });
    if (!Signal.timeout) define(Signal, 'timeout', function (milliseconds) {
      if (!Number.isSafeInteger(milliseconds) || milliseconds < 0) throw new RangeError('Invalid timeout');
      var controller = new Controller(), due = Date.now() + milliseconds;
      var expire = function () {
        var remaining = due - Date.now();
        if (remaining > 0) setTimeout(expire, Math.min(remaining, 2147483647));
        else controller.abort(abortError('TimeoutError'));
      };
      setTimeout(expire, Math.min(milliseconds, 2147483647));
      return controller.signal;
    });
    if (!Signal.any) define(Signal, 'any', function (signals) {
      var list = Array.from(signals), controller = new Controller(), listeners = [];
      list.forEach(function (signal) { if (!signal || typeof signal.addEventListener !== 'function' || typeof signal.aborted !== 'boolean') throw new TypeError('Expected an AbortSignal'); });
      var cleanup = function () { listeners.forEach(function (item) { item[0].removeEventListener('abort', item[1]); }); listeners.length = 0; };
      controller.signal.addEventListener('abort', cleanup, { once: true });
      for (var index = 0; index < list.length; index++) {
        var signal = list[index];
        if (signal.aborted) { controller.abort(signal.reason); break; }
        var onAbort = (function (source) { return function () { controller.abort(source.reason); }; })(signal);
        listeners.push([signal, onAbort]); signal.addEventListener('abort', onAbort, { once: true });
      }
      return controller.signal;
    });
    if (!Signal.prototype.throwIfAborted) define(Signal.prototype, 'throwIfAborted', function () { if (this.aborted) throw this.reason || abortError('AbortError'); });
  }
  if (!Object.hasOwn) define(Object, 'hasOwn', function (object, key) { if (object == null) throw new TypeError('Expected an object'); return Object.prototype.hasOwnProperty.call(object, key); });
  if (!Array.prototype.at) define(Array.prototype, 'at', function (index) { if (this == null) throw new TypeError('Expected an array'); var length = Math.min(Math.max(Math.floor(Number(this.length) || 0), 0), Number.MAX_SAFE_INTEGER), value = Number(index) || 0; value = value < 0 ? Math.ceil(value) : Math.floor(value); value = value < 0 ? length + value : value; return value < 0 || value >= length ? undefined : this[value]; });
  if (!String.prototype.replaceAll) define(String.prototype, 'replaceAll', function (search, replacement) {
    if (this == null) throw new TypeError('Expected a string');
    if (Object.prototype.toString.call(search) === '[object RegExp]') { if (!search.global) throw new TypeError('replaceAll requires a global regexp'); return String(this).replace(search, replacement); }
    return String(this).replace(new RegExp(String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
  });
  if (scope.crypto && !scope.crypto.randomUUID && scope.crypto.getRandomValues) define(scope.crypto, 'randomUUID', function () {
    var bytes = scope.crypto.getRandomValues(new Uint8Array(16)); bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    var value = Array.from(bytes, function (byte) { return byte.toString(16).padStart(2, '0'); }).join('');
    return value.slice(0,8) + '-' + value.slice(8,12) + '-' + value.slice(12,16) + '-' + value.slice(16,20) + '-' + value.slice(20);
  });
})();

/* Public launcher: no accounts, cookies or profile database are stored here. */
(function () {
  var origins=['https://cf-maps.furry.by','https://maps-origin.furry.by'];
  var allowedParents=['https://stenka.furry.by','https://cf-stenka.furry.by','https://dns.furry.by','https://stenkasdasdasdasda.github.io'];
  var initial=new URL(location.href), embedded=window.parent!==window;
  var parentOrigin=initial.searchParams.get('parent')||'';
  if(!allowedParents.includes(parentOrigin)){try{parentOrigin=new URL(document.referrer).origin;}catch(_){parentOrigin='';}}
  if(!allowedParents.includes(parentOrigin))parentOrigin='';
  if(!embedded)parentOrigin='';
  var prefix=location.hostname==='stenkasdasdasdasda.github.io'?'/maps-web':'';
  var path=initial.pathname.slice(prefix.length)||'/', route=path+initial.search+initial.hash;
  var token=Array.from(crypto.getRandomValues(new Uint8Array(32)),function(n){return n.toString(16).padStart(2,'0');}).join('');
  var frames=[], selected=null, cached=[], loading=document.getElementById('map-loading'), timer;
  var incoming=['stenka:map-appearance','furry:profile-map-presence','furry:event-picker-view'];
  var outgoing=['maps:appearance-ready','furry:map-point','furry:profile-map-summary'];
  function runtimeUrl(origin){
    var url=new URL(route,origin);
    if(/^\/(?:profiles|city|e)\/[^/]+\/$/.test(url.pathname))url.pathname=url.pathname.slice(0,-1);
    url.searchParams.set('launcherOrigin',location.origin);url.searchParams.set('launcherNonce',token);url.searchParams.set('launcherEmbed',embedded?'1':'0');
    if(parentOrigin)url.searchParams.set('parent',location.origin);
    else if(!embedded)url.searchParams.delete('parent');
    return url.href;
  }
  function launch(index){
    if(selected||frames[index])return;
    var frame=document.createElement('iframe');frame.title='Карта Фурри Знакомств';frame.hidden=false;frame.className='map-runtime-pending';frame.allow='geolocation; fullscreen; clipboard-write';frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.src=runtimeUrl(origins[index]);frames[index]=frame;document.body.appendChild(frame);
  }
  function pick(frame,index){
    if(selected&&selected!==frame)return;
    selected=frame;frame.hidden=false;frame.className='';loading.hidden=true;clearTimeout(timer);
    frames.forEach(function(other){if(other&&other!==frame)other.remove();});
    cached.forEach(function(value){frame.contentWindow.postMessage(value,origins[index]);});cached=[];
    frame.contentWindow.postMessage({channel:'furry-map-shell-v1',nonce:token,type:'shown'},origins[index]);
  }
  window.addEventListener('message',function(event){
    if(embedded&&parentOrigin&&event.source===window.parent&&event.origin===parentOrigin&&event.data&&incoming.includes(event.data.type)){
      if(selected)selected.contentWindow.postMessage(event.data,new URL(selected.src).origin);else if(cached.length<8)cached.push(event.data);
      return;
    }
    var index=origins.indexOf(event.origin),frame=index>=0?frames[index]:null,data=event.data;
    if(!frame||event.source!==frame.contentWindow||!data)return;
    if(data.channel==='furry-map-shell-v1'&&data.nonce===token){
      if(data.type==='ready'){pick(frame,index);return;}
      if(frame!==selected)return;
      if(data.type==='appearance'&&['cat','fox','pxl'].includes(data.character)){
        document.querySelector('link[rel=icon]').href='https://stenkasdasdasdasda.github.io/stenka-assets/maps/map-icon-'+data.character+'.ico';
      }
      if(data.type==='route'&&typeof data.path==='string'&&data.path[0]==='/'&&!data.path.startsWith('//')&&data.path.length<8192){
        var next=new URL(data.path,location.origin);if(next.origin!==location.origin)return;
        if(parentOrigin)next.searchParams.set('parent',parentOrigin);
        route=next.pathname+next.search+next.hash;
        history.replaceState(null,'',prefix+route);if(typeof data.title==='string')document.title=data.title.slice(0,240);
      }
      return;
    }
    // The inner frame's existing nonce validation still applies to point picking.
    if(embedded&&parentOrigin&&outgoing.includes(data.type))window.parent.postMessage(data,parentOrigin);
  });
  window.addEventListener('popstate',function(){location.reload();});
  document.getElementById('map-retry').onclick=function(){location.reload();};
  launch(0);setTimeout(function(){launch(1);},900);
  timer=setTimeout(function(){if(!selected){launch(1);document.getElementById('map-slow').hidden=false;}},18000);
})();
