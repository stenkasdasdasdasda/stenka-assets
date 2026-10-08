import{n as e,r as t,t as n}from"./client-NUYrgd4P.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e){if(typeof e!=`string`||(e=e.trim().replace(/^[?#&]/,``),!e))return{};var t=/\?(.+)$/gi.exec(e);return(t?t[1]:e).split(`&`).reduce(function(e,t){var n=t.split(`=`);return n[1]&&(e[n[0]]=decodeURIComponent(n[1])),e},{})}function o(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(typeof e!=`object`||!e)return``;t=i({encode:!0},t);var n=function(e){return t.encode?encodeURIComponent(e):String(e)};return Object.keys(e).reduce(function(r,i){var a=e[i];return a===void 0?r:a===null?(t.skipNull||r.push([n(i),``].join(`=`)),r):Array.isArray(a)?(a.map(function(e){r.push(`${n(i)}[]=${n(e)}`)}).join(),r):(r.push([n(i),n(a)].join(`=`)),r)},[]).join(`&`)}var s={parse:a,stringify:o},c;(function(e){e.TYPE_ACTION=`type_action`})(c||={});var l;(function(e){e.TYPE_REGISTRATION_ITEM=`type_registration_item`,e.TYPE_SAK_SESSION_EVENT_ITEM=`type_sak_sessions_event_item`})(l||={});var u;(function(e){e.NOWHERE=`nowhere`,e.FLOATING_ONE_TAP=`floating_one_tap`,e.MULTIBRANDING=`multibranding_widget`})(u||={});var d=class{actionStatsCollector;constructor(e){this.actionStatsCollector=e}logEvent(e,t){let n={type:l.TYPE_REGISTRATION_ITEM,[l.TYPE_REGISTRATION_ITEM]:t};return this.actionStatsCollector.logEvent({screen:e,event:n})}},f=`2.6.8`,p=`vk.ru`,m=`login.${p}`,h=`oauth.${p}`,g=`id.${p}`,_=`api.${p}`,v=(e,t)=>{let{__vkidDomain:n,app:r}=t.get();return`https://${n}/${e}?app_id=${r}`},y=(e,t)=>{let{__apiDomain:n}=t.get();return`https://${n}/method/${e}`},b=e=>{let t=Object.keys(e).map(t=>{let n=e[t];return t=encodeURIComponent(t||``),n=encodeURIComponent(n===void 0?``:n),`${t}=${n}`});return t.push(`v=5.207`),t.join(`&`)},x=(e,t)=>{let n=b(t);return fetch(e,{method:`POST`,body:n,mode:`cors`,credentials:`include`,headers:{"Content-Type":`application/x-www-form-urlencoded`}}).then(e=>e.json())},S=class e{static MAX_INT32=2147483647;timeoutId=null;lastEvent;config;stackEvents=[];accessToken;constructor(e,t){this.config=e,this.accessToken=t}getIntId(){return Math.floor(Math.random()*e.MAX_INT32)}getCurrentTime(e=!0){let t=Date.now().toString(10);return e?t+`000`:t}sendStats(e){return this.stackEvents.push(e),this.timeoutId&&window.clearTimeout(this.timeoutId),new Promise((e,t)=>{this.timeoutId=window.setTimeout(()=>{let n={events:JSON.stringify(this.stackEvents),sak_version:f};this.stackEvents=[];let r=v(`stat_events_vkid_sdk`,this.config);this.accessToken&&(n.access_token=this.accessToken,r=y(`statEvents.addVKID`,this.config)),x(r,n).then(e).catch(t)},0)})}getBaseEvent(e){return{id:this.getIntId(),prev_event_id:this.lastEvent?.id||0,prev_nav_id:0,timestamp:this.getCurrentTime(),url:window.location.href,screen:e}}logEvent(e){return this.lastEvent=e,this.sendStats(e)}},C=class{productStatsCollector;constructor(e){this.productStatsCollector=e}logEvent(e){let t={...this.productStatsCollector.getBaseEvent(e.screen),type:c.TYPE_ACTION,[c.TYPE_ACTION]:e.event};return this.productStatsCollector.logEvent(t)}},w=class{registrationStatsCollector;uniqueSessionId;constructor(e){let t=new C(new S(e));this.registrationStatsCollector=new d(t)}setUniqueSessionId(e){this.uniqueSessionId=e}getFields(){let e=[{name:`sdk_type`,value:`vkid`}];return this.uniqueSessionId&&e.push({name:`unique_session_id`,value:this.uniqueSessionId}),e}sendCustomAuthStart(e){let t=this.getFields();return e&&t.push({name:`oauth_service`,value:e}),this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`custom_auth_start`,fields:t})}},T=class{promise;callback;resolve;reject;constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}setCallback=e=>{this.callback=e};removeCallback=()=>{this.callback=null};sendSuccess=e=>{this.resolve(e),this.callback&&this.callback()};sendError=e=>{this.reject(e),this.callback&&this.callback()};get value(){return this.promise}},E=`useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`,D=(e,t=21)=>(n=t)=>{let r=``,i=n;for(;i--;)r+=e[Math.random()*e.length|0];return r},O=(e=21)=>{let t=``,n=e;for(;n--;)t+=E[Math.random()*64|0];return t};function k(e){try{let t=document.cookie.match(RegExp(`(?:^|; )`+(`vkid_sdk:`+e).replace(/([.$?*|{}()\[\]\\\/+^])/g,`\\$1`)+`=([^;]*)`));return t?decodeURIComponent(t[1]):void 0}catch{return}}function A(e,t){try{let n=new Date(new Date().getTime()+(t.expires||9e5)).toUTCString(),r=location.host.split(`.`).slice(-2).join(`.`);document.cookie=[`vkid_sdk:${e}=${encodeURIComponent(t.value||``)}`,`expires=${n}`,`path=/`,`domain=.${r}`,`SameSite=Strict`,`Secure`].join(`; `)}catch{}}function j(e){let t=location.host.split(`.`).slice(-2).join(`.`);try{document.cookie=[`vkid_sdk:${e}=`,`expires=Thu, 01 Jan 1970 00:00:00 UTC`,`path=/`,`SameSite=Strict`,`Secure`,`domain=.${t}`].join(`; `)}catch{}}function M(e,t){if(t.value)return A(e,t),t.value;let n;return n=k(e),n||(n=O(48),A(e,{...t,value:n})),n}var N=e=>M(`state`,{value:e}),ee=e=>M(`codeVerifier`,{value:e}),te=e=>M(`to`,{value:e}),ne=()=>j(`state`),re=()=>j(`codeVerifier`),ie=()=>j(`to`),ae=31536e6;function oe(e){if(e)try{let t=new Date(new Date().getTime()+ae).toUTCString(),n=location.host.split(`.`).slice(-2).join(`.`);document.cookie=[`vkidExtId=${encodeURIComponent(e||``)}`,`expires=${t}`,`path=/`,`domain=.${n}`,`SameSite=Strict`,`Secure`].join(`; `)}catch{}}var P;(function(e){e.AUTH=`from_custom_auth`,e.BUTTON_ONE_TAP=`from_one_tap`,e.FLOATING_ONE_TAP=`from_floating_one_tap`,e.MULTIBRANDING=`from_multibranding`})(P||={});var F;(function(e){e[e.EventNotSupported=100]=`EventNotSupported`,e[e.CannotCreateNewTab=101]=`CannotCreateNewTab`,e[e.NewTabHasBeenClosed=102]=`NewTabHasBeenClosed`,e[e.AuthorizationFailed=103]=`AuthorizationFailed`,e[e.StateMismatch=104]=`StateMismatch`})(F||={});var se=`code`,I={[F.EventNotSupported]:`Event is not supported`,[F.CannotCreateNewTab]:`Cannot create new tab. Try checking your browser settings`,[F.NewTabHasBeenClosed]:`New tab has been closed`,[F.AuthorizationFailed]:`Authorization failed with an error`,[F.StateMismatch]:`The received state does not match the expected state`},ce=class extends T{state=N();sendSuccessData=e=>{this.sendSuccess({type:e.type,code:e.code,state:e.state,device_id:e.device_id,expires_in:e.expires_in,ext_id:e.ext_id})};sendNewTabHasBeenClosed=()=>{this.sendError({code:F.NewTabHasBeenClosed,error:I[F.NewTabHasBeenClosed],state:this.state})};sendAuthorizationFailed=e=>{this.sendError({code:F.AuthorizationFailed,error:I[F.AuthorizationFailed],error_description:JSON.stringify(e),state:this.state})};sendEventNotSupported=()=>{this.sendError({code:F.EventNotSupported,error:I[F.EventNotSupported],state:this.state})};sendCannotCreateNewTab=()=>{this.sendError({code:F.CannotCreateNewTab,error:I[F.CannotCreateNewTab],state:this.state})};sendStateMismatchError=()=>{this.sendError({code:F.StateMismatch,error:I[F.StateMismatch],state:this.state})}},le=class{actionStatsCollector;constructor(e){this.actionStatsCollector=e}logEvent(e){let t={type:l.TYPE_SAK_SESSION_EVENT_ITEM,[l.TYPE_SAK_SESSION_EVENT_ITEM]:e};return this.actionStatsCollector.logEvent({screen:u.NOWHERE,event:t})}sendSdkInit(e,t){this.logEvent({step:`vkid_sdk_init`,additional_info:e,fields:t})}},L=e=>(t,n,r)=>{let i=r.value;r.value=function(t){let n=Object.keys(e);for(let r of n)e[r]?.forEach(e=>{let{result:n,makeError:i}=e(t[r]);if(!n)throw Error(i(r))});return i?.apply(this,arguments)}},R=e=>{let t=!0;return(typeof e==`string`&&e.trim()===``||e===void 0||e==null)&&(t=!1),{result:t,makeError:e=>`${e} is required parameter`}},ue=e=>({result:[`number`,`string`].includes(typeof e)&&!isNaN(parseInt(e)),makeError:e=>`${e} should be number`}),de=e=>({result:e!==void 0&&e.height!==void 0&&ue(e.height)&&e.height<57&&e.height>31||e===void 0||e.height===void 0,makeError:()=>`The height should correspond to the range from 32 to 56`}),fe=e=>({result:e?.length&&e.length>=1,makeError:()=>`OAuth list can't be empty`}),pe;(function(e){e[e.OFF=0]=`OFF`,e[e.ON=1]=`ON`,e[e.IN_PROGRESS=2]=`IN_PROGRESS`})(pe||={});var me=class{config;constructor(e){this.config=e}init(){this.getTrackerId().then(e=>{e?.response?.active===pe.ON&&this.includeOnPage(e.response.tracker_id)}).catch(console.error)}getTrackerId(){return x(v(`vkid_sdk_get_config`,this.config),{})}includeOnPage(e){if((window._tmr||(window._tmr=[])).push({id:e,type:`pageView`,start:new Date().getTime()}),document.getElementById(`tmr-code`))return;let t=document.createElement(`script`);t.type=`text/javascript`,t.async=!0,t.id=`tmr-code`,t.src=`https://mytopf.com/js/code.js`;let n=document.getElementsByTagName(`script`)[0];n.parentNode.insertBefore(t,n)}},z;(function(e){e.Redirect=`redirect`,e.InNewTab=`new_tab`,e.InNewWindow=`new_window`})(z||={});var he;(function(e){e.Redirect=`redirect`,e.Callback=`callback`})(he||={});var ge;(function(e){e.LOWCODE=`lowcode`})(ge||={});var _e;(function(e){e.Default=``,e.None=`none`,e.Login=`login`,e.Consent=`consent`,e.SelectAccount=`select_account`})(_e||={});function ve(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var ye=class{sakSessionStatsCollector;store={app:0,redirectUrl:``,mode:z.InNewTab,responseMode:he.Redirect,codeVerifier:``,to:``,state:``,prompt:[_e.Default],__loginDomain:m,__oauthDomain:h,__vkidDomain:g,__apiDomain:_,__oauthVersion:2};myTrackerService;constructor(){let e=new C(new S(this));this.sakSessionStatsCollector=new le(e),this.myTrackerService=new me(this)}init(e){let t=e.groupSubscriptionsLimit?.maxSubscriptionsToShow,n=e.groupSubscriptionsLimit?.periodInDays;return this.set(e),this.sakSessionStatsCollector.sendSdkInit(e.source,[{name:`limit_settings`,value:`${t||2};${n||30}`}]),this.myTrackerService.init(),this}update(e){return this.set(e)}set(e){return this.store={...this.store,...e},this}get(){return this.store}};ve([L({app:[R,ue],redirectUrl:[R]})],ye.prototype,`init`,null);var be=[`.vk.com`,`.vk.ru`],xe=e=>!!be.find(t=>e.endsWith(t)),Se=n(((e,t)=>{t.exports={}})),Ce=n(((t,n)=>{(function(e,r){typeof t==`object`?n.exports=t=r():typeof define==`function`&&define.amd?define([],r):e.CryptoJS=r()})(t,function(){var t=t||function(t,n){var r;if(typeof window<`u`&&window.crypto&&(r=window.crypto),typeof self<`u`&&self.crypto&&(r=self.crypto),typeof globalThis<`u`&&globalThis.crypto&&(r=globalThis.crypto),!r&&typeof window<`u`&&window.msCrypto&&(r=window.msCrypto),!r&&typeof global<`u`&&global.crypto&&(r=global.crypto),!r&&typeof e==`function`)try{r=Se()}catch{}var i=function(){if(r){if(typeof r.getRandomValues==`function`)try{return r.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof r.randomBytes==`function`)try{return r.randomBytes(4).readInt32LE()}catch{}}throw Error(`Native crypto module could not be used to get secure random number.`)},a=Object.create||function(){function e(){}return function(t){var n;return e.prototype=t,n=new e,e.prototype=null,n}}(),o={},s=o.lib={},c=s.Base=function(){return{extend:function(e){var t=a(this);return e&&t.mixIn(e),(!t.hasOwnProperty(`init`)||this.init===t.init)&&(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty(`toString`)&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),l=s.WordArray=c.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t==n?e.length*4:t},toString:function(e){return(e||d).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes,i=e.sigBytes;if(this.clamp(),r%4)for(var a=0;a<i;a++){var o=n[a>>>2]>>>24-a%4*8&255;t[r+a>>>2]|=o<<24-(r+a)%4*8}else for(var s=0;s<i;s+=4)t[r+s>>>2]=n[s>>>2];return this.sigBytes+=i,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-n%4*8,e.length=t.ceil(n/4)},clone:function(){var e=c.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var t=[],n=0;n<e;n+=4)t.push(i());return new l.init(t,e)}}),u=o.enc={},d=u.Hex={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push((a>>>4).toString(16)),r.push((a&15).toString(16))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-r%8*4;return new l.init(n,t/2)}},f=u.Latin1={stringify:function(e){for(var t=e.words,n=e.sigBytes,r=[],i=0;i<n;i++){var a=t[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(a))}return r.join(``)},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(e.charCodeAt(r)&255)<<24-r%4*8;return new l.init(n,t)}},p=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(f.stringify(e)))}catch{throw Error(`Malformed UTF-8 data`)}},parse:function(e){return f.parse(unescape(encodeURIComponent(e)))}},m=s.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new l.init,this._nDataBytes=0},_append:function(e){typeof e==`string`&&(e=p.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(e){var n,r=this._data,i=r.words,a=r.sigBytes,o=this.blockSize,s=a/(o*4);s=e?t.ceil(s):t.max((s|0)-this._minBufferSize,0);var c=s*o,u=t.min(c*4,a);if(c){for(var d=0;d<c;d+=o)this._doProcessBlock(i,d);n=i.splice(0,c),r.sigBytes-=u}return new l.init(n,u)},clone:function(){var e=c.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});s.Hasher=m.extend({cfg:c.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){m.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new h.HMAC.init(e,n).finalize(t)}}});var h=o.algo={};return o}(Math);return t})})),we=n(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(Ce()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(){var t=e,n=t.lib.WordArray,r=t.enc;r.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp();for(var i=[],a=0;a<n;a+=3)for(var o=t[a>>>2]>>>24-a%4*8&255,s=t[a+1>>>2]>>>24-(a+1)%4*8&255,c=t[a+2>>>2]>>>24-(a+2)%4*8&255,l=o<<16|s<<8|c,u=0;u<4&&a+u*.75<n;u++)i.push(r.charAt(l>>>6*(3-u)&63));var d=r.charAt(64);if(d)for(;i.length%4;)i.push(d);return i.join(``)},parse:function(e){var t=e.length,n=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var a=0;a<n.length;a++)r[n.charCodeAt(a)]=a}var o=n.charAt(64);if(o){var s=e.indexOf(o);s!==-1&&(t=s)}return i(e,t,r)},_map:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`};function i(e,t,r){for(var i=[],a=0,o=0;o<t;o++)if(o%4){var s=r[e.charCodeAt(o-1)]<<o%4*2|r[e.charCodeAt(o)]>>>6-o%4*2;i[a>>>2]|=s<<24-a%4*8,a++}return n.create(i,a)}})(),e.enc.Base64})})),Te=n(((e,t)=>{(function(n,r){typeof e==`object`?t.exports=e=r(Ce()):typeof define==`function`&&define.amd?define([`./core`],r):r(n.CryptoJS)})(e,function(e){return(function(t){var n=e,r=n.lib,i=r.WordArray,a=r.Hasher,o=n.algo,s=[],c=[];(function(){function e(e){for(var n=t.sqrt(e),r=2;r<=n;r++)if(!(e%r))return!1;return!0}function n(e){return(e-(e|0))*4294967296|0}for(var r=2,i=0;i<64;)e(r)&&(i<8&&(s[i]=n(t.pow(r,1/2))),c[i]=n(t.pow(r,1/3)),i++),r++})();var l=[],u=o.SHA256=a.extend({_doReset:function(){this._hash=new i.init(s.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],u=n[5],d=n[6],f=n[7],p=0;p<64;p++){if(p<16)l[p]=e[t+p]|0;else{var m=l[p-15],h=(m<<25|m>>>7)^(m<<14|m>>>18)^m>>>3,g=l[p-2],_=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;l[p]=h+l[p-7]+_+l[p-16]}var v=s&u^~s&d,y=r&i^r&a^i&a,b=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),x=(s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25),S=f+x+v+c[p]+l[p],C=b+y;f=d,d=u,u=s,s=o+S|0,o=a,a=i,i=r,r=S+C|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+a|0,n[3]=n[3]+o|0,n[4]=n[4]+s|0,n[5]=n[5]+u|0,n[6]=n[6]+d|0,n[7]=n[7]+f|0},_doFinalize:function(){var e=this._data,n=e.words,r=this._nDataBytes*8,i=e.sigBytes*8;return n[i>>>5]|=128<<24-i%32,n[(i+64>>>9<<4)+14]=t.floor(r/4294967296),n[(i+64>>>9<<4)+15]=r,e.sigBytes=n.length*4,this._process(),this._hash},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});n.SHA256=a._createHelper(u),n.HmacSHA256=a._createHmacHelper(u)})(Math),e.SHA256})})),Ee=t(we()),De=t(Te()),Oe=e=>{let t=(0,De.default)(e);return Ee.default.stringify(t).replace(/=*$/g,``).replace(/\+/g,`-`).replace(/\//g,`_`)},ke=(e,t,n)=>{let r={...t,v:f,sdk_type:`vkid`,app_id:n.app,redirect_uri:n.redirectUrl,debug:n.__debug?1:null,localhost:n.__localhost?1:null},i=s.stringify(r,{skipNull:!0});return`https://${n.__vkidDomain}/${e}?${i}`},Ae=(e,t)=>{let n=t.get().redirectUrl,r=n.includes(`?`),i=Object.keys(e).map(t=>encodeURIComponent(t)+`=`+encodeURIComponent(e[t])).join(`&`);return`${n}${r?`&`:`?`}${i}`},je=e=>{if(Object.values(e).filter(Boolean).length)return btoa(JSON.stringify(e))},Me=D(`qazwsxedcrfvtgbyhnujmikol`,6);function Ne(e){return e||=Object.create(null),{on:function(t,n){(e[t]||(e[t]=[])).push(n)},off:function(t,n){e[t]&&e[t].splice(e[t].indexOf(n)>>>0,1)},emit:function(t,n){(e[t]||[]).slice().map(function(e){e(n)}),(e[`*`]||[]).slice().map(function(e){e(t,n)})}}}var Pe=class{events=Ne();on(e,t){return this.events.on(e,t),this}off(e,t){return this.events.off(e,t),this}},Fe;(function(e){e.MESSAGE=`message`,e.UNSUPPORTED_MESSAGE=`unsupported_message`})(Fe||={});var Ie=`vk-sak-sdk`,Le=class extends Pe{config;constructor(e){super(),this.config=e,this.handleMessage=this.handleMessage.bind(this),window.addEventListener(`message`,this.handleMessage)}destroy(){delete this.config,window.removeEventListener(`message`,this.handleMessage)}sendMessage(e){this.config.iframe.contentWindow?.postMessage({type:Ie,...e},this.config.origin)}handleMessage(e){if(!this.config.origin||e.origin!==this.config.origin||e.source!==this.config.iframe.contentWindow||e.data?.type!==`vk-sak-sdk`){this.events.emit(Fe.UNSUPPORTED_MESSAGE,e.data);return}this.events.emit(Fe.MESSAGE,e.data)}},B;(function(e){e.LOGIN_SUCCESS=`onetap: success login`,e.SHOW_FULL_AUTH=`onetap: show full auth`,e.START_AUTHORIZE=`onetap: start authorize`,e.NOT_AUTHORIZED=`onetap: not authorized`,e.AUTHENTICATION_INFO=`onetap: authentication_info`})(B||={});var V;(function(e){e.LOADING=`loading`,e.LOADED=`loaded`,e.NOT_LOADED=`not_loaded`})(V||={});var H;(function(e){e[e.TimeoutExceeded=0]=`TimeoutExceeded`,e[e.InternalError=1]=`InternalError`,e[e.AuthError=2]=`AuthError`})(H||={});var Re={[H.TimeoutExceeded]:`timeout`,[H.InternalError]:`internal error`,[H.AuthError]:`auth error`},U;(function(e){e.START_LOAD=`common: start load`,e.LOAD=`common: load`,e.SHOW=`common: show`,e.HIDE=`common: hide`,e.CLOSE=`common: close`,e.ERROR=`common: error`,e.RESIZE=`common: resize`})(U||={});var ze=e=>`
<div id="${e}" data-test-id="widget">
  <style>
    #${e} {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }

    #${e} iframe {
      border: none;
      color-scheme: auto;
    }

    #${e} .loader,
    #${e} .error {
      display: none;
      width: 100%;
      height: 100%;
      text-align: center;
    }
  </style>
  <div class="loader"></div>
  <div class="error"></div>
  <iframe width="100%" height="100%"></iframe>
</div>
  `;function Be(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Ve=5e3,He=300,W=class e extends Pe{static config;static auth;id=Me();lang;scheme;vkidAppName=``;config;timeoutTimer;bridge;container;templateRenderer=ze;elements;constructor(){super(),this.config=e.config}render(e){let{container:t,...n}=e;return this.container=t,this.renderTemplate(),this.registerElements(),`fastAuthDisabled`in e&&e.fastAuthDisabled?(this.setState(V.NOT_LOADED),this):(this.loadWidgetFrame(n),this)}close(){clearTimeout(this.timeoutTimer),this.elements?.root?.remove(),this.bridge?.destroy(),this.events.emit(U.CLOSE)}show(){return this.elements.root&&(this.elements.root.style.display=`block`,this.events.emit(U.SHOW)),this}hide(){return this.elements.root&&(this.elements.root.style.display=`none`,this.events.emit(U.HIDE)),this}onStartLoadHandler(){this.setState(V.LOADING),this.timeoutTimer=setTimeout(()=>{this.onErrorHandler({code:H.TimeoutExceeded,text:Re[H.TimeoutExceeded]})},Ve),this.events.emit(U.START_LOAD)}onLoadHandler(){clearTimeout(this.timeoutTimer),setTimeout(()=>{this.setState(V.LOADED)},He),this.events.emit(U.LOAD)}onErrorHandler(e){clearTimeout(this.timeoutTimer),this.setState(V.NOT_LOADED),this.events.emit(B.AUTHENTICATION_INFO,{is_online:!1}),this.events.emit(U.ERROR,e),this.elements?.iframe?.remove()}onBridgeMessageHandler(e){switch(e.handler){case U.LOAD:this.onLoadHandler();break;case U.CLOSE:this.close();break;case U.ERROR:this.onErrorHandler({code:H.InternalError,text:Re[H.InternalError],details:e.params});break;case U.RESIZE:this.elements.root.style.height=`${e.params.height}px`}}renderTemplate(){this.container.insertAdjacentHTML(`beforeend`,this.templateRenderer(this.id))}loadWidgetFrame(e){this.onStartLoadHandler(),this.bridge=new Le({iframe:this.elements.iframe,origin:`https://${this.config.get().__vkidDomain}`}),this.bridge.on(Fe.MESSAGE,e=>this.onBridgeMessageHandler(e)),this.elements.iframe.src=this.getWidgetFrameSrc(this.config.get(),e)}getWidgetFrameSrc(e,t){let n={...t,origin:location.protocol+`//`+location.host,oauth_version:e.__oauthVersion};return ke(this.vkidAppName,n,e)}setState(e){this.elements.root.setAttribute(`data-state`,e)}registerElements(){let e=document.getElementById(this.id);this.elements={root:e,iframe:e.querySelector(`iframe`)}}redirectWithPayload(t){location.assign(Ae(t,e.config))}};Be([L({container:[R]})],W.prototype,`render`,null);var G;(function(e){e[e.RUS=0]=`RUS`,e[e.UKR=1]=`UKR`,e[e.ENG=3]=`ENG`,e[e.SPA=4]=`SPA`,e[e.GERMAN=6]=`GERMAN`,e[e.POL=15]=`POL`,e[e.FRA=16]=`FRA`,e[e.UZB=65]=`UZB`,e[e.TURKEY=82]=`TURKEY`,e[e.KAZ=97]=`KAZ`,e[e.BEL=114]=`BEL`})(G||={});var K;(function(e){e.LIGHT=`light`,e.DARK=`dark`})(K||={});var Ue=class{registrationStatsCollector;uniqueSessionId;constructor(e){let t=new C(new S(e));this.registrationStatsCollector=new d(t)}setUniqueSessionId(e){this.uniqueSessionId=e}getFields(){let e=[{name:`sdk_type`,value:`vkid`}];return this.uniqueSessionId&&e.push({name:`unique_session_id`,value:this.uniqueSessionId}),e}sendMultibrandingOauthAdded({screen:e,fields:t}){this.registrationStatsCollector.logEvent(e,{event_type:`multibranding_oauth_added`,fields:[...this.getFields(),...t]})}sendOkButtonShow({screen:e,isIcon:t}){this.registrationStatsCollector.logEvent(e,{event_type:`ok_button_show`,fields:[...this.getFields(),{name:`button_type`,value:t?`icon`:`default`}]})}sendVkButtonShow({screen:e,isIcon:t}){this.registrationStatsCollector.logEvent(e,{event_type:`vk_button_show`,fields:[...this.getFields(),{name:`button_type`,value:t?`icon`:`default`}]})}sendMailButtonShow({screen:e,isIcon:t}){this.registrationStatsCollector.logEvent(e,{event_type:`mail_button_show`,fields:[...this.getFields(),{name:`button_type`,value:t?`icon`:`default`}]})}sendVkButtonTap({screen:e,isIcon:t}){return this.registrationStatsCollector.logEvent(e,{event_type:`vk_button_tap`,fields:[...this.getFields(),{name:`button_type`,value:t?`icon`:`default`}]})}sendOkButtonTap({screen:e,isIcon:t}){return this.registrationStatsCollector.logEvent(e,{event_type:`ok_button_tap`,fields:[...this.getFields(),{name:`button_type`,value:t?`icon`:`default`}]})}sendMailButtonTap({screen:e,isIcon:t}){return this.registrationStatsCollector.logEvent(e,{event_type:`mail_button_tap`,fields:[...this.getFields(),{name:`button_type`,value:t?`icon`:`default`}]})}},We;(function(e){e.VK=`vk`,e.OK=`ok_ru`,e.MAIL=`mail_ru`})(We||={});var Ge;(function(e){e.LOGIN_SUCCESS=`oauthlist: success login`})(Ge||={});var Ke=e=>e==null,q;(function(e){e.OK=`ok_ru`,e.MAIL=`mail_ru`,e.VK=`vkid`})(q||={});var qe;(function(e){e[e.OK=q.OK]=`OK`,e[e.MAIL=q.MAIL]=`MAIL`})(qe||={});var Je={[q.OK]:`OK`,[q.MAIL]:`Mail`,[q.VK]:`VK ID`},Ye={[G.RUS]:`или войти через VK\xA0ID\xA0с использованием данных из\xA0сервиса`,[G.UKR]:`або увійти через VK\xA0ID\xA0з використанням даних із\xA0сервісу`,[G.BEL]:`ці ўвайсці праз VK\xA0ID\xA0з выкарыстаннем даных з\xA0сэрвісу`,[G.KAZ]:`сервистегі деректерді пайдаланып VK\xA0ID арқылы кіру`,[G.UZB]:`yoki xizmatning\xA0maʼlumotlaridan\xA0foydalangan holda VK\xA0ID\xA0orqali kirish`,[G.ENG]:`or\xA0sign\xA0in with VK\xA0ID\xA0using information from a\xA0service`,[G.SPA]:`o\xA0iniciar sesión con\xA0VK\xA0ID utilizando la información de\xA0un\xA0servicio`,[G.GERMAN]:`oder melden Sie sich mit\xA0Ihrer\xA0VK-ID an, indem Sie Informationen aus dem\xA0Dienst verwenden`,[G.POL]:`lub wejdź poprzez VK\xA0ID\xA0przy użyciu danych z\xA0serwisu`,[G.FRA]:`ou se connecter avec VK\xA0ID\xA0en utilisant les\xA0informations d'un\xA0service`,[G.TURKEY]:`Ya\xA0da hizmetteki verileri kullanarak\xA0VK\xA0ID hizmeti yardımıyla gir`},Xe={[G.RUS]:{[q.OK]:`Войти через OK`,[q.MAIL]:`Войти с Mail`,[q.VK]:`Войти с VK ID`},[G.UKR]:`Увійти з {provider}`,[G.BEL]:`Увайсці з {provider}`,[G.KAZ]:`{provider} кіру`,[G.UZB]:`{provider} orqali kirish`,[G.ENG]:`Sign in with {provider}`,[G.SPA]:`Iniciar sesión con {provider}`,[G.GERMAN]:`Mit {provider} anmelden`,[G.POL]:`Zaloguj się z {provider}`,[G.FRA]:`Se connecter avec {provider}`,[G.TURKEY]:`{provider}'den gir`},Ze=`
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>
  </svg>
`,Qe={[q.VK]:e=>`
<svg width="${e+1}" height="${e}" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.33331 13.56C3.33331 8.58197 3.33331 6.09295 4.87979 4.54648C6.42627 3 8.91528 3 13.8933 3H14.7733C19.7513 3 22.2404 3 23.7868 4.54648C25.3333 6.09295 25.3333 8.58197 25.3333 13.56V14.44C25.3333 19.418 25.3333 21.907 23.7868 23.4535C22.2404 25 19.7513 25 14.7733 25H13.8933C8.91528 25 6.42627 25 4.87979 23.4535C3.33331 21.907 3.33331 19.418 3.33331 14.44V13.56Z" fill="#0077FF" style="fill:#0077FF;fill:color(display-p3 0.0000 0.4667 1.0000);fill-opacity:1;"/>
  <path d="M15.0398 18.9C10.0174 18.9 7.15269 15.4466 7.03333 9.70001H9.54912C9.63175 13.9178 11.4864 15.7044 12.9555 16.0728V9.70001H15.3245V13.3376C16.7752 13.1811 18.2992 11.5234 18.8134 9.70001H21.1823C20.7875 11.9471 19.1348 13.6047 17.9595 14.2862C19.1348 14.8387 21.0171 16.2846 21.7333 18.9H19.1256C18.5655 17.1503 17.17 15.7965 15.3245 15.6123V18.9H15.0398Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>
  `,[q.OK]:e=>`
<svg width="${e}" height="${e}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.67554 3.67638C2 5.36482 2 8.09045 2 13.5176V14.4824C2 19.9216 2 22.6352 3.68759 24.3236C5.37519 26 8.09944 26 13.5238 26H14.4882C19.9126 26 22.6489 26 24.3245 24.3236C26 22.6352 26 19.9095 26 14.4824V13.5176C26 8.09045 26 5.35276 24.3245 3.67638C22.6369 2 19.9126 2 14.4882 2H13.5239C8.08739 2 5.37519 2 3.67554 3.67638Z" fill="#EE8208" style="fill:#EE8208;fill:color(display-p3 0.9333 0.5098 0.0314);fill-opacity:1;"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1157 12.621C16.3239 13.4108 15.218 13.9122 13.999 13.9122C12.7926 13.9122 11.6741 13.4108 10.8823 12.621C10.0906 11.8313 9.58793 10.7407 9.58793 9.51224C9.58793 8.28377 10.0906 7.18065 10.8823 6.40345C11.6741 5.61372 12.78 5.1123 13.999 5.1123C15.218 5.1123 16.3239 5.61372 17.1157 6.40345C17.9074 7.19319 18.4101 8.2963 18.4101 9.51224C18.4101 10.7282 17.9074 11.8313 17.1157 12.621ZM14.0116 7.49404C13.4586 7.49404 12.9559 7.71967 12.5915 8.0832C12.2396 8.44673 12.0008 8.94814 12.0008 9.4997C12.0008 10.0513 12.227 10.5527 12.5915 10.9162C12.9559 11.2797 13.446 11.5054 14.0116 11.5054C14.5645 11.5054 15.0672 11.2797 15.4317 10.9162C15.7961 10.5527 16.0223 10.0638 16.0223 9.4997C16.0223 8.94814 15.7961 8.44673 15.4317 8.0832C15.0672 7.71967 14.5771 7.49404 14.0116 7.49404Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
  <path d="M18.6614 13.9247L19.9558 15.6922C20.0312 15.7799 20.0187 15.8927 19.8553 15.968C18.762 16.8705 17.4927 17.4471 16.1731 17.7605L18.9128 22.5741C18.9882 22.7246 18.9002 22.8875 18.7368 22.8875H16.06C15.9721 22.8875 15.8967 22.8248 15.8715 22.7496L13.9613 18.4876L12.0511 22.7496C12.026 22.8374 11.9506 22.8875 11.8626 22.8875H9.1858C9.03499 22.8875 8.93445 22.712 9.00986 22.5741L11.7495 17.7605C10.4299 17.4471 9.16066 16.8454 8.06732 15.968C7.99192 15.8927 7.97935 15.7799 8.04219 15.6922L9.3366 13.9247C9.412 13.8369 9.56281 13.8244 9.65078 13.8996C10.8824 14.9401 12.3779 15.617 13.999 15.617C15.6202 15.617 17.1282 14.9401 18.3472 13.8996C18.4352 13.8119 18.586 13.8244 18.6614 13.9247Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>
  `,[q.MAIL]:e=>`
<svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${e}" fill="none" viewBox="0 0 28 28">
    <path fill="#07F" d="M17.61 14a3.61 3.61 0 0 1-7.22 0A3.61 3.61 0 0 1 14 10.39a3.62 3.62 0 0 1 3.61 3.6Zm-3.6-12C7.37 2 2 7.38 2 14a12.01 12.01 0 0 0 18.77 9.91l.03-.02L19.2 22l-.03.01A9.54 9.54 0 0 1 14 23.53a9.55 9.55 0 0 1 0-19.07 9.55 9.55 0 0 1 9.31 11.59c-.3 1.24-1.16 1.62-1.82 1.56-.65-.05-1.42-.51-1.43-1.66V14A6.08 6.08 0 0 0 14 7.93 6.08 6.08 0 0 0 7.93 14 6.08 6.08 0 0 0 14 20.07c1.62 0 3.15-.64 4.3-1.8a3.9 3.9 0 0 0 3 1.8l.32.01a4.08 4.08 0 0 0 2.44-.82 4.5 4.5 0 0 0 1.55-2.28l.13-.5v-.02A12 12 0 0 0 14 2Z"/>
</svg>
  `},$e={height:44,borderRadius:8},et=e=>t=>{let n=e.lang||G.RUS,r=e.scheme||`light`,i=Ke(e.borderRadius)?$e.borderRadius:e.borderRadius,a=e.height||$e.height,o=a<40?24:28,s=a<40?6:a<48?8:12,c=e.oauthList.map(e=>{let t=n===G.RUS?Xe[n][e]:`${Xe[n].replace(`{provider}`,Je[e])}`;return`
      <div class="VkIdSdk_oauth_item" data-oauth="${e}">
        ${Qe[e](o)}
        <div class="VkIdSdk_oauth_button_text">${t}</div>
      </div>
    `}).join(``),l=()=>{let e=document.querySelector(`#${t} .VkIdSdk_oauth_button_text`),n=document.querySelector(`#${t} .VkIdSdk_oauth_item`);e&&n&&e.clientWidth>=n.clientWidth-o*2-32-s*2&&document.querySelector(`#${t} .VkIdSdk_oauth_list`)?.removeAttribute(`data-single-mode`)};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,l):setTimeout(l,0);let u=e.oauthList.length===1?`data-single-mode`:``;return`
    <div id="${t}" class="VkIdSdk_oauth_container" data-test-id="oauthList" data-scheme="${r}">
      <style>
        :root #${t}[data-scheme=light] {
          --oauthlist--item_border_color: rgba(0, 0, 0, .12);
          --oauthlist--color_text_secondary: #818c99;
          --oauthlist--color_text_primary: #000;
          --oauthlist--item_background_color: #fff;
        }

        :root #${t}[data-scheme=dark] {
          --oauthlist--item_border_color: rgba(255, 255, 255, 0.12);
          --oauthlist--color_text_secondary: #76787a;
          --oauthlist--color_text_primary: #e1e3e6;
          --oauthlist--item_background_color: unset;
        }

        #${t}.VkIdSdk_oauth_container {
          position: relative;
        }

        #${t} .VkIdSdk_oauth_list {
          display: flex;
          height: ${a}px;
        }

        #${t} .VkIdSdk_oauth_item {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: ${s}px;
          margin-right: 12px;
          width: 100%;
          border: 1px solid var(--oauthlist--item_border_color);
          background: var(--oauthlist--item_background_color);
          border-radius: ${i}px;
          cursor: pointer;
        }

        #${t} .VkIdSdk_oauth_item:last-child {
          margin-right: 0;
        }

        #${t} .VkIdSdk_oauth_link_text {
          display: flex;
          font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
          color: var(--oauthlist--color_text_secondary);
          font-size: 13px;
          line-height: 16px;
          margin-bottom: 16px;
          justify-content: center;
          text-align: center;
        }

        #${t} .VkIdSdk_spinner {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #fff;
        }

        #${t}[data-state=loaded] .VkIdSdk_spinner {
          transition: .2s;
          opacity: 0;
          pointer-events: none;
        }

        #${t} .VkIdSdk_spinner > svg {
          animation: vkIdSdkButtonSpinner 0.7s linear infinite;
        }

        #${t} .VkIdSdk_oauth_button_text {
          display: none;
          font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
          color: var(--oauthlist--color_text_primary);
          padding-left: 8px;
        }

        #${t} .VkIdSdk_oauth_list[data-single-mode] .VkIdSdk_oauth_button_text {
          display: block;
        }

        @keyframes vkIdSdkButtonSpinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="VkIdSdk_spinner">
        ${Ze}
      </div>
      <div class="VkIdSdk_oauth_link_text">${Ye[n]}</div>
      <div class="VkIdSdk_oauth_list" ${u}>${c}</div>
    </div>
  `};function tt(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var nt=class e extends W{analytics;providers;flowSource;uniqueSessionId;constructor(){super(),this.analytics=new Ue(this.config)}sendStartAnalytics(){let e=new Set(this.providers);this.analytics.sendMultibrandingOauthAdded({screen:this.flowSource,fields:[{name:We.VK,value:(+e.has(q.VK)).toString()},{name:We.OK,value:(+e.has(q.OK)).toString()},{name:We.MAIL,value:(+e.has(q.MAIL)).toString()}]}),e.has(q.VK)&&this.analytics.sendVkButtonShow({screen:this.flowSource,isIcon:e.size>1}),e.has(q.OK)&&this.analytics.sendOkButtonShow({screen:this.flowSource,isIcon:e.size>1}),e.has(q.MAIL)&&this.analytics.sendMailButtonShow({screen:this.flowSource,isIcon:e.size>1})}render(e){return this.lang=e?.lang||G.RUS,this.scheme=e?.scheme||K.LIGHT,this.providers=e.oauthList,this.flowSource=e?.flowSource||u.MULTIBRANDING,this.uniqueSessionId=e?.uniqueSessionId||this.id,this.analytics.setUniqueSessionId(this.uniqueSessionId),this.templateRenderer=et({lang:this.lang,oauthList:e.oauthList,height:e.styles?.height,borderRadius:e.styles?.borderRadius,scheme:this.scheme}),this.container=e.container,this.renderTemplate(),this.registerElements(),this.setState(V.LOADED),this.sendStartAnalytics(),this.elements.root.addEventListener(`click`,this.handleClick.bind(this)),this}handleClick(t){let n=t.target.closest(`[data-oauth]`);if(!n)return;let r=n.getAttribute(`data-oauth`),i={lang:this.lang,scheme:this.scheme,provider:r,statsFlowSource:P.MULTIBRANDING,uniqueSessionId:this.uniqueSessionId},a;switch(r){case q.VK:a=this.analytics.sendVkButtonTap.bind(this.analytics);break;case q.OK:a=this.analytics.sendOkButtonTap.bind(this.analytics);break;case q.MAIL:a=this.analytics.sendMailButtonTap.bind(this.analytics)}let o=()=>{e.auth.login(i).then(e=>{this.events.emit(Ge.LOGIN_SUCCESS,e)}).catch(e=>{this.events.emit(U.ERROR,{code:H.AuthError,text:e.error})})},s={screen:this.flowSource,isIcon:this.providers.length>1};this.config.get().mode===z.Redirect?a(s).finally(o):(a(s),o())}};tt([L({oauthList:[fe]})],nt.prototype,`render`,null);var rt=`s256`,it=class e{static config;dataService;opener;interval;id=Me();analytics;state;codeVerifier;to;constructor(){this.analytics=new w(e.config)}close=()=>{this.opener&&this.opener.close()};handleMessage=({origin:t,source:n,data:r})=>{if(n===this.opener&&this.opener&&xe(t)){if(this.unsubscribe(),r.payload.error){this.dataService.sendAuthorizationFailed(r.payload.error);return}if(r.action===`oauth2_authorize_response`+this.state){if(this.state!==r.payload.state)this.dataService.sendStateMismatchError();else{oe(r.payload.ext_id),delete r.payload.ext_id,ne(),this.state=``,ie(),this.to=``;let{responseMode:t}=e.config.get();t===he.Redirect?(this.redirectWithPayload(r.payload),this.close()):this.dataService.sendSuccessData(r.payload)}return}this.dataService.sendEventNotSupported()}};handleInterval=()=>{this.opener?.closed&&(this.unsubscribe(),this.dataService.sendNewTabHasBeenClosed())};subscribe=()=>{this.interval=window.setInterval(this.handleInterval,1e3),window.addEventListener(`message`,this.handleMessage),this.dataService.removeCallback()};unsubscribe=()=>{window.removeEventListener(`message`,this.handleMessage),clearInterval(this.interval),this.dataService.setCallback(this.close)};loginInNewTab=e=>{let t=window.open(e,`_blank`);return this.handleWindowOpen(t)};loginInNewWindow=e=>{let t=`top=${screen.height/2-400},left=${screen.width/2-400},width=800,height=800,location`,n=window.open(e,`_blank`,t);return this.handleWindowOpen(n)};handleWindowOpen=e=>(this.dataService=new ce,this.opener=e,this.opener?this.subscribe():this.dataService.sendCannotCreateNewTab(),this.dataService.value);loginByRedirect=e=>(location.assign(e),Promise.resolve());login=t=>{let n=e.config.get(),{scope:r,app:i,codeChallenge:a,prompt:o}=n,s=t?.statsFlowSource||P.AUTH,c=t?.uniqueSessionId||this.id;s===P.AUTH&&this.analytics.setUniqueSessionId(c),this.codeVerifier=ee(n.codeVerifier),this.state=N(n.state),this.to=n.to?te(n.to):``;let l=[...o];(Object.values(qe).includes(t?.provider)||t?.screen)&&l.unshift(_e.Login);let u={lang_id:t?.lang,scheme:t?.scheme,code_challenge:a||Oe(this.codeVerifier),code_challenge_method:rt,client_id:i,response_type:se,scope:r,state:this.state,provider:t?.provider,prompt:l.join(` `).trim(),stats_info:je({flow_source:s,session_id:c})};n.mode!==z.Redirect&&(s===P.AUTH&&this.analytics.sendCustomAuthStart(t?.provider),u.origin=location.protocol+`//`+location.hostname);let d=ke(`authorize`,u,n);switch(n.mode){case z.InNewWindow:return this.loginInNewWindow(d);case z.InNewTab:return this.loginInNewTab(d);default:return s===P.AUTH?this.analytics.sendCustomAuthStart(t?.provider).finally(()=>{this.loginByRedirect(d)}):this.loginByRedirect(d)}};checkState(e){if(this.state!==e)return{code:F.StateMismatch,error:I[F.StateMismatch],state:e};ne(),this.state=``,ie(),this.to=``}exchangeCode(t,n,r){let i=e.config.get();this.state=N(i.state);let a={grant_type:`authorization_code`,redirect_uri:i.redirectUrl,client_id:i.app,code_verifier:r||this.codeVerifier||ee(),state:this.state,device_id:n},o=s.stringify(a);return fetch(`https://${i.__vkidDomain}/oauth2/auth?${o}`,{method:`POST`,body:new URLSearchParams({code:t})}).then(e=>this.oauthSectionFetchHandler(e)).then(e=>{let t=this.checkState(e.state);if(t)throw t;return re(),this.codeVerifier=``,ie(),this.to=``,e})}refreshToken(t,n){let r=e.config.get();this.state=N(r.state);let i={grant_type:`refresh_token`,redirect_uri:r.redirectUrl,client_id:r.app,device_id:n,state:this.state},a=s.stringify(i);return fetch(`https://${r.__vkidDomain}/oauth2/auth?${a}`,{method:`POST`,body:new URLSearchParams({refresh_token:t})}).then(e=>this.oauthSectionFetchHandler(e)).then(t=>{let n=this.checkState(t.state);if(n)throw n;return e.config.update({state:r.state}),t})}logout(t){let n=e.config.get(),r={client_id:n.app},i=s.stringify(r);return fetch(`https://${n.__vkidDomain}/oauth2/logout?${i}`,{method:`POST`,body:new URLSearchParams({access_token:t})}).then(e=>this.oauthSectionFetchHandler(e))}userInfo(t){let n=e.config.get(),r={client_id:n.app},i=s.stringify(r);return fetch(`https://${n.__vkidDomain}/oauth2/user_info?${i}`,{method:`POST`,body:new URLSearchParams({access_token:t})}).then(e=>this.oauthSectionFetchHandler(e))}publicInfo(t){let n=e.config.get(),r={client_id:n.app},i=s.stringify(r);return fetch(`https://${n.__vkidDomain}/oauth2/public_info?${i}`,{method:`POST`,body:new URLSearchParams({id_token:t})}).then(e=>this.oauthSectionFetchHandler(e))}oauthSectionFetchHandler(e){return e.json().then(e=>{if(`error`in e)throw e;return e})}redirectWithPayload(t){location.assign(Ae(t,e.config))}},at;(function(e){e.Primary=`primary`,e.Secondary=`secondary`})(at||={});var J;(function(e){e[e.SIGN_IN=0]=`SIGN_IN`,e[e.SIGN_UP=1]=`SIGN_UP`,e[e.GET=2]=`GET`,e[e.OPEN=3]=`OPEN`,e[e.CALCULATE=4]=`CALCULATE`,e[e.ORDER=5]=`ORDER`,e[e.PLACE_ORDER=6]=`PLACE_ORDER`,e[e.SUBMIT_REQUEST=7]=`SUBMIT_REQUEST`,e[e.PARTICIPATE=8]=`PARTICIPATE`})(J||={});var ot={[J.SIGN_IN]:`default`,[J.SIGN_UP]:`appoint`,[J.GET]:`receive`,[J.OPEN]:`open`,[J.CALCULATE]:`calculate`,[J.ORDER]:`order`,[J.PLACE_ORDER]:`service_order_placing`,[J.SUBMIT_REQUEST]:`request`,[J.PARTICIPATE]:`take_part`},st=class{registrationStatsCollector;uniqueSessionId;constructor(e){let t=new C(new S(e));this.registrationStatsCollector=new d(t)}setUniqueSessionId(e){this.uniqueSessionId=e}getFields(){let e=[{name:`sdk_type`,value:`vkid`}];return this.uniqueSessionId&&e.push({name:`unique_session_id`,value:this.uniqueSessionId}),e}sendFrameLoadingFailed(){this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`iframe_loading_failed`,fields:this.getFields()})}sendNoSessionFound(){this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`no_session_found`,fields:this.getFields()})}sendOneTapButtonNoUserShow(e=`default`){this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`onetap_button_no_user_show`,fields:[...this.getFields(),{name:`button_type`,value:e}]})}sendOneTapButtonNoUserTap(e=`default`){return this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`onetap_button_no_user_tap`,fields:[...this.getFields(),{name:`button_type`,value:e}]})}sendScreenProceed(e){this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`screen_proceed`,fields:[...this.getFields(),{name:`theme_type`,value:e.scheme},{name:`style_type`,value:e.skin},{name:`language`,value:e.lang.toString()},{name:`text_type`,value:ot[e.contentId]}]})}};function ct(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:window,r,i,a=function(){return e.apply(n,i)},o=function(){i=[...arguments],clearTimeout(r),r=setTimeout(a,t)};return o.cancel=function(){clearTimeout(r)},o}var lt=(function(){if(typeof Map<`u`)return Map;function e(e,t){var n=-1;return e.some(function(e,r){return e[0]===t&&(n=r,!0)}),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var n=e(this.__entries__,t),r=this.__entries__[n];return r&&r[1]},t.prototype.set=function(t,n){var r=e(this.__entries__,t);~r?this.__entries__[r][1]=n:this.__entries__.push([t,n])},t.prototype.delete=function(t){var n=this.__entries__,r=e(n,t);~r&&n.splice(r,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){t===void 0&&(t=null);for(var n=0,r=this.__entries__;n<r.length;n++){var i=r[n];e.call(t,i[1],i[0])}},t}()})(),ut=typeof window<`u`&&typeof document<`u`&&window.document===document,dt=(function(){return typeof global<`u`&&global.Math===Math?global:typeof self<`u`&&self.Math===Math?self:typeof window<`u`&&window.Math===Math?window:Function(`return this`)()})(),ft=(function(){return typeof requestAnimationFrame==`function`?requestAnimationFrame.bind(dt):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),pt=2;function mt(e,t){var n=!1,r=!1,i=0;function a(){n&&(n=!1,e()),r&&s()}function o(){ft(a)}function s(){var e=Date.now();if(n){if(e-i<pt)return;r=!0}else n=!0,r=!1,setTimeout(o,t);i=e}return s}var ht=20,gt=[`top`,`right`,`bottom`,`left`,`width`,`height`,`size`,`weight`],_t=typeof MutationObserver<`u`,vt=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=mt(this.refresh.bind(this),ht)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,n=t.indexOf(e);~n&&t.splice(n,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter(function(e){return e.gatherActive(),e.hasActive()});return e.forEach(function(e){return e.broadcastActive()}),e.length>0},e.prototype.connect_=function(){ut&&!this.connected_&&(document.addEventListener(`transitionend`,this.onTransitionEnd_),window.addEventListener(`resize`,this.refresh),_t?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener(`DOMSubtreeModified`,this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){ut&&this.connected_&&(document.removeEventListener(`transitionend`,this.onTransitionEnd_),window.removeEventListener(`resize`,this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener(`DOMSubtreeModified`,this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,n=t===void 0?``:t;gt.some(function(e){return!!~n.indexOf(e)})&&this.refresh()},e.getInstance=function(){return this.instance_||=new e,this.instance_},e.instance_=null,e}(),yt=(function(e,t){for(var n=0,r=Object.keys(t);n<r.length;n++){var i=r[n];Object.defineProperty(e,i,{value:t[i],enumerable:!1,writable:!1,configurable:!0})}return e}),Y=(function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||dt}),bt=At(0,0,0,0);function xt(e){return parseFloat(e)||0}function St(e){return[...arguments].slice(1).reduce(function(t,n){var r=e[`border-`+n+`-width`];return t+xt(r)},0)}function Ct(e){for(var t=[`top`,`right`,`bottom`,`left`],n={},r=0,i=t;r<i.length;r++){var a=i[r],o=e[`padding-`+a];n[a]=xt(o)}return n}function wt(e){var t=e.getBBox();return At(0,0,t.width,t.height)}function Tt(e){var t=e.clientWidth,n=e.clientHeight;if(!t&&!n)return bt;var r=Y(e).getComputedStyle(e),i=Ct(r),a=i.left+i.right,o=i.top+i.bottom,s=xt(r.width),c=xt(r.height);if(r.boxSizing===`border-box`&&(Math.round(s+a)!==t&&(s-=St(r,`left`,`right`)+a),Math.round(c+o)!==n&&(c-=St(r,`top`,`bottom`)+o)),!Dt(e)){var l=Math.round(s+a)-t,u=Math.round(c+o)-n;Math.abs(l)!==1&&(s-=l),Math.abs(u)!==1&&(c-=u)}return At(i.left,i.top,s,c)}var Et=(function(){return typeof SVGGraphicsElement<`u`?function(e){return e instanceof Y(e).SVGGraphicsElement}:function(e){return e instanceof Y(e).SVGElement&&typeof e.getBBox==`function`}})();function Dt(e){return e===Y(e).document.documentElement}function Ot(e){return ut?Et(e)?wt(e):Tt(e):bt}function kt(e){var t=e.x,n=e.y,r=e.width,i=e.height,a=Object.create((typeof DOMRectReadOnly<`u`?DOMRectReadOnly:Object).prototype);return yt(a,{x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:i+n,left:t}),a}function At(e,t,n,r){return{x:e,y:t,width:n,height:r}}var jt=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=At(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=Ot(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),Mt=function(){function e(e,t){var n=kt(t);yt(this,{target:e,contentRect:n})}return e}(),Nt=function(){function e(e,t,n){if(this.activeObservations_=[],this.observations_=new lt,typeof e!=`function`)throw TypeError(`The callback provided as parameter 1 is not a function.`);this.callback_=e,this.controller_=t,this.callbackCtx_=n}return e.prototype.observe=function(e){if(!arguments.length)throw TypeError(`1 argument required, but only 0 present.`);if(typeof Element<`u`&&Element instanceof Object){if(!(e instanceof Y(e).Element))throw TypeError(`parameter 1 is not of type "Element".`);var t=this.observations_;t.has(e)||(t.set(e,new jt(e)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(e){if(!arguments.length)throw TypeError(`1 argument required, but only 0 present.`);if(typeof Element<`u`&&Element instanceof Object){if(!(e instanceof Y(e).Element))throw TypeError(`parameter 1 is not of type "Element".`);var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach(function(t){t.isActive()&&e.activeObservations_.push(t)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map(function(e){return new Mt(e.target,e.broadcastRect())});this.callback_.call(e,t,e),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),Pt=typeof WeakMap<`u`?new WeakMap:new lt,Ft=function(){function e(t){if(!(this instanceof e))throw TypeError(`Cannot call a class as a function.`);if(!arguments.length)throw TypeError(`1 argument required, but only 0 present.`);var n=new Nt(t,vt.getInstance(),this);Pt.set(this,n)}return e}();[`observe`,`unobserve`,`disconnect`].forEach(function(e){Ft.prototype[e]=function(){var t;return(t=Pt.get(this))[e].apply(t,arguments)}});var It=(function(){return dt.ResizeObserver===void 0?Ft:dt.ResizeObserver})(),Lt=e=>{let t=(e-30)/2+3;return e<40?t:t-2},Rt=e=>e<40?14:e>47?17:16,zt=e=>e<40?24:28,Bt={[G.RUS]:`Войти с VK ID`,[G.UKR]:`Увійти з VK ID`,[G.BEL]:`Увайсці з VК ID`,[G.KAZ]:`VK ID арқылы кіру`,[G.UZB]:`VK ID dan kirish`,[G.ENG]:`Sign in with VK ID`,[G.SPA]:`Iniciar sesión con VK ID`,[G.GERMAN]:`Mit VK-ID anmelden`,[G.POL]:`Wejdź z VK ID`,[G.FRA]:`Se connecter avec VK ID`,[G.TURKEY]:`VK ID aracılığıyla gir`},Vt={[G.RUS]:`Записаться с VK ID`,[G.UKR]:`Записатися з VK ID`,[G.BEL]:`Запісацца з VK ID`,[G.KAZ]:`VK ID арқылы жазылу`,[G.UZB]:`VK ID bilan yozilish`,[G.ENG]:`Sign up with VK ID`,[G.SPA]:`Registrarse con VK ID`,[G.GERMAN]:`Mit VK ID anmelden`,[G.POL]:`Zapisz się z VK ID`,[G.FRA]:`Prendre RDV avec VK ID`,[G.TURKEY]:`VK ID ile kaydol`},Ht={[G.RUS]:`Получить с VK ID`,[G.UKR]:`Отримати з VK ID`,[G.BEL]:`Атрымаць з VK ID`,[G.KAZ]:`VK ID арқылы алу`,[G.UZB]:`VK ID bilan olish`,[G.ENG]:`Get with VK ID`,[G.SPA]:`Obtener con VK ID`,[G.GERMAN]:`Mit VK ID erhalten`,[G.POL]:`Otrzymaj z VK ID`,[G.FRA]:`Obtenir avec VK ID`,[G.TURKEY]:`VK ID ile al`},Ut={[G.RUS]:`Открыть с VK ID`,[G.UKR]:`Відкрити з VK ID`,[G.BEL]:`Адкрыць з VK ID`,[G.KAZ]:`VK ID арқылы ашу`,[G.UZB]:`VK ID bilan ochish`,[G.ENG]:`Open with VK ID`,[G.SPA]:`Abrir con VK ID`,[G.GERMAN]:`Mit VK ID öffnen`,[G.POL]:`Otwórz z VK ID`,[G.FRA]:`Ouvrir avec VK ID`,[G.TURKEY]:`VK ID ile aç`},Wt={[G.RUS]:`Рассчитать с VK ID`,[G.UKR]:`Розрахувати з VK ID`,[G.BEL]:`Разлічыць з VK ID`,[G.KAZ]:`VK ID арқылы есептеу`,[G.UZB]:`VK ID yordamida hisoblash`,[G.ENG]:`Calculate with VK ID`,[G.SPA]:`Calcular con VK ID`,[G.GERMAN]:`Mit VK ID berechnen`,[G.POL]:`Oblicz z VK ID`,[G.FRA]:`Calculer avec VK ID`,[G.TURKEY]:`VK ID ile hesapla`},Gt={[G.RUS]:`Заказать с VK ID`,[G.UKR]:`Замовити з VK ID`,[G.BEL]:`Заказаць з VK ID`,[G.KAZ]:`VK ID арқылы тапсырыс беру`,[G.UZB]:`VK ID bilan buyurtma berish`,[G.ENG]:`Order with VK ID`,[G.SPA]:`Pedir con VK ID`,[G.GERMAN]:`Mit VK ID bestellen`,[G.POL]:`Zamów z VK ID`,[G.FRA]:`Commander avec VK ID`,[G.TURKEY]:`VK ID ile sipariş ver`},Kt={[G.RUS]:`Оформить с VK ID`,[G.UKR]:`Оформити з VK ID`,[G.BEL]:`Аформіць з VK ID`,[G.KAZ]:`VK ID арқылы рәсімдеу`,[G.UZB]:`VK ID bilan shakllantirish`,[G.ENG]:`Order with VK ID`,[G.SPA]:`Pedir con VK ID`,[G.GERMAN]:`Mit VK ID Bestellung aufgeben`,[G.POL]:`Wypełnij z VK ID`,[G.FRA]:`Commander avec VK ID`,[G.TURKEY]:`VK ID ile yap`},qt={[G.RUS]:`Оставить заявку с VK ID`,[G.UKR]:`Залишити запит з VK ID`,[G.BEL]:`Пакінуць заяўку з VK ID`,[G.KAZ]:`VK ID арқылы өтінім қалдыру`,[G.UZB]:`VK ID bilan talabnoma qoldirish`,[G.ENG]:`Send request with VK ID`,[G.SPA]:`Enviar solicitud con VK ID`,[G.GERMAN]:`Mit VK ID Anfrage stellen`,[G.POL]:`Zostaw wniosek z VK ID`,[G.FRA]:`Envoyer demande avec VK ID`,[G.TURKEY]:`VK ID ile başvuru yap`},Jt={[G.RUS]:`Участвовать с VK ID`,[G.UKR]:`Брати участь з VK ID`,[G.BEL]:`Удзельнічаць з VK ID`,[G.KAZ]:`VK ID арқылы қатысу`,[G.UZB]:`VK ID ilan ishtirok etish`,[G.ENG]:`Participate with VK ID`,[G.SPA]:`Participar con VK ID`,[G.GERMAN]:`Mit VK ID teilnehmen`,[G.POL]:`Uczestnicz z VK ID`,[G.FRA]:`Participer avec VK ID`,[G.TURKEY]:`VK ID ile katıl`},Yt={[J.SIGN_IN]:Bt,[J.SIGN_UP]:Vt,[J.GET]:Ht,[J.OPEN]:Ut,[J.CALCULATE]:Wt,[J.ORDER]:Gt,[J.PLACE_ORDER]:Kt,[J.SUBMIT_REQUEST]:qt,[J.PARTICIPATE]:Jt},Xt=(e,t)=>{let n=Yt[e]||Yt[J.SIGN_IN];return n[t]||n[G.RUS]},Zt={[G.RUS]:`Продолжить`,[G.UKR]:`Продовжити`,[G.BEL]:`Працягнуць`,[G.KAZ]:`Жалғастыру`,[G.UZB]:`Davom etish`,[G.ENG]:`Continue`,[G.SPA]:`Continuar`,[G.GERMAN]:`Fortfahren`,[G.POL]:`Kontynuuj`,[G.FRA]:`Continuer`,[G.TURKEY]:`Devam`},Qt={[G.RUS]:`Записаться`,[G.UKR]:`Записатися`,[G.BEL]:`Запісацца`,[G.KAZ]:`Жазылу`,[G.UZB]:`Yozilish`,[G.ENG]:`Sign up`,[G.SPA]:`Registrarse`,[G.GERMAN]:`Anmelden`,[G.POL]:`Zapisz się`,[G.FRA]:`Prendre RDV`,[G.TURKEY]:`Kaydol`},$t={[G.RUS]:`Получить`,[G.UKR]:`Отримати`,[G.BEL]:`Атрымаць`,[G.KAZ]:`Алу`,[G.UZB]:`Olish`,[G.ENG]:`Get`,[G.SPA]:`Obtener`,[G.GERMAN]:`Erhalten`,[G.POL]:`Otrzymaj`,[G.FRA]:`Obtenir`,[G.TURKEY]:`Al`},en={[G.RUS]:`Открыть`,[G.UKR]:`Відкрити`,[G.BEL]:`Адкрыць`,[G.KAZ]:`Ашу`,[G.UZB]:`Ochish`,[G.ENG]:`Open`,[G.SPA]:`Abrir`,[G.GERMAN]:`Öffnen`,[G.POL]:`Otwórz`,[G.FRA]:`Ouvrir`,[G.TURKEY]:`Aç`},tn={[G.RUS]:`Рассчитать`,[G.UKR]:`Розрахувати`,[G.BEL]:`Разлічыць`,[G.KAZ]:`Есептеу`,[G.UZB]:`Hisoblash`,[G.ENG]:`Calculate`,[G.SPA]:`Calcular`,[G.GERMAN]:`Berechnen`,[G.POL]:`Oblicz`,[G.FRA]:`Calculer`,[G.TURKEY]:`Hesapla`},nn={[G.RUS]:`Заказать`,[G.UKR]:`Замовити`,[G.BEL]:`Заказаць`,[G.KAZ]:`Тапсырыс беру`,[G.UZB]:`Buyurtma berish`,[G.ENG]:`Order`,[G.SPA]:`Pedir`,[G.GERMAN]:`Bestellen`,[G.POL]:`Zamów`,[G.FRA]:`Commander`,[G.TURKEY]:`Sipariş ver`},rn={[G.RUS]:`Оформить заказ`,[G.UKR]:`Оформити замовлення`,[G.BEL]:`Аформіць заказ`,[G.KAZ]:`Тапсырысты рәсімдеу`,[G.UZB]:`Buyurtmani shakllantirish`,[G.ENG]:`Place order`,[G.SPA]:`Hacer pedido`,[G.GERMAN]:`Bestellung aufgeben`,[G.POL]:`Wypełnij zamówienie`,[G.FRA]:`Passer commande`,[G.TURKEY]:`Siparişi tamamlar`},an={[G.RUS]:`Оставить заявку`,[G.UKR]:`Залишити запит`,[G.BEL]:`Пакінуць заяўку`,[G.KAZ]:`Өтінім қалдыру`,[G.UZB]:`Talabnoma qoldirish`,[G.ENG]:`Send request`,[G.SPA]:`Enviar solicitud`,[G.GERMAN]:`Anfrage stellen`,[G.POL]:`Pozostaw wniosek`,[G.FRA]:`Envoyer demande`,[G.TURKEY]:`Başvuru bırak`},on={[G.RUS]:`Участвовать`,[G.UKR]:`Брати участь`,[G.BEL]:`Удзельнічаць`,[G.KAZ]:`Қатысу`,[G.UZB]:`Ishtirok etish`,[G.ENG]:`Participate`,[G.SPA]:`Participar`,[G.GERMAN]:`Teilnehmen`,[G.POL]:`Uczestnicz`,[G.FRA]:`Participer`,[G.TURKEY]:`Katıl`},sn={[J.SIGN_IN]:Zt,[J.SIGN_UP]:Qt,[J.GET]:$t,[J.OPEN]:en,[J.CALCULATE]:tn,[J.ORDER]:nn,[J.PLACE_ORDER]:rn,[J.SUBMIT_REQUEST]:an,[J.PARTICIPATE]:on},cn=(e,t)=>{let n=sn[e]||sn[J.SIGN_IN];return n[t]||n[G.RUS]},ln=`VK ID`,un=`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="logoBg" fill-rule="evenodd" clip-rule="evenodd" d="M4.2653 4.2653C3 5.5306 3 7.56707 3 11.64V12.36C3 16.4329 3 18.4694 4.2653 19.7347C5.5306 21 7.56706 21 11.64 21H12.36C16.4329 21 18.4694 21 19.7347 19.7347C21 18.4694 21 16.4329 21 12.36V11.64C21 7.56707 21 5.5306 19.7347 4.2653C18.4694 3 16.4329 3 12.36 3H11.64C7.56706 3 5.5306 3 4.2653 4.2653Z" fill="white"/>
    <path id="logoIcon" d="M12.6095 16C8.55576 16 6.09636 13.1823 6 8.5H8.05309C8.1171 11.9395 9.67903 13.397 10.8764 13.6967V8.5H12.8439V11.4683C13.9988 11.3401 15.2076 9.98991 15.614 8.5H17.5505C17.2406 10.3321 15.9246 11.6823 14.9948 12.2392C15.9253 12.6895 17.4225 13.8682 18 16H15.8714C15.4219 14.5749 14.321 13.4712 12.8446 13.3213V16H12.6095Z" fill="#0077FF"/>
  </svg>
