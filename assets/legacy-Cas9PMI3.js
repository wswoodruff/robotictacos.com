var mr=Array.isArray,wr=Array.from,gr=Object.defineProperty,z=Object.getOwnPropertyDescriptor;const U=2,tr=4,nr=8,xr=16,b=32,q=64,P=128,M=256,w=512,Y=1024,V=2048,er=4096,B=8192,Tr=16384,yr=1<<18,Nr=1<<19;function Cr(r){return r===this.v}function Dr(){throw new Error("effect_update_depth_exceeded")}let lr=!1;function Fr(){lr=!0}function Sr(r){return{f:0,v:r,reactions:null,equals:Cr,version:0}}const kr=1,br=2;var J,ur,or;function Ar(){if(J===void 0){J=window;var r=Element.prototype,t=Node.prototype;ur=z(t,"firstChild").get,or=z(t,"nextSibling").get,r.__click=void 0,r.__className="",r.__attributes=null,r.__styles=null,r.__e=void 0,Text.prototype.__t=void 0}}function Or(r=""){return document.createTextNode(r)}function I(r){return ur.call(r)}function W(r){return or.call(r)}function et(r,t){return I(r)}function lt(r,t){{var n=I(r);return n instanceof Comment&&n.data===""?W(n):n}}function ut(r,t=1,n=!1){let e=r;for(;t--;)e=W(e);return e}function ar(r){var t=r.children;if(t!==null){r.children=null;for(var n=0;n<t.length;n+=1){var e=t[n];e.f&U?ir(e):A(e)}}}function Rr(r){var t,n=E;D(r.parent);try{ar(r),t=pr(r)}finally{D(n)}return t}function Mr(r){var t=Rr(r),n=(y||r.f&P)&&r.deps!==null?V:w;F(r,n),r.equals(t)||(r.v=t,r.version=Br())}function ir(r){ar(r),k(r,0),F(r,B),r.v=r.children=r.deps=r.ctx=r.reactions=null}function Ir(r,t){var n=t.last;n===null?t.last=t.first=r:(n.next=r,r.prev=n,t.last=r)}function $(r,t,n,e=!0){var l=(r&q)!==0,u=E,o={ctx:m,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:r|Y,first:null,fn:t,last:null,next:null,parent:l?null:u,prev:null,teardown:null,transitions:null,version:0};if(n){var i=N;try{Q(!0),K(o),o.f|=Tr}catch(c){throw A(o),c}finally{Q(i)}}else t!==null&&Kr(o);var a=n&&o.deps===null&&o.first===null&&o.nodes_start===null&&o.teardown===null&&(o.f&Nr)===0;if(!a&&!l&&e&&(u!==null&&Ir(o,u),h!==null&&h.f&U)){var s=h;(s.children??(s.children=[])).push(o)}return o}function Lr(r){const t=$(q,r,!0);return()=>{A(t)}}function qr(r){return $(tr,r,!1)}function Pr(r,t=!0){return $(nr|b,r,!0,t)}function sr(r){var t=r.teardown;if(t!==null){const n=h;C(null);try{t.call(null)}finally{C(n)}}}function fr(r){var t=r.deriveds;if(t!==null){r.deriveds=null;for(var n=0;n<t.length;n+=1)ir(t[n])}}function _r(r,t=!1){var n=r.first;for(r.first=r.last=null;n!==null;){var e=n.next;A(n,t),n=e}}function Vr(r){for(var t=r.first;t!==null;){var n=t.next;t.f&b||A(t),t=n}}function A(r,t=!0){var n=!1;if((t||r.f&yr)&&r.nodes_start!==null){for(var e=r.nodes_start,l=r.nodes_end;e!==null;){var u=e===l?null:W(e);e.remove(),e=u}n=!0}_r(r,t&&!n),fr(r),k(r,0),F(r,B);var o=r.transitions;if(o!==null)for(const a of o)a.stop();sr(r);var i=r.parent;i!==null&&i.first!==null&&vr(r),r.next=r.prev=r.teardown=r.ctx=r.deps=r.parent=r.fn=r.nodes_start=r.nodes_end=null}function vr(r){var t=r.parent,n=r.prev,e=r.next;n!==null&&(n.next=e),e!==null&&(e.prev=n),t!==null&&(t.first===r&&(t.first=e),t.last===r&&(t.last=n))}let L=!1,N=!1;function Q(r){N=r}let H=[],S=0;let h=null;function C(r){h=r}let E=null;function D(r){E=r}let d=null,p=0,cr=0,y=!1,m=null;function Br(){return++cr}function j(r){var o,i;var t=r.f;if(t&Y)return!0;if(t&V){var n=r.deps,e=(t&P)!==0;if(n!==null){var l;if(t&M){for(l=0;l<n.length;l++)((o=n[l]).reactions??(o.reactions=[])).push(r);r.f^=M}for(l=0;l<n.length;l++){var u=n[l];if(j(u)&&Mr(u),e&&E!==null&&!y&&!((i=u==null?void 0:u.reactions)!=null&&i.includes(r))&&(u.reactions??(u.reactions=[])).push(r),u.version>r.version)return!0}}e||F(r,w)}return!1}function Hr(r,t,n){throw r}function pr(r){var c;var t=d,n=p,e=h,l=y,u=m,o=r.f;d=null,p=0,h=o&(b|q)?null:r,y=!N&&(o&P)!==0,m=r.ctx;try{var i=(0,r.fn)(),a=r.deps;if(d!==null){var s;if(k(r,p),a!==null&&p>0)for(a.length=p+d.length,s=0;s<d.length;s++)a[p+s]=d[s];else r.deps=a=d;if(!y)for(s=p;s<a.length;s++)((c=a[s]).reactions??(c.reactions=[])).push(r)}else a!==null&&p<a.length&&(k(r,p),a.length=p);return i}finally{d=t,p=n,h=e,y=l,m=u}}function Ur(r,t){let n=t.reactions;if(n!==null){var e=n.indexOf(r);if(e!==-1){var l=n.length-1;l===0?n=t.reactions=null:(n[e]=n[l],n.pop())}}n===null&&t.f&U&&(d===null||!d.includes(t))&&(F(t,V),t.f&(P|M)||(t.f^=M),k(t,0))}function k(r,t){var n=r.deps;if(n!==null)for(var e=t;e<n.length;e++)Ur(r,n[e])}function K(r){var t=r.f;if(!(t&B)){F(r,w);var n=E;E=r;try{t&xr?Vr(r):_r(r),fr(r),sr(r);var e=pr(r);r.teardown=typeof e=="function"?e:null,r.version=cr}catch(l){Hr(l)}finally{E=n}}}function Yr(){S>1e3&&(S=0,Dr()),S++}function Wr(r){var t=r.length;if(t!==0){Yr();var n=N;N=!0;try{for(var e=0;e<t;e++){var l=r[e];l.f&w||(l.f^=w);var u=[];dr(l,u),$r(u)}}finally{N=n}}}function $r(r){var t=r.length;if(t!==0)for(var n=0;n<t;n++){var e=r[n];!(e.f&(B|er))&&j(e)&&(K(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?vr(e):e.fn=null))}}function jr(){if(L=!1,S>1001)return;const r=H;H=[],Wr(r),L||(S=0)}function Kr(r){L||(L=!0,queueMicrotask(jr));for(var t=r;t.parent!==null;){t=t.parent;var n=t.f;if(n&(q|b)){if(!(n&w))return;t.f^=w}}H.push(t)}function dr(r,t){var n=r.first,e=[];r:for(;n!==null;){var l=n.f,u=(l&b)!==0,o=u&&(l&w)!==0;if(!o&&!(l&er))if(l&nr){u?n.f^=w:j(n)&&K(n);var i=n.first;if(i!==null){n=i;continue}}else l&tr&&e.push(n);var a=n.next;if(a===null){let _=n.parent;for(;_!==null;){if(r===_)break r;var s=_.next;if(s!==null){n=s;continue r}_=_.parent}}n=a}for(var c=0;c<e.length;c++)i=e[c],t.push(i),dr(i,t)}const Gr=~(Y|V|w);function F(r,t){r.f=r.f&Gr|t}function zr(r,t=!1,n){m={p:m,c:null,e:null,m:!1,s:r,x:null,l:null},lr&&!t&&(m.l={s:null,u:null,r1:[],r2:Sr(!1)})}function Jr(r){const t=m;if(t!==null){const o=t.e;if(o!==null){var n=E,e=h;t.e=null;try{for(var l=0;l<o.length;l++){var u=o[l];D(u.effect),C(u.reaction),qr(u.fn)}}finally{D(n),C(e)}}m=t.p,t.m=!0}return{}}const Qr=new Set,X=new Set;function R(r){var G;var t=this,n=t.ownerDocument,e=r.type,l=((G=r.composedPath)==null?void 0:G.call(r))||[],u=l[0]||r.target,o=0,i=r.__root;if(i){var a=l.indexOf(i);if(a!==-1&&(t===document||t===window)){r.__root=t;return}var s=l.indexOf(t);if(s===-1)return;a<=s&&(o=a)}if(u=l[o]||r.target,u!==t){gr(r,"currentTarget",{configurable:!0,get(){return u||n}});var c=h,_=E;C(null),D(null);try{for(var f,v=[];u!==null;){var g=u.assignedSlot||u.parentNode||u.host||null;try{var x=u["__"+e];if(x!==void 0&&!u.disabled)if(mr(x)){var[hr,...Er]=x;hr.apply(u,[r,...Er])}else x.call(u,r)}catch(O){f?v.push(O):f=O}if(r.cancelBubble||g===t||g===null)break;u=g}if(f){for(let O of v)queueMicrotask(()=>{throw O});throw f}}finally{r.__root=t,delete r.currentTarget,C(c),D(_)}}}function Xr(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function Z(r,t){var n=E;n.nodes_start===null&&(n.nodes_start=r,n.nodes_end=t)}function ot(r,t){var n=(t&kr)!==0,e=(t&br)!==0,l,u=!r.startsWith("<!>");return()=>{l===void 0&&(l=Xr(u?r:"<!>"+r),n||(l=I(l)));var o=e?document.importNode(l,!0):l.cloneNode(!0);if(n){var i=I(o),a=o.lastChild;Z(i,a)}else Z(o,o);return o}}function at(r,t){r!==null&&r.before(t)}const Zr=["touchstart","touchmove"];function rt(r){return Zr.includes(r)}function it(r,t){return tt(r,t)}const T=new Map;function tt(r,{target:t,anchor:n,props:e={},events:l,context:u,intro:o=!0}){Ar();var i=new Set,a=_=>{for(var f=0;f<_.length;f++){var v=_[f];if(!i.has(v)){i.add(v);var g=rt(v);t.addEventListener(v,R,{passive:g});var x=T.get(v);x===void 0?(document.addEventListener(v,R,{passive:g}),T.set(v,1)):T.set(v,x+1)}}};a(wr(Qr)),X.add(a);var s=void 0,c=Lr(()=>{var _=n??t.appendChild(Or());return Pr(()=>{if(u){zr({});var f=m;f.c=u}l&&(e.$$events=l),s=r(_,e)||{},u&&Jr()}),()=>{var g;for(var f of i){t.removeEventListener(f,R);var v=T.get(f);--v===0?(document.removeEventListener(f,R),T.delete(f)):T.set(f,v)}X.delete(a),rr.delete(s),_!==n&&((g=_.parentNode)==null||g.removeChild(_))}});return rr.set(s,c),s}let rr=new WeakMap;const nt="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(nt);Fr();export{at as a,et as c,lt as f,it as m,ut as s,ot as t};
