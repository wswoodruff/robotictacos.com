var $t=Array.isArray,Ht=Array.from,Ut=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyDescriptors,zt=Object.getPrototypeOf;function Yn(t){return t()}function Gt(t){for(var n=0;n<t.length;n++)t[n]()}const b=2,Et=4,V=8,et=16,g=32,z=64,N=128,H=256,w=512,D=1024,B=2048,L=4096,W=8192,Jt=16384,wt=32768,Qt=1<<18,mt=1<<19,at=Symbol("$state");function yt(t){return t===this.v}function Xt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Zt(t){return!Xt(t,this.v)}function tn(t){throw new Error("effect_in_teardown")}function nn(){throw new Error("effect_in_unowned_derived")}function rn(t){throw new Error("effect_orphan")}function en(){throw new Error("effect_update_depth_exceeded")}function un(){throw new Error("state_unsafe_local_read")}function ln(){throw new Error("state_unsafe_mutation")}let G=!1;function on(){G=!0}function gt(t){return{f:0,v:t,reactions:null,equals:yt,version:0}}function sn(t,n=!1){var e;const r=gt(t);return n||(r.equals=Zt),G&&d!==null&&d.l!==null&&((e=d.l).s??(e.s=[])).push(r),r}function $n(t,n=!1){return fn(sn(t,n))}function fn(t){return f!==null&&f.f&b&&(y===null?bn([t]):y.push(t)),t}function Hn(t,n){return f!==null&&it()&&f.f&(b|et)&&(y===null||!y.includes(t))&&ln(),an(t,n)}function an(t,n){return t.equals(n)||(t.v=n,t.version=jt(),Tt(t,D),it()&&s!==null&&s.f&w&&!(s.f&g)&&(h!==null&&h.includes(t)?(T(s,D),Q(s)):x===null?xn([t]):x.push(t))),n}function Tt(t,n){var r=t.reactions;if(r!==null)for(var e=it(),u=r.length,l=0;l<u;l++){var o=r[l],i=o.f;i&D||!e&&o===s||(T(o,n),i&(w|N)&&(i&b?Tt(o,B):Q(o)))}}const _n=1,cn=2;var _t,kt,bt;function vn(){if(_t===void 0){_t=window;var t=Element.prototype,n=Node.prototype;kt=ft(n,"firstChild").get,bt=ft(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function xt(t=""){return document.createTextNode(t)}function U(t){return kt.call(t)}function ut(t){return bt.call(t)}function Un(t,n){return U(t)}function Kn(t,n){{var r=U(t);return r instanceof Comment&&r.data===""?ut(r):r}}function zn(t,n=1,r=!1){let e=t;for(;n--;)e=ut(e);return e}function Gn(t){var n=b|D;s===null?n|=N:s.f|=mt;const r={children:null,ctx:d,deps:null,equals:yt,f:n,fn:t,reactions:null,v:null,version:0,parent:s};if(f!==null&&f.f&b){var e=f;(e.children??(e.children=[])).push(r)}return r}function Dt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&b?lt(e):M(e)}}}function St(t){var n,r=s;A(t.parent);try{Dt(t),n=It(t)}finally{A(r)}return n}function At(t){var n=St(t),r=(F||t.f&N)&&t.deps!==null?B:w;T(t,r),t.equals(n)||(t.v=n,t.version=jt())}function lt(t){Dt(t),I(t,0),T(t,W),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ct(t){s===null&&f===null&&rn(),f!==null&&f.f&N&&nn(),ot&&tn()}function dn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function R(t,n,r,e=!0){var u=(t&z)!==0,l=s,o={ctx:d,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|D,first:null,fn:n,last:null,next:null,parent:u?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var i=q;try{ct(!0),J(o),o.f|=Jt}catch(c){throw M(o),c}finally{ct(i)}}else n!==null&&Q(o);var _=r&&o.deps===null&&o.first===null&&o.nodes_start===null&&o.teardown===null&&(o.f&mt)===0;if(!_&&!u&&e&&(l!==null&&dn(o,l),f!==null&&f.f&b)){var p=f;(p.children??(p.children=[])).push(o)}return o}function pn(t){const n=R(V,null,!1);return T(n,w),n.teardown=t,n}function Jn(t){Ct();var n=s!==null&&(s.f&g)!==0&&d!==null&&!d.m;if(n){var r=d;(r.e??(r.e=[])).push({fn:t,effect:s,reaction:f})}else{var e=Nt(t);return e}}function Qn(t){return Ct(),En(t)}function hn(t){const n=R(z,t,!0);return()=>{M(n)}}function Nt(t){return R(Et,t,!1)}function En(t){return R(V,t,!0)}function Xn(t){return wn(t)}function wn(t,n=0){return R(V|et|n,t,!0)}function mn(t,n=!0){return R(V|g,t,!0,n)}function Ot(t){var n=t.teardown;if(n!==null){const r=ot,e=f;vt(!0),S(null);try{n.call(null)}finally{vt(r),S(e)}}}function Ft(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)lt(n[r])}}function qt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;M(r,n),r=e}}function yn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&g||M(n),n=r}}function M(t,n=!0){var r=!1;if((n||t.f&Qt)&&t.nodes_start!==null){for(var e=t.nodes_start,u=t.nodes_end;e!==null;){var l=e===u?null:ut(e);e.remove(),e=l}r=!0}qt(t,n&&!r),Ft(t),I(t,0),T(t,W);var o=t.transitions;if(o!==null)for(const _ of o)_.stop();Ot(t);var i=t.parent;i!==null&&i.first!==null&&Lt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function Lt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Zn(t,n){var r=[];Rt(t,r,!0),gn(r,()=>{M(t),n&&n()})}function gn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var u of t)u.out(e)}else n()}function Rt(t,n,r){if(!(t.f&L)){if(t.f^=L,t.transitions!==null)for(const o of t.transitions)(o.is_global||r)&&n.push(o);for(var e=t.first;e!==null;){var u=e.next,l=(e.f&wt)!==0||(e.f&g)!==0;Rt(e,n,l?r:!1),e=u}}}function tr(t){Mt(t,!0)}function Mt(t,n){if(t.f&L){Y(t)&&J(t),t.f^=L;for(var r=t.first;r!==null;){var e=r.next,u=(r.f&wt)!==0||(r.f&g)!==0;Mt(r,u?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}let X=!1,Z=[];function Tn(){X=!1;const t=Z.slice();Z=[],Gt(t)}function kn(t){X||(X=!0,queueMicrotask(Tn)),Z.push(t)}let K=!1,q=!1,ot=!1;function ct(t){q=t}function vt(t){ot=t}let tt=[],j=0;let f=null;function S(t){f=t}let s=null;function A(t){s=t}let y=null;function bn(t){y=t}let h=null,m=0,x=null;function xn(t){x=t}let Pt=0,F=!1,d=null;function jt(){return++Pt}function it(){return!G||d!==null&&d.l===null}function Y(t){var o,i;var n=t.f;if(n&D)return!0;if(n&B){var r=t.deps,e=(n&N)!==0;if(r!==null){var u;if(n&H){for(u=0;u<r.length;u++)((o=r[u]).reactions??(o.reactions=[])).push(t);t.f^=H}for(u=0;u<r.length;u++){var l=r[u];if(Y(l)&&At(l),e&&s!==null&&!F&&!((i=l==null?void 0:l.reactions)!=null&&i.includes(t))&&(l.reactions??(l.reactions=[])).push(t),l.version>t.version)return!0}}e||T(t,w)}return!1}function Dn(t,n,r){throw t}function It(t){var v;var n=h,r=m,e=x,u=f,l=F,o=y,i=d,_=t.f;h=null,m=0,x=null,f=_&(g|z)?null:t,F=!q&&(_&N)!==0,y=null,d=t.ctx;try{var p=(0,t.fn)(),c=t.deps;if(h!==null){var a;if(I(t,m),c!==null&&m>0)for(c.length=m+h.length,a=0;a<h.length;a++)c[m+a]=h[a];else t.deps=c=h;if(!F)for(a=m;a<c.length;a++)((v=c[a]).reactions??(v.reactions=[])).push(t)}else c!==null&&m<c.length&&(I(t,m),c.length=m);return p}finally{h=n,m=r,x=e,f=u,F=l,y=o,d=i}}function Sn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var u=r.length-1;u===0?r=n.reactions=null:(r[e]=r[u],r.pop())}}r===null&&n.f&b&&(h===null||!h.includes(n))&&(T(n,B),n.f&(N|H)||(n.f^=H),I(n,0))}function I(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Sn(t,r[e])}function J(t){var n=t.f;if(!(n&W)){T(t,w);var r=s;s=t;try{n&et?yn(t):qt(t),Ft(t),Ot(t);var e=It(t);t.teardown=typeof e=="function"?e:null,t.version=Pt}catch(u){Dn(u)}finally{s=r}}}function An(){j>1e3&&(j=0,en()),j++}function Cn(t){var n=t.length;if(n!==0){An();var r=q;q=!0;try{for(var e=0;e<n;e++){var u=t[e];u.f&w||(u.f^=w);var l=[];Vt(u,l),Nn(l)}}finally{q=r}}}function Nn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(W|L))&&Y(e)&&(J(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Lt(e):e.fn=null))}}function On(){if(K=!1,j>1001)return;const t=tt;tt=[],Cn(t),K||(j=0)}function Q(t){K||(K=!0,queueMicrotask(On));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(z|g)){if(!(r&w))return;n.f^=w}}tt.push(n)}function Vt(t,n){var r=t.first,e=[];t:for(;r!==null;){var u=r.f,l=(u&g)!==0,o=l&&(u&w)!==0;if(!o&&!(u&L))if(u&V){l?r.f^=w:Y(r)&&J(r);var i=r.first;if(i!==null){r=i;continue}}else u&Et&&e.push(r);var _=r.next;if(_===null){let a=r.parent;for(;a!==null;){if(t===a)break t;var p=a.next;if(p!==null){r=p;continue t}a=a.parent}}r=_}for(var c=0;c<e.length;c++)i=e[c],n.push(i),Vt(i,n)}function nr(t){var i;var n=t.f,r=(n&b)!==0;if(r&&n&W){var e=St(t);return lt(t),e}if(f!==null){y!==null&&y.includes(t)&&un();var u=f.deps;h===null&&u!==null&&u[m]===t?m++:h===null?h=[t]:h.push(t),x!==null&&s!==null&&s.f&w&&!(s.f&g)&&x.includes(t)&&(T(s,D),Q(s))}else if(r&&t.deps===null){var l=t,o=l.parent;o!==null&&!((i=o.deriveds)!=null&&i.includes(l))&&(o.deriveds??(o.deriveds=[])).push(l)}return r&&(l=t,Y(l)&&At(l)),t.v}function rr(t){const n=f;try{return f=null,t()}finally{f=n}}const Fn=~(D|B|w);function T(t,n){t.f=t.f&Fn|n}function qn(t,n=!1,r){d={p:d,c:null,e:null,m:!1,s:t,x:null,l:null},G&&!n&&(d.l={s:null,u:null,r1:[],r2:gt(!1)})}function Ln(t){const n=d;if(n!==null){const o=n.e;if(o!==null){var r=s,e=f;n.e=null;try{for(var u=0;u<o.length;u++){var l=o[u];A(l.effect),S(l.reaction),Nt(l.fn)}}finally{A(r),S(e)}}d=n.p,n.m=!0}return{}}function er(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(at in t)nt(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&at in r&&nt(r)}}}function nt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{nt(t[e],n)}catch{}const r=zt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Kt(r);for(let u in e){const l=e[u].get;if(l)try{l.call(t)}catch{}}}}}let dt=!1;function Rn(){dt||(dt=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var n;if(!t.defaultPrevented)for(const r of t.target.elements)(n=r.__on_r)==null||n.call(r)})},{capture:!0}))}function Bt(t){var n=f,r=s;S(null),A(null);try{return t()}finally{S(n),A(r)}}function ur(t,n,r,e=r){t.addEventListener(n,()=>Bt(r));const u=t.__on_r;u?t.__on_r=()=>{u(),e()}:t.__on_r=e,Rn()}const Mn=new Set,pt=new Set;function Pn(t,n,r,e){function u(l){if(e.capture||P.call(n,l),!l.cancelBubble)return Bt(()=>r.call(this,l))}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?kn(()=>{n.addEventListener(t,u,e)}):n.addEventListener(t,u,e),u}function lr(t,n,r,e,u){var l={capture:e,passive:u},o=Pn(t,n,r,l);(n===document.body||n===window||n===document)&&pn(()=>{n.removeEventListener(t,o,l)})}function P(t){var st;var n=this,r=n.ownerDocument,e=t.type,u=((st=t.composedPath)==null?void 0:st.call(t))||[],l=u[0]||t.target,o=0,i=t.__root;if(i){var _=u.indexOf(i);if(_!==-1&&(n===document||n===window)){t.__root=n;return}var p=u.indexOf(n);if(p===-1)return;_<=p&&(o=_)}if(l=u[o]||t.target,l!==n){Ut(t,"currentTarget",{configurable:!0,get(){return l||r}});var c=f,a=s;S(null),A(null);try{for(var v,E=[];l!==null;){var k=l.assignedSlot||l.parentNode||l.host||null;try{var C=l["__"+e];if(C!==void 0&&!l.disabled)if($t(C)){var[Wt,...Yt]=C;Wt.apply(l,[t,...Yt])}else C.call(l,t)}catch($){v?E.push($):v=$}if(t.cancelBubble||k===n||k===null)break;l=k}if(v){for(let $ of E)queueMicrotask(()=>{throw $});throw v}}finally{t.__root=n,delete t.currentTarget,S(c),A(a)}}}function jn(t){var n=document.createElement("template");return n.innerHTML=t,n.content}function rt(t,n){var r=s;r.nodes_start===null&&(r.nodes_start=t,r.nodes_end=n)}function or(t,n){var r=(n&_n)!==0,e=(n&cn)!==0,u,l=!t.startsWith("<!>");return()=>{u===void 0&&(u=jn(l?t:"<!>"+t),r||(u=U(u)));var o=e?document.importNode(u,!0):u.cloneNode(!0);if(r){var i=U(o),_=o.lastChild;rt(i,_)}else rt(o,o);return o}}function ir(){var t=document.createDocumentFragment(),n=document.createComment(""),r=xt();return t.append(n,r),rt(n,r),t}function sr(t,n){t!==null&&t.before(n)}const In=["touchstart","touchmove"];function Vn(t){return In.includes(t)}function fr(t,n){var r=n==null?"":typeof n=="object"?n+"":n;r!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=r,t.nodeValue=r==null?"":r+"")}function ar(t,n){return Bn(t,n)}const O=new Map;function Bn(t,{target:n,anchor:r,props:e={},events:u,context:l,intro:o=!0}){vn();var i=new Set,_=a=>{for(var v=0;v<a.length;v++){var E=a[v];if(!i.has(E)){i.add(E);var k=Vn(E);n.addEventListener(E,P,{passive:k});var C=O.get(E);C===void 0?(document.addEventListener(E,P,{passive:k}),O.set(E,1)):O.set(E,C+1)}}};_(Ht(Mn)),pt.add(_);var p=void 0,c=hn(()=>{var a=r??n.appendChild(xt());return mn(()=>{if(l){qn({});var v=d;v.c=l}u&&(e.$$events=u),p=t(a,e)||{},l&&Ln()}),()=>{var k;for(var v of i){n.removeEventListener(v,P);var E=O.get(v);--E===0?(document.removeEventListener(v,P),O.delete(v)):O.set(v,E)}pt.delete(_),ht.delete(p),a!==r&&((k=a.parentNode)==null||k.removeChild(a))}});return ht.set(p,c),p}let ht=new WeakMap;const Wn="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Wn);on();export{Xn as A,Hn as B,$n as C,fr as D,wt as E,mn as a,wn as b,En as c,Jn as d,d as e,rr as f,Gt as g,nr as h,it as i,Yn as j,er as k,ur as l,ar as m,Gn as n,Kn as o,Zn as p,sr as q,tr as r,zn as s,or as t,Qn as u,Un as v,qn as w,lr as x,Ln as y,ir as z};