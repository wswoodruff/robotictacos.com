import{l as Er}from"./legacy-B3RcDfCK.js";const mr=!1;var gr=Array.isArray,wr=Array.from,xr=Object.defineProperty,G=Object.getOwnPropertyDescriptor;const Y=2,rr=4,tr=8,Tr=16,S=32,L=64,I=128,M=256,g=512,U=1024,P=2048,nr=4096,V=8192,yr=16384,Nr=1<<18,Cr=1<<19;function Dr(r){return r===this.v}function Fr(){throw new Error("effect_update_depth_exceeded")}function kr(r){return{f:0,v:r,reactions:null,equals:Dr,version:0}}const Ar=1,Sr=2;var z,er,lr;function br(){if(z===void 0){z=window;var r=Element.prototype,t=Node.prototype;er=G(t,"firstChild").get,lr=G(t,"nextSibling").get,r.__click=void 0,r.__className="",r.__attributes=null,r.__styles=null,r.__e=void 0,Text.prototype.__t=void 0}}function Or(r=""){return document.createTextNode(r)}function B(r){return er.call(r)}function ur(r){return lr.call(r)}function et(r,t){return B(r)}function lt(r,t=1,n=!1){let e=r;for(;t--;)e=ur(e);return e}function or(r){var t=r.children;if(t!==null){r.children=null;for(var n=0;n<t.length;n+=1){var e=t[n];e.f&Y?ar(e):b(e)}}}function Rr(r){var t,n=E;D(r.parent);try{or(r),t=cr(r)}finally{D(n)}return t}function Mr(r){var t=Rr(r),n=(y||r.f&I)&&r.deps!==null?P:g;F(r,n),r.equals(t)||(r.v=t,r.version=Br())}function ar(r){or(r),A(r,0),F(r,V),r.v=r.children=r.deps=r.ctx=r.reactions=null}function qr(r,t){var n=t.last;n===null?t.last=t.first=r:(n.next=r,r.prev=n,t.last=r)}function W(r,t,n,e=!0){var l=(r&L)!==0,u=E,o={ctx:m,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:r|U,first:null,fn:t,last:null,next:null,parent:l?null:u,prev:null,teardown:null,transitions:null,version:0};if(n){var i=N;try{J(!0),j(o),o.f|=yr}catch(c){throw b(o),c}finally{J(i)}}else t!==null&&Kr(o);var a=n&&o.deps===null&&o.first===null&&o.nodes_start===null&&o.teardown===null&&(o.f&Cr)===0;if(!a&&!l&&e&&(u!==null&&qr(o,u),h!==null&&h.f&Y)){var s=h;(s.children??(s.children=[])).push(o)}return o}function Lr(r){const t=W(L,r,!0);return()=>{b(t)}}function Ir(r){return W(rr,r,!1)}function Pr(r,t=!0){return W(tr|S,r,!0,t)}function ir(r){var t=r.teardown;if(t!==null){const n=h;C(null);try{t.call(null)}finally{C(n)}}}function sr(r){var t=r.deriveds;if(t!==null){r.deriveds=null;for(var n=0;n<t.length;n+=1)ar(t[n])}}function fr(r,t=!1){var n=r.first;for(r.first=r.last=null;n!==null;){var e=n.next;b(n,t),n=e}}function Vr(r){for(var t=r.first;t!==null;){var n=t.next;t.f&S||b(t),t=n}}function b(r,t=!0){var n=!1;if((t||r.f&Nr)&&r.nodes_start!==null){for(var e=r.nodes_start,l=r.nodes_end;e!==null;){var u=e===l?null:ur(e);e.remove(),e=u}n=!0}fr(r,t&&!n),sr(r),A(r,0),F(r,V);var o=r.transitions;if(o!==null)for(const a of o)a.stop();ir(r);var i=r.parent;i!==null&&i.first!==null&&_r(r),r.next=r.prev=r.teardown=r.ctx=r.deps=r.parent=r.fn=r.nodes_start=r.nodes_end=null}function _r(r){var t=r.parent,n=r.prev,e=r.next;n!==null&&(n.next=e),e!==null&&(e.prev=n),t!==null&&(t.first===r&&(t.first=e),t.last===r&&(t.last=n))}let q=!1,N=!1;function J(r){N=r}let H=[],k=0;let h=null;function C(r){h=r}let E=null;function D(r){E=r}let d=null,p=0,vr=0,y=!1,m=null;function Br(){return++vr}function $(r){var o,i;var t=r.f;if(t&U)return!0;if(t&P){var n=r.deps,e=(t&I)!==0;if(n!==null){var l;if(t&M){for(l=0;l<n.length;l++)((o=n[l]).reactions??(o.reactions=[])).push(r);r.f^=M}for(l=0;l<n.length;l++){var u=n[l];if($(u)&&Mr(u),e&&E!==null&&!y&&!((i=u==null?void 0:u.reactions)!=null&&i.includes(r))&&(u.reactions??(u.reactions=[])).push(r),u.version>r.version)return!0}}e||F(r,g)}return!1}function Hr(r,t,n){throw r}function cr(r){var c;var t=d,n=p,e=h,l=y,u=m,o=r.f;d=null,p=0,h=o&(S|L)?null:r,y=!N&&(o&I)!==0,m=r.ctx;try{var i=(0,r.fn)(),a=r.deps;if(d!==null){var s;if(A(r,p),a!==null&&p>0)for(a.length=p+d.length,s=0;s<d.length;s++)a[p+s]=d[s];else r.deps=a=d;if(!y)for(s=p;s<a.length;s++)((c=a[s]).reactions??(c.reactions=[])).push(r)}else a!==null&&p<a.length&&(A(r,p),a.length=p);return i}finally{d=t,p=n,h=e,y=l,m=u}}function Yr(r,t){let n=t.reactions;if(n!==null){var e=n.indexOf(r);if(e!==-1){var l=n.length-1;l===0?n=t.reactions=null:(n[e]=n[l],n.pop())}}n===null&&t.f&Y&&(d===null||!d.includes(t))&&(F(t,P),t.f&(I|M)||(t.f^=M),A(t,0))}function A(r,t){var n=r.deps;if(n!==null)for(var e=t;e<n.length;e++)Yr(r,n[e])}function j(r){var t=r.f;if(!(t&V)){F(r,g);var n=E;E=r;try{t&Tr?Vr(r):fr(r),sr(r),ir(r);var e=cr(r);r.teardown=typeof e=="function"?e:null,r.version=vr}catch(l){Hr(l)}finally{E=n}}}function Ur(){k>1e3&&(k=0,Fr()),k++}function Wr(r){var t=r.length;if(t!==0){Ur();var n=N;N=!0;try{for(var e=0;e<t;e++){var l=r[e];l.f&g||(l.f^=g);var u=[];pr(l,u),$r(u)}}finally{N=n}}}function $r(r){var t=r.length;if(t!==0)for(var n=0;n<t;n++){var e=r[n];!(e.f&(V|nr))&&$(e)&&(j(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?_r(e):e.fn=null))}}function jr(){if(q=!1,k>1001)return;const r=H;H=[],Wr(r),q||(k=0)}function Kr(r){q||(q=!0,queueMicrotask(jr));for(var t=r;t.parent!==null;){t=t.parent;var n=t.f;if(n&(L|S)){if(!(n&g))return;t.f^=g}}H.push(t)}function pr(r,t){var n=r.first,e=[];r:for(;n!==null;){var l=n.f,u=(l&S)!==0,o=u&&(l&g)!==0;if(!o&&!(l&nr))if(l&tr){u?n.f^=g:$(n)&&j(n);var i=n.first;if(i!==null){n=i;continue}}else l&rr&&e.push(n);var a=n.next;if(a===null){let _=n.parent;for(;_!==null;){if(r===_)break r;var s=_.next;if(s!==null){n=s;continue r}_=_.parent}}n=a}for(var c=0;c<e.length;c++)i=e[c],t.push(i),pr(i,t)}const Gr=~(U|P|g);function F(r,t){r.f=r.f&Gr|t}function zr(r,t=!1,n){m={p:m,c:null,e:null,m:!1,s:r,x:null,l:null},Er&&!t&&(m.l={s:null,u:null,r1:[],r2:kr(!1)})}function Jr(r){const t=m;if(t!==null){const o=t.e;if(o!==null){var n=E,e=h;t.e=null;try{for(var l=0;l<o.length;l++){var u=o[l];D(u.effect),C(u.reaction),Ir(u.fn)}}finally{D(n),C(e)}}m=t.p,t.m=!0}return{}}const Qr=new Set,Q=new Set;function R(r){var K;var t=this,n=t.ownerDocument,e=r.type,l=((K=r.composedPath)==null?void 0:K.call(r))||[],u=l[0]||r.target,o=0,i=r.__root;if(i){var a=l.indexOf(i);if(a!==-1&&(t===document||t===window)){r.__root=t;return}var s=l.indexOf(t);if(s===-1)return;a<=s&&(o=a)}if(u=l[o]||r.target,u!==t){xr(r,"currentTarget",{configurable:!0,get(){return u||n}});var c=h,_=E;C(null),D(null);try{for(var f,v=[];u!==null;){var w=u.assignedSlot||u.parentNode||u.host||null;try{var x=u["__"+e];if(x!==void 0&&!u.disabled)if(gr(x)){var[dr,...hr]=x;dr.apply(u,[r,...hr])}else x.call(u,r)}catch(O){f?v.push(O):f=O}if(r.cancelBubble||w===t||w===null)break;u=w}if(f){for(let O of v)queueMicrotask(()=>{throw O});throw f}}finally{r.__root=t,delete r.currentTarget,C(c),D(_)}}}function Xr(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function X(r,t){var n=E;n.nodes_start===null&&(n.nodes_start=r,n.nodes_end=t)}function ut(r,t){var n=(t&Ar)!==0,e=(t&Sr)!==0,l,u=!r.startsWith("<!>");return()=>{l===void 0&&(l=Xr(u?r:"<!>"+r),n||(l=B(l)));var o=e?document.importNode(l,!0):l.cloneNode(!0);if(n){var i=B(o),a=o.lastChild;X(i,a)}else X(o,o);return o}}function ot(r,t){r!==null&&r.before(t)}const Zr=["touchstart","touchmove"];function rt(r){return Zr.includes(r)}function at(r,t){return tt(r,t)}const T=new Map;function tt(r,{target:t,anchor:n,props:e={},events:l,context:u,intro:o=!0}){br();var i=new Set,a=_=>{for(var f=0;f<_.length;f++){var v=_[f];if(!i.has(v)){i.add(v);var w=rt(v);t.addEventListener(v,R,{passive:w});var x=T.get(v);x===void 0?(document.addEventListener(v,R,{passive:w}),T.set(v,1)):T.set(v,x+1)}}};a(wr(Qr)),Q.add(a);var s=void 0,c=Lr(()=>{var _=n??t.appendChild(Or());return Pr(()=>{if(u){zr({});var f=m;f.c=u}l&&(e.$$events=l),s=r(_,e)||{},u&&Jr()}),()=>{var w;for(var f of i){t.removeEventListener(f,R);var v=T.get(f);--v===0?(document.removeEventListener(f,R),T.delete(f)):T.set(f,v)}Q.delete(a),Z.delete(s),_!==n&&((w=_.parentNode)==null||w.removeChild(_))}});return Z.set(s,c),s}let Z=new WeakMap;export{ot as a,et as c,at as m,lt as s,ut as t};