import"../../cawad-regular-LUVKtMNm.js";import{i as T,A as n,f as k,a as x,b as W,g as C,P as H,L as U,d as Y,S as X,h as Z,V as M,e as G}from"../../superneatlib-VRJQv-Yb.js";import{D as I}from"../../driver-DOBmOn8g.js";const i=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];for(let t=0;t<256;t++)i[256+t]=i[t];function z(t){return t*t*t*(t*(t*6-15)+10)}function y(t,o,s){return o+t*(s-o)}function D(t,o,s,a){const l=t&15,e=l<8?o:s,b=l<4?s:l==12||l==14?o:a;return((l&1)==0?e:-e)+((l&2)==0?b:-b)}class N{noise(o,s,a){const l=Math.floor(o),e=Math.floor(s),b=Math.floor(a),r=l&255,m=e&255,v=b&255;o-=l,s-=e,a-=b;const j=o-1,d=s-1,h=a-1,w=z(o),L=z(s),A=z(a),f=i[r]+m,S=i[f]+v,c=i[f+1]+v,p=i[r+1]+m,g=i[p]+v,u=i[p+1]+v;return y(A,y(L,y(w,D(i[S],o,s,a),D(i[g],j,s,a)),y(w,D(i[c],o,d,a),D(i[u],j,d,a))),y(L,y(w,D(i[S+1],o,s,h),D(i[g+1],j,s,h)),y(w,D(i[c+1],o,d,h),D(i[u+1],j,d,h))))}}const R=new URL("/assets/bot1-BN9gAiQy.glb",import.meta.url).href;async function V(){const t=n;T(n),k(n),x(n),W(n);const o=C({store:n,type:"y",divisions:40,size:4});o.visible=!1;const s=n.scene,a=n.camera;n.renderer;const l=new H(16777215,2,100);l.position.set(5,5,5),s.add(l),U.hemisphereLight(n.scene),a.position.set(1,2,3.5);const e=Y.plane({store:n,scale:1,color:11533055});e.position.set(0,.1,0),e.scale.setScalar(1),X.decoSuper3D(e),n.addObject3D(e),e.add(new Z({store:t,size:1,letterSize:.2}));const b=new N,r=Y.plane({widthSegments:10,heightSegments:10,store:n,scale:10,color:11533055});X.decoSuper3D(r),r.material.wireframe=!0,r.position.set(0,.1,0),r.scale.setScalar(14),X.decoSuper3D(r),n.addObject3D(r),r.add(new Z({store:t,size:1,letterSize:.2}));const m=r.geometry.getAttribute("position"),v=2.5,j=.2;new M(0,0,0);for(let f=0;f<m.count;f++){const S=m.getX(f);m.getY(f);const c=m.getZ(f),p=b.noise(S*v,c*v,0);m.setXYZ(f,S,p*j,c)}m.needsUpdate=!0,r.update=function(f,S){const c=r.geometry.getAttribute("position"),p=2.5,g=.2;new M(0,0,0);for(let u=0;u<c.count;u++){const P=c.getX(u);c.getY(u);const B=c.getZ(u),O=b.noise(P*p+S,B*p,0);c.setXYZ(u,P,O*g,B)}c.needsUpdate=!0};const d=Y.ball({scene:s,scale:1,color:11533055});d.position.set(0,.1,0),d.scale.setScalar(.1),X.decoSuper3D(d),n.addObject3D(d),d.material.color.setHex(65450),d.add(new Z({store:t,size:1,letterSize:.2}));const h=new M,w=new M,L=new M;e.update=function(f,S){L.copy(e.position);let c=9999999999;const p=r.geometry.getAttribute("position");for(let g=0;g<p.count;g++){const u=p.getX(g),P=p.getY(g),B=p.getZ(g);h.set(u,P,B),r.localToWorld(h);const O=L.distanceTo(h);O<c&&(c=O,w.copy(h))}e.position.y+=(w.y-e.position.y)*.2,d.position.copy(w)},new I({store:t,object:e,friction:0,damping:.80502,speed:.03,tilt:Math.PI*2*.5,allowTilt:!0,allowTurning:!1}),console.log("dijdiojsod2222");const A=new G(R);await A.init(t),A.scaleTo(1.5),A.playAnimations(),n.addObject3D(A),e.add(A),A.setColorAll(16711935)}function _(){V()}_();console.log("sldknldkfnglk");
