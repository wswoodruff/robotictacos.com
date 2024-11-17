import"./modulepreload-polyfill-B5Qt9EMX.js";import{O as u}from"./OutlinePass-CfhTvJ05.js";import{m as f,F as g,n as d,C as l,S as v,g as p,j as h,a as w,G as C}from"./GLTFLoader-DfhjRf0O.js";import{I as P,s as b,g as y,c as S,r as x,o as _,h as k,b as F,d as A,e as E,E as O,R as T,A as U,S as D,D as R,O as B}from"./AfterimagePass-DNouDPHe.js";import{C as m}from"./tiles-CF7vEnbr.js";const e={animationPool:new m,gameTime:new f,viewFrustum:new g,usePostProcessing:!1,camera:null,orbitControl:null,mouseDelta:new d,firstColor:new l().setHex(16735419),seconistColor:new l().setHex(16774236),noise1:new P,modelsCache:new m};async function G(){b(e,{color:16747183}),y(e,e.scene),S(e,{position:[0,0,40]}),e.camera.position.fromArray([4.537213541040106,1.0733651621338063,10.88682595412294]),e.camera.rotation.fromArray([-.26366054378468406,.5392574568225623,.13773874353647544,"XYZ"]),x(e,{antialias:!0}),e.renderer.autoClear=!1,_(e,e.camera,e.renderer),e.orbitControl.enableDamping=!0,e.orbitControl.dampingFactor=.12;const n=document.getElementById("threedee1").getBoundingClientRect();e.orthographicCamera=new k(e,{rect:n,near:1,far:1e3});{e.wallpaperScene=new v;const a=new p({uniforms:{u_time:{value:0}},vertexShader:`
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = vec4( position, 1.0 );    
        }
      `,fragmentShader:`
        varying vec2 vUv;
        uniform float u_time;
         
        void main() {
          // vec4 color = vec4( 0.0, vUv.x, vUv.y, 1.0 );
          // basic color strobe effect from shadertoy default with tweaks
          vec4 color = vec4(0.5 + 0.5*cos(u_time+vUv.xyx+vec3(0,2,4)), 1.0);
          gl_FragColor = color;
        }
      `});a.depthWrite=!1;const t=new h(2,2),o=new w(t,a);o.position.z=0,e.wallpaperScene.add(o),e.backgroundPlane=o}e.ambientLight1=F(e.scene),e.sunlight=A(e.scene);{var i=await new C().loadAsync("../models/dog_like_6b.glb");let a=i.scene;e.scene.add(a)}E(e,e.camera,e.renderer),I(e);function s(){if(requestAnimationFrame(s),e.orbitControl!==void 0&&e.orbitControl.update(),e.gameTime.getDelta(),e.backgroundPlane&&(e.backgroundPlane.material.uniforms.u_time.value=e.gameTime.getElapsedTime()),e.usePostProcessing)e.composer.render();else{const a=e.renderer;a.autoClear=!1,a.clear(),a.render(e.wallpaperScene,e.orthographicCamera),a.render(e.scene,e.camera)}}return s(),e}function I(r){const n=new O(r.renderer);r.composer=n,n.addPass(new T(r.scene,r.camera)),new U;const i=new D(R);i.uniforms.scale.value=8;const s=document.getElementById("threedee1");s.getBoundingClientRect();const a=new u(new d(s.width,s.height),r.scene,r.camera);let t=[];r.scene.traverse(c=>{c.isMesh&&t.push(c)}),a.selectedObjects=t,n.addPass(a),a.edgeStrength=2,a.edgeGlow=2,a.edgeThickness=2;const o=new B;n.addPass(o)}G().then(r=>_a=r);
