import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                    */import{C as x,F as h,b as f,c as r}from"./GLTFLoader-CsBpgCdH.js";import{I as g,s as y,c as S,r as b,o as C,g as n,d as P,e as w,f as _,l as z,i as c}from"./ImprovedNoise-BVOZRgZT.js";import{C as l}from"./tiles-CyD6-eWE.js";import{E as D,R as A,A as R,S as d,D as T,O as B}from"./AfterimagePass-DJPqY81_.js";const M={name:"RGBShiftShader",uniforms:{tDiffuse:{value:null},amount:{value:.005},aspectRatio:{value:1},resolution:{value:{x:0,y:0}},u_time:{value:0},camera_dis:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

  #define PI 3.14159265359
  #define TWO_PI 6.28318530718
  
  varying vec2 vUv;
  uniform vec2 resolution;
  uniform float aspectRatio;
  uniform float u_time;
  uniform float camera_dis;
uniform sampler2D tDiffuse;


vec3 ring(vec2 pos, float radius, float width){
  float d1 = length(pos) / radius;
  vec3 color2 = vec3(1.0-smoothstep(.4,0.402,d1));
  
  float d2 = length(pos) / (radius - width);
  vec3 color3 = vec3(1.0-smoothstep(.4,0.402,d2));
  
  return color2 - color3;
}


// Reference to
// http://thndl.com/square-shaped-shaders.html

vec3 shape(int pointsN, vec2 st, float size){
      // Number of sides of your shape
  int N = pointsN;
  
  size = clamp(size, 0.01, 10.);

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  float d = cos(floor(0.500+a/r)*r-a)*length(st) / size;

  vec3 color = vec3(1.0-smoothstep(.4,.405,d));
  // color = vec3(d);
    return color;
}

vec3 outlineShape(int pointsN, vec2 st, float radius, float width){
    vec3 color1 = shape(pointsN, st, radius);
    vec3 color2 = shape(pointsN, st, radius-width);
    return color1 - color2;
}


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


vec3 rotate(vec3 p, float angle, vec3 axis) {
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    mat3 rotationMatrix = mat3(
        axis.x * axis.x * oc + c,         axis.y * axis.x * oc - axis.z * s,  axis.z * axis.x * oc + axis.y * s,
        axis.x * axis.y * oc + axis.z * s, axis.y * axis.y * oc + c,          axis.z * axis.y * oc - axis.x * s,
        axis.x * axis.z * oc - axis.y * s, axis.y * axis.z * oc + axis.x * s,  axis.z * axis.z * oc + c
    );

    return rotationMatrix * p;
}


vec4 toCameraSpace(vec4 p) {
    // Perspective transformation
    p.xy *= 1.0 / p.z;
    return p;
}

vec4 toScreenSpace(vec4 p) {
    // Undo perspective transformation
    p.xy *= p.z;
    return p;
}

  void main() {
    
    vec2 st = vUv.xy;
    
    st = st *2.-1.;
    // Remap the space to -1. to 1.
    
    st.x *= aspectRatio;
    // to fix the aspect ratio like in the book of shaders
    // ex: vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // different method, and goes after any remapping
    
    
    
    // vec2 pos = vec2(0.0,0.0) - st;
		vec4 pos3d = vec4(st.x, st.y, 0.0, 1.0); // Point in screen space


		// Apply perspective transformation
		pos3d = toCameraSpace(pos3d);
		
		
		// 3D rotation around the y-axis
    float rotationAngle = u_time * 0.5; // Adjust the speed of rotation
    vec3 rotatedPos = rotate(pos3d.xyz, rotationAngle, vec3(0.0, 1.0, 0.0));
		
		// 
		// // float rotationAngle = u_time * 0.5; // Adjust the speed of rotation
    // // pos = vec2(rotate(vec3(pos, 0.0), rotationAngle, vec3(0.0, 1.0, 0.0)).xy);
		// 
		// // Transform back to screen space
    pos3d.xyz = rotatedPos;
		
    vec3 pos2bb = toScreenSpace(pos3d).xyz;
		
		// 
		// 
		vec2 posC = vec2(0.0,0.0) - st;
    float d = length(pos2bb) / 1.824;
    // // float d = length(1.) / 1.824;
		
		vec2 pos = vec2(0.0,0.0) - st;
		// vec2 pos = pos3d.xy;
		// float d = length(pos) / 1.824;

    vec3 color = vec3(1.0-smoothstep(.4,0.41,d));
    
    vec4 cg = texture2D(tDiffuse, vUv);
    
    gl_FragColor = vec4( cg.rgb, 1.0);
    
    
    vec2 pos2 = pos.xy;
    pos2.y *= -1.;
    
		// float fScale = 2.0;
		// float fScale = 1.0/camera_dis*29.0;
		// fScale = sin(fScale);
		// float fScale += cos(u_time*4.0);
		
		// trying to find the cameras distance as a scalar
		float fScale = cos(u_time*4.0);
		fScale = map(fScale, -1.0, 1.0, 0.2, 0.6);
		fScale *= 1.0/camera_dis*29.0;
		
		gl_FragColor.rgb += outlineShape(3, pos2, fScale, 0.02);
		// gl_FragColor.rgb += outlineShape(3, pos2, sin(2.060-(float(1)*0.2*u_time)), 0.02);

  }`},e={animationPool:new l,gameTime:new x,viewFrustum:new h,usePostProcessing:!1,camera:null,orbitControl:null,mouseDelta:new f,firstColor:new r().setHex(16735419),seconistColor:new r().setHex(16774236),noise1:new g,tacosCars:new l};async function N(){y(e,{color:16735419}),S(e,{position:[0,0,40]}),b(e),C(e,e.camera,e.renderer);{const o=n(e.scene,{color:16777215});e.slidyCube1=o,e.scene.add(o),o.position.set(0,2,0),o.scale.set(22,2,.2),o.scale.multiplyScalar(2),o.position.set(-40,8,-4),o.updateMatrix(!0),o.updateBox3()}{const o=n(e.scene,{color:16777215});e.slidyCube2=o,e.scene.add(o),o.position.set(0,2,0),o.scale.set(22,2,.2),o.scale.multiplyScalar(2),o.position.set(40,-8,-4)}e.ambientLight1=P(e.scene),e.sunlight=w(e.scene),_(e,e.camera,e.renderer),F(e),e.usePostProcessing=!0,z(e,e.scene,{cache:e.tacosCars,name:"tacoscar1",url:"../models/tacocar/tacocar1.glb"}),document.addEventListener("wheel",o=>{e.mouseDelta.y+=o.deltaY,e.mouseDelta.x+=o.deltaX});function s(){requestAnimationFrame(s),e.orbitControl!==void 0&&e.orbitControl.update();const o=e.gameTime.getDelta();if(e.tacosCars.length>0)for(var t=0;t<e.tacosCars.length;t++){let a=e.tacosCars[t];a.rotation.y+=o*2.4,a.position.y=Math.cos(e.gameTime.getElapsedTime()*3)*2}if(e.slidyCube1){const a=e.slidyCube1;a.mPositionX=a.position.x,a.position.x+=o*144,a.updateMatrixWorld(),a.box3&&a.updateBox3(),c(e,a)}if(e.slidyCube2){const a=e.slidyCube2;a.mPositionX=a.position.x,a.position.x+=-o*44,a.updateMatrixWorld(),a.box3&&a.updateBox3(),c(e,a)}for(var t=0;t<e.animationPool.length;t++)e.animationPool[t].entities.run();if(e.circlesShader1){e.circlesShader1.uniforms.u_time.value=e.gameTime.getElapsedTime();const a=e.camera.position.distanceTo(e.orbitControl.target);e.circlesShader1.uniforms.camera_dis.value=a}e.usePostProcessing?e.composer.render():e.renderer.render(e.scene,e.camera)}s()}function F(s){const o=new D(s.renderer);s.composer=o,o.addPass(new A(s.scene,s.camera)),new R;const t=new d(T);t.uniforms.scale.value=8;const a=new d(M);a.uniforms.amount.value=.015;const i=document.getElementById("threedee1").getBoundingClientRect();s.circlesShader1=a,console.log("¿¿¿ 222 window.innerWidth",i.width,i.height);const p=new f(i.width,i.height);a.uniforms.resolution.value=p,a.uniforms.aspectRatio.value=i.width/i.height;const u=e.camera.position.distanceTo(e.orbitControl.target);a.uniforms.camera_dis.value=u,o.addPass(a);const v=new B;o.addPass(v)}N();
