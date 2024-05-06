var Y=Object.defineProperty;var K=(s,e,t)=>e in s?Y(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var p=(s,e,t)=>(K(s,typeof e!="symbol"?e+"":e,t),t);import{c as W,b as q,m as Z,a as V,n as J,F as k,g as y,U as T,o as m,p as P,q as F,N as $,r as H,C as S,R as ee,s as te,t as se,L as ie,u as oe,v as ae,w as re,x as ne,y as I,M as j,z as le,i as ce,S as fe,P as he,W as ue,d as de,O as pe,B as me,A as ge,D as ve,G as xe,V as we,E as Ce}from"./GLTFLoader-OQfocfMK.js";import{P as _e,C as U}from"./tiles-3kERaGcf.js";class Se extends _e{constructor(t){super();p(this,"isCarMode",!0);p(this,"isBaseModel",!0);p(this,"bounds",null);p(this,"box3",new W);const i=new q(12);if(this.add(i),t)for(var o=0;o<t.children.length;o++)t.children[o].position.setScalar(0,0,0),this.add(t.children[o])}}const c=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];for(let s=0;s<256;s++)c[256+s]=c[s];function M(s){return s*s*s*(s*(s*6-15)+10)}function h(s,e,t){return e+s*(t-e)}function f(s,e,t,i){const o=s&15,r=o<8?e:t,n=o<4?t:o==12||o==14?e:i;return(o&1?-r:r)+(o&2?-n:n)}class be{noise(e,t,i){const o=Math.floor(e),r=Math.floor(t),n=Math.floor(i),l=o&255,d=r&255,g=n&255;e-=o,t-=r,i-=n;const v=e-1,x=t-1,w=i-1,C=M(e),A=M(t),X=M(i),E=c[l]+d,B=c[E]+g,D=c[E+1]+g,O=c[l+1]+d,L=c[O]+g,N=c[O+1]+g;return h(X,h(A,h(C,f(c[B],e,t,i),f(c[L],v,t,i)),h(C,f(c[D],e,x,i),f(c[N],v,x,i))),h(A,h(C,f(c[B+1],e,t,w),f(c[L+1],v,t,w)),h(C,f(c[D+1],e,x,w),f(c[N+1],v,x,w))))}}const Me={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class u{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ye=new Z(-1,1,1,-1,0,1);class Pe extends J{constructor(){super(),this.setAttribute("position",new k([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new k([0,2,0,0,2,0],2))}}const Fe=new Pe;class b{constructor(e){this._mesh=new V(Fe,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ye)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class R extends u{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof y?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=T.clone(e.uniforms),this.material=new y({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new b(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class z extends u{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const o=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let n,l;this.inverse?(n=0,l=1):(n=1,l=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),r.buffers.stencil.setFunc(o.ALWAYS,n,4294967295),r.buffers.stencil.setClear(l),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(o.EQUAL,1,4294967295),r.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),r.buffers.stencil.setLocked(!0)}}class Re extends u{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Te{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new m);this._width=i.width,this._height=i.height,t=new P(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:F}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new R(Me),this.copyPass.material.blending=$,this.clock=new H}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let o=0,r=this.passes.length;o<r;o++){const n=this.passes[o];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),n.needsSwap){if(i){const l=this.renderer.getContext(),d=this.renderer.state.buffers.stencil;d.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),d.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}z!==void 0&&(n instanceof z?i=!0:n instanceof Re&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new m);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(i,o),this.renderTarget2.setSize(i,o);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ae extends u{constructor(e,t,i=null,o=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=o,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new S}render(e,t,i){const o=e.autoClear;e.autoClear=!1;let r,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=o}}const Ee={name:"RGBShiftShader",uniforms:{tDiffuse:{value:null},amount:{value:.005},aspectRatio:{value:1},resolution:{value:{x:0,y:0}},u_time:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

  
  varying vec2 vUv;
  uniform vec2 resolution;
  uniform float aspectRatio;
  uniform float u_time;
uniform sampler2D tDiffuse;


vec3 ring(vec2 pos, float radius, float width){
  float d1 = length(pos) / radius;
  vec3 color2 = vec3(1.0-smoothstep(.4,0.402,d1));
  
  float d2 = length(pos) / (radius - width);
  vec3 color3 = vec3(1.0-smoothstep(.4,0.402,d2));
  
  return color2 - color3;
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

  void main() {
    
    vec2 st = vUv.xy;
    
    st = st *2.-1.;
    // Remap the space to -1. to 1.
    
    st.x *= aspectRatio;
    // to fix the aspect ratio like in the book of shaders
    // ex: vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // different method, and goes after any remapping
    
    
    
    vec2 pos = vec2(0.0,0.0) - st;

    
    float d = length(pos) / 1.824;

    vec3 color = vec3(1.0-smoothstep(.4,0.41,d));
    
    vec4 cg = texture2D(tDiffuse, vUv);
    
    // gl_FragColor = vec4( vec3(st.x, st.y, 0.0), 1.0);
    //gl_FragColor = vec4( vec3(pos.x, pos.y, 0.0), 1.0);
    // gl_FragColor = vec4( vec3(pos.x, pos.y, 0.0), 1.0);
    
    // gl_FragColor *= vec4( color, 1.0);
    
    gl_FragColor = vec4( cg.rgb, 1.0);
    // add mask effect!!
    
    float db = length(pos) / 1.724;
    vec3 colorB = vec3(1.0-smoothstep(.4,0.402,db));
    color = 1.0-color*0.2;
    color *= vec3( colorB);
    // 
    gl_FragColor *= vec4( 1.0-color*0.2, 1.0);
    // gl_FragColor *= vec4( color, 1.0);
    

    // circle2
    // float d2 = length(pos) / 1.624;
    // vec3 color2 = vec3(1.0-smoothstep(.4,0.402,d2));
    // 
    // float d3 = length(pos) / 1.54;
    // vec3 color3 = vec3(1.0-smoothstep(.4,0.402,d3));
    // 
    // color2 = color2 - color3;
    
    vec3 color2 = ring(pos, 1.9, 0.05);
    
    gl_FragColor += vec4( color2, 1.0);
    
    vec3 color3 = ring(pos, 2.2, 0.02);
    gl_FragColor += vec4( color3, 1.0);
    
    vec3 color4 = ring(pos, 2.8, 0.01);
    gl_FragColor += vec4( color4, 1.0);

    // float sw = cos(u_time*2.)*2.+1.4;
    float sw = map( cos(u_time *4.0), -1.0,1.0,1.9,3.0  );
    vec3 color5 = ring(pos, sw, 0.01);
    gl_FragColor += vec4( color5, 1.0);


    float sw2 = map( cos(u_time*6.0+2.0), -1.0,1.0,1.4,3.0  );
    vec3 color6 = ring(pos, sw2, 0.01);
    gl_FragColor += vec4( color6, 1.0);
    
    
  }`},Be={name:"DotScreenShader",uniforms:{tDiffuse:{value:null},tSize:{value:new m(256,256)},center:{value:new m(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

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

		}`},De={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Oe extends u{constructor(){super();const e=De;this.uniforms=T.clone(e.uniforms),this.material=new ee({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new b(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},te.getTransfer(this._outputColorSpace)===se&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ie?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===oe?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ae?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===re?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ne&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Le={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

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

		}`};class Ne extends u{constructor(e=.96){super(),this.shader=Le,this.uniforms=T.clone(this.shader.uniforms),this.uniforms.damp.value=e,this.textureComp=new P(window.innerWidth,window.innerHeight,{magFilter:I,type:F}),this.textureOld=new P(window.innerWidth,window.innerHeight,{magFilter:I,type:F}),this.compFsMaterial=new y({uniforms:this.uniforms,vertexShader:this.shader.vertexShader,fragmentShader:this.shader.fragmentShader}),this.compFsQuad=new b(this.compFsMaterial),this.copyFsMaterial=new j,this.copyFsQuad=new b(this.copyFsMaterial)}render(e,t,i){this.uniforms.tOld.value=this.textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this.textureComp),this.compFsQuad.render(e),this.copyFsQuad.material.map=this.textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this.copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.copyFsQuad.render(e));const o=this.textureOld;this.textureOld=this.textureComp,this.textureComp=o}setSize(e,t){this.textureComp.setSize(e,t),this.textureOld.setSize(e,t)}dispose(){this.textureComp.dispose(),this.textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this.compFsQuad.dispose(),this.copyFsQuad.dispose()}}const a={animationPool:new U,gameTime:new H,viewFrustum:new le,usePostProcessing:!1,firstColor:new S().setHex(16735419),seconistColor:new S().setHex(16774236),noise1:new be,tacosCars:new U};async function ke(){Ie(a,{color:16735419}),Ue(a,{position:[0,0,40]}),ze(a),Ge(a,a.camera,a.renderer);{const e=G({color:16777215});a.slidyCube1=e,a.scene.add(e),e.position.set(0,2,0),e.scale.set(22,2,.2),e.scale.multiplyScalar(2),e.position.set(-40,8,-4),e.updateMatrix(!0),e.updateBox3()}{const e=G({color:16777215});a.slidyCube2=e,a.scene.add(e),e.position.set(0,2,0),e.scale.set(22,2,.2),e.scale.multiplyScalar(2),e.position.set(40,-8,-4)}a.ambientLight1=We(a.scene),a.sunlight=Ve(a.scene),new ce(a.sunlight.shadow.camera),He(a,a.camera,a.renderer),Ye(a),a.usePostProcessing=!0,je(a,a.scene,{cache:a.tacosCars,name:"tacoscar1",url:"../models/tacocar/tacocar1.glb"}),document.addEventListener("wheel",e=>{mouseYDelta+=e.deltaY}),document.addEventListener("keydown",e=>{e.key==="z"&&(console.log("z"),streetTilesManager.controller.snapFrontToBack(!0)),e.key==="x"&&(console.log("z"),streetTilesManager.controller.snapBackToFront(!0)),(e.key==="ArrowLeft"||e.key==="a")&&(arrowLeftDown=!0),(e.key==="ArrowRight"||e.key==="d")&&(arrowRightDown=!0)}),document.addEventListener("keyup",e=>{(e.key==="ArrowLeft"||e.key==="a")&&(arrowLeftDown=!1),(e.key==="ArrowRight"||e.key==="d")&&(arrowRightDown=!1)});function s(){requestAnimationFrame(s),a.orbit!==void 0&&a.orbit.update();const e=a.gameTime.getDelta();if(a.tacosCars.length>0)for(var t=0;t<a.tacosCars.length;t++){let i=a.tacosCars[t];i.rotation.y+=e*2.4,i.position.y=Math.cos(a.gameTime.getElapsedTime()*3)*2}if(a.slidyCube1){const i=a.slidyCube1;i.mPositionX=i.position.x,i.position.x+=e*144,i.updateMatrixWorld(),i.box3&&i.updateBox3(),Q(a,i)}if(a.slidyCube2){const i=a.slidyCube2;i.mPositionX=i.position.x,i.position.x+=-e*44,i.updateMatrixWorld(),i.box3&&i.updateBox3(),Q(a,i)}for(var t=0;t<a.animationPool.length;t++)a.animationPool[t].entities.run();a.circlesShader1&&(a.circlesShader1.uniforms.u_time.value=a.gameTime.getElapsedTime()),a.usePostProcessing?a.composer.render():a.renderer.render(a.scene,a.camera)}s()}function Ie(s,{color:e=6076159}={}){s.scene=new fe,s.scene.background=new S().setHex(e)}function Ue(s,{position:e=[0,21.2,40.4]}={}){const i=document.getElementById("threedee1").getBoundingClientRect().height,o=new he(75,window.innerWidth/i,.1,2e3);o.position.fromArray(e),s.camera=o}function ze(s){const e=document.getElementById("threedee1"),t=new ue({antialias:!0});t.setSize(window.innerWidth,e.getBoundingClientRect().height),e.appendChild(t.domElement),t.shadowMap.enabled=!0,t.shadowMap.type=de,s.renderer=t}function Ge(s,e,t){s.orbit=new pe(e,t.domElement)}function Qe(s){s.box3=new W,s.updateMatrix(!0),s.box3.setFromObject(s),s.updateBox3=function(){this.box3.setFromObject(this)}}function G({color:s=65280,materialShader:e="basic"}={}){const t=new me(1,1,1);let i=new j({color:s});const o=new V(t,i);return Qe(o),o}function We(s){const e=new ge;return e.intensity=1.81,s.add(e),e}function Ve(s){const e=new ve;e.castShadow=!0,e.position.copy({x:-4.2,y:6,z:12.2}),e.intensity=2.7,e.color.setHex(16777215),e.shadow.mapSize.width=512*1,e.shadow.mapSize.height=512*1,e.shadow.camera.near=.5,e.shadow.camera.far=200,e.shadow.bias=1e-5,e.shadow.bias=1e-6,e.shadow.radius=.001,e.position.multiplyScalar(5);var t=48;return e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.camera.left=t,e.shadow.camera.right=-t,s.add(e),e}function He(s,e,t){window.addEventListener("resize",i);function i(){const o=t.domElement.getBoundingClientRect().height;e.aspect=window.innerWidth/o,e.updateProjectionMatrix(),t.setSize(window.innerWidth,o),a.composer.setSize(window.innerWidth,o)}}async function je(s,e,{cache:t,name:i="",url:o=""}={}){var r=await new xe().loadAsync(o);let n=r.scene,l=new Se(n);return t.add(l),l.position.set(0,0,0),e.add(l),l}const _=new we;function Xe(s,e,t,i){s.viewFrustum.setFromProjectionMatrix(new Ce().multiplyMatrices(s.camera.projectionMatrix,s.camera.matrixWorldInverse));let o=0;return _.set(e.box3.min.x,e.position.y,e.position.z),s.viewFrustum.containsPoint(_)&&o++,_.set(e.box3.max.x,e.position.y,e.position.z),s.viewFrustum.containsPoint(_)&&o++,o>0}function Q(s,e){if(e.wasInView&&!Xe(s,e))if(e.wasInView=!1,e.position.x-e.mPositionX>0){(e.box3.min.x+e.box3.max.x)*.5;let i=e.box3.max.x-e.box3.min.x;e.position.x=0-i*2+20,e.mPositionX=e.position.x}else(e.box3.min.x+e.box3.max.x)*.5,e.box3.max.x-e.box3.min.x,e.position.x=80,e.mPositionX=e.position.x;else e.wasInView=!0}function Ye(s){const e=new Te(s.renderer);s.composer=e,e.addPass(new Ae(s.scene,s.camera)),new Ne;const t=new R(Be);t.uniforms.scale.value=8;const i=new R(Ee);i.uniforms.amount.value=.015;const r=document.getElementById("threedee1").getBoundingClientRect();s.circlesShader1=i,console.log("¿¿¿ 222 window.innerWidth",r.width,r.height);const n=new m(r.width,r.height);i.uniforms.resolution.value=n,i.uniforms.aspectRatio.value=r.width/r.height,e.addPass(i);const l=new Oe;e.addPass(l)}ke();
