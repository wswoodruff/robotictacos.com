var V=Object.defineProperty;var j=(s,e,t)=>e in s?V(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var d=(s,e,t)=>j(s,typeof e!="symbol"?e+"":e,t);import{c as z,b as H,S as X,C,P as Y,y as G,W as K,d as Z,O as J,B as q,M as U,k as $,a as A,f as ee,g as _,h as te,A as se,D as ie,G as ae,V as Q,s as oe,o as re,z as L,U as R,n as S,t as P,w as y,N as ne,m as le,I as he,J as fe,K as ce,L as ue,Q as de,T as pe,X as me,Y as ge,Z as I}from"./GLTFLoader-DfhjRf0O.js";import{P as ve}from"./tiles-CF7vEnbr.js";class xe extends ve{constructor(t,i=!0){super();d(this,"isCarMode",!0);d(this,"isBaseModel",!0);d(this,"bounds",null);d(this,"box3",new z);const a=new H(12);if(this.add(a),t)for(var o=0;o<t.children.length;o++)i&&t.children[o].position.setScalar(0,0,0),this.add(t.children[o])}}function Oe(s,{color:e=6076159}={}){s.scene=new X,s.scene.background=new C().setHex(e)}function Be(s,{position:e=[0,21.2,40.4]}={}){const i=document.getElementById("threedee1").getBoundingClientRect().height,a=new Y(75,window.innerWidth/i,.1,2e3);a.position.fromArray(e),s.camera=a}function Ne(s,{rect:e,near:t=1,far:i=1e3}){const a=new G(e.width/-2,e.width/2,e.height/2,e.height/-2,t,i);return s.orthographicCamera=a,a}function De(s,{antialias:e=!1}={}){const t=document.getElementById("threedee1"),i=new K({antialias:e});i.setSize(window.innerWidth,t.getBoundingClientRect().height),t.appendChild(i.domElement),i.shadowMap.enabled=!0,i.shadowMap.type=Z,s.renderer=i}function Le(s,e,t){s.orbitControl=new J(e,t.domElement)}function we(s){s.box3=new z,s.updateMatrix(!0),s.box3.setFromObject(s),s.updateBox3=function(){this.box3.setFromObject(this)}}function Ie(s,{color:e=65280,materialShader:t="standard",addToScene:i=!0}={}){const a=new q(1,1,1);let o;t==="basic"?o=new U({color:e}):t==="standard"&&(o=new $({color:e}));const r=new A(a,o);return we(r),i&&s.add(r),r}function ke(s,e){const t=`varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,i=`uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize( vWorldPosition + offset ).y;
      gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
    }
  `,a={topColor:{value:new C(11392511)},bottomColor:{value:new C(15465727)},offset:{value:-1.1},exponent:{value:.4}},o=new ee(1e3,32,15),r=new _({uniforms:a,vertexShader:t,fragmentShader:i,side:te}),l=new A(o,r);e.add(l),s.skydome=l}function ze(s){const e=new se;return e.intensity=1.81,s.add(e),e}function Ge(s){const e=new ie;e.castShadow=!0,e.position.copy({x:-4.2,y:6,z:12.2}),e.intensity=2.7,e.color.setHex(16777215),e.shadow.mapSize.width=512*1,e.shadow.mapSize.height=512*1,e.shadow.camera.near=.5,e.shadow.camera.far=200,e.shadow.bias=1e-5,e.shadow.bias=1e-6,e.shadow.radius=.001,e.position.multiplyScalar(5);var t=48;return e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.camera.left=t,e.shadow.camera.right=-t,s.add(e),e}function Ue(s,e,t){window.addEventListener("resize",i);function i(){const a=t.domElement.getBoundingClientRect().height;e.aspect=window.innerWidth/a,e.updateProjectionMatrix(),t.setSize(window.innerWidth,a),s.composer.setSize(window.innerWidth,a)}}async function Qe(s,e,{cache:t,name:i="",url:a="",resetPositions:o=!0}={}){var r=await new ae().loadAsync(a);let l=r.scene;debugger;let h=new xe(l,o);return t.add(h),h.position.set(0,0,0),e.add(h),h}function We(s,e){new Q(0,0,-1),document.addEventListener("keydown",t=>{t.key==="1"&&console.log("front camera")})}const w=new Q;function Ce(s,e,t,i){s.viewFrustum.setFromProjectionMatrix(new oe().multiplyMatrices(s.camera.projectionMatrix,s.camera.matrixWorldInverse));let a=0;return w.set(e.box3.min.x,e.position.y,e.position.z),s.viewFrustum.containsPoint(w)&&a++,w.set(e.box3.max.x,e.position.y,e.position.z),s.viewFrustum.containsPoint(w)&&a++,a>0}function Ve(s,e){if(e.wasInView&&!Ce(s,e))if(e.wasInView=!1,e.position.x-e.mPositionX>0){(e.box3.min.x+e.box3.max.x)*.5;let i=e.box3.max.x-e.box3.min.x;e.position.x=0-i*2+20,e.mPositionX=e.position.x}else(e.box3.min.x+e.box3.max.x)*.5,e.box3.max.x-e.box3.min.x,e.position.x=80,e.mPositionX=e.position.x;else e.wasInView=!0}const n=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];for(let s=0;s<256;s++)n[256+s]=n[s];function b(s){return s*s*s*(s*(s*6-15)+10)}function c(s,e,t){return e+s*(t-e)}function f(s,e,t,i){const a=s&15,o=a<8?e:t,r=a<4?t:a==12||a==14?e:i;return(a&1?-o:o)+(a&2?-r:r)}class je{noise(e,t,i){const a=Math.floor(e),o=Math.floor(t),r=Math.floor(i),l=a&255,h=o&255,p=r&255;e-=a,t-=o,i-=r;const m=e-1,g=t-1,v=i-1,x=b(e),T=b(t),W=b(i),F=n[l]+h,E=n[F]+p,O=n[F+1]+p,B=n[l+1]+h,N=n[B]+p,D=n[B+1]+p;return c(W,c(T,c(x,f(n[E],e,t,i),f(n[N],m,t,i)),c(x,f(n[O],e,g,i),f(n[D],m,g,i))),c(T,c(x,f(n[E+1],e,t,v),f(n[N+1],m,t,v)),c(x,f(n[O+1],e,g,v),f(n[D+1],m,g,v))))}}const _e={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class u{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Se=new G(-1,1,1,-1,0,1);class Me extends re{constructor(){super(),this.setAttribute("position",new L([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new L([0,2,0,0,2,0],2))}}const be=new Me;class M{constructor(e){this._mesh=new A(be,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Se)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Pe extends u{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof _?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=R.clone(e.uniforms),this.material=new _({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new M(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class k extends u{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const a=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,l;this.inverse?(r=0,l=1):(r=1,l=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),o.buffers.stencil.setFunc(a.ALWAYS,r,4294967295),o.buffers.stencil.setClear(l),o.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(a.EQUAL,1,4294967295),o.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),o.buffers.stencil.setLocked(!0)}}class ye extends u{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class He{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new S);this._width=i.width,this._height=i.height,t=new P(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:y}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Pe(_e),this.copyPass.material.blending=ne,this.clock=new le}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let a=0,o=this.passes.length;a<o;a++){const r=this.passes[a];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),r.needsSwap){if(i){const l=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}k!==void 0&&(r instanceof k?i=!0:r instanceof ye&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new S);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(i,a),this.renderTarget2.setSize(i,a);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Xe extends u{constructor(e,t,i=null,a=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=a,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new C}render(e,t,i){const a=e.autoClear;e.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=a}}const Ye={name:"DotScreenShader",uniforms:{tDiffuse:{value:null},tSize:{value:new S(256,256)},center:{value:new S(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

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

		}`},Ae={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Ke extends u{constructor(){super();const e=Ae;this.uniforms=R.clone(e.uniforms),this.material=new he({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new M(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},fe.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ue?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===de?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===pe?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===me?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ge&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Re={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

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

		}`};class Ze extends u{constructor(e=.96){super(),this.shader=Re,this.uniforms=R.clone(this.shader.uniforms),this.uniforms.damp.value=e,this.textureComp=new P(window.innerWidth,window.innerHeight,{magFilter:I,type:y}),this.textureOld=new P(window.innerWidth,window.innerHeight,{magFilter:I,type:y}),this.compFsMaterial=new _({uniforms:this.uniforms,vertexShader:this.shader.vertexShader,fragmentShader:this.shader.fragmentShader}),this.compFsQuad=new M(this.compFsMaterial),this.copyFsMaterial=new U,this.copyFsQuad=new M(this.copyFsMaterial)}render(e,t,i){this.uniforms.tOld.value=this.textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this.textureComp),this.compFsQuad.render(e),this.copyFsQuad.material.map=this.textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this.copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.copyFsQuad.render(e));const a=this.textureOld;this.textureOld=this.textureComp,this.textureComp=a}setSize(e,t){this.textureComp.setSize(e,t),this.textureOld.setSize(e,t)}dispose(){this.textureComp.dispose(),this.textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this.compFsQuad.dispose(),this.copyFsQuad.dispose()}}export{Ze as A,_e as C,Ye as D,He as E,M as F,je as I,Ke as O,u as P,Xe as R,Pe as S,Ie as a,ze as b,Be as c,Ge as d,Ue as e,Ve as f,ke as g,Ne as h,We as i,Qe as l,Le as o,De as r,Oe as s};
