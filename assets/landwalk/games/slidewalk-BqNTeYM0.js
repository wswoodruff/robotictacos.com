import"../../cawad-regular-LUVKtMNm.js";import{j as G,i as R,A as c,f as Z,a as q,b as I,g as N,P as H,L as J,d as O,S as U,h as V,k as $,G as Q,V as A,O as K,e as tt}from"../../superneatlib-5UrYDejK.js";import{M as ot,N as it,O as et,P as nt,S as st,x as at,Q as rt,z as ct,g as z,G as Y,B as lt,C as dt,D as pt,F as ft,R as E,y as T,J as X,K as mt}from"../../legacy-89TXPw0t.js";import{I as vt}from"../../ImprovedNoise-CAvO-0XD.js";import{D as ut}from"../../driver-RSwVHEbt.js";let W=[];function gt(){var e=W;W=[],ot(e)}function yt(e){W.length===0&&queueMicrotask(gt),W.push(e)}function B(e,p){return e===p||(e==null?void 0:e[st])===p}function F(e={},p,g,y){return it(()=>{var f,t;return et(()=>{f=t,t=[],nt(()=>{e!==g(...t)&&(p(e,...t),f&&B(g(...f),e)&&p(null,...f))})}),()=>{yt(()=>{t&&B(g(...t),e)&&p(null,...t)})}}),e}const L={joystickController:null,joystickAxis:new G};var ht=dt('<div id="joystickcontroller" class="svelte-o9fiku"><div class="border svelte-o9fiku"><div class="stick svelte-o9fiku"></div> <div class="center svelte-o9fiku"></div></div></div>');function xt(e,p){at(p,!1);const g=rt();let y=Y(),f=Y(),t,h={x:0,y:0},k={x:0,y:0},n,s=!1,m,l;function j(){const o=n.left+t,r=n.top+t;let i=m-o,a=l-r,u=Math.sqrt(i*i+a*a),d=t;if(u>d){let v=Math.atan2(a,i);i=Math.cos(v)*d,a=Math.sin(v)*d}h.x=i,h.y=a,E(y,z(y).style.transform=`translate(${i}px, ${a}px)`),k.x=i/d,k.y=-a/d,g("joystickmove",{position:{x:k.x,y:k.y}})}function _(){h.x=0,h.y=0,E(y,z(y).style.transform="translate(0, 0)"),g("joystickmove",{position:{x:h.x,y:h.y}})}function C(o){o.touches?(m=o.touches[0].clientX,l=o.touches[0].clientY):(m=o.clientX,l=o.clientY)}function x(o){o.preventDefault(),s=!0,C(o)}function S(o){o.preventDefault(),s=!1,_()}function M(o){s&&(C(o),j())}ct(()=>{n=z(f).getBoundingClientRect(),console.log("borderRect",n),t=n.height/2,z(f).addEventListener("mousedown",x),z(f).addEventListener("touchstart",x),document.addEventListener("mousemove",M),document.addEventListener("touchmove",M),document.addEventListener("mouseup",S),document.addEventListener("touchend",S)}),lt();var D=ht(),w=X(D),b=X(w);F(b,o=>T(y,o),()=>z(y)),F(D,o=>T(f,o),()=>z(f)),pt(e,D),ft()}const wt=`// out vec2 vUv;
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
`,bt=`// // License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
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
vec3 wireColor = vec3(1.0); // White wire color
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

}`,kt=new URL("/assets/bot1-BN9gAiQy.glb",import.meta.url).href;async function zt(){const e=c;R(c),Z(c),q(c),I(c);const p=N({store:c,type:"y",divisions:40,size:4});p.visible=!1;const g=c.scene,y=c.camera;c.renderer;const f=new H(16777215,2,100);f.position.set(5,5,5),g.add(f),J.hemisphereLight(c.scene),y.position.set(1,2,3.5);const t=O.plane({store:c,scale:1,color:11533055});t.position.set(0,.1,0),t.scale.setScalar(1),U.decoSuper3D(t),c.addObject3D(t),t.add(new V({store:e,size:1,letterSize:.2}));const h=new vt,k=40,n=O.plane({widthSegments:k,heightSegments:k,store:c,scale:10,color:11533055});U.decoSuper3D(n),n.material=new $({vertexShader:wt,fragmentShader:bt,uniforms:{time:{value:0}},glslVersion:Q}),n.material.transparent=!0,n.position.set(0,.1,0),n.scale.setScalar(14),U.decoSuper3D(n),c.addObject3D(n),n.add(new V({store:e,size:1,letterSize:.2})),n._____update=function(w,b){const o=n.geometry.getAttribute("position"),r=2.5,i=.2;new A(0,0,0);for(let a=0;a<o.count;a++){const u=o.getX(a);o.getY(a);const d=o.getZ(a),v=h.noise(u*r+b,d*r,0);o.setXYZ(a,u,v*i,d)}o.needsUpdate=!0};const s=O.ball({scene:g,scale:1,color:11533055});s.position.set(0,.1,0),s.scale.setScalar(.1),U.decoSuper3D(s),c.addObject3D(s),s.material.color.setHex(65450),s.add(new V({store:e,size:1,letterSize:.2}));const m=new A,l=new A,j=new A;t.____update=function(w,b){j.copy(t.position);let o=9999999999;const r=n.geometry.getAttribute("position");for(let i=0;i<r.count;i++){const a=r.getX(i),u=r.getY(i),d=r.getZ(i);m.set(a,u,d),n.localToWorld(m);const v=j.distanceTo(m);v<o&&(o=v,l.copy(m))}t.position.y+=(l.y-t.position.y)*.12,s.position.x+=(l.x-s.position.x)*.12,s.position.y+=(l.y-s.position.y)*.12,s.position.z+=(l.z-s.position.z)*.12};const _=new ut({store:e,object:t,friction:0,damping:.80502,speed:.025,tilt:-Math.PI*2*.5,allowTilt:!0,allowTurning:!1});console.log("dijdiojsod2222");const C=new K;g.add(C),c.addObject3D(C),C.update=function(){L.joystickController&&L.joystickAxis&&_.axis.copy(L.joystickAxis)};const x=new tt(kt);await x.init(e),x.scaleTo(1.5),x.playAnimations(),c.addObject3D(x),t.add(x),x.setColorAll(16711935),t.position.y=2,window.hoverboard=t;const S=new A().copy(t.position);t.update=function(){S.add(_.velocity),t.position.z>1?t.position.z+=(1-t.position.z)*.2:t.position.z<-1&&(t.position.z+=(-1-t.position.z)*.2),t.position.x>1?t.position.x+=(1-t.position.x)*.2:t.position.x<-1&&(t.position.x+=(-1-t.position.x)*.2),t.position.y>1?t.position.y+=(1-t.position.y)*.2:t.position.y<-1&&(t.position.y+=(-1-t.position.y)*.2),t.position.x+=-t.position.x*.2/2,t.position.z+=-t.position.z*.2/2};function M(w,b,o){let r=Math.max(0,Math.min(1,(o-w)/(b-w)));return r*r*(3-2*r)}n.update=function(w,b){const o=n.geometry.getAttribute("position"),r=.1;new A(0,0,0);for(let i=0;i<o.count;i++){const a=o.getX(i);o.getY(i);const u=o.getZ(i),d=a*5+S.x*.2,v=u*5+S.z*.2;let P=h.noise(d,v,0);P=M(.1,.4,P),o.setXYZ(i,a,P*r,u)}o.needsUpdate=!0,D()};function D(w,b){j.copy(t.position),t.material.transparent=!0,t.material.opacity=0;let o=9999999999;const r=n.geometry.getAttribute("position");for(let i=0;i<r.count;i++){const a=r.getX(i),u=r.getY(i),d=r.getZ(i);m.set(a,u,d),n.localToWorld(m);const v=j.distanceTo(m);v<o&&(o=v,l.copy(m))}t.position.y+=(l.y-t.position.y)*.12,s.position.x+=(l.x-s.position.x)*.12,s.position.y+=(l.y-s.position.y)*.12,s.position.z+=(l.z-s.position.z)*.12}}const jt=mt(xt,{target:document.getElementById("joystickcontroller"),events:{joystickmove:function(e){var p;(p=e==null?void 0:e.detail)!=null&&p.position&&L.joystickAxis.copy(e.detail.position)}}});L.joystickController=jt;function Ct(){zt()}Ct();console.log("sldknldkfnglk");
