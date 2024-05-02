var A=Object.defineProperty;var E=(s,e,t)=>e in s?A(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var c=(s,e,t)=>(E(s,typeof e!="symbol"?e+"":e,t),t);import{c as P,b as D,m as O,a as R,n as B,F as _,g as m,U as w,o as u,p as g,q as x,N as L,r as T,C as d,R as N,s as k,t as z,L as I,u as U,v as G,w as Q,x as W,y as S,M as F,z as V,i as H,S as j,P as X,W as Y,d as K,O as q,B as J,A as Z,D as $,G as ee,V as te,E as se}from"./GLTFLoader-OQfocfMK.js";import{P as ie,C as ae}from"./tiles-3kERaGcf.js";class re extends ie{constructor(t){super();c(this,"isCarMode",!0);c(this,"isBaseModel",!0);c(this,"bounds",null);c(this,"box3",new P);const i=new D(12);if(this.add(i),t)for(var a=0;a<t.children.length;a++)t.children[a].position.setScalar(0,0,0),this.add(t.children[a])}}const oe={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class f{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ne=new O(-1,1,1,-1,0,1);class le extends B{constructor(){super(),this.setAttribute("position",new _([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _([0,2,0,0,2,0],2))}}const fe=new le;class p{constructor(e){this._mesh=new R(fe,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ne)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class v extends f{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof m?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=w.clone(e.uniforms),this.material=new m({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new p(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class b extends f{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const a=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let n,l;this.inverse?(n=0,l=1):(n=1,l=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),o.buffers.stencil.setFunc(a.ALWAYS,n,4294967295),o.buffers.stencil.setClear(l),o.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(a.EQUAL,1,4294967295),o.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),o.buffers.stencil.setLocked(!0)}}class ce extends f{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class he{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new u);this._width=i.width,this._height=i.height,t=new g(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:x}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new v(oe),this.copyPass.material.blending=L,this.clock=new T}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let a=0,o=this.passes.length;a<o;a++){const n=this.passes[a];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),n.needsSwap){if(i){const l=this.renderer.getContext(),C=this.renderer.state.buffers.stencil;C.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),C.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}b!==void 0&&(n instanceof b?i=!0:n instanceof ce&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new u);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(i,a),this.renderTarget2.setSize(i,a);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ue extends f{constructor(e,t,i=null,a=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=a,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new d}render(e,t,i){const a=e.autoClear;e.autoClear=!1;let o,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=a}}const de={name:"RGBShiftShader",uniforms:{tDiffuse:{value:null},amount:{value:.005},angle:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float amount;
		uniform float angle;

		varying vec2 vUv;

		void main() {

			vec2 offset = amount * vec2( cos(angle), sin(angle));
			vec4 cr = texture2D(tDiffuse, vUv + offset);
			vec4 cga = texture2D(tDiffuse, vUv);
			vec4 cb = texture2D(tDiffuse, vUv - offset);
			gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);

		}`},pe={name:"DotScreenShader",uniforms:{tDiffuse:{value:null},tSize:{value:new u(256,256)},center:{value:new u(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

		}`},me={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class ge extends f{constructor(){super();const e=me;this.uniforms=w.clone(e.uniforms),this.material=new N({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new p(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},k.getTransfer(this._outputColorSpace)===z&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===I?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===U?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===G?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Q?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===W&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const xe={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`};class ve extends f{constructor(e=.96){super(),this.shader=xe,this.uniforms=w.clone(this.shader.uniforms),this.uniforms.damp.value=e,this.textureComp=new g(window.innerWidth,window.innerHeight,{magFilter:S,type:x}),this.textureOld=new g(window.innerWidth,window.innerHeight,{magFilter:S,type:x}),this.compFsMaterial=new m({uniforms:this.uniforms,vertexShader:this.shader.vertexShader,fragmentShader:this.shader.fragmentShader}),this.compFsQuad=new p(this.compFsMaterial),this.copyFsMaterial=new F,this.copyFsQuad=new p(this.copyFsMaterial)}render(e,t,i){this.uniforms.tOld.value=this.textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this.textureComp),this.compFsQuad.render(e),this.copyFsQuad.material.map=this.textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this.copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.copyFsQuad.render(e));const a=this.textureOld;this.textureOld=this.textureComp,this.textureComp=a}setSize(e,t){this.textureComp.setSize(e,t),this.textureOld.setSize(e,t)}dispose(){this.textureComp.dispose(),this.textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this.compFsQuad.dispose(),this.copyFsQuad.dispose()}}const r={animationPool:new ae,gameTime:new T,viewFrustum:new V,firstColor:new d().setHex(16735419),seconistColor:new d().setHex(16774236)};async function we(){Ce(r,{color:16735419}),_e(r,{position:[0,0,40]}),Se(r),be(r,r.camera,r.renderer);{const e=M({color:16777215});r.slidyCube1=e,r.scene.add(e),e.position.set(0,2,0),e.scale.set(22,2,.2),e.scale.multiplyScalar(2),e.position.set(-40,8,-4),e.updateMatrix(!0),e.updateBox3()}{const e=M({color:16777215});r.slidyCube2=e,r.scene.add(e),e.position.set(0,2,0),e.scale.set(22,2,.2),e.scale.multiplyScalar(2),e.position.set(40,-8,-4)}r.ambientLight1=ye(r.scene),r.sunlight=Pe(r.scene),new H(r.sunlight.shadow.camera),Re(r,r.camera,r.renderer),Ae(r),Te(r,r.scene,{name:"tacoscar1",url:"../models/tacocar/tacocar1.glb"}),document.addEventListener("wheel",e=>{mouseYDelta+=e.deltaY}),document.addEventListener("keydown",e=>{e.key==="z"&&(console.log("z"),streetTilesManager.controller.snapFrontToBack(!0)),e.key==="x"&&(console.log("z"),streetTilesManager.controller.snapBackToFront(!0)),(e.key==="ArrowLeft"||e.key==="a")&&(arrowLeftDown=!0),(e.key==="ArrowRight"||e.key==="d")&&(arrowRightDown=!0)}),document.addEventListener("keyup",e=>{(e.key==="ArrowLeft"||e.key==="a")&&(arrowLeftDown=!1),(e.key==="ArrowRight"||e.key==="d")&&(arrowRightDown=!1)});function s(){requestAnimationFrame(s),r.orbit!==void 0&&r.orbit.update();const e=r.gameTime.getDelta();if(r.tacoscar1&&(r.tacoscar1.rotation.y+=e*4.4),r.slidyCube1){const i=r.slidyCube1;i.mPositionX=i.position.x,i.position.x+=e*144,i.updateMatrixWorld(),i.box3&&i.updateBox3(),y(r,i)}if(r.slidyCube2){const i=r.slidyCube2;i.mPositionX=i.position.x,i.position.x+=-e*44,i.updateMatrixWorld(),i.box3&&i.updateBox3(),y(r,i)}for(var t=0;t<r.animationPool.length;t++)r.animationPool[t].entities.run();r.composer.render()}s()}function Ce(s,{color:e=6076159}={}){s.scene=new j,s.scene.background=new d().setHex(e)}function _e(s,{position:e=[0,21.2,40.4]}={}){const i=document.getElementById("threedee1").getBoundingClientRect().height,a=new X(75,window.innerWidth/i,.1,2e3);a.position.fromArray(e),s.camera=a}function Se(s){const e=document.getElementById("threedee1"),t=new Y({antialias:!0});t.setSize(window.innerWidth,e.getBoundingClientRect().height),e.appendChild(t.domElement),t.shadowMap.enabled=!0,t.shadowMap.type=K,s.renderer=t}function be(s,e,t){s.orbit=new q(e,t.domElement)}function Me(s){s.box3=new P,s.updateMatrix(!0),s.box3.setFromObject(s),s.updateBox3=function(){this.box3.setFromObject(this)}}function M({color:s=65280,materialShader:e="basic"}={}){const t=new J(1,1,1);let i=new F({color:s});const a=new R(t,i);return Me(a),a}function ye(s){const e=new Z;return e.intensity=1.81,s.add(e),e}function Pe(s){const e=new $;e.castShadow=!0,e.position.copy({x:-4.2,y:6,z:12.2}),e.intensity=2.7,e.color.setHex(16777215),e.shadow.mapSize.width=512*1,e.shadow.mapSize.height=512*1,e.shadow.camera.near=.5,e.shadow.camera.far=200,e.shadow.bias=1e-5,e.shadow.bias=1e-6,e.shadow.radius=.001,e.position.multiplyScalar(5);var t=48;return e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.camera.left=t,e.shadow.camera.right=-t,s.add(e),e}function Re(s,e,t){window.addEventListener("resize",i);function i(){const a=t.domElement.getBoundingClientRect().height;e.aspect=window.innerWidth/a,e.updateProjectionMatrix(),t.setSize(window.innerWidth,a),r.composer.setSize(window.innerWidth,a)}}async function Te(s,e,{name:t="",url:i=""}={}){var a=await new ee().loadAsync(i);let o=a.scene;return s[t]=new re(o),s[t].position.set(0,0,0),e.add(s[t]),s[t]}const h=new te;function Fe(s,e,t,i){s.viewFrustum.setFromProjectionMatrix(new se().multiplyMatrices(s.camera.projectionMatrix,s.camera.matrixWorldInverse));let a=0;return h.set(e.box3.min.x,e.position.y,e.position.z),s.viewFrustum.containsPoint(h)&&a++,h.set(e.box3.max.x,e.position.y,e.position.z),s.viewFrustum.containsPoint(h)&&a++,a>0}function y(s,e){if(e.wasInView&&!Fe(s,e))if(e.wasInView=!1,e.position.x-e.mPositionX>0){(e.box3.min.x+e.box3.max.x)*.5;let i=e.box3.max.x-e.box3.min.x;e.position.x=0-i*2+20,e.mPositionX=e.position.x}else(e.box3.min.x+e.box3.max.x)*.5,e.box3.max.x-e.box3.min.x,e.position.x=80,e.mPositionX=e.position.x;else e.wasInView=!0}function Ae(s){const e=new he(s.renderer);s.composer=e,e.addPass(new ue(s.scene,s.camera));const t=new ve;e.addPass(t);const i=new v(pe);i.uniforms.scale.value=8,e.addPass(i);const a=new v(de);a.uniforms.amount.value=.015,e.addPass(a);const o=new ge;e.addPass(o)}we();
