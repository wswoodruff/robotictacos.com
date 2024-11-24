import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                    */import{C as c,F as l,b as m,c as n,S as u,d as f,e as d,a as v}from"./GLTFLoader-CsBpgCdH.js";import{I as p,s as g,c as b,r as C,o as h,b as w,g as x,d as y,e as P,f as S}from"./ImprovedNoise-BVOZRgZT.js";import{C as t}from"./tiles-CyD6-eWE.js";const e={animationPool:new t,gameTime:new c,viewFrustum:new l,usePostProcessing:!1,camera:null,orbitControl:null,mouseDelta:new m,firstColor:new n().setHex(16735419),seconistColor:new n().setHex(16774236),noise1:new p,tacosCars:new t};async function U(){g(e,{color:16735419}),b(e,{position:[0,0,40]}),C(e),e.renderer.autoClear=!1,h(e,e.camera,e.renderer);const s=document.getElementById("threedee1").getBoundingClientRect();e.orthographicCamera=new w(e,{rect:s,near:1,far:1e3});{e.wallpaperScene=new u;const a=new f({uniforms:{u_time:{value:0}},vertexShader:`
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
      `});a.depthWrite=!1;const i=new d(2,2),r=new v(i,a);r.position.z=0,e.wallpaperScene.add(r),e.backgroundPlane=r}{const a=x(e.scene,{color:16777215});e.basicCube=a,a.position.set(0,2,0),a.scale.multiplyScalar(8),a.updateMatrix(!0),a.updateBox3()}e.ambientLight1=y(e.scene),e.sunlight=P(e.scene),S(e,e.camera,e.renderer);function o(){if(requestAnimationFrame(o),e.orbitControl!==void 0&&e.orbitControl.update(),e.gameTime.getDelta(),e.backgroundPlane&&(e.backgroundPlane.material.uniforms.u_time.value=e.gameTime.getElapsedTime()),e.usePostProcessing)e.composer.render();else{const a=e.renderer;a.autoClear=!1,a.clear(),a.render(e.wallpaperScene,e.orthographicCamera),a.render(e.scene,e.camera)}}o()}U();
