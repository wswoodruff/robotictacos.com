

// https://discourse.threejs.org/t/error-relative-references-must-start-with-either-or/13573/19

import { Clock, Frustum, Vector2, Color, Vector3, CameraHelper, 
  Matrix4, Mesh, PlaneGeometry, ShaderMaterial, Scene, Object3D, Raycaster } from 'three';



import { scene, camera, renderer, orbitCamera, addBounds, 
  cube, hemiLight, skydome, ambientLight, sunlight, 
  floor, setupResize, addVolume, loadModel, orthographicCamera, addBlenderCameraControls
} from './utils/builders.js';
  
import { sphere } from './utils/builders/builders.js';

import { lerpBackgroundColor_CM, crappyScreenWrapIn3D, testIfInView } from './utils/variousFunctions.js';

import { Tile, TilesController } from './utils/tiles.js';
import { SphereMesh } from './utils/sphereMesh.js';

import { CheapPool } from './utils/cheapPool.js';
import { CubeMesh } from './utils/cubeMesh.js';
import { CarModel } from './utils/carModel.js';
import { BaseModel } from './utils/baseModel.js';

import { Stick } from './utils/stick.js';
import { Tentacle } from './utils/tentacle.js';
import { ChainModel } from './utils/physicsLike/chainModel.js';
import { PinnedChainModel } from './utils/physicsLike/pinnedChainModel.js';

import { CoilSample } from './utils/physicsLike/springV2.js';

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
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';


import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { DragControls } from 'three/addons/controls/DragControls.js';



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
  mouse : new Vector2(),
  raycaster : new Raycaster(),
  
  // specials for this noise
  firstColor : new Color().setHex(0xff5cbb),
  seconistColor : new Color().setHex(0xfff45c),
  
  noise1 : new ImprovedNoise(),
  modelsCache : new CheapPool(),
  
  pickables : new CheapPool(),
  
  draggingItems : new CheapPool()
  
}



export async function inininint() {
  
  // window.THREE = THREE;
  // debugger
  // does not work here t set upwards so we return it at the bottom
  // globaly = ovo;

  scene(ovo, {color:0xff8aaf});
  // scene(ovo, {color:0xffffff});
  skydome(ovo, ovo.scene)
  
  camera(ovo, {position:[0, 0, 10]});
  // ovo.camera.position.fromArray([4.537213541040106, 1.0733651621338063, 10.88682595412294])
  // ovo.camera.rotation.fromArray([-0.26366054378468406, 0.5392574568225623, 0.13773874353647544, 'XYZ'])
  // _a.camera.position.toArray()
  // _a.camera.rotation.toArray()
  
  renderer(ovo,{antialias:true});
  ovo.renderer.autoClear = false;
  
  orbitCamera(ovo, ovo.camera, ovo.renderer)
  ovo.orbitControl.enableDamping = true;
  ovo.orbitControl.dampingFactor = 0.12;
  
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
  
  
  // {
  //   const yy = cube(ovo.scene,{color:0x2244cc});
  //   ovo.basicCube = yy;
  //   // ovo.scene.add(yy)
  //   // yy.position.set(0,2,0)
  //   // yy.scale.set(22,2,0.2)
  //   // yy.scale.multiplyScalar(8)
  //   // need 
  //   // spin(cube)
  //   // yy.position.set(-40,8,-4);
  //   yy.updateMatrix(true);// need box3 to be ready
  //   yy.updateBox3();
  // }


  // ovo.hemiLight = hemiLight(true);
  // ovo.hemiLightHelper = new HemisphereLightHelper( ovo.hemiLight, 100 );
  // ovo.scene.add( hemiLightHelper );

  // skydome(ovo, ovo.scene)

  ovo.ambientLight1 = ambientLight(ovo.scene)

  ovo.sunlight = sunlight(ovo.scene)


      

  // var shadowHelper = new CameraHelper( ovo.sunlight.shadow.camera );
  // scene.add( shadowHelper );

  {
  

  }
  
  
  
  {
    
    // const s0 = sphere(ovo.scene, {radius:0.4});
    // ovo.scene.add(s0);
    // const s1 = sphere(ovo.scene, {radius:0.4, color:0x00ff00});
    // ovo.scene.add(s1);
    // // s0.position.set(-2,1,0);
    // // s1.position.set(2,-1,0);
    // s0.position.set(0,1,0);
    // s1.position.set(0,-1,0);
    // 
    // s0.position.set(-1,0,0);
    // s1.position.set(4,-4,0);
    // 
    // 
    // let _stick0 = new Stick({radius:1.1});
    // ovo.scene.add(_stick0);
    // // _stick0.p0.copy(s0.position);
    // // _stick0.p1.copy(s1.position);
    // _stick0.driver0 = s0;
    // _stick0.driver1 = s1;
    // // _stick0.p1.set(2,0,-1)
    // _stick0.update();
    // 
    // 
    // const s2 = sphere(ovo.scene, {radius:0.4});
    // ovo.scene.add(s2);
    // s2.position.copy(s1.position);
    // s2.position.y += -3;
    // 
    // let _stick1 = new Stick({radius:0.5});
    // ovo.scene.add(_stick1);
    // 
    // 
    // _stick1.driver0 = s1;
    // _stick1.driver1 = s2;
    // _stick1.update();
    // 
    
    
    // 
    // {
    //   const yy2 = cube(ovo.scene,{color:0x2244cc});
    //   yy2.position.x = 0.1
    // }
    
    // s0.geometry.computeBoundingBox();
    // s1.geometry.computeBoundingBox();
    // s0.geometry.computeBoundingSphere();
    // s1.geometry.computeBoundingSphere();
    // ovo.pickables.add(s0,s1, s2);
    // 
    // var b = [...ovo.pickables];
    // // debugger
    
    let _tent1 = new Tentacle({jointRadius:0.2, stickRadius: 0.1});
    _tent1.position.y = 2;
    ovo.scene.add(_tent1);
    // _tent1.addJoint([0, 0, 0,], 0.5);
    let count = 10;
    for (var i = 1; i < count; i++) {
      _tent1.addJoint([0, i*-1, 0,], 0.2, 0.1);
      // _tent1.addJoint([0, i*-1+-Math.random(), 0,], 0.2, 0.1);
    }
    // _tent1.addJoint([0, -4, 0,], 0.5);
    
    // ovo.chainModel_1 = new ChainModel({
    //   pointer:_tent1, stiffness : 0.1, mass:2.2, gravity:-0.05, damping: 0.701
    // });
    // ovo.animationPool.add(ovo.chainModel_1);
    
    ovo.chainModel_1 = new PinnedChainModel({
      // pointer:_tent1, stiffness : 0.1, mass:1.7, gravity:-0.05, damping: 0.701
      pointer:_tent1, stiffness : 0.1, mass:1.7, gravity:-0.0, damping: 0.701
    });
    ovo.animationPool.add(ovo.chainModel_1);
    
    ovo.chainModel_1.addPinned(_tent1.joints[0]);
    // ovo.chainModel_1.addPinned(_tent1.joints[4]);
    // _tent1.joint[0].physicsPinned = true;
    // since we get signals from the drag event selection
    // we need to hold this data on the 3d object

  ovo.pickables.add(..._tent1.joints);
  
  
  {
    // adding in a quick spring ball test
    const anchor = sphere(ovo.scene, {color:0x6c22aa,radius:0.3, computeBounds:true, autoAdd:true});
    anchor.position.y = 5;
    ovo.pickables.add(anchor);
    
    ovo.springball = sphere(ovo.scene, {color:0x6c5cff,radius:0.7, computeBounds:true, autoAdd:true});
    ovo.springball.position.y = 4;
    ovo.pickables.add(ovo.springball);
    
    const _g = new Vector3(0,-0.084387,0);
    
    ovo.coil_1 = new CoilSample({
      pointer: ovo.springball,
      anchor: anchor,
      position: ovo.springball.position,
      // mass: 12.0,
      mass: 2.47,
      k: 0.2,
      damping: 0.84,
      restLength: anchor.position.distanceTo(ovo.springball.position),
      gravity: _g
    });
    ovo.animationPool.add(ovo.coil_1);
    
    
  }
  
  
  ovo.dragControls = new DragControls( [...ovo.pickables], ovo.camera, ovo.renderer.domElement );
	ovo.dragControls.rotateSpeed = 2;
	// ovo.dragControls.addEventListener( 'drag', render );
    
  ovo.dragControls.addEventListener( 'dragstart', function ( event ) {
    // event.object.material.emissive.set( 0xaaaaaa );
    ovo.orbitControl.enabled = false;
    console.log("when start???");
  });

  ovo.dragControls.addEventListener( 'drag', function ( event ) {
    // _stick.p1.set(2,0,-1)
    // _stick0.update();
    // _stick1.update();
    _tent1.update();
  } );

  ovo.dragControls.addEventListener( 'dragend', function ( event ) {

    // event.object.material.emissive.set( 0x000000 );
    ovo.orbitControl.enabled = true;
    console.log("Oh stop???");
    ovo.draggingItems.length = 0;
    ovo.chainModel_1.draggingJoints.length = 0;
    
    ovo.springball.isDragging = false;
    
  } );
    
  document.addEventListener( 'pointerdown', pointerdown );  
    // document.addEventListener( 'pointerup', pointerup );  
    
    
      
	function pointerdown( event ) {

		event.preventDefault();
    console.log("clicky");
		// if ( enableSelection === true ) {

			const draggableObjects = ovo.dragControls.getObjects();
			// draggableObjects.length = 0;
      // dont clear, it breaks it, there must be some other thinking
      // behind how the websites demo used a group instead
          
      const mouse = ovo.mouse;
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			ovo.raycaster.setFromCamera( mouse, ovo.camera );

			const intersections = ovo.raycaster.intersectObjects( ovo.pickables, false );

			if ( intersections.length > 0 ) {
        console.log("have!?");
        // ovo.orbitControl.enabled = false;

				const wobject = intersections[ 0 ].object;
        console.log(wobject);
        // 
				// if ( group.children.includes( object ) === true ) {
        // 
				// 	object.material.emissive.set( 0x000000 );
				// 	scene.attach( object );
        // 
				// } else {
        // 
				// 	object.material.emissive.set( 0xaaaaaa );
				// 	group.attach( object );
        // 
				// }

				// ovo.dragControls.transformGroup = true;
				// draggableObjects.push( group );
				draggableObjects.push( wobject );
        ovo.draggingItems.add(wobject);
        ovo.chainModel_1.draggingJoints.add(wobject);
        ovo.chainModel_1.setTargetJoint(wobject);
        
        if(wobject === ovo.springball){
          
          ovo.springball.isDragging = true;
        }
        
			}
      // 
			// if ( group.children.length === 0 ) {
      // 
			// 	controls.transformGroup = false;
			// 	draggableObjects.push( ...objects );
      // 
			// }

  		// }

  		// render();

		}
      
      // function pointerup(ev) {
      //   event.preventDefault();
      //   console.log("claery");
      //   // const draggableObjects = ovo.dragControls.getObjects();
      //   // draggableObjects.length = 0;
      //   ovo.orbitControl.enabled = true;
      // }

  }


// 
  {
    
  // let yy = loadModel(ovo, ovo.scene, {cache: ovo.modelsCache, name:"dog1", url:"../models/dog_like_2.glb", resetPositions:true})
  // yy.then(gg=>{
  // 
  //   // debugger
  //   // x.position.set(0,0,0);
  // })
  
  // var result = await new GLTFLoader().loadAsync("../models/dog_like_6b.glb");
  // 
  // let model1 = result.scene;
  // // debugger
  // 
  // // needs a scene grapth instead 
  // // let yy = new BaseModel(model1, resetPositions);
  // // cache.add(yy);
  // // yy.position.set(0,0,0)
  // 
  // // result.scene.scale.setScalar(0.2)
  // // result.scene.position.setScalar(0,0,0);
  // ovo.scene.add(model1);
  // 
  
  
  }



  setupResize(ovo, ovo.camera, ovo.renderer);
  
  addBlenderCameraControls(ovo,ovo.camera);
  

  addPostProcessing(ovo);
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
    
    for (var i = 0; i < ovo.animationPool.length; i++) {
      ovo.animationPool[i].update();
    }

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
  
  // need to set a global object to use since justy passing an argument is not working
  // inininint().then(gg=>_a=gg);
  return ovo;

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

          // const outlinePassEffect = new ShaderPass( OutlinePass );
          const aa = document.getElementById('threedee1');
          const rect = aa.getBoundingClientRect();
          // const outlinePassEffect = new OutlinePass( new Vector2( window.innerWidth, window.innerHeight ), root.scene, root.camera );
          const outlinePassEffect = new OutlinePass( new Vector2( aa.width, aa.height ), root.scene, root.camera );

        let selectedObjects = [];
        // for (var i = 0; i < root.scene.children.length; i++) {
        //   selectedObjects.push(root.scene.children[i]);
        // }
        root.scene.traverse((item) => {
          if (item.isMesh) {
            selectedObjects.push(item)
          }
        });
        
				outlinePassEffect.selectedObjects = selectedObjects;
        composer.addPass( outlinePassEffect );
                    
  				// outlinePassEffect.uniforms[ 'edgeStrength' ].value = 2;
          				// outlinePassEffect.edgeStrength = Number( value );
          				outlinePassEffect.edgeStrength = 2;
          				outlinePassEffect.edgeGlow = 2;
          				outlinePassEffect.edgeThickness = 2;
          


            				// // const effect2 = new ShaderPass( RGBShiftShader );
            				// // const effect2 = new ShaderPass( NOTRGBShiftShader );
            				// const effect2 = new ShaderPass( BBB );
            				// effect2.uniforms[ 'amount' ].value = 0.015;
                    // // needs a live update
                    // const aa = document.getElementById('threedee1');
                    // const rect = aa.getBoundingClientRect();
                    // // const aspectRatio = window.innerWidth / window.innerHeight;
                    // root.circlesShader1 = effect2;
                    // 
                    // console.log("¿¿¿ 222 window.innerWidth", rect.width, rect.height);
                    // // const resolution = new Vector2(window.innerWidth, window.innerHeight);
                    // const resolution = new Vector2(rect.width, rect.height);
                    // effect2.uniforms[ 'resolution' ].value = resolution;
                    // effect2.uniforms[ 'aspectRatio' ].value = rect.width / rect.height;
                    // 
                    // // spenssive
                    // const distance = ovo.camera.position.distanceTo( ovo.orbitControl.target );
                    // effect2.uniforms[ 'camera_dis' ].value = distance;
                    // 
            				// composer.addPass( effect2 );
          
          // composer.addPass( effect1 );
          // composer.addPass( afterimagePass );

  				const effect3 = new OutputPass();
  				composer.addPass( effect3 );
            
}
