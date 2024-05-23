

// https://discourse.threejs.org/t/error-relative-references-must-start-with-either-or/13573/19

import { Clock, Frustum, Vector2, Color, Vector3, CameraHelper, 
  Matrix4, Mesh, PlaneGeometry, ShaderMaterial, Scene } from 'three';

import { scene, camera, renderer, orbitCamera, addBounds, 
  cube, hemiLight, skydome, ambientLight, sunlight, 
  floor, setupResize, addVolume, loadModel, orthographicCamera } from './utils/builders.js';
  
import { lerpBackgroundColor_CM, crappyScreenWrapIn3D, testIfInView } from './utils/variousFunctions.js';

import { Tile, TilesController } from './utils/tiles.js';
import { SphereMesh } from './utils/sphereMesh.js';

import { CheapPool } from './utils/cheapPool.js';
import { CubeMesh } from './utils/cubeMesh.js';
import { CarModel } from './utils/carModel.js';
import { BaseModel } from './utils/baseModel.js';

import { isBetween, remapNormal } from './utils/mathness.js';

// https://github.com/mrdoob/three.js/blob/dev/examples/jsm/math/SimplexNoise.js
// https://github.com/mrdoob/three.js/blob/dev/examples/jsm/math/ImprovedNoise.js
import { ImprovedNoise } from 'three/examples/jsm/math/improvedNoise.js';


import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { NOTRGBShiftShader } from './screenShaders/NOTRGBShiftShader.js';
import { BBB } from './screenShaders/BBB.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';




// import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';


// Find the latest version by visiting https://unpkg.com/three, currently it's 0.126.1


// import { DirectionalLight, AmbientLight,
//   BoxGeometry, MeshBasicMaterial, Mesh, MeshStandardMaterial, PlaneGeometry,
//   DoubleSide, AxesHelper, TextureLoader, RepeatWrapping, SRGBColorSpace, CameraHelper,
//   HemisphereLight, Vector3
// } from 'https://unpkg.com/three@0.126.1/build/three.module.js';
// } from 'three';

const ovo = {
  animationPool : new CheapPool(),
  gameTime: new Clock(),
  viewFrustum : new Frustum(),
  usePostProcessing : false,
  camera: null,
  orbitControl: null,
  
  mouseDelta : new Vector2(),
  
  // specials for this noise
  firstColor : new Color().setHex(0xff5cbb),
  seconistColor : new Color().setHex(0xfff45c),
  
  noise1 : new ImprovedNoise(),
  tacosCars : new CheapPool(),
}



export async function inininint() {
  
  // window.THREE = THREE;

  scene(ovo, {color:0xff5cbb});
  
  camera(ovo, {position:[0, 0, 40]});
  
  renderer(ovo);
  ovo.renderer.autoClear = false;
  
  orbitCamera(ovo, ovo.camera, ovo.renderer)
  
  const aa = document.getElementById('threedee1');
  const rect = aa.getBoundingClientRect();
  ovo.orthographicCamera = new orthographicCamera( ovo, {rect:rect, near: 1, far: 1000} );
  
  
  { // setting up a backgound plane for shader effects wallpaper of sorts
    // https://codepen.io/Fyrestar/pen/abOEOda
    // https://discourse.threejs.org/t/how-do-i-use-my-own-custom-shader-as-a-scene-background/13598
    // #iur98349jf
    ovo.wallpaperScene = new Scene();
    const material = new ShaderMaterial({
      uniforms: {
    		u_time: { value: 0.0 },
    	},
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = vec4( position, 1.0 );    
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float u_time;
         
        void main() {
          // vec4 color = vec4( 0.0, vUv.x, vUv.y, 1.0 );
          // basic color strobe effect from shadertoy default with tweaks
          vec4 color = vec4(0.5 + 0.5*cos(u_time+vUv.xyx+vec3(0,2,4)), 1.0);
          gl_FragColor = color;
        }
      `
    });
    material.depthWrite = false;
    
    const geometry = new PlaneGeometry( 2,2 );
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new Mesh( geometry, material );
    plane.position.z = 0;
    // ovo.scene.add( plane );
    ovo.wallpaperScene.add( plane );
    ovo.backgroundPlane = plane;
  }
  
  
  {
    const yy = cube(ovo.scene,{color:0xffffff});
    ovo.basicCube = yy;
    // ovo.scene.add(yy)
    yy.position.set(0,2,0)
    // yy.scale.set(22,2,0.2)
    yy.scale.multiplyScalar(8)
    // need 
    // spin(cube)
    // yy.position.set(-40,8,-4);
    yy.updateMatrix(true);// need box3 to be ready
    yy.updateBox3();
  }


  // ovo.hemiLight = hemiLight(true);
  // ovo.hemiLightHelper = new HemisphereLightHelper( ovo.hemiLight, 100 );
  // ovo.scene.add( hemiLightHelper );

  // skydome(ovo, ovo.scene)

  ovo.ambientLight1 = ambientLight(ovo.scene)

  ovo.sunlight = sunlight(ovo.scene)

  // var shadowHelper = new CameraHelper( ovo.sunlight.shadow.camera );
  // scene.add( shadowHelper );

  setupResize(ovo, ovo.camera, ovo.renderer)

  // addPostProcessing(ovo);
  // ovo.usePostProcessing = true;
    
  // cube(ovo.scene)


  // 
  // LOOP
  // 

  function animate() {
  	requestAnimationFrame( animate );
    if(ovo.orbitControl !== undefined){
      ovo.orbitControl.update();
    }
    
    const delta = ovo.gameTime.getDelta();

    
  
  
    // 
    // if(ovo.slidyCube1){
    //   const yy = ovo.slidyCube1;
    //   // yy.position.set(-40,12,0);
    // 
    //   yy.mPositionX = yy.position.x;
    //   yy.position.x += delta * 144;
    //   yy.updateMatrixWorld();
    //   yy.box3 && yy.updateBox3();
    //   // console.log(yy.box3);
    // 
    //   crappyScreenWrapIn3D(ovo,yy)
    // 
    // }

    if(ovo.backgroundPlane){
        ovo.backgroundPlane.material.uniforms[ 'u_time' ].value = ovo.gameTime.getElapsedTime();

    }
    
    
    // lerpBackgroundColor_CM(ovo,ovo.firstColor, ovo.seconistColor, ovo.gameTime.getElapsedTime() * 2)
    

    // 
    // if(ovo.circlesShader1){
    //   ovo.circlesShader1.uniforms[ 'u_time' ].value = ovo.gameTime.getElapsedTime();
    //   // spenssive
    //   const distance = ovo.camera.position.distanceTo( ovo.orbitControl.target );
    //   // console.log(distance);
    //   ovo.circlesShader1.uniforms[ 'camera_dis' ].value = distance;
    // 
    // 
    // 
    // }
    

    if(ovo.usePostProcessing){
      ovo.composer.render();
    }
    else {
      
      // if needing a wallpaper effect without a renderpass
      // // #iur98349jf
      const renderer = ovo.renderer;
      renderer.autoClear = false;
      renderer.clear();
      renderer.render( ovo.wallpaperScene, ovo.orthographicCamera );
      renderer.render( ovo.scene, ovo.camera );

      // otherwise a normal render
      // ovo.renderer.render( ovo.scene, ovo.camera );
    }
    
  }
  animate();


} // inininint






// setup functions to go to imports

function addPostProcessing(root) {
  // this is effectively a template since each had different settings
  // composer.setSize( window.innerWidth, window.innerHeight );
  // postprocessing

  				const composer = new EffectComposer( root.renderer );
          root.composer = composer;
  				composer.addPass( new RenderPass( root.scene, root.camera ) );
          
          const afterimagePass = new AfterimagePass();
          // composer.addPass( afterimagePass );

  				const effect1 = new ShaderPass( DotScreenShader );
  				effect1.uniforms[ 'scale' ].value = 8;
  				// composer.addPass( effect1 );

  				// const effect2 = new ShaderPass( RGBShiftShader );
  				// const effect2 = new ShaderPass( NOTRGBShiftShader );
  				const effect2 = new ShaderPass( BBB );
  				effect2.uniforms[ 'amount' ].value = 0.015;
          // needs a live update
          const aa = document.getElementById('threedee1');
          const rect = aa.getBoundingClientRect();
          // const aspectRatio = window.innerWidth / window.innerHeight;
          root.circlesShader1 = effect2;
          
          console.log("¿¿¿ 222 window.innerWidth", rect.width, rect.height);
          // const resolution = new Vector2(window.innerWidth, window.innerHeight);
          const resolution = new Vector2(rect.width, rect.height);
          effect2.uniforms[ 'resolution' ].value = resolution;
          effect2.uniforms[ 'aspectRatio' ].value = rect.width / rect.height;
          
          // spenssive
          const distance = ovo.camera.position.distanceTo( ovo.orbitControl.target );
          effect2.uniforms[ 'camera_dis' ].value = distance;
          
  				composer.addPass( effect2 );
          
          // composer.addPass( effect1 );
          // composer.addPass( afterimagePass );

  				const effect3 = new OutputPass();
  				composer.addPass( effect3 );
            
}
