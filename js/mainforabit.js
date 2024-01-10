import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const aa = document.getElementById('threedee1');
const height = aa.getBoundingClientRect().height;
// window.innerHeight
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 1000 );



const renderer = new THREE.WebGLRenderer();
// document.body.appendChild( renderer.domElement );
// renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( window.innerWidth, aa.getBoundingClientRect().height );
aa.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
  orbit.update();
	renderer.render( scene, camera );
}
animate();
