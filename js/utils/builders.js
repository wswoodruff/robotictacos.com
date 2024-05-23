
// basic object builders like cube camera
// etc


import {Euler, Vector2, Group, Box3, Vector3, Clock, MeshStandardMaterial, 
  MeshBasicMaterial, BoxGeometry, Mesh, AxesHelper, Scene, 
  Color, PerspectiveCamera, OrthographicCamera, WebGLRenderer, PCFSoftShadowMap, 
  HemisphereLight, HemisphereLightHelper, SphereGeometry, 
  ShaderMaterial, AmbientLight, DirectionalLight, CameraHelper, BackSide, PlaneGeometry, DoubleSide,
  Frustum, Matrix4 } from 'three';


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { BaseModel } from './baseModel.js';


export function scene(root, {color=0x5cb6ff}={}){
  root.scene = new Scene();
  // scene.fog = new THREE.Fog( scene.background, 1, 5000 );
  // root.scene.background = new Color().setHSL( 0.5, 1, 0.7 );
  
  root.scene.background = new Color().setHex( color );
  
  // root.scene.background = new Color().setHex( 0x00000 );
}

export function camera(root,{position=[0, 21.2, 40.4]}={}) {
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


// const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
export function orthographicCamera(root,{rect,near=1,far=1000}){
  const camera = new OrthographicCamera( rect.width / - 2, rect.width / 2, rect.height / 2, rect.height / - 2, near, far );
  root.orthographicCamera = camera;
  return camera;
}


export function renderer(root,{antialias=false}={}) {
  
  const aa = document.getElementById('threedee1');
  const renderer = new WebGLRenderer({antialias:antialias});
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


export function orbitCamera(root, camera, renderer) {
  
  root.orbitControl = new OrbitControls( camera, renderer.domElement );
  // orbit.enableZoom = false;
  // orbit.enabled = false;
}

// mutates to add a top level component of bounds to do other stuff like hit testing a group
export function addBounds(item) {
  item.box3 = new Box3();
  item.updateMatrix(true);
  item.box3.setFromObject(item);
  item.updateBox3 = function(){
    this.box3.setFromObject(this);
  }
}

export function cube(scene,{color=0x00ff00, materialShader="standard", addToScene = true}={}){
    const geometry = new BoxGeometry( 1, 1, 1 );
    let material;
    if (materialShader === "basic") {
      // material = new MeshMaterial( { color: color } );
      material = new MeshBasicMaterial( { color: color } );
    }
    else if(materialShader === "standard"){
      material = new MeshStandardMaterial( { color: color } );
    }
    const cube = new Mesh( geometry, material ) ;
    // const cube = new BaseModel( new Mesh( geometry, material ) );
    addBounds(cube);
    if (addToScene) scene.add( cube );
    return cube;
}

// export function sphere(scene,{color=0x00ff00, materialShader="standard", radius=1}={}){
//   const geometry = new SphereGeometry( radius, 12, 12 ); 
//   let material;
//   if (materialShader === "basic") {
//     material = new MeshBasicMaterial( { color: color } );
//   }
//   else if(materialShader === "standard"){
//     material = new MeshStandardMaterial( { color: color } );
//   }
//   const _sphere = new Mesh( geometry, material );
//   // scene.add( sphere );
//   return _sphere;
// }



export function hemiLight(addHelper,root){
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


export function skydome(root, scene){
  
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

export function ambientLight(scene) {
  const ambientLight = new AmbientLight();
  ambientLight.intensity = 1.81;
  scene.add(ambientLight);
  return ambientLight;
}


export function sunlight(scene){
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


export function floor(root, scene){
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

export function setupResize(root, camera, renderer) {
    
    window.addEventListener( 'resize', onWindowResize );
    function onWindowResize() {
      // const height = aa.getBoundingClientRect().height;
      const height = renderer.domElement.getBoundingClientRect().height;
  		camera.aspect = window.innerWidth / height;
  		camera.updateProjectionMatrix();

  		renderer.setSize( window.innerWidth, height );
      root.composer.setSize( window.innerWidth, height );
  	}
}




// decorator
export function addVolume({item, volumeW=1, volumeH=1, volumeD=1}) {
  
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
// note you need a promise if you need to edit this on loaders
// .then(gg=>{gg.fish()})
export async function loadModel(root, scene, { cache, name="", url="", resetPositions=true } = {}) {

  var result = await new GLTFLoader().loadAsync(url);
  
  let model1 = result.scene;
  debugger
  
  // needs a scene grapth instead 
  let yy = new BaseModel(model1, resetPositions);
  cache.add(yy);
  yy.position.set(0,0,0)
  
  // result.scene.scale.setScalar(0.2)
  // result.scene.position.setScalar(0,0,0);
  scene.add(yy);
  return yy;
  // enableShadowsObject(tacocar1);
  // addVolume({item: tacocar1, volumeW:7, volumeH:6, volumeD:4})
}




export function addBlenderCameraControls(root, camera) {
    // const front = new Euler(0,0,-1);
    const forward = new Vector3(0,0,-1);
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
      if (event.key === "1") {
        console.log("front camera");
        // const dis = camera.position.distanceTo(zero);
        // root.orbitControl.enabled = false;
        // camera.lookAt(forward);
        // camera.updateMatrix()
      }

      
      // do something
    });
    
}
