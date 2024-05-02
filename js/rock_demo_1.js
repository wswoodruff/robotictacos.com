

// https://discourse.threejs.org/t/error-relative-references-must-start-with-either-or/13573/19

// import * as THREE from 'three';
import {Group, Box3, Vector3, Clock, MeshStandardMaterial, 
  MeshBasicMaterial, BoxGeometry, Mesh, AxesHelper, Scene, 
  Color, PerspectiveCamera, WebGLRenderer, PCFSoftShadowMap, 
  HemisphereLight, HemisphereLightHelper, SphereGeometry, 
  ShaderMaterial, AmbientLight, DirectionalLight, CameraHelper, BackSide, PlaneGeometry, DoubleSide,
  Frustum, Matrix4 } from 'three';
  
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Tile, TilesController } from './utils/tiles.js';
import { SphereMesh } from './utils/sphereMesh.js';

import { CheapPool } from './utils/cheapPool.js';
import { CubeMesh } from './utils/cubeMesh.js';
import { CarModel } from './utils/carModel.js';
import { BaseModel } from './utils/baseModel.js';

import { isBetween, remapNormal } from './utils/mathness.js';


import * as THREE from 'three';

			import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
			import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

			import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
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
  
  // specials for this noise
  firstColor : new Color().setHex(0xff5cbb),
  seconistColor : new Color().setHex(0xfff45c),
  
}



export async function inininint() {
  
  // window.THREE = THREE;

  scene(ovo, {color:0xff5cbb});
  
  camera(ovo, {position:[0, 0, 40]});
  
  renderer(ovo);
  
  orbitCamera(ovo, ovo.camera, ovo.renderer)
  
  {
  const yy = cube({color:0xffffff});
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
  const yy = cube({color:0xffffff});
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

  var shadowHelper = new CameraHelper( ovo.sunlight.shadow.camera );
  // scene.add( shadowHelper );

  setupResize(ovo, ovo.camera, ovo.renderer)

  addPostProcessing(ovo)
    
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
    
  let yy = loadModel(ovo, ovo.scene, {name:"tacoscar1", url:"../models/tacocar/tacocar1.glb"})
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
    mouseYDelta += event.deltaY;
    // animate();
  });
  

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
  document.addEventListener("keydown", (event) => {
    // if (event.key === "a") {
    //   console.log("a");
    //   streetTiles1.snap(streetTiles1.horizontal[0], streetTiles1.horizontal[1], "west", "east" );
    // }
    // if (event.key === "s") {
    //   console.log("s");
    //   streetTiles1.snap(streetTiles1.horizontal[0], streetTiles1.horizontal[1], "east", "west" );
    // }
    if (event.key === "z") {
      console.log("z");
      streetTilesManager.controller.snapFrontToBack(true);
    }
    if (event.key === "x") {
      console.log("z");
      streetTilesManager.controller.snapBackToFront(true);
    }
    
    // console.log("down", event.key);
    
    if (event.key === "ArrowLeft" || event.key === "a") {
      arrowLeftDown = true;
    }
    if (event.key === "ArrowRight" || event.key === "d") {
      arrowRightDown = true;
    }
    
    // do something
  });
  
  document.addEventListener("keyup", (event) => {
    // console.log("up", event.key);
    if (event.key === "ArrowLeft" || event.key === "a") {
      arrowLeftDown = false;
    }
    if (event.key === "ArrowRight" || event.key === "d") {
      arrowRightDown = false;
    }
  });


  // 
  // LOOP
  // 

// y = clamp(sin(x  * 2.664) * 1.448, -1.0, 1.0);

  function animate() {
  	requestAnimationFrame( animate );
    if(ovo.orbit !== undefined){
      ovo.orbit.update();
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
    
    if(ovo["tacoscar1"]){
      ovo["tacoscar1"].rotation.y += delta * 4.4;
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
    
    

    
  	// ovo.renderer.render( ovo.scene, ovo.camera );
    
    ovo.composer.render();
  }
  animate();


} // inininint






// setup functions to go to imports


function scene(root, {color=0x5cb6ff}={}){
  root.scene = new Scene();
  // scene.fog = new THREE.Fog( scene.background, 1, 5000 );
  // root.scene.background = new Color().setHSL( 0.5, 1, 0.7 );
  root.scene.background = new Color().setHex( color );
  // root.scene.background = new Color().setHex( 0x00000 );
}

function camera(root,{position=[0, 21.2, 40.4]}={}) {
  const aa = document.getElementById('threedee1');
  const height = aa.getBoundingClientRect().height;
  // window.innerHeight
  const camera = new PerspectiveCamera( 75, window.innerWidth / height, 0.1, 2000 );
  // camera.position.fromArray([0,24,40]);
  // camera.position.fromArray([0, 24.770988266535532, 38.8329249239593]);
  // camera.position.fromArray([0, 21.22465751184184, 40.4622033919508]);
  camera.position.fromArray(position);
  // camera.rotation.x = -0.4830982133416878;
  // camera.position.fromArray([0.8572659096940822, 1.6405420129153931, 2.9213720880347744]);
  // camera.lookAt(new THREE.Vector3(0,0,0));
    // camera.lookAt(new Vector3(0,0,0).fromArray([0.00859148296684644, -0.24372632714083164, -0.9698059929072776]).multiplyScalar(1));
  // camera.lookAt(new THREE.Vector3(0,0,0).fromArray([-0.002380159629899302, -0.17895685250015073, -0.9838540439431938]).multiplyScalar(1));
  // camera.lookAt(new THREE.Vector3(200,4,0));
  // window.cam = camera;
  root.camera = camera;
}

function renderer(root) {
  
  const aa = document.getElementById('threedee1');
  const renderer = new WebGLRenderer({antialias:true});
  // document.body.appendChild( renderer.domElement );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( window.innerWidth, aa.getBoundingClientRect().height );
  aa.appendChild( renderer.domElement );
  
  // THREE.ColorManagement.enabled = false;
  // THREE.ColorManagement.enabled = true;
  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap

  // renderer.outputColorSpace = THREE.sRGBEncoding
  // renderer.outputColorSpace = THREE.NoColorSpace;
  // renderer.outputColorSpace = THREE.SRGBColorSpace;
  // renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  // renderer.outputColorSpace = THREE.NoColorSpace;
  
  root.renderer = renderer;
  
}


function orbitCamera(root, camera, renderer) {
  
  root.orbit = new OrbitControls( camera, renderer.domElement );
  // orbit.enableZoom = false;
  // orbit.enabled = false;
}

// mutates to add a top level component of bounds to do other stuff like hit testing a group
function addBounds(item) {
  item.box3 = new Box3();
  item.updateMatrix(true);
  item.box3.setFromObject(item);
  item.updateBox3 = function(){
    this.box3.setFromObject(this);
  }
}

function cube({color=0x00ff00, materialShader="basic"}={}){
    const geometry = new BoxGeometry( 1, 1, 1 );
    // let material;
    // if (materialShader === "flat") {
    //   material = new MeshMaterial( { color: color } );
    // }
    let material = new MeshBasicMaterial( { color: color } );
    const cube = new Mesh( geometry, material ) ;
    // const cube = new BaseModel( new Mesh( geometry, material ) );
    addBounds(cube);
    // scene.add( cube );
    return cube;
}

function hemiLight(addHelper,root){
  // var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  // var helper = new THREE.HemisphereLightHelper( light, 50 );
  // scene.add( helper );
  // scene.add( light );
  
	const hemiLight = new HemisphereLight( 0x421200, 0x5cdeff, 12 );
  return hemiLight;
  // if(root){
  //   root.hemiLight = hemiLight;
  // }
  // if(addHelper){
  //   ovo.hemiLightHelper = new HemisphereLightHelper( ovo.hemiLight, 100 );
  // 	// ovo.scene.add( hemiLightHelper );
  // }
	// hemiLight.color.setHSL( 0.6, 1, 0.6 );
	// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	// hemiLight.position.set( 0, 50, 0 );
	// scene.add( hemiLight );
}


function skydome(root, scene){
  
	// SKYDOME
  const vertexShader = `varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `;
	
  const fragmentShader = `uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize( vWorldPosition + offset ).y;
      gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
    }
  `;

	 
	const uniforms = {
		// 'topColor': { value: new THREE.Color( 0x0077ff ) },
		// 'topColor': { value: new THREE.Color( 0x00c4f5 ) },
		// 'topColor': { value: new THREE.Color( 0xa3e7ff ) },
		'topColor': { value: new Color( 0xadd5ff ) },
		// 'bottomColor': { value: new THREE.Color( 0xffffff ) },
		// 'bottomColor': { value: new THREE.Color( 0x2e0004 ) },
		'bottomColor': { value: new Color( 0xebfcff ) },
		'offset': { value: -1.1 },
		'exponent': { value: 0.4 }
	};
	// uniforms[ 'topColor' ].value.copy( hemiLight.color );

	// scene.fog.color.copy( uniforms[ 'bottomColor' ].value );

	const skyGeo = new SphereGeometry( 1000, 32, 15 );
	const skyMat = new ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: BackSide
	} );

	const sky = new Mesh( skyGeo, skyMat );
	scene.add( sky );
  
  root.skydome = sky;

}

function ambientLight(scene) {
  const ambientLight = new AmbientLight();
  ambientLight.intensity = 1.81;
  scene.add(ambientLight);
  return ambientLight;
}


function sunlight(scene){
  const sunLight = new DirectionalLight();
  sunLight.castShadow = true;
  sunLight.position.copy({x: -4.2, y: 6, z: 12.2});
  sunLight.intensity = 2.7;
  // sunLight.color.setHex(0xffff80);
  sunLight.color.setHex(0xffffff);


  //Set up shadow properties for the light
  sunLight.shadow.mapSize.width = 512 * 1;
  sunLight.shadow.mapSize.height = 512 * 1;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 200;
  
  sunLight.shadow.bias = 0.00001;
  sunLight.shadow.bias = 0.000001;
  sunLight.shadow.radius = 0.001;

  // see link for more https://stackoverflow.com/a/56015860
  // and need it to be in 3d space instead of vector space
  sunLight.position.multiplyScalar(5);

  // need a larger size for shadows
  var side = 48;
  sunLight.shadow.camera.top = side;
  sunLight.shadow.camera.bottom = -side;
  sunLight.shadow.camera.left = side;
  sunLight.shadow.camera.right = -side;
  
  scene.add(sunLight);
  return sunLight;
}


function floor(root, scene){
  const geometry = new PlaneGeometry( 1, 1 );
  const material = new MeshStandardMaterial( {color: 0x00ff00, side: DoubleSide} );
  const plane = new Mesh( geometry, material );
  plane.scale.setScalar(144);
  // plane.rotation.y = -Math.PI;
  plane.rotation.x = Math.PI/2;
  plane.position.z = -60;
  scene.add( plane );
  plane.receiveShadow = true;
  root.floor = plane;
  return plane;
}

function setupResize(root, camera, renderer) {
    
    window.addEventListener( 'resize', onWindowResize );
    function onWindowResize() {
      // const height = aa.getBoundingClientRect().height;
      const height = renderer.domElement.getBoundingClientRect().height;
  		camera.aspect = window.innerWidth / height;
  		camera.updateProjectionMatrix();

  		renderer.setSize( window.innerWidth, height );
      ovo.composer.setSize( window.innerWidth, height );
  	}
}




// decorator
function addVolume({item, volumeW=1, volumeH=1, volumeD=1}) {
  
  // hard values for now
  const geometry = new BoxGeometry(volumeW, volumeH, volumeD);
  // const material = new MeshStandardMaterial( { color: 0xaa88ee } );
  const material = new MeshBasicMaterial( { wireframe: true, color: 0xaa88ee } );
  let volume = new Mesh( geometry, material );
  volume.position.set(0,0,0)
  volume.geometry.computeBoundingBox();
  console.log(volume.geometry.boundingBox);
  // boundingBox
  item.volume = volume;
  
  item.add(volume);
}


// needs a scene grapth instead 
async function loadModel(root, scene, { name="", url="" } = {}) {
  // var result = await new GLTFLoader().loadAsync("../models/tacocar/tacocar1.glb");
  var result = await new GLTFLoader().loadAsync(url);
  // debugger
  let model1 = result.scene;
  // tacocar1 = model1;
  
  // needs a scene grapth instead 
  root[name] = new BaseModel(model1);
  root[name].position.set(0,0,0)
  
  // result.scene.scale.setScalar(0.2)
  // result.scene.position.setScalar(0,0,0);
  scene.add(root[name]);
  return root[name];
  // enableShadowsObject(tacocar1);
  // addVolume({item: tacocar1, volumeW:7, volumeH:6, volumeD:4})
}


function lerpBackgroundColor_CM(root,c1,c2,time) {
  const alpha = remapNormal(-1,1,Math.sin(time))
  // console.log("alpha", alpha);
  root.scene.background.lerpColors(c1,c2,alpha);
}



// https://stackoverflow.com/questions/29758233/three-js-check-if-object-is-still-in-view-of-the-camera
// item needs .box3
const viewVec = new Vector3();
function testIfInView(root,item,modeX, modeY) {
  // root.camera.updateMatrix();
  // root.camera.updateMatrixWorld();
  root.viewFrustum.setFromProjectionMatrix(new Matrix4().multiplyMatrices(root.camera.projectionMatrix, root.camera.matrixWorldInverse));  
  
  // debugger
  // box3 is in world space, so we need to test 2 positions for the x or y
  let tally = 0;
  viewVec.set(item.box3.min.x, item.position.y, item.position.z);
  if (root.viewFrustum.containsPoint(viewVec)) {
      tally++;
  }
  viewVec.set(item.box3.max.x, item.position.y, item.position.z);
  if (root.viewFrustum.containsPoint(viewVec)) {
      tally++;
  }
  // console.log("tally", tally);
  if(tally > 0){
    // debugger
    return true;
  }
  
  // if (root.viewFrustum.containsPoint(item.position)) {
  //     return true;
  // }
  return false;
}


function crappyScreenWrapIn3D(root,item) {
  if(item.wasInView && !testIfInView(root, item) ){
    // debugger
    // item.position.x = -40
    // console.log("¿¿¿¿");
    item.wasInView = false;
    // compute a flip
    // get dir
    let dir = item.position.x - item.mPositionX;
    // right
    if ( dir > 0 ) {
      let cc = (item.box3.min.x + item.box3.max.x) * 0.5;
      // item.position.x = (item.box3.min.x * -1) - cc + 10 ;
      let width = item.box3.max.x - item.box3.min.x;
      // debugger
      item.position.x = 0 - (width * 2) + 20;
      item.mPositionX = item.position.x;
      // console.log("item.position.x", item.position.x);
    }
    // left
    else {
      let cc = (item.box3.min.x + item.box3.max.x) * 0.5;
      // item.position.x = (item.box3.min.x * -1) - cc + 10 ;
      let width = item.box3.max.x - item.box3.min.x;
      // debugger
      // item.position.x = 0 - (width * 2) + 20;
      // need to derive from the far plane moved to the items position to get a proper width
      item.position.x = 80;
      item.mPositionX = item.position.x;
      // console.log("item.position.x", item.position.x);
    }
  }else{
    item.wasInView = true;
  }
}


// composer.setSize( window.innerWidth, window.innerHeight );
function addPostProcessing(root) {
  // postprocessing

  				const composer = new EffectComposer( root.renderer );
          root.composer = composer;
  				composer.addPass( new RenderPass( root.scene, root.camera ) );
          
          const afterimagePass = new AfterimagePass();
          composer.addPass( afterimagePass );

  				const effect1 = new ShaderPass( DotScreenShader );
  				effect1.uniforms[ 'scale' ].value = 8;
  				composer.addPass( effect1 );

  				const effect2 = new ShaderPass( RGBShiftShader );
  				effect2.uniforms[ 'amount' ].value = 0.015;
  				composer.addPass( effect2 );

  				const effect3 = new OutputPass();
  				composer.addPass( effect3 );
            
}
