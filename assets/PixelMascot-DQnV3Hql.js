/*!
MIT License

Copyright (c) 2026 Kamran Ahmed <https://kamran.fyi>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
import{n as e,t}from"./jsx-runtime-C-K0U5Ml.js";import{h as n}from"./client-BCQJJNSH.js";var r=e(),i=`https://stenkasdasdasdasda.github.io/stenka-assets/assets/fox-pixel-atlas-Z-9XdGOV.webp`,a=t(),o=[`up-left`,`up`,`up-right`,`left`,`center`,`right`,`down-left`,`down`,`down-right`],s=[5,8,7,6,3,0,1,2],c=[1,2,8],l=Math.PI/4,u=`(prefers-reduced-motion: reduce) and (pointer: fine)`
/*!
* Portions adapted from page-mascot. MIT License.
* Copyright (c) 2026 Kamran Ahmed <https://kamran.fyi>
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
;function d(){let e=(0,r.useRef)(null),t=(0,r.useRef)(null),d=(0,r.useRef)([]),f=(0,r.useRef)({count:0,at:0}),[p,m]=(0,r.useState)(4),[h,g]=(0,r.useState)(null),[_,v]=(0,r.useState)(!1),[y,b]=(0,r.useState)(!1),x=(0,r.useRef)(null),[S,C]=(0,r.useState)(()=>!matchMedia(u).matches);(0,r.useEffect)(()=>{let e=!0,n=new Image;n.src=i,x.current=n,n.decode().then(()=>{e&&b(!0)}).catch(()=>{});let r=matchMedia(u),a=()=>C(!r.matches);return r.addEventListener(`change`,a),()=>{var n;e=!1,x.current=null,r.removeEventListener(`change`,a),d.current.forEach(clearTimeout),(n=t.current)==null||n.getAnimations().forEach(e=>e.cancel())}},[]),(0,r.useEffect)(()=>{let t=matchMedia(`(hover: hover) and (pointer: fine)`),n=-1,r=null,i=()=>{if(!t.matches||!r||!e.current)return;let i=e.current.getBoundingClientRect(),a=r.x-(i.left+i.width/2),o=r.y-(i.top+i.height/2);if(Math.hypot(a,o)<70){n=-1,m(4);return}let c=Math.atan2(o,a),u=c-n*l;n!==-1&&Math.abs(Math.atan2(Math.sin(u),Math.cos(u)))<l/2+.12||(n=(Math.round(c/l)+8)%8,m(s[n]))},a=e=>{e.pointerType!==`touch`&&(r={x:e.clientX,y:e.clientY},i())},o=()=>{t.matches||(r=null,n=-1,m(4))};return window.addEventListener(`pointermove`,a,{passive:!0}),window.addEventListener(`scroll`,i,{passive:!0}),t.addEventListener(`change`,o),()=>{window.removeEventListener(`pointermove`,a),window.removeEventListener(`scroll`,i),t.removeEventListener(`change`,o)}},[]),(0,r.useEffect)(()=>{var e;if(v(!1),S||(e=t.current)==null||e.getAnimations().forEach(e=>e.cancel()),!S||!y||h!==null)return;let n=0,r=window.setInterval(()=>{document.hidden||(v(!0),n=window.setTimeout(()=>v(!1),150))},5200);return()=>{clearInterval(r),clearTimeout(n)}},[S,y,h]);let w=()=>{var e,n;if(!y)return;d.current.forEach(clearTimeout),d.current=[];let r=(e,t)=>{d.current.push(window.setTimeout(()=>g(t),e))},i=Date.now(),a=f.current;a.count=i-a.at<1600?a.count+1:1,a.at=i,v(!1),a.count>=4?(a.count=0,g(7),r(1100,null)):(g(0),r(120,c[(a.count-1)%c.length]),r(560,null)),(e=t.current)==null||e.getAnimations().forEach(e=>e.cancel()),S&&((n=t.current)==null||n.animate([{transform:`translateZ(0) scale(1)`,easing:`ease-in`},{transform:`translateZ(0) scale(1.10, 0.86)`,offset:.18,easing:`ease-out`},{transform:`translateZ(0) scale(0.95, 1.08)`,offset:.45,easing:`ease-in-out`},{transform:`translateZ(0) scale(1.03, 0.97)`,offset:.72,easing:`ease-in-out`},{transform:`translateZ(0) scale(1)`}],{duration:420,easing:`linear`}))},T=_||h===0,E=h!==null&&h!==0,D=E?h:p,O=(E?6:T?3:0)+D%3;return(0,a.jsx)(`button`,{ref:e,type:`button`,className:`pixel-fox-button`,"aria-label":`Погладить пиксельного лиса`,onClick:w,"data-direction":o[p],"data-state":E?`reaction`:T?`blink`:`idle`,"data-ready":y,children:(0,a.jsx)(`span`,{ref:t,className:`pixel-fox-squash`,children:(0,a.jsx)(`span`,{className:`pixel-fox-frame`,style:{backgroundImage:`url(${y?i:n})`,backgroundSize:y?`900% 300%`:`300% 300%`,backgroundPosition:`${y?O*12.5:p%3*50}% ${Math.floor(D/3)*50}%`}})})})}export{d as default};