

// https://discourse.threejs.org/t/error-relative-references-must-start-with-either-or/13573/19

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Tile, TilesController } from './utils/tiles.js';
import { SphereMesh } from './utils/sphereMesh.js';

import { CheapPool } from './utils/cheapPool.js';

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

var orbit;

let mouseYDelta = 0;

const animals = [];
// const animalsLeft = [];
// const animalsRight = [];

var tacocar1 = null;

var streetplatesOriginal = null;
const streetplates = [];
const streetplateBox = new THREE.Box3();

var streetTiles1 = null;

const animationPool = new CheapPool();

// inininint();

function enableShadowsObject(object) {
  object.receiveShadow = true;
  object.castShadow = true;
  object.traverse((item) => {
    if (item.isMesh) {
      item.castShadow = true;
      item.receiveShadow = true;
    }
  });
}


export async function inininint() {
  
  window.THREE = THREE;

  const scene = new THREE.Scene();
  // scene.fog = new THREE.Fog( scene.background, 1, 5000 );
  scene.background = new THREE.Color().setHSL( 0.5, 1, 0.7 );
  
  const aa = document.getElementById('threedee1');
  const height = aa.getBoundingClientRect().height;
  // window.innerHeight
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 2000 );
  // camera.position.fromArray([0,24,40]);
  // camera.position.fromArray([0, 24.770988266535532, 38.8329249239593]);
  camera.position.fromArray([0, 21.22465751184184, 40.4622033919508]);
  // camera.position.fromArray([0.8572659096940822, 1.6405420129153931, 2.9213720880347744]);
  // camera.lookAt(new THREE.Vector3(0,0,0));
  camera.lookAt(new THREE.Vector3(0,0,0).fromArray([0.00859148296684644, -0.24372632714083164, -0.9698059929072776]).multiplyScalar(1));
  // camera.lookAt(new THREE.Vector3(0,0,0).fromArray([-0.002380159629899302, -0.17895685250015073, -0.9838540439431938]).multiplyScalar(1));
  // camera.lookAt(new THREE.Vector3(200,4,0));
  window.cam = camera;

  const renderer = new THREE.WebGLRenderer({antialias:true});
  // document.body.appendChild( renderer.domElement );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( window.innerWidth, aa.getBoundingClientRect().height );
  aa.appendChild( renderer.domElement );
  
  // THREE.ColorManagement.enabled = false;
  // THREE.ColorManagement.enabled = true;
  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // renderer.outputColorSpace = THREE.sRGBEncoding
  // renderer.outputColorSpace = THREE.NoColorSpace;
  // renderer.outputColorSpace = THREE.SRGBColorSpace;
  // renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  // renderer.outputColorSpace = THREE.NoColorSpace;

  orbit = new OrbitControls( camera, renderer.domElement );
  // orbit.enableZoom = false;
  // orbit.enabled = false;

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );

  
  // var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  // var helper = new THREE.HemisphereLightHelper( light, 50 );
  // scene.add( helper );
  // scene.add( light );


	const hemiLight = new THREE.HemisphereLight( 0x421200, 0x5cdeff, 12 );
	// hemiLight.color.setHSL( 0.6, 1, 0.6 );
	// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	// hemiLight.position.set( 0, 50, 0 );
	// scene.add( hemiLight );

	const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 100 );
	// scene.add( hemiLightHelper );

  
	// SKYDOME

	const vertexShader = document.getElementById( 'vertexShader' ).textContent;
	const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
	const uniforms = {
		// 'topColor': { value: new THREE.Color( 0x0077ff ) },
		// 'topColor': { value: new THREE.Color( 0x00c4f5 ) },
		// 'topColor': { value: new THREE.Color( 0xa3e7ff ) },
		'topColor': { value: new THREE.Color( 0xadd5ff ) },
		// 'bottomColor': { value: new THREE.Color( 0xffffff ) },
		// 'bottomColor': { value: new THREE.Color( 0x2e0004 ) },
		'bottomColor': { value: new THREE.Color( 0xebfcff ) },
		'offset': { value: -1.1 },
		'exponent': { value: 0.4 }
	};
	// uniforms[ 'topColor' ].value.copy( hemiLight.color );

	// scene.fog.color.copy( uniforms[ 'bottomColor' ].value );

	const skyGeo = new THREE.SphereGeometry( 1000, 32, 15 );
	const skyMat = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.BackSide
	} );

	const sky = new THREE.Mesh( skyGeo, skyMat );
	scene.add( sky );


  const ambientLight = new THREE.AmbientLight();
  ambientLight.intensity = 1.81;
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight();
  sunLight.castShadow = true;
  sunLight.position.copy({x: -4.2, y: 6, z: 12.2});
  sunLight.intensity = 2.7;
  // sunLight.color.setHex(0xffff80);
  sunLight.color.setHex(0xffffff);
  scene.add(sunLight);

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

  var shadowHelper = new THREE.CameraHelper( sunLight.shadow.camera );
  // scene.add( shadowHelper );


  window.addEventListener( 'resize', onWindowResize );
  function onWindowResize() {

		camera.aspect = window.innerWidth / height;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, height );

	}
  
  {
  // var result = await new GLTFLoader().loadAsync("../models/catlike1.glb");
  var result = await new GLTFLoader().loadAsync("../models/tacocar/tacocar1.glb");
  // debugger
  let model1 = result.scene;
  tacocar1 = model1;
  // result.scene.scale.setScalar(0.2)
  // result.scene.position.setScalar(0,0,0);
  scene.add(result.scene);
  enableShadowsObject(model1);
  }

  // for (var i = 0; i < 8; i++) {
  //   let gg = model1.clone();
  //   animals.push(gg);
  //   gg.position.x += i * 1.8 + -6;
  // 
  //   scene.add(gg);
  // 
  // }
  
  {
    var result = await new GLTFLoader().loadAsync("../models/tacocar/streetplate3.glb");
    let model1 = result.scene;
    // scene.add(model1);
    // result.scene.position.setScalar(0,0,0);
    streetplatesOriginal = model1;
    
//     const box = new THREE.Box3();
//     box.setFromObject(streetplatesOriginal)
// const helper = new THREE.Box3Helper( box, 0x00aaff );
// scene.add( helper );

    // streetplatesOriginal.visible = false;
    
    // let box = streetplateBox;
    // // const box = new THREE.Box3();
    // box.setFromObject(streetplatesOriginal);
    // // console.log(box);
    // // window.bb = box;
    // const vv = new THREE.Vector3();
    // box.getSize(vv);
    // let padding = -4.2;
    // let pos = streetplatesOriginal.position.clone();
    // for (var ii = 0; ii < 2; ii++) {
    //   let gg = streetplatesOriginal.clone();
    //   gg.visible = true;
    //   gg.position.copy(pos);
    //   gg.position.x = (vv.x + padding) * ii;
    //   scene.add(gg);
    //   streetplates.push(gg);
    //   gg.visible = false;
    // }
    
    // let streetTiles1Group = new THREE.Group();
    // scene.add(streetTiles1Group);
    
    streetTiles1 = new TilesController();
    scene.add(streetTiles1);
    streetTiles1.position.z = 20;
    window.streetTiles1 = streetTiles1;
    animationPool.add(streetTiles1)
    
    
    let rr = new Tile({item:streetplatesOriginal.clone(), paddingLeft:2.4, paddingRight:-1.2, showDebugger:true});
    streetTiles1.addHorizontal(rr)
    rr.name = "111";
    rr.position.x += -40;
    // rr.position.z = 20;
    
    let gg1 = new SphereMesh({color:0xffff00, radius: 6});
    rr.add(gg1);
    gg1.position.y = 22;
    
    
//     const box2 = new THREE.Box3();
//     box2.setFromObject(rr)
// const helper2 = new THREE.Box3Helper( box2, 0xaaaaff );
// scene.add( helper2 );
    
    
    
    let rr2 = new Tile({item:streetplatesOriginal.clone(), paddingLeft:2.4, paddingRight:-1.2, showDebugger:true});
    streetTiles1.addHorizontal(rr2)
    rr2.name = "222";
    rr2.position.x += 40;
    
    let gg2 = new SphereMesh({color:0x00eeee, radius: 6});
    rr2.add(gg2);
    gg2.position.y = 22;
    
    
    
    
    let rr3 = new Tile({item:streetplatesOriginal.clone(), paddingLeft:2.4, paddingRight:-1.2, showDebugger:true});
    streetTiles1.addHorizontal(rr3)
    rr3.name = "222";
    rr3.position.x += 80;
    
    let gg3 = new SphereMesh({color:0xffeeee, radius: 6});
    rr3.add(gg3);
    gg3.position.y = 22;
    
    
    streetTiles1.snapAllInOrder();
    
    // streetTiles1.snap(streetTiles1.horizontal[0], streetTiles1.horizontal[1], "east", "west" );
    // streetTiles1.snap(streetTiles1.horizontal[0], streetTiles1.horizontal[1], "west", "east" );
    
    
    
    // let glglh = new SphereMesh({radius : 2, color:0x0000ff});
    // scene.add(glglh)
    
  }
  
  
  // floor
  {
  const geometry = new THREE.PlaneGeometry( 1, 1 );
  const material = new THREE.MeshStandardMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  plane.scale.setScalar(144);
  // plane.rotation.y = -Math.PI;
  plane.rotation.x = Math.PI/2;
  plane.position.z = -60;
  scene.add( plane );
  plane.receiveShadow = true;
  }
  
  
  {
  var result = await new GLTFLoader().loadAsync("../models/tacocar/sidewalk.glb");
  let model1 = result.scene;
  // result.scene.scale.setScalar(0.2)
  // result.scene.position.setScalar(0,0,0);
  scene.add(result.scene);
  enableShadowsObject(model1);
  }
  
  {
  var result = await new GLTFLoader().loadAsync("../models/tacocar/tree1.glb");
  let model1 = result.scene;
  // result.scene.scale.setScalar(0.2)
  // result.scene.position.setScalar(0,0,0);
  scene.add(result.scene);
  enableShadowsObject(model1);


  }
  
  {
  var result = await new GLTFLoader().loadAsync("../models/tacocar/building1.glb");
  let model1 = result.scene;
  // result.scene.scale.setScalar(0.2)
  // result.scene.position.setScalar(0,0,0);
  scene.add(result.scene);
  }
  

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
      streetTiles1.snapFrontToBack(true);
    }
    if (event.key === "x") {
      console.log("z");
      // streetTiles1.snapBackToFront();
      streetTiles1.snapBackToFront(true);
    }
    // do something
  });


  // 
  // LOOP
  // 

  function animate() {
  	requestAnimationFrame( animate );
    if(orbit !== undefined){
      orbit.update();
    }
    // for (var i = 0; i < animals.length; i++) {
    //   let gg = animals[i];
    //   gg.rotation.y =  (i * 0.2) + mouseYDelta * 0.1 ;
    //   gg.rotation.x =  (i * 0.04) + mouseYDelta * 0.01 ;
    //   gg.rotation.z =  (i * 0.2) + mouseYDelta * 0.04 ;
    //   // gg.rotation.y += mouseYDelta * 0.001;
    //   // gg.rotation.y -= 0.1;
    // }
    
    if(tacocar1){
      tacocar1.position.x += 0.1;
    }
    
    // basic Entities ecs system
    for (var i = 0; i < animationPool.length; i++) {
      
      let pick = animationPool[i];
      pick.entities.run();

    }
    
  	renderer.render( scene, camera );
  }
  animate();


} // inininint