`,dn=`
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>
  </svg>
`,fn=({width:e,height:t,iframeHeight:n,borderRadius:r,login:i,skin:a,scheme:o,contentId:s,lang:c,renderOAuthList:l,providers:u,setStatsButtonType:d})=>f=>{let p=0,m=0,h=0,g=0,_=cn(s,c),v=ln,y=Xt(s,c),b=Lt(t),x=Rt(t),S=zt(t),C=document.createElement(`div`),w=document.createElement(`button`);setTimeout(()=>{w.classList.add(`VkIdWebSdk__button_animation_${f}`)},100),w.classList.add(`VkIdWebSdk__button_${f}`),w.classList.add(`VkIdWebSdk__button_reset_${f}`),i&&(w.onclick=i);let T=document.createElement(`span`);T.classList.add(`VkIdWebSdk__button_in_${f}`);let E=document.createElement(`span`);E.classList.add(`VkIdWebSdk__button_content_${f}`);let D=document.createElement(`span`);D.classList.add(`VkIdWebSdk__button_logo_${f}`),D.innerHTML=un;let O=document.createElement(`span`);O.classList.add(`VkIdWebSdk__button_text_${f}`);let k=document.createElement(`span`);k.innerText=_;let A=document.createElement(`span`);A.innerText=y;let j=document.createElement(`span`);j.innerText=v;let M=document.createElement(`span`);M.classList.add(`VkIdWebSdk__button_spinner_${f}`),M.innerHTML=dn;let N=document.createElement(`div`);N.classList.add(`VkIdWebSdk__oauthList_container_${f}`);let ee=e=>e+16+2*b+2*S,te=()=>{let e=0,n=!1,i=()=>{u?.length&&!C.contains(N)&&(C.appendChild(N),!n&&l({lang:c,scheme:o,container:N,oauthList:u,styles:{borderRadius:r,height:t}}),n=!0)},a=()=>{let n=E.contains(O),r=O.contains(j),a=O.contains(A),o=C.clientWidth;n&&o<p&&(C.contains(N)&&C.removeChild(N),d(`icon`),w.setAttribute(`style`,`width: ${t}px;`),O.remove(),M.remove()),!n&&o>=p&&(w.removeAttribute(`style`),E.appendChild(O),E.appendChild(M)),!r&&o<m&&(O.style.width=`${h}px`,A.dataset.active=``,j.dataset.active=`true`,setTimeout(()=>{A.remove(),O.appendChild(j)},e)),!a&&o>=m&&(O.style.width=`${g}px`,j.dataset.active=``,A.dataset.active=`true`,setTimeout(()=>{j.remove(),O.appendChild(A)},e),i()),d(`default`)};new It(ct(a,500)).observe(C);let s=document.getElementById(f);s&&(s.appendChild(C),C.appendChild(w),w.appendChild(T),T.appendChild(E),E.appendChild(D),E.appendChild(O),E.appendChild(M),O.appendChild(k),O.appendChild(A),O.appendChild(j),h=j.clientWidth,g=A.clientWidth,p=ee(k.clientWidth),m=ee(g),k.remove(),A.remove(),j.remove(),a(),e=250)};return document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,te):setTimeout(te,0),`
<div id="${f}" data-test-id="oneTap" data-scheme="${o}" data-skin="${a}">
  <style>
    :root #${f} {
      --onetap--button_background: #0077FF;
      --onetap--button_border: none;
      --onetap--background_hover: #0071F2;
      --onetap--text_and_spinner: #FFF;
      --onetap--logo_icon: #0077FF;
      --onetap--logo_background: #FFF;
    }

    :root #${f}[data-scheme=light][data-skin=primary] {
      --onetap--background_hover: #0071F2;
      --onetap--background_active: #0069E1;
    }

    :root #${f}[data-scheme=dark][data-skin=primary] {
      --onetap--background_hover: #097EFF;
      --onetap--background_active: #1385FF;
    }

    :root #${f}[data-scheme=light][data-skin=secondary] {
      --onetap--button_background: rgba(255, 255, 255, 0.12);
      --onetap--button_border: 1px solid rgba(0, 0, 0, 0.12);
      --onetap--background_hover: #F5F5F7;
      --onetap--background_active: #EBECEF;
      --onetap--text_and_spinner: #000;
      --onetap--logo_icon: #FFF;
      --onetap--logo_background: #0077FF;
    }

    :root #${f}[data-scheme=dark][data-skin=secondary] {
      --onetap--button_background: transparent;
      --onetap--button_border: 1px solid rgba(255, 255, 255, 0.12);
      --onetap--background_hover: rgba(255, 255, 255, 0.06);
      --onetap--background_active: rgba(255, 255, 255, 0.1);
      --onetap--logo_icon: #FFF;
      --onetap--logo_background: #0077FF;
    }

    #${f} {
      position: relative;
      width: ${e?`${e}px`:`100%`};
      min-width: ${t}px;
    }

    #${f}[data-state=loaded] {
      height: ${n}px;
    }

    #${f} iframe {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      border: none;
      color-scheme: auto;
    }

    #${f} .VkIdWebSdk__button_reset_${f} {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;
    }

    #${f} .VkIdWebSdk__button_${f} {
      padding: ${b}px;
      height: ${t}px;
      width: 100%;
      border-radius: ${r}px;
      box-sizing: border-box;
      overflow: hidden;
    }

    #${f} .VkIdWebSdk__button_animation_${f} {
      transition: .2s ease;
    }

    #${f} .VkIdWebSdk__button_${f}:hover {
      cursor: pointer;
    }

    #${f} .VkIdWebSdk__button_${f} {
      background: var(--onetap--button_background);
      border: var(--onetap--button_border);
    }

    #${f} .VkIdWebSdk__button_${f}:focus,
    #${f} .VkIdWebSdk__button_${f}:hover {
      background: var(--onetap--background_hover);
    }

    #${f} .VkIdWebSdk__button_${f}:active {
      background: var(--onetap--background_active);
    }

    #${f} .VkIdWebSdk__button_in_${f} {
      display: inline-block;
      width: 100%;
      height: 100%;
      min-width: max-content;
      transition: width 0.5s;
    }

    #${f} .VkIdWebSdk__button_content_${f} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    #${f} .VkIdWebSdk__button_logo_${f},
    #${f} .VkIdWebSdk__button_spinner_${f},
    #${f} .VkIdWebSdk__button_logo_${f} > svg,
    #${f} .VkIdWebSdk__button_spinner_${f} > svg {
      width: ${S}px;
      height: ${S}px;
    }

    #${f} .VkIdWebSdk__button_spinner_${f} > svg {
      position: absolute;
      right: ${b}px;
      animation: vkIdSdkButtonSpinner 0.7s linear infinite;
    }

    #${f} .VkIdWebSdk__button_text_${f} {
      font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
      font-weight: 500;
      font-size: ${x}px;
      transition: .2s;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    #${f} .VkIdWebSdk__button_text_${f} > span {
      opacity: 0;
      display: inline-block;
      padding: 0 8px;
      transition: .5s;
    }

    #${f} .VkIdWebSdk__button_text_${f} > span[data-active=true] {
      opacity: 1;
    }

    #${f} .VkIdWebSdk__button_text_${f},
    #${f} .VkIdWebSdk__button_spinner_${f} {
      color: var(--onetap--text_and_spinner);
    }

    .VkIdWebSdk__oauthList_container_${f} {
      margin-top: 16px;
    }

    #${f} #logoBg {
      fill: var(--onetap--logo_background);
    }

    #${f} #logoIcon {
      fill: var(--onetap--logo_icon);
    }

    #${f}[data-state=not_loaded] .VkIdWebSdk__button_in_${f} {
      width: 0;
    }

    #${f}[data-state=not_loaded] .VkIdWebSdk__button_spinner_${f} {
      transition: .2s;
      opacity: 0;
      pointer-events: none;
      width: 0;
    }

    #${f}[data-state=loaded] .VkIdWebSdk__oauthList_container_${f} {
      display: none;
    }

    #${f}[data-state=loaded] iframe {
      position: initial;
      opacity: 100;
      pointer-events: all;
    }

    #${f}[data-state=loaded] .VkIdWebSdk__button_${f} {
      display: none;
    }

    @keyframes vkIdSdkButtonSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <iframe width="100%" height="100%" />
</div>
  `};function pn(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var mn={width:0,height:44,borderRadius:8},hn=12,gn=class e extends W{analytics;vkidAppName=`button_one_tap_auth`;statsBtnType;fastAuthDisabled;constructor(){super(),this.analytics=new st(e.config)}setStatsButtonType=e=>{this.statsBtnType||(this.statsBtnType=e,this.fastAuthDisabled&&this.statsBtnType&&this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType))};sendSuccessLoginEvent=e=>{this.events.emit(B.LOGIN_SUCCESS,e)};onBridgeMessageHandler(e){switch(e.handler){case B.SHOW_FULL_AUTH:{let t=e.params,n={};t.screen&&(n.screen=t.screen),t.sdk_oauth&&(n.provider=t.sdk_oauth,n.statsFlowSource=P.MULTIBRANDING),this.openFullAuth(n);break}case B.NOT_AUTHORIZED:this.analytics.sendNoSessionFound(),this.setState(V.NOT_LOADED),clearTimeout(this.timeoutTimer),this.elements?.iframe?.remove();break;case B.AUTHENTICATION_INFO:this.events.emit(B.AUTHENTICATION_INFO,e.params);break;default:super.onBridgeMessageHandler(e)}}onErrorHandler(e){this.analytics.sendFrameLoadingFailed(),this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType),super.onErrorHandler(e)}openFullAuth(t){let n={statsFlowSource:P.BUTTON_ONE_TAP,...t,uniqueSessionId:this.id,lang:this.lang,scheme:this.scheme};e.auth.login(n).then(this.sendSuccessLoginEvent).catch(e=>{this.events.emit(U.ERROR,{code:H.AuthError,text:e.error})})}login(e){this.config.get().mode===z.Redirect?this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType).finally(()=>{this.openFullAuth(e)}):(this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType),this.openFullAuth(e))}renderOAuthList(e){e.oauthList.length&&new nt().on(Ge.LOGIN_SUCCESS,this.sendSuccessLoginEvent).render({...e,flowSource:u.NOWHERE,uniqueSessionId:this.id})}render(e){this.lang=e?.lang||G.RUS,this.scheme=e?.scheme||K.LIGHT,this.fastAuthDisabled=e.fastAuthEnabled===!1;let t=(e.oauthList||[]).filter(e=>e!==q.VK),n={style_height:e.styles?.height||mn.height,style_border_radius:Ke(e.styles?.borderRadius)?mn.borderRadius:e.styles?.borderRadius,show_alternative_login:+!!e?.showAlternativeLogin,button_skin:e.skin||at.Primary,content_id:e?.contentId||J.SIGN_IN,scheme:this.scheme,lang_id:this.lang,providers:t.join(`,`),uuid:this.id};return this.analytics.setUniqueSessionId(this.id),this.templateRenderer=fn({width:e.styles?.width||mn.width,iframeHeight:n.show_alternative_login?n.style_height*2+hn:n.style_height,height:n.style_height,borderRadius:n.style_border_radius,login:this.login.bind(this),skin:n.button_skin,scheme:n.scheme,lang:n.lang_id,contentId:n.content_id,renderOAuthList:this.renderOAuthList.bind(this),providers:t,setStatsButtonType:this.setStatsButtonType.bind(this)}),this.analytics.sendScreenProceed({scheme:this.scheme,lang:this.lang,skin:n.button_skin,contentId:n.content_id}),this.fastAuthDisabled&&(n.fastAuthDisabled=!0),super.render({container:e.container,...n})}};pn([L({styles:[de]})],gn.prototype,`render`,null);var X;(function(e){e[e.SIGN_IN_TO_SERVICE=0]=`SIGN_IN_TO_SERVICE`,e[e.SIGN_IN_TO_ACCOUNT=1]=`SIGN_IN_TO_ACCOUNT`,e[e.REGISTRATION_FOR_EVENT=2]=`REGISTRATION_FOR_EVENT`,e[e.SUBMIT_APPLICATIONS=3]=`SUBMIT_APPLICATIONS`,e[e.MAKE_ORDER_WITH_SERVICE=4]=`MAKE_ORDER_WITH_SERVICE`,e[e.MAKE_ORDER_WITHOUT_SERVICE=5]=`MAKE_ORDER_WITHOUT_SERVICE`,e[e.FAST_REGISTRATION=6]=`FAST_REGISTRATION`})(X||={});var _n={[X.SIGN_IN_TO_SERVICE]:`service_sign_in`,[X.REGISTRATION_FOR_EVENT]:`event_reg`,[X.SUBMIT_APPLICATIONS]:`request`,[X.MAKE_ORDER_WITH_SERVICE]:`service_order_placing`,[X.MAKE_ORDER_WITHOUT_SERVICE]:`vkid_order_placing`,[X.SIGN_IN_TO_ACCOUNT]:`account_sign_in`,[X.FAST_REGISTRATION]:`fast_reg`},vn=class{registrationStatsCollector;uniqueSessionId;constructor(e){let t=new C(new S(e));this.registrationStatsCollector=new d(t)}setUniqueSessionId(e){this.uniqueSessionId=e}getFields(){let e=[{name:`sdk_type`,value:`vkid`}];return this.uniqueSessionId&&e.push({name:`unique_session_id`,value:this.uniqueSessionId}),e}sendScreenProceed(e){this.registrationStatsCollector.logEvent(u.NOWHERE,{event_type:`screen_proceed`,screen_to:u.FLOATING_ONE_TAP,fields:[...this.getFields(),{name:`theme_type`,value:e.scheme},{name:`language`,value:e.lang.toString()},{name:`text_type`,value:_n[e.contentId]}]})}sendIframeLoadingFailed(){this.registrationStatsCollector.logEvent(u.FLOATING_ONE_TAP,{event_type:`iframe_loading_failed`,fields:this.getFields()})}sendNoUserButtonShow(){this.registrationStatsCollector.logEvent(u.FLOATING_ONE_TAP,{event_type:`no_user_button_show`,fields:this.getFields()})}sendNoUserButtonTap(){return this.registrationStatsCollector.logEvent(u.FLOATING_ONE_TAP,{event_type:`no_user_button_tap`,fields:this.getFields()})}},Z;(function(e){e.LOGIN_SUCCESS=`floatingonetap: success login`,e.SHOW_FULL_AUTH=`floatingonetap: show full auth`,e.START_AUTHORIZE=`floatingonetap: start authorize`,e.NOT_AUTHORIZED=`floatingonetap: not authorized`})(Z||={});var yn={[G.RUS]:`Войти с VK ID`,[G.UKR]:`Увійти з VK ID`,[G.BEL]:`Увайсці з VK ID`,[G.KAZ]:`VK ID арқылы кіру`,[G.UZB]:`VK ID yordamida kirish`,[G.ENG]:`Sign in with VK ID`,[G.SPA]:`Iniciar sesión con VK ID`,[G.GERMAN]:`Mit VK-ID anmelden`,[G.POL]:`Wejdź z VK ID`,[G.FRA]:`Se connecter avec VK ID`,[G.TURKEY]:`VK ID aracılığıyla gir`},bn={[G.RUS]:`Оформить с VK ID`,[G.UKR]:`Оформити з VK ID`,[G.BEL]:`Аформіць з VK ID`,[G.KAZ]:`VK ID арқылы рәсімдеу`,[G.UZB]:`VK ID yordamida shakllantirish`,[G.ENG]:`Order with VK ID`,[G.SPA]:`Pedir con VK ID`,[G.GERMAN]:`Mit VK-ID bestellen`,[G.POL]:`Wypełnij z VK ID`,[G.FRA]:`Commander avec VK ID`,[G.TURKEY]:`VK ID aracılığıyla oluştur`},xn={[G.RUS]:`Продолжить с VK ID`,[G.UKR]:`Продовжити з VK ID`,[G.BEL]:`Працягнуць з VK ID`,[G.KAZ]:`VK ID арқылы жалғастыру`,[G.UZB]:`VK ID bilan davom etish`,[G.ENG]:`Continue with VK ID`,[G.SPA]:`Continuar con VK ID`,[G.GERMAN]:`Mit VK ID fortfahren`,[G.POL]:`Kontynuuj z VK ID`,[G.FRA]:`Continuer avec VK ID`,[G.TURKEY]:`VK ID ile devam et`},Sn=(e,t)=>{switch(e){case X.SIGN_IN_TO_SERVICE:case X.SIGN_IN_TO_ACCOUNT:case X.REGISTRATION_FOR_EVENT:case X.SUBMIT_APPLICATIONS:return yn[t]||yn[G.RUS];case X.MAKE_ORDER_WITH_SERVICE:case X.MAKE_ORDER_WITHOUT_SERVICE:return bn[t]||bn[G.RUS];case X.FAST_REGISTRATION:return xn[t]||xn[G.RUS];default:return yn[G.RUS]}},Cn={[G.RUS]:`Войдите в\xA0сервис или\xA0зарегистрируйтесь`,[G.UKR]:`Увійдіть у\xA0сервіс або\xA0зареєструйтеся`,[G.BEL]:`Увайдзіце ў\xA0сэрвіс ці\xA0зарэгіструйцеся`,[G.KAZ]:`Сервиске кіріңіз немесе тіркеліңіз`,[G.UZB]:`Xizmatga\xA0kiring va\xA0ro‘yxatdan o‘ting`,[G.ENG]:`Sign in to\xA0service or\xA0sign up`,[G.SPA]:`Acceder al\xA0servicio o\xA0registrarse`,[G.GERMAN]:`Melden Sie sich beim\xA0Dienst\xA0an oder registrieren Sie\xA0sich`,[G.POL]:`Wejdź do\xA0serwisu lub\xA0zarejestruj się`,[G.FRA]:`Connectez-vous au\xA0service ou\xA0inscrivez-vous`,[G.TURKEY]:`Hizmete\xA0girin yada\xA0oturum oluşturun`},wn={[G.RUS]:`Войдите в учётную запись {service}`,[G.UKR]:`Увійдіть в обліковий запис {service}`,[G.BEL]:`Увайдзіце ва ўліковы запіс {service}`,[G.KAZ]:`{service} есептік жазбасына кіріңіз`,[G.UZB]:`{service} hisobiga kiring`,[G.ENG]:`Sign in to\xA0{service} account`,[G.SPA]:`Acceder a la cuenta\xA0{service}`,[G.GERMAN]:`Melden Sie sich bei Ihrem\xA0{service}-Konto an`,[G.POL]:`Wejdź na rachunek {service}`,[G.FRA]:`Connectez-vous à\xA0{service}`,[G.TURKEY]:`{service} hesabına girin`},Tn={[G.RUS]:`Зарегистрируйтесь на\xA0мероприятие`,[G.UKR]:`Зареєструйтеся на\xA0захід`,[G.BEL]:`Зарэгіструйцеся на\xA0мерапрыемства`,[G.KAZ]:`Шараға тіркеліңіз`,[G.UZB]:`Tadbirda\xA0ro‘yxatdan o‘ting`,[G.ENG]:`Sign up for\xA0event`,[G.SPA]:`Registrarse en\xA0el\xA0evento`,[G.GERMAN]:`Melden\xA0Sie\xA0sich für\xA0die\xA0Veranstaltung\xA0an`,[G.POL]:`Zarejestruj się na\xA0wydarzenie`,[G.FRA]:`Inscrivez-vous à\xA0l'événement`,[G.TURKEY]:`Eylemde\xA0kaydolun`},En={[G.RUS]:`Подайте заявку с\xA0VK\xA0ID`,[G.UKR]:`Подайте запит з\xA0VK\xA0ID`,[G.BEL]:`Падайце заяўку з\xA0VK\xA0ID`,[G.KAZ]:`VK\xA0ID арқылы тапсырыс жасаңыз`,[G.UZB]:`VK\xA0ID\xA0yordamida talabnoma berish`,[G.ENG]:`Apply with\xA0VK\xA0ID`,[G.SPA]:`Solicitar con\xA0VK\xA0ID`,[G.GERMAN]:`Bewerben Sie mit\xA0VK-ID`,[G.POL]:`Złóż wniosek z\xA0VK\xA0ID`,[G.FRA]:`Envoyez une\xA0demande avec\xA0VK\xA0ID`,[G.TURKEY]:`VK\xA0ID\xA0yardımıyla başvuru gönderin`},Dn={[G.RUS]:`Оформите заказ в\xA0{service} с\xA0VK\xA0ID`,[G.UKR]:`Оформіть замовлення в\xA0{service} з\xA0VK\xA0ID`,[G.BEL]:`Аформіце заказ у\xA0{service} з\xA0VK\xA0ID`,[G.KAZ]:`{service} сервисінде \xA0VK\xA0ID арқылы тапсырыс жасаңыз`,[G.UZB]:`VK\xA0ID\xA0orqali {service}\xA0da buyurtma\xA0shakllantirish`,[G.ENG]:`Place order on\xA0{service} with\xA0VK\xA0ID`,[G.SPA]:`Realizar pedido en\xA0{service} con\xA0VK\xA0ID`,[G.GERMAN]:`Machen Sie eine\xA0Bestellung auf\xA0{service} mit\xA0VK-ID`,[G.POL]:`Wypełnij zamówienie w\xA0{service} z\xA0VK\xA0ID`,[G.FRA]:`Passez la\xA0commande sur\xA0{service} avec\xA0VK\xA0ID`,[G.TURKEY]:`VK\xA0ID\xA0aracılığıyla {service} te sipariş oluşturun`},On={[G.RUS]:`Оформите заказ с\xA0VK\xA0ID`,[G.UKR]:`Оформіть замовлення з\xA0VK\xA0ID`,[G.BEL]:`Аформіце заказ з\xA0VK\xA0ID`,[G.KAZ]:`VK\xA0ID арқылы тапсырыс жасаңыз`,[G.UZB]:`VK\xA0ID\xA0orqali buyurtmani shakllantirish`,[G.ENG]:`Place order with\xA0VK\xA0ID`,[G.SPA]:`Realizar pedido con\xA0VK\xA0ID`,[G.GERMAN]:`Machen Sie eine\xA0Bestellung mit\xA0VK-ID`,[G.POL]:`Wypełnij zamówienie z\xA0VK\xA0ID`,[G.FRA]:`Passez la\xA0commande avec\xA0VK\xA0ID`,[G.TURKEY]:`VK\xA0ID\xA0aracılığıyla sipariş oluşturun`},kn={[G.RUS]:`Быстрая регистрация
в\xA0{service}`,[G.UKR]:`Швидка реєстрація в\xA0{service}`,[G.BEL]:`Хуткая рэгістрацыя ў\xA0{service}`,[G.KAZ]:`{service} сервисіне тез тіркелу`,[G.UZB]:`{service}\xA0da tezkor ro‘yxatdan o‘tish`,[G.ENG]:`Quick sign-up with\xA0{service}`,[G.SPA]:`Registro rápido con\xA0{service}`,[G.GERMAN]:`Schnelle Registrierung bei\xA0{service}`,[G.POL]:`Szybka rejestracja w\xA0{service}`,[G.FRA]:`Inscription rapide avec\xA0{service}`,[G.TURKEY]:`{service}'te\xA0hızlı oturum açma`},An=(e,t,n)=>{let r=Cn[G.RUS];switch(e){case X.SIGN_IN_TO_SERVICE:r=Cn[t];break;case X.SIGN_IN_TO_ACCOUNT:r=wn[t];break;case X.REGISTRATION_FOR_EVENT:r=Tn[t];break;case X.SUBMIT_APPLICATIONS:r=En[t];break;case X.MAKE_ORDER_WITH_SERVICE:r=Dn[t];break;case X.MAKE_ORDER_WITHOUT_SERVICE:r=On[t];break;case X.FAST_REGISTRATION:r=kn[t]}return r.replace(`{service}`,n)},jn={[G.RUS]:`После этого вам станут доступны все возможности сервиса. Ваши данные будут надёжно защищены.`,[G.UKR]:`Після цього вам стануть доступні всі можливості сервісу. Ваші дані будуть надійно захищені.`,[G.BEL]:`Пасля гэтага вам стануць даступны ўсе магчымасці сэрвісу. Вашы даныя будуць надзейна абаронены.`,[G.KAZ]:`Содан кейін сізге сервистің барлық мүмкіндігі қолжетімді болып, деректеріңіз сенімді қораулы болады.`,[G.UZB]:`Bundan so‘ng, sizga xizmatning barcha imkoniyatlari ochiladi. Maʼlumotlaringiz ishonchli himoyalanadi.`,[G.ENG]:`Afterwards, you'll have access to\xA0all of\xA0the\xA0service's features. Your personal data will be carefully protected.`,[G.SPA]:`Después, tendrás acceso a\xA0todas las funciones del\xA0servicio. Tus datos personales estarán cuidadosamente protegidos.`,[G.GERMAN]:`Anschließend stehen Ihnen alle Funktionen des Dienstes zur Verfügung. Ihre\xA0persönlichen Daten werden sorgfältig geschützt.`,[G.POL]:`Po tym wszystkie funkcje serwisu będą dostępne. Twoje dane będą dobrze chronione.`,[G.FRA]:`Cela vous permettra d'avoir accès à\xA0toutes les\xA0fonctionnalités du service. Vos données personnelles seront soigneusement protégées.`,[G.TURKEY]:`Bundan sonra hizmetin tüm özellikleri kullanımınıza sunulacaktır. Verileriniz güvenilir bir şekilde korunacaktır.`},Mn=e=>jn[e]||jn[G.RUS],Nn=`data:image/png;base64,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`,Pn=`
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2653 4.2653C3 5.5306 3 7.56707 3 11.64V12.36C3 16.4329 3 18.4694 4.2653 19.7347C5.5306 21 7.56706 21 11.64 21H12.36C16.4329 21 18.4694 21 19.7347 19.7347C21 18.4694 21 16.4329 21 12.36V11.64C21 7.56707 21 5.5306 19.7347 4.2653C18.4694 3 16.4329 3 12.36 3H11.64C7.56706 3 5.5306 3 4.2653 4.2653Z" fill="white"/>
    <path d="M12.6095 16C8.55576 16 6.09636 13.1823 6 8.5H8.05309C8.1171 11.9395 9.67903 13.397 10.8764 13.6967V8.5H12.8439V11.4683C13.9988 11.3401 15.2076 9.98991 15.614 8.5H17.5505C17.2406 10.3321 15.9246 11.6823 14.9948 12.2392C15.9253 12.6895 17.4225 13.8682 18 16H15.8714C15.4219 14.5749 14.321 13.4712 12.8446 13.3213V16H12.6095Z" fill="#0077FF"/>
  </svg>
`,Fn=`
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.71967 4.71969C5.01256 4.42679 5.48744 4.42679 5.78033 4.71969L10 8.93935L14.2197 4.71969C14.5126 4.42679 14.9874 4.42679 15.2803 4.71969C15.5732 5.01258 15.5732 5.48745 15.2803 5.78035L11.0607 10L15.2803 14.2197C15.5732 14.5126 15.5732 14.9875 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L10 11.0607L5.78033 15.2803C5.48744 15.5732 5.01256 15.5732 4.71967 15.2803C4.42678 14.9875 4.42678 14.5126 4.71967 14.2197L8.93934 10L4.71967 5.78035C4.42678 5.48745 4.42678 5.01258 4.71967 4.71969Z" fill="currentColor"/>
  </svg>
`,In=`
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>
  </svg>
`,Ln=12,Rn=e=>!e||e<=Ln?0:e-Ln,zn=({scheme:e,indent:t,login:n,close:r,lang:i,contentId:a,appName:o,providers:s,renderOAuthList:c})=>l=>{let u=An(a,i,o),d=Mn(i),f=Sn(a,i),p=document.createElement(`div`);p.classList.add(`VkIdWebSdk__floating_${l}`);let m=document.createElement(`div`);m.classList.add(`VkIdWebSdk__floating_container_${l}`);let h=document.createElement(`img`);h.classList.add(`VkIdWebSdk__floating_img_${l}`),h.src=Nn;let g=document.createElement(`div`);g.classList.add(`VkIdWebSdk__floating_close_${l}`);let _=document.createElement(`button`);_.classList.add(`VkIdWebSdk__floating_button_reset_${l}`),_.classList.add(`VkIdWebSdk__floating_close_btn_${l}`),_.innerHTML=Fn,r&&(_.onclick=r);let v=document.createElement(`div`);v.classList.add(`VkIdWebSdk__floating_content_${l}`);let y=document.createElement(`div`);y.classList.add(`VkIdWebSdk__floating_title_${l}`),y.innerText=u;let b=document.createElement(`div`);b.classList.add(`VkIdWebSdk__floating_description_${l}`),b.innerText=d;let x=document.createElement(`div`),S=document.createElement(`button`);S.classList.add(`VkIdWebSdk__floating_button_reset_${l}`),S.classList.add(`VkIdWebSdk__floating_button_${l}`),n&&(S.onclick=n);let C=document.createElement(`div`);C.classList.add(`VkIdWebSdk__floating_button_content_${l}`);let w=document.createElement(`span`);w.classList.add(`VkIdWebSdk__floating_button_logo_${l}`),w.innerHTML=Pn;let T=document.createElement(`span`);T.classList.add(`VkIdWebSdk__floating_button_text_${l}`),T.innerText=f;let E=document.createElement(`span`);E.classList.add(`VkIdWebSdk__floating_button_spinner_${l}`),E.innerHTML=In;let D=document.createElement(`div`);D.classList.add(`VkIdWebSdk__oauthList_container_${l}`);let O=()=>{let t=document.getElementById(l);t&&(t.appendChild(p),p.appendChild(m),m.appendChild(g),m.appendChild(v),m.appendChild(x),g.appendChild(_),v.appendChild(h),v.appendChild(y),v.appendChild(b),x.appendChild(S),S.appendChild(C),C.appendChild(w),C.appendChild(T),C.appendChild(E),s?.length&&(m.appendChild(D),c({lang:i,scheme:e,container:D,oauthList:s,styles:{borderRadius:12,height:44}})))};return document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,O):setTimeout(O,0),`
<div id="${l}" data-test-id="floatingOneTap" data-scheme="${e}">
  <style>
    :root #${l} {
      --floating--contaner_padding: 32px;
      --floating--container_box_shadow: 0px 0px 2px rgba(0,0,0,.08),0px 4px 16px rgba(0,0,0,.08);
      --floating--font_family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;
      --floating--close_button_color_transparent--hover: rgba(0,16,61,.04);
      --floating--close_button_color_transparent--active: rgba(0,16,61,.08);
      --floating--button_text_color: #FFFFFF;
      --floating--button_background_color: #0077ff;
    }

    :root #${l}[data-scheme=light] {
      --floating--color_background_modal: #ffffff;
      --floating--color_icon_medium: #818c99;
      --floating--color_text_primary: #000000;
      --floating--color_text_secondary: #58636F;
      --floating--button_background_color--hover: #0071F2;
      --floating--button_background_color--focus: #0071F2;
      --floating--button_background_color--active: #0069E1;
    }

    :root #${l}[data-scheme=dark] {
      --floating--color_background_modal: #1C1D1E;
      --floating--color_icon_medium: #b0b1b6;
      --floating--color_text_primary: #e1e3e6;
      --floating--color_text_secondary: #B9BABF;
      --floating--button_background_color--hover: #097EFF;
      --floating--button_background_color--focus: #097EFF;
      --floating--button_background_color--active: #1385FF;
      --floating--close_button_color_transparent--hover: hsla(0,0%,100%,.04);
      --floating--close_button_color_transparent--active: hsla(0,0%,100%,.08);
      --floating--container_box_shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.30), 0px 4px 16px 0px rgba(0, 0, 0, 0.30);
    }

    #${l} {
      position: fixed;
      z-index: 99999;
    }

    #${l} iframe {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      border: none;
      color-scheme: auto;
    }

    #${l} .VkIdWebSdk__floating_button_reset_${l} {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;
    }

    #${l} .VkIdWebSdk__floating_${l} {
      padding: 12px;
    }

    #${l} .VkIdWebSdk__floating_container_${l} {
      background: var(--floating--color_background_modal);
      border-radius: 32px;
      padding: var(--floating--contaner_padding);
      box-shadow: var(--floating--container_box_shadow);
      box-sizing: border-box;
      position: relative;
    }

    #${l} .VkIdWebSdk__floating_img_${l} {
      width: 120px;
      height: 120px;
      margin: 0 0 16px 0;
    }

    #${l} .VkIdWebSdk__floating_close_${l} {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 8px;
      right: 8px;
      height: 44px;
      width: 44px;
      color: var(--floating--color_icon_medium);
    }

    #${l} .VkIdWebSdk__floating_close_btn_${l} {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .15s;
    }

    #${l} .VkIdWebSdk__floating_close_btn_${l}:hover {
      cursor: pointer;
      background: var(--floating--close_button_color_transparent--hover);
    }

    #${l} .VkIdWebSdk__floating_close_btn_${l}:active {
      background: var(--floating--close_button_color_transparent--active);
    }

    #${l} .VkIdWebSdk__floating_content_${l} {
      text-align: center;
      font-family: var(--floating--font_family);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    #${l} .VkIdWebSdk__floating_title_${l} {
      color: var(--floating--color_text_primary);
      font-weight: 600;
      font-size: 23px;
      line-height: 28px;
      letter-spacing: 0px;
      text-align: center;
    }

    #${l} .VkIdWebSdk__floating_description_${l} {
      color: var(--floating--color_text_secondary);
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      margin-top: 12px;
      margin-bottom: 24px;
    }

    #${l} .VkIdWebSdk__floating_button_${l} {
      height: 44px;
      width: 100%;
      border-radius: 12px;
      color: var(--floating--button_text_color);
      transition: .15s;
      cursor: pointer;
      background: var(--floating--button_background_color);
    }

    #${l} .VkIdWebSdk__floating_button_${l}:hover {
      background: var(--floating--button_background_color--hover);
    }

    #${l} .VkIdWebSdk__floating_button_${l}:focus {
      background: var(--floating--button_background_color--focus);
    }

    #${l} .VkIdWebSdk__floating_button_${l}:active {
      background: var(--floating--button_background_color--active);
    }

    #${l} .VkIdWebSdk__floating_button_content_${l} {
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 0 8px;
    }

    #${l} .VkIdWebSdk__floating_button_logo_${l},
    #${l} .VkIdWebSdk__floating_button_spinner_${l} {
      display: inline-flex;
    }

    #${l} .VkIdWebSdk__floating_button_spinner_${l} {
      width: 28px;
      animation: vkIdSdkButtonSpinner 0.7s linear infinite;
    }

    #${l} .VkIdWebSdk__floating_button_text_${l} {
      font-weight: 500;
      line-height: 20px;
      font-family: var(--floating--font_family);
      font-size: 16px;
      transition: .5s;
      min-width: max-content;
      margin-left: 6px;
      text-align: center;
    }

    #${l} .VkIdWebSdk__oauthList_container_${l} {
      margin-top: 16px;
    }

    #${l}[data-state=loaded] iframe {
      position: initial;
      opacity: 100;
      pointer-events: all;
    }

    #${l}[data-state=loaded] .VkIdWebSdk__floating_${l} {
      display: none;
    }

    #${l}[data-state=not_loaded] .VkIdWebSdk__floating_button_spinner_${l} {
      transition: .2s;
      opacity: 0;
      pointer-events: none;
      width: 0;
    }

    #${l}[data-state=loading] .VkIdWebSdk__floating_button_text_${l} {
      flex: 1;
    }

    @media (max-width: 480px) {
      #${l} {
        display: flex;
        align-items: flex-end;
        left: 0;
        right: 0;
        bottom: ${Rn(t.bottom)}px;
        width: 100%;
        height: 340px;
      }
    }
    @media (min-width: 481px) {
      #${l} {
        top: ${Rn(t.top)}px;
        right: ${Rn(t.right)}px;
        width: 384px;
        height: 360px;
      }
    }

    @keyframes vkIdSdkButtonSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <iframe width="100%" height="100%" />
</div>
  `};function Bn(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Vn={top:12,right:12,bottom:12},Hn=class e extends W{analytics;vkidAppName=`floating_one_tap_auth`;constructor(){super(),this.analytics=new vn(e.config)}sendSuccessLoginEvent=e=>{this.events.emit(Z.LOGIN_SUCCESS,e),this.bridge.sendMessage({handler:Z.LOGIN_SUCCESS,params:{}})};onBridgeMessageHandler(e){switch(e.handler){case Z.SHOW_FULL_AUTH:{let t=e.params,n={};t.screen&&(n.screen=t.screen),t.sdk_oauth&&(n.provider=t.sdk_oauth,n.statsFlowSource=P.MULTIBRANDING),this.openFullAuth(n);break}case Z.NOT_AUTHORIZED:this.setState(V.NOT_LOADED),setTimeout(()=>{this.setState(V.LOADED)},500),clearTimeout(this.timeoutTimer);break;default:super.onBridgeMessageHandler(e)}}onErrorHandler(e){this.analytics.sendIframeLoadingFailed(),this.analytics.sendNoUserButtonShow(),super.onErrorHandler(e)}openFullAuth(t){let n={statsFlowSource:P.FLOATING_ONE_TAP,...t,uniqueSessionId:this.id,lang:this.lang,scheme:this.scheme};e.auth.login(n).then(this.sendSuccessLoginEvent).catch(e=>{this.events.emit(U.ERROR,{code:H.AuthError,text:e.error})})}login(e){this.config.get().mode===z.Redirect?this.analytics.sendNoUserButtonTap().finally(()=>{this.openFullAuth(e)}):(this.analytics.sendNoUserButtonTap(),this.openFullAuth(e))}renderOAuthList(e){e.oauthList.length&&new nt().on(Ge.LOGIN_SUCCESS,this.sendSuccessLoginEvent).render({...e,flowSource:u.FLOATING_ONE_TAP,uniqueSessionId:this.id})}render(e){this.lang=e?.lang||G.RUS,this.scheme=e?.scheme||K.LIGHT;let t=(e.oauthList||[]).filter(e=>e!==q.VK),n={scheme:this.scheme,lang_id:this.lang,show_alternative_login:+!!e?.showAlternativeLogin,content_id:e?.contentId||X.SIGN_IN_TO_SERVICE,providers:t.join(`,`),uuid:this.id};return this.analytics.setUniqueSessionId(this.id),this.templateRenderer=zn({login:this.login.bind(this),close:this.close.bind(this),scheme:this.scheme,lang:this.lang,indent:Object.assign(Vn,e.indent||{}),contentId:n.content_id,appName:e.appName,renderOAuthList:this.renderOAuthList.bind(this),providers:t}),this.analytics.sendScreenProceed({scheme:this.scheme,lang:this.lang,contentId:n.content_id}),e.fastAuthEnabled===!1&&(this.analytics.sendNoUserButtonShow(),n.fastAuthDisabled=!0),super.render({container:document.body,...n})}};Bn([L({appName:[R]})],Hn.prototype,`render`,null);var Q;(function(e){e[e.IsServiceAccount=200]=`IsServiceAccount`,e[e.GroupNotFound=201]=`GroupNotFound`,e[e.GroupClosed=202]=`GroupClosed`,e[e.AlreadyMember=203]=`AlreadyMember`,e[e.ScopeMissing=204]=`ScopeMissing`,e[e.UnknownError=205]=`UnknownError`,e[e.BadRequest=206]=`BadRequest`,e[e.RemoteLimitReached=207]=`RemoteLimitReached`})(Q||={});var Un={[Q.IsServiceAccount]:`Service user is not allowed to subscribe`,[Q.GroupNotFound]:`Group not found`,[Q.GroupClosed]:`Group is closed for subscription`,[Q.AlreadyMember]:`Already a member`,[Q.ScopeMissing]:`No group scope in AT`,[Q.UnknownError]:`Unknown error`,[Q.BadRequest]:`Bad request`,[Q.RemoteLimitReached]:`Represents the case when user reached the limit of displays that is controlled remotely.
This happens when you haven't payed for enough subscriptions.`},$;(function(e){e.Success=`сommunity subscription: success`,e.Error=`сommunity subscription: error`,e.Close=`common: close`,e.Load=`common: load`})($||={});var Wn;(function(e){e.Ready=`сommunity subscription: ready`,e.Data=`сommunity subscription: data`})(Wn||={});var Gn=()=>e=>`
<div id="${e}" data-test-id="communitySubscription">
  <style>
    #${e} iframe {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      border: none;
      color-scheme: auto;
    }
      #${e}[data-state=loaded] iframe {
      position: fixed;
      opacity: 100;
      pointer-events: all;
      z-index: 99999;
    }
  </style>
  <iframe width="100%" height="100%" />
</div>`;function Kn(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var qn=class extends W{vkidAppName=`community_subscription`;limitDisplayLocalStorageObjName=`vkid_community_subscription:limit_display`;accessToken;groupId;constructor(){super()}onBridgeMessageHandler(e){switch(e.handler){case $.Error:e.params.code&&this.events.emit($.Error,{...e.params,error:Un[e.params.code]}),this.close();break;case $.Success:this.events.emit($.Success,e.params),this.elements.iframe.style.pointerEvents=`none`;break;case Wn.Ready:this.bridge.sendMessage({handler:Wn.Data,params:{accessToken:this.accessToken,groupId:this.groupId}});break;case $.Load:try{let e=this.config.get().groupSubscriptionsLimit?.periodInDays??30,t=this.config.get().groupSubscriptionsLimit?.maxSubscriptionsToShow??2,n=localStorage.getItem(`${this.limitDisplayLocalStorageObjName}`),r=(n&&JSON.parse(n)).filter(t=>this.checkForPeriodEntry(new Date(t),new Date,e));if(r.length<t)localStorage.setItem(this.limitDisplayLocalStorageObjName,JSON.stringify([...r,new Date]));else break}catch{if(this.config.get().groupSubscriptionsLimit?.maxSubscriptionsToShow?.toString()===`0`)break;localStorage.setItem(this.limitDisplayLocalStorageObjName,JSON.stringify([new Date]))}super.onBridgeMessageHandler(e);break;default:super.onBridgeMessageHandler(e)}}checkForPeriodEntry(e,t,n){let r=new Date(e);return r.setDate(r.getDate()+n),r.getTime()>t.getTime()}render(e){return this.lang=e?.lang||G.RUS,this.scheme=e?.scheme||K.LIGHT,this.accessToken=e.accessToken,this.groupId=e.groupId,this.container=document.body,this.templateRenderer=Gn(),super.render({container:this.container,lang:this.lang,scheme:this.scheme}),this}};Kn([L({groupId:[ue],accessToken:[R]})],qn.prototype,`render`,null);var Jn=new ye;it.config=Jn;var Yn=new it;W.config=Jn,W.auth=Yn;export{Yn as Auth,F as AuthErrorCode,qn as CommunitySubscription,Q as CommunitySubscriptionErrorCode,$ as CommunitySubscriptionEvents,Jn as Config,z as ConfigAuthMode,he as ConfigResponseMode,ge as ConfigSource,Hn as FloatingOneTap,X as FloatingOneTapContentId,Z as FloatingOneTapInternalEvents,G as Languages,nt as OAuthList,Ge as OAuthListInternalEvents,q as OAuthName,gn as OneTap,J as OneTapContentId,B as OneTapInternalEvents,at as OneTapSkin,_e as Prompt,K as Scheme,U as WidgetEvents};