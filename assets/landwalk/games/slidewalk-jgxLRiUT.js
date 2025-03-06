import"../../cawad-regular-LUVKtMNm.js";import{j as G,i as R,A as c,f as Z,a as q,b as I,k as N,l as H,g as J,P as $,L as Q,d as O,S as U,h as V,m as K,G as tt,V as L,O as ot,e as it}from"../../superneatlib-Bp3Kchvi.js";import{M as et,N as nt,O as st,P as rt,S as at,x as ct,Q as lt,z as dt,g as z,G as Y,B as pt,C as ft,D as mt,F as vt,R as T,y as B,J as E,K as ut}from"../../legacy-89TXPw0t.js";import{I as gt}from"../../ImprovedNoise-CAvO-0XD.js";import{D as ht}from"../../driver-BKCTqOX2.js";let W=[];function yt(){var e=W;W=[],et(e)}function xt(e){W.length===0&&queueMicrotask(yt),W.push(e)}function X(e,p){return e===p||(e==null?void 0:e[at])===p}function F(e={},p,g,h){return nt(()=>{var f,t;return st(()=>{f=t,t=[],rt(()=>{e!==g(...t)&&(p(e,...t),f&&X(g(...f),e)&&p(null,...f))})}),()=>{xt(()=>{t&&X(g(...t),e)&&p(null,...t)})}}),e}const A={joystickController:null,joystickAxis:new G};var wt=ft('<div id="joystickcontroller" class="svelte-o9fiku"><div class="border svelte-o9fiku"><div class="stick svelte-o9fiku"></div> <div class="center svelte-o9fiku"></div></div></div>');function bt(e,p){ct(p,!1);const g=lt();let h=Y(),f=Y(),t,y={x:0,y:0},k={x:0,y:0},n,s=!1,m,l;function j(){const o=n.left+t,a=n.top+t;let i=m-o,r=l-a,u=Math.sqrt(i*i+r*r),d=t;if(u>d){let v=Math.atan2(r,i);i=Math.cos(v)*d,r=Math.sin(v)*d}y.x=i,y.y=r,T(h,z(h).style.transform=`translate(${i}px, ${r}px)`),k.x=i/d,k.y=-r/d,g("joystickmove",{position:{x:k.x,y:k.y}})}function D(){y.x=0,y.y=0,T(h,z(h).style.transform="translate(0, 0)"),g("joystickmove",{position:{x:y.x,y:y.y}})}function C(o){o.touches?(m=o.touches[0].clientX,l=o.touches[0].clientY):(m=o.clientX,l=o.clientY)}function x(o){o.preventDefault(),s=!0,C(o)}function S(o){o.preventDefault(),s=!1,D()}function _(o){s&&(C(o),j())}dt(()=>{n=z(f).getBoundingClientRect(),console.log("borderRect",n),t=n.height/2,z(f).addEventListener("mousedown",x),z(f).addEventListener("touchstart",x),document.addEventListener("mousemove",_),document.addEventListener("touchmove",_),document.addEventListener("mouseup",S),document.addEventListener("touchend",S)}),pt();var M=wt(),w=E(M),b=E(w);F(b,o=>B(h,o),()=>z(h)),F(M,o=>B(f,o),()=>z(f)),mt(e,M),vt()}const kt=`// out vec2 vUv;
// void main() {
//      vUv = uv; // Pass UV coordinates to fragment shader
//      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }

precision highp float;

// in vec3 position;
// in vec2 uv;

out vec2 vUv;
out vec3 pos; // Pass Y-coordinate to the fragment shader


// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;

void main() {
    vUv = uv; // Pass UV coordinates to fragment shader
	pos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,zt=`// // License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
// #extension GL_OES_standard_derivatives : enable

// varying vec3 vertex;

// void main() {
//   // Pick a coordinate to visualize in a grid
//   float coord = vertex.y;

//   // Compute anti-aliased world-space grid lines
//   float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);

//   // Just visualize the grid lines directly
//   float color = 1.0 - min(line, 1.0);

//   // Apply gamma correction
//   color = pow(color, 1.0 / 2.2);
//   gl_FragColor = vec4(vec3(color), 1.0);
// }

// https://jsfiddle.net/prisoner849/5bk9tvjd/
// https://discourse.threejs.org/t/wireframe-of-quads/17924/10
 // http://madebyevan.com/shaders/grid/

in vec3 vertex; // 'varying' changes to 'in' in GLSL3
out vec4 fragColor;

in vec2 vUv;
uniform float time;

in vec3 pos;

void main() {
    // float coord = pos.y;
    // float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    // float _color = 1.0 - min(line, 1.0);
    // _color = pow(_color, 1.0 / 2.2);


        // float isWire = 1.0;
        // float segU = 24.0;
        // float segV = 24.0;
        // vec3 wireColor = vec3(0.5);
        // float wireWidthFactor = 2.0;

        // vec2 coord = vUv * vec2(segU, segV);

        // vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        // float line = min(grid.x, grid.y) / wireWidthFactor;
        // line = 1.0 - min(line, 1.0);
        
        // if (isWire > 0.5 && line < 0.5) discard;
        
        // if (isWire > 0.5) fragColor = vec4(0);
        // fragColor = mix(fragColor, vec4(wireColor, 1.0), line);
      


// float isWire = 1.0;
float segU = 24.0;
float segV = 24.0;
// vec3 wireColor = vec3(1.0); // White wire color
vec3 wireColor = vec3(0.1,1.0,0.2); // White wire color
vec3 baseColor = vec3(0.0); // Black base color
float wireWidthFactor = 2.0;
float baseAlpha = 0.8;

vec2 coord = vUv * vec2(segU, segV);
vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
float line = min(grid.x, grid.y) / wireWidthFactor;
line = 1.0 - min(line, 1.0);

// Start with base color
vec3 mixColor = baseColor;

// Blend wire color based on the line intensity
mixColor = mix(baseColor, wireColor, line);
    float alpha = mix(baseAlpha, 1.0, line); // Wires fully opaque

// if (isWire > 0.5) {
// }

// fragColor = vec4(mixColor, 1.0);
fragColor = vec4(mixColor, alpha);



    // vec3 color = vec3(sin(vUv.x * 10.0 + time), cos(vUv.y * 10.0 + time), sin(time)); 
    // fragColor = vec4(vec3(_color), 1.0);

}`,jt=new URL("/assets/bot1-BN9gAiQy.glb",import.meta.url).href;async function Ct(){const e=c;R(c),Z(c),q(c),I(c),N(c,{resolution:256,strength:.6,radius:.2,threshold:.32}),c.renderer.toneMapping=H;const p=J({store:c,type:"y",divisions:40,size:4});p.visible=!1;const g=c.scene,h=c.camera;c.renderer;const f=new $(16777215,2,100);f.position.set(5,5,5),g.add(f),Q.hemisphereLight(c.scene),h.position.set(1,2,3.5);const t=O.plane({store:c,scale:1,color:11533055});t.position.set(0,.1,0),t.scale.setScalar(1),U.decoSuper3D(t),c.addObject3D(t),t.add(new V({store:e,size:1,letterSize:.2}));const y=new gt,k=40,n=O.plane({widthSegments:k,heightSegments:k,store:c,scale:10,color:11533055});U.decoSuper3D(n),n.material=new K({vertexShader:kt,fragmentShader:zt,uniforms:{time:{value:0}},glslVersion:tt}),n.material.transparent=!0,n.position.set(0,.1,0),n.scale.setScalar(14),U.decoSuper3D(n),c.addObject3D(n),n.add(new V({store:e,size:1,letterSize:.2})),n._____update=function(w,b){const o=n.geometry.getAttribute("position"),a=2.5,i=.2;new L(0,0,0);for(let r=0;r<o.count;r++){const u=o.getX(r);o.getY(r);const d=o.getZ(r),v=y.noise(u*a+b,d*a,0);o.setXYZ(r,u,v*i,d)}o.needsUpdate=!0};const s=O.ball({scene:g,scale:1,color:11533055});s.position.set(0,.1,0),s.scale.setScalar(.1),U.decoSuper3D(s),c.addObject3D(s),s.material.color.setHex(65450),s.add(new V({store:e,size:1,letterSize:.2}));const m=new L,l=new L,j=new L;t.____update=function(w,b){j.copy(t.position);let o=9999999999;const a=n.geometry.getAttribute("position");for(let i=0;i<a.count;i++){const r=a.getX(i),u=a.getY(i),d=a.getZ(i);m.set(r,u,d),n.localToWorld(m);const v=j.distanceTo(m);v<o&&(o=v,l.copy(m))}t.position.y+=(l.y-t.position.y)*.12,s.position.x+=(l.x-s.position.x)*.12,s.position.y+=(l.y-s.position.y)*.12,s.position.z+=(l.z-s.position.z)*.12};const D=new ht({store:e,object:t,friction:0,damping:.80502,speed:.025,tilt:-Math.PI*2*.5,allowTilt:!0,allowTurning:!1});console.log("dijdiojsod2222");const C=new ot;g.add(C),c.addObject3D(C),C.update=function(){A.joystickController&&A.joystickAxis&&D.axis.copy(A.joystickAxis)};const x=new it(jt);await x.init(e),x.scaleTo(1.5),x.playAnimations(),c.addObject3D(x),t.add(x),x.setColorAll(16711935),t.position.y=2,window.hoverboard=t;const S=new L().copy(t.position);t.update=function(){S.add(D.velocity),t.position.z>1?t.position.z+=(1-t.position.z)*.2:t.position.z<-1&&(t.position.z+=(-1-t.position.z)*.2),t.position.x>1?t.position.x+=(1-t.position.x)*.2:t.position.x<-1&&(t.position.x+=(-1-t.position.x)*.2),t.position.y>1?t.position.y+=(1-t.position.y)*.2:t.position.y<-1&&(t.position.y+=(-1-t.position.y)*.2),t.position.x+=-t.position.x*.2/2,t.position.z+=-t.position.z*.2/2};function _(w,b,o){let a=Math.max(0,Math.min(1,(o-w)/(b-w)));return a*a*(3-2*a)}n.update=function(w,b){const o=n.geometry.getAttribute("position"),a=.1;new L(0,0,0);for(let i=0;i<o.count;i++){const r=o.getX(i);o.getY(i);const u=o.getZ(i),d=r*5+S.x*.2,v=u*5+S.z*.2;let P=y.noise(d,v,0);P=_(.1,.4,P),o.setXYZ(i,r,P*a,u)}o.needsUpdate=!0,M()};function M(w,b){j.copy(t.position),t.material.transparent=!0,t.material.opacity=0;let o=9999999999;const a=n.geometry.getAttribute("position");for(let i=0;i<a.count;i++){const r=a.getX(i),u=a.getY(i),d=a.getZ(i);m.set(r,u,d),n.localToWorld(m);const v=j.distanceTo(m);v<o&&(o=v,l.copy(m))}t.position.y+=(l.y-t.position.y)*.12,s.position.x+=(l.x-s.position.x)*.12,s.position.y+=(l.y-s.position.y)*.12,s.position.z+=(l.z-s.position.z)*.12}}const St=ut(bt,{target:document.getElementById("joystickcontroller"),events:{joystickmove:function(e){var p;(p=e==null?void 0:e.detail)!=null&&p.position&&A.joystickAxis.copy(e.detail.position)}}});A.joystickController=St;function Lt(){Ct()}Lt();console.log("sldknldkfnglk");
