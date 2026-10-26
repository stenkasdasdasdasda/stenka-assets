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
import{n as e,t}from"./jsx-runtime-D-qHYfqC.js";import{g as n,h as r}from"./client-t2-NtOKW.js";var i=e(),a=`https://stenkasdasdasdasda.github.io/stenka-assets/assets/fox-pixel-blink-directions-C735SPNQ.webp`,o=t(),s=[`up-left`,`up`,`up-right`,`left`,`center`,`right`,`down-left`,`down`,`down-right`],c=[5,8,7,6,3,0,1,2],l=[1,2,8],u=Math.PI/4,d=`(prefers-reduced-motion: reduce) and (pointer: fine)`
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
;function f(){let e=(0,i.useRef)(null),t=(0,i.useRef)(null),f=(0,i.useRef)([]),p=(0,i.useRef)({count:0,at:0}),[m,h]=(0,i.useState)(4),[g,_]=(0,i.useState)(null),[v,y]=(0,i.useState)(!1),[b,x]=(0,i.useState)(!1),[S,C]=(0,i.useState)(()=>!matchMedia(d).matches);(0,i.useEffect)(()=>{let e=!0;Promise.all([a,r].map(e=>{let t=new Image;return t.src=e,t.decode()})).then(()=>{e&&x(!0)}).catch(()=>{});let n=matchMedia(d),i=()=>C(!n.matches);return n.addEventListener(`change`,i),()=>{e=!1,n.removeEventListener(`change`,i),f.current.forEach(clearTimeout),t.current?.getAnimations().forEach(e=>e.cancel())}},[]),(0,i.useEffect)(()=>{let t=matchMedia(`(hover: hover) and (pointer: fine)`),n=-1,r=null,i=()=>{if(!t.matches||!r||!e.current)return;let i=e.current.getBoundingClientRect(),a=r.x-(i.left+i.width/2),o=r.y-(i.top+i.height/2);if(Math.hypot(a,o)<70){n=-1,h(4);return}let s=Math.atan2(o,a),l=s-n*u;n!==-1&&Math.abs(Math.atan2(Math.sin(l),Math.cos(l)))<u/2+.12||(n=(Math.round(s/u)+8)%8,h(c[n]))},a=e=>{e.pointerType!==`touch`&&(r={x:e.clientX,y:e.clientY},i())},o=()=>{t.matches||(r=null,n=-1,h(4))};return window.addEventListener(`pointermove`,a,{passive:!0}),window.addEventListener(`scroll`,i,{passive:!0}),t.addEventListener(`change`,o),()=>{window.removeEventListener(`pointermove`,a),window.removeEventListener(`scroll`,i),t.removeEventListener(`change`,o)}},[]),(0,i.useEffect)(()=>{if(y(!1),S||t.current?.getAnimations().forEach(e=>e.cancel()),!S||!b||g!==null)return;let e=0,n=window.setInterval(()=>{document.hidden||(y(!0),e=window.setTimeout(()=>y(!1),150))},5200);return()=>{clearInterval(n),clearTimeout(e)}},[S,b,g]);let w=()=>{if(!b)return;f.current.forEach(clearTimeout),f.current=[];let e=(e,t)=>{f.current.push(window.setTimeout(()=>_(t),e))},n=Date.now(),r=p.current;r.count=n-r.at<1600?r.count+1:1,r.at=n,y(!1),r.count>=4?(r.count=0,_(7),e(1100,null)):(_(0),e(120,l[(r.count-1)%l.length]),e(560,null)),t.current?.getAnimations().forEach(e=>e.cancel()),S&&t.current?.animate([{transform:`translateZ(0) scale(1)`,easing:`ease-in`},{transform:`translateZ(0) scale(1.10, 0.86)`,offset:.18,easing:`ease-out`},{transform:`translateZ(0) scale(0.95, 1.08)`,offset:.45,easing:`ease-in-out`},{transform:`translateZ(0) scale(1.03, 0.97)`,offset:.72,easing:`ease-in-out`},{transform:`translateZ(0) scale(1)`}],{duration:420,easing:`linear`})},T=v||g===0,E=g!==null&&g!==0,D=E?g:m;return(0,o.jsx)(`button`,{ref:e,type:`button`,className:`pixel-fox-button`,"aria-label":`Погладить пиксельного лиса`,onClick:w,"data-direction":s[m],"data-state":E?`reaction`:T?`blink`:`idle`,"data-ready":b,children:(0,o.jsx)(`span`,{ref:t,className:`pixel-fox-squash`,children:(0,o.jsx)(`span`,{className:`pixel-fox-frame`,style:{backgroundImage:`url(${E?r:T?a:n})`,backgroundPosition:`${D%3*50}% ${Math.floor(D/3)*50}%`}})})})}export{f as default};