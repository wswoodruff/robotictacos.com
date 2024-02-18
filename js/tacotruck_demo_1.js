

// https://discourse.threejs.org/t/error-relative-references-must-start-with-either-or/13573/19

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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



let mouseYDelta = 0;

const animals = [];
// const animalsLeft = [];
// const animalsRight = [];

var tacocar1 = null;

var streetplatesOriginal = null;
const streetplates = [];
const streetplateBox = new THREE.Box3();

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
  


  const scene = new THREE.Scene();
  // scene.fog = new THREE.Fog( scene.background, 1, 5000 );
  scene.background = new THREE.Color().setHSL( 0.5, 1, 0.7 );
  
  const aa = document.getElementById('threedee1');
  const height = aa.getBoundingClientRect().height;
  // window.innerHeight
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 2000 );
  camera.position.fromArray([0,20,40]);
  // camera.position.fromArray([0.8572659096940822, 1.6405420129153931, 2.9213720880347744]);
  camera.lookAt(new THREE.Vector3(0,0,0));
  window.cam = camera;

  const renderer = new THREE.WebGLRenderer({antialias:true});
  // document.body.appendChild( renderer.domElement );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( window.innerWidth, aa.getBoundingClientRect().height );
  aa.appendChild( renderer.domElement );
  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


  const orbit = new OrbitControls( camera, renderer.domElement );
  // orbit.enableZoom = false;

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );

  
  // var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  // var helper = new THREE.HemisphereLightHelper( light, 50 );
  // scene.add( helper );
  // scene.add( light );


	const hemiLight = new THREE.HemisphereLight( 0x421200, 0x5cdeff, 1 );
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
		'topColor': { value: new THREE.Color( 0x00c4f5 ) },
		// 'bottomColor': { value: new THREE.Color( 0xffffff ) },
		'bottomColor': { value: new THREE.Color( 0xffffff ) },
		'offset': { value: 1 },
		'exponent': { value: 0.6 }
	};
	uniforms[ 'topColor' ].value.copy( hemiLight.color );

	// scene.fog.color.copy( uniforms[ 'bottomColor' ].value );

	const skyGeo = new THREE.SphereGeometry( 1000, 32, 15 );
	const skyMat = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.BackSide
	} );

	const sky = new THREE.Mesh( skyGeo, skyMat );
	// scene.add( sky );


  const ambientLight = new THREE.AmbientLight();
  ambientLight.intensity = 2.01;
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight();
  sunLight.castShadow = true;
  // sunLight.position.set(2.5, 4, 0);
  // sunLight.position.set(2.5, 4, 12);
  // sunLight.position.set(1, 1, 0);
  // sunLight.position.copy({x: 1.2, y: 1, z: 0.2});
  sunLight.position.copy({x: -4.2, y: 3, z: 10.2});
  sunLight.intensity = 4.7;
  // sunLight.color.setHex(0xffff80);
  sunLight.color.setHex(0xfffff);
  scene.add(sunLight);

  //Set up shadow properties for the light
  sunLight.shadow.mapSize.width = 512 * 1;
  sunLight.shadow.mapSize.height = 512 * 1;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 200;
  sunLight.shadow.bias = 0.00001;
  sunLight.shadow.radius = 0.00001;

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
  scene.add( shadowHelper );

  // this.sunLight = sunLight;
  

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
    var result = await new GLTFLoader().loadAsync("../models/tacocar/streetplate2.glb");
    let model1 = result.scene;
    scene.add(model1);
    // result.scene.position.setScalar(0,0,0);
    streetplatesOriginal = model1;
    streetplatesOriginal.visible = false;
    
    let box = streetplateBox;
    // const box = new THREE.Box3();
    box.setFromObject(streetplatesOriginal);
    // console.log(box);
    // window.bb = box;
    const vv = new THREE.Vector3();
    box.getSize(vv);
    let padding = -4.2;
    let pos = streetplatesOriginal.position.clone();
    for (var ii = 0; ii < 2; ii++) {
      let gg = streetplatesOriginal.clone();
      gg.visible = true;
      gg.position.copy(pos);
      gg.position.x = (vv.x + padding) * ii;
      scene.add(gg);
      streetplates.push(gg);
    }
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


  function animate() {
  	requestAnimationFrame( animate );
    orbit.update();
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
    
  	renderer.render( scene, camera );
  }
  animate();


} // inininint