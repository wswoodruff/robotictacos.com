import"../../cawad-regular-LUVKtMNm.js";import{j as N,i as U,A as r,f as q,a as G,b as H,g as V,P as $,L as F,d as X,S as Y,h as C,V as A,O as J,e as Q}from"../../superneatlib-CH9wRX8J.js";import{M as K,N as tt,O as it,P as ot,S as et,x as st,Q as nt,z as at,g as j,G as E,B as ct,C as rt,D as lt,F as dt,R as B,y as R,J as W,K as pt}from"../../legacy-89TXPw0t.js";import{I as ft}from"../../ImprovedNoise-CAvO-0XD.js";import{D as ut}from"../../driver-CpE7_n-m.js";let P=[];function yt(){var e=P;P=[],K(e)}function mt(e){P.length===0&&queueMicrotask(yt),P.push(e)}function Z(e,p){return e===p||(e==null?void 0:e[et])===p}function I(e={},p,g,x){return tt(()=>{var f,t;return it(()=>{f=t,t=[],ot(()=>{e!==g(...t)&&(p(e,...t),f&&Z(g(...f),e)&&p(null,...f))})}),()=>{mt(()=>{t&&Z(g(...t),e)&&p(null,...t)})}}),e}const M={joystickController:null,joystickAxis:new N};var gt=rt('<div id="joystickcontroller" class="svelte-o9fiku"><div class="border svelte-o9fiku"><div class="stick svelte-o9fiku"></div> <div class="center svelte-o9fiku"></div></div></div>');function xt(e,p){st(p,!1);const g=nt();let x=E(),f=E(),t,h={x:0,y:0},z={x:0,y:0},n,s=!1,u,l;function w(){const i=n.left+t,c=n.top+t;let o=u-i,a=l-c,m=Math.sqrt(o*o+a*a),d=t;if(m>d){let y=Math.atan2(a,o);o=Math.cos(y)*d,a=Math.sin(y)*d}h.x=o,h.y=a,B(x,j(x).style.transform=`translate(${o}px, ${a}px)`),z.x=o/d,z.y=-a/d,g("joystickmove",{position:{x:z.x,y:z.y}})}function O(){h.x=0,h.y=0,B(x,j(x).style.transform="translate(0, 0)"),g("joystickmove",{position:{x:h.x,y:h.y}})}function D(i){i.touches?(u=i.touches[0].clientX,l=i.touches[0].clientY):(u=i.clientX,l=i.clientY)}function k(i){i.preventDefault(),s=!0,D(i)}function S(i){i.preventDefault(),s=!1,O()}function _(i){s&&(D(i),w())}at(()=>{n=j(f).getBoundingClientRect(),console.log("borderRect",n),t=n.height/2,j(f).addEventListener("mousedown",k),j(f).addEventListener("touchstart",k),document.addEventListener("mousemove",_),document.addEventListener("touchmove",_),document.addEventListener("mouseup",S),document.addEventListener("touchend",S)}),ct();var L=gt(),v=W(L),b=W(v);I(b,i=>R(x,i),()=>j(x)),I(L,i=>R(f,i),()=>j(f)),lt(e,L),dt()}const ht=new URL("/assets/bot1-BN9gAiQy.glb",import.meta.url).href;async function kt(){const e=r;U(r),q(r),G(r),H(r);const p=V({store:r,type:"y",divisions:40,size:4});p.visible=!1;const g=r.scene,x=r.camera;r.renderer;const f=new $(16777215,2,100);f.position.set(5,5,5),g.add(f),F.hemisphereLight(r.scene),x.position.set(1,2,3.5);const t=X.plane({store:r,scale:1,color:11533055});t.position.set(0,.1,0),t.scale.setScalar(1),Y.decoSuper3D(t),r.addObject3D(t),t.add(new C({store:e,size:1,letterSize:.2}));const h=new ft,z=40,n=X.plane({widthSegments:z,heightSegments:z,store:r,scale:10,color:11533055});Y.decoSuper3D(n),n.material.wireframe=!0,n.position.set(0,.1,0),n.scale.setScalar(14),Y.decoSuper3D(n),r.addObject3D(n),n.add(new C({store:e,size:1,letterSize:.2})),n._____update=function(v,b){const i=n.geometry.getAttribute("position"),c=2.5,o=.2;new A(0,0,0);for(let a=0;a<i.count;a++){const m=i.getX(a);i.getY(a);const d=i.getZ(a),y=h.noise(m*c+b,d*c,0);i.setXYZ(a,m,y*o,d)}i.needsUpdate=!0};const s=X.ball({scene:g,scale:1,color:11533055});s.position.set(0,.1,0),s.scale.setScalar(.1),Y.decoSuper3D(s),r.addObject3D(s),s.material.color.setHex(65450),s.add(new C({store:e,size:1,letterSize:.2}));const u=new A,l=new A,w=new A;t.____update=function(v,b){w.copy(t.position);let i=9999999999;const c=n.geometry.getAttribute("position");for(let o=0;o<c.count;o++){const a=c.getX(o),m=c.getY(o),d=c.getZ(o);u.set(a,m,d),n.localToWorld(u);const y=w.distanceTo(u);y<i&&(i=y,l.copy(u))}t.position.y+=(l.y-t.position.y)*.12,s.position.x+=(l.x-s.position.x)*.12,s.position.y+=(l.y-s.position.y)*.12,s.position.z+=(l.z-s.position.z)*.12};const O=new ut({store:e,object:t,friction:0,damping:.80502,speed:.025,tilt:-Math.PI*2*.5,allowTilt:!0,allowTurning:!1});console.log("dijdiojsod2222");const D=new J;g.add(D),r.addObject3D(D),D.update=function(){M.joystickController&&M.joystickAxis&&O.axis.copy(M.joystickAxis)};const k=new Q(ht);await k.init(e),k.scaleTo(1.5),k.playAnimations(),r.addObject3D(k),t.add(k),k.setColorAll(16711935),t.position.y=2,window.hoverboard=t;const S=new A().copy(t.position);t.update=function(){S.add(O.velocity),t.position.z>1?t.position.z+=(1-t.position.z)*.2:t.position.z<-1&&(t.position.z+=(-1-t.position.z)*.2),t.position.x>1?t.position.x+=(1-t.position.x)*.2:t.position.x<-1&&(t.position.x+=(-1-t.position.x)*.2),t.position.y>1?t.position.y+=(1-t.position.y)*.2:t.position.y<-1&&(t.position.y+=(-1-t.position.y)*.2),t.position.x+=-t.position.x*.2/2,t.position.z+=-t.position.z*.2/2};function _(v,b,i){let c=Math.max(0,Math.min(1,(i-v)/(b-v)));return c*c*(3-2*c)}n.update=function(v,b){const i=n.geometry.getAttribute("position"),c=.1;new A(0,0,0);for(let o=0;o<i.count;o++){const a=i.getX(o);i.getY(o);const m=i.getZ(o),d=a*5+S.x*.2,y=m*5+S.z*.2;let T=h.noise(d,y,0);T=_(.1,.4,T),i.setXYZ(o,a,T*c,m)}i.needsUpdate=!0,L()};function L(v,b){w.copy(t.position),t.material.transparent=!0,t.material.opacity=0;let i=9999999999;const c=n.geometry.getAttribute("position");for(let o=0;o<c.count;o++){const a=c.getX(o),m=c.getY(o),d=c.getZ(o);u.set(a,m,d),n.localToWorld(u);const y=w.distanceTo(u);y<i&&(i=y,l.copy(u))}t.position.y+=(l.y-t.position.y)*.12,s.position.x+=(l.x-s.position.x)*.12,s.position.y+=(l.y-s.position.y)*.12,s.position.z+=(l.z-s.position.z)*.12}}const vt=pt(xt,{target:document.getElementById("joystickcontroller"),events:{joystickmove:function(e){var p;(p=e==null?void 0:e.detail)!=null&&p.position&&M.joystickAxis.copy(e.detail.position)}}});M.joystickController=vt;function bt(){kt()}bt();console.log("sldknldkfnglk");
