

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


inininint();

async function inininint() {
  


const scene = new THREE.Scene();
const aa = document.getElementById('threedee1');
const height = aa.getBoundingClientRect().height;
// window.innerHeight
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 1000 );
camera.position.fromArray([1.4749013346022313, 2.5922112735946192, 1.7509439108807319]);
camera.position.fromArray([0.8572659096940822, 1.6405420129153931, 2.9213720880347744]);
camera.lookAt(new THREE.Vector3(0,-1,0));
window.cam = camera;

const renderer = new THREE.WebGLRenderer();
// document.body.appendChild( renderer.domElement );
// renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( window.innerWidth, aa.getBoundingClientRect().height );
aa.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );




    const ambientLight = new THREE.AmbientLight();
    ambientLight.intensity = 2.01;
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight();
    sunLight.castShadow = true;
    // sunLight.position.set(2.5, 4, 0);
    // sunLight.position.set(2.5, 4, 12);
    // sunLight.position.set(1, 1, 0);
    sunLight.position.copy({x: 1.2, y: 1, z: 0.2});
    sunLight.intensity = 4.7;
    // sunLight.color.setHex(0xffff80);
    sunLight.color.setHex(0xfffff);
    scene.add(sunLight);

    //Set up shadow properties for the light
    sunLight.shadow.mapSize.width = 512 * 2;
    sunLight.shadow.mapSize.height = 512 * 2;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;

    // see link for more https://stackoverflow.com/a/56015860
    // and need it to be in 3d space instead of vector space
    sunLight.position.multiplyScalar(5);

    // need a larger size for shadows
    var side = 8;
    sunLight.shadow.camera.top = side;
    sunLight.shadow.camera.bottom = -side;
    sunLight.shadow.camera.left = side;
    sunLight.shadow.camera.right = -side;

    // var shadowHelper = new CameraHelper( sunLight.shadow.camera );
    // this.add( shadowHelper );

    // this.sunLight = sunLight;
    

    window.addEventListener( 'resize', onWindowResize );
    function onWindowResize() {

			camera.aspect = window.innerWidth / height;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, height );

		}
    

var result = await new GLTFLoader().loadAsync("../models/catlike1.glb");
// debugger
let model1 = result.scene;
// result.scene.scale.setScalar(0.2)
result.scene.position.setScalar(0,0,0);
// scene.add(result.scene);

for (var i = 0; i < 8; i++) {
  let gg = model1.clone();
  animals.push(gg);
  gg.position.x += i * 1.8 + -6;
  
  scene.add(gg);
  
}





document.addEventListener("wheel", (event) => {
// renderer.domElement.addEventListener("wheel", (event) => {
  console.log(event.deltaY );
  mouseYDelta += event.deltaY;
  // animate();
});


function animate() {
	requestAnimationFrame( animate );
  orbit.update();
  for (var i = 0; i < animals.length; i++) {
    let gg = animals[i];
    gg.rotation.y =  (i * 0.2) + mouseYDelta * 0.1 ;
    gg.rotation.x =  (i * 0.04) + mouseYDelta * 0.01 ;
    gg.rotation.z =  (i * 0.2) + mouseYDelta * 0.04 ;
    // gg.rotation.y += mouseYDelta * 0.001;
    // gg.rotation.y -= 0.1;
  }
  
	renderer.render( scene, camera );
}
animate();

}
