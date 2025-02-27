

// https://discourse.threejs.org/t/error-relative-references-must-start-with-either-or/13573/19

import { Clock, Frustum, Vector2, Color, Vector3, CameraHelper, Matrix4 } from 'three';

import { scene, camera, renderer, orbitCamera, addBounds, 
  cube, hemiLight, skydome, ambientLight, sunlight, 
  floor, setupResize, addVolume, loadModel } from './utils/builders.js';
  
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
  
  orbitCamera(ovo, ovo.camera, ovo.renderer)
  
  {
  const yy = cube(ovo.scene,{color:0xffffff});
  ovo.slidyCube1 = yy;
  ovo.scene.add(yy)
  yy.position.set(0,2,0)
  yy.scale.set(22,2,0.2)
  yy.scale.multiplyScalar(2)
  // need 
  // spin(cube)
  yy.position.set(-40,8,-4);
  yy.updateMatrix(true);// need box3 to be ready
  yy.updateBox3();
  }
  {
  const yy = cube(ovo.scene,{color:0xffffff});
  ovo.slidyCube2 = yy;
  ovo.scene.add(yy)
  yy.position.set(0,2,0)
  yy.scale.set(22,2,0.2)
  yy.scale.multiplyScalar(2)
  // need 
  // spin(cube)
  yy.position.set(40,-8,-4);
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

  addPostProcessing(ovo);
  ovo.usePostProcessing = true;
    
  // 
  // {
  // // var result = await new GLTFLoader().loadAsync("../models/catlike1.glb");
  // var result = await new GLTFLoader().loadAsync("../models/tacocar/tacocar1.glb");
  // // debugger
  // let model1 = result.scene;
  // // tacocar1 = model1;
  // ovo.tacocar1 = new BaseModel(model1);
  // ovo.tacocar1.position.set(0,0,0)
  // // result.scene.scale.setScalar(0.2)
  // // result.scene.position.setScalar(0,0,0);
  // ovo.scene.add(ovo.tacocar1);
  // // enableShadowsObject(tacocar1);
  // // addVolume({item: tacocar1, volumeW:7, volumeH:6, volumeD:4})
  // }
  {
    
  let yy = loadModel(ovo, ovo.scene, {cache: ovo.tacosCars, name:"tacoscar1", url:"../models/tacocar/tacocar1.glb"})
  }
  
  // for (var i = 0; i < 8; i++) {
  //   let gg = model1.clone();
  //   animals.push(gg);
  //   gg.position.x += i * 1.8 + -6;
  // 
  //   scene.add(gg);
  // 
  // }
  
  // floor
  // floor(ovo, ovo.scene)


  document.addEventListener("wheel", (event) => {
  // renderer.domElement.addEventListener("wheel", (event) => {
    // console.log(event.deltaY );
    ovo.mouseDelta.y += event.deltaY;
    ovo.mouseDelta.x += event.deltaX;
    // animate();
  });
  

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event



  // 
  // LOOP
  // 

// y = clamp(sin(x  * 2.664) * 1.448, -1.0, 1.0);

  function animate() {
  	requestAnimationFrame( animate );
    if(ovo.orbitControl !== undefined){
      ovo.orbitControl.update();
    }
    // for (var i = 0; i < animals.length; i++) {
    //   let gg = animals[i];
    //   gg.rotation.y =  (i * 0.2) + mouseYDelta * 0.1 ;
    //   gg.rotation.x =  (i * 0.04) + mouseYDelta * 0.01 ;
    //   gg.rotation.z =  (i * 0.2) + mouseYDelta * 0.04 ;
    //   // gg.rotation.y += mouseYDelta * 0.001;
    //   // gg.rotation.y -= 0.1;
    // }
    

    
    // this belongs in an ecs of the car player
    // if(tacocar1){
    //   tacocar1.position.x += 0.1;
    // }
    // let speed = 0.9;
    // // let speed = 0.4;
    // if (arrowLeftDown) {
    //   if(tacocar1){
    //     tacocar1.position.x += -speed;
    //   }
    // }
    // if (arrowRightDown) {
    //   if(tacocar1){
    //     tacocar1.position.x += speed;
    //   }
    // }
    
    // camera.position.x = tacocar1.position.x;
    // camera.lookAt(camera.position);
    
    const delta = ovo.gameTime.getDelta();
    
    if(ovo.tacosCars.length > 0){
      for (var i = 0; i < ovo.tacosCars.length; i++) {
        let yy = ovo.tacosCars[i];
        yy.rotation.y += delta * 2.4;
        
        yy.position.y = Math.cos(ovo.gameTime.getElapsedTime() * 3.0) * 2
        // ovo["tacoscar1"].position.y = ovo.noise1.noise(ovo.gameTime.getElapsedTime() * 2, 0, 0) * 10 * 0.5;
      }
    }
    
  
  
    
    if(ovo.slidyCube1){
      const yy = ovo.slidyCube1;
      // yy.position.set(-40,12,0);
      
      yy.mPositionX = yy.position.x;
      yy.position.x += delta * 144;
      yy.updateMatrixWorld();
      yy.box3 && yy.updateBox3();
      // console.log(yy.box3);
        
      crappyScreenWrapIn3D(ovo,yy)

    }
    if(ovo.slidyCube2){
      const yy = ovo.slidyCube2;
      // yy.position.set(-40,12,0);
      yy.mPositionX = yy.position.x;
      yy.position.x += -delta * 44;
      yy.updateMatrixWorld();
      yy.box3 && yy.updateBox3();
      crappyScreenWrapIn3D(ovo,yy)
      
    }
    
    
    
    
    // lerpBackgroundColor_CM(ovo,ovo.firstColor, ovo.seconistColor, ovo.gameTime.getElapsedTime() * 2)
    
    // basic Entities ecs system
    for (var i = 0; i < ovo.animationPool.length; i++) {
      
      let pick = ovo.animationPool[i];
      pick.entities.run();

    }
    
    if(ovo.circlesShader1){
      ovo.circlesShader1.uniforms[ 'u_time' ].value = ovo.gameTime.getElapsedTime();
      // spenssive
      const distance = ovo.camera.position.distanceTo( ovo.orbitControl.target );
      // console.log(distance);
      ovo.circlesShader1.uniforms[ 'camera_dis' ].value = distance;
      
      

    }
    

    if(ovo.usePostProcessing){
      ovo.composer.render();
    }
    else {
      ovo.renderer.render( ovo.scene, ovo.camera );
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
