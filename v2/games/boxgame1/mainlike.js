
import { PointLight, BufferAttribute,
  PointsMaterial, Points, BufferGeometry,
  ShaderMaterial,
  Vector2, Clock, BackSide, Vector3 } from 'three';



import { MeshBasicMaterial, FrontSide, WireframeGeometry, EdgesGeometry, LineBasicMaterial,  LineSegments } from 'three';


import { setupPlaneHelper, setupGridHelper,
  addResizeWindow, Primitives, Lights, init3d,
  setupOrbitController, setupGameLoopWithFPSClamp,
  SuperObject3D,
  setupFirstPersonControls, setupFlyControls } from 'superneatlib';
// import {CheapPool} from './superneatlib.js';

// need to know how references
import { APP as _o } from "superneatlib";

const clock = new Clock();


import { ModelLoaderObject3D } from 'superneatlib';

const modelurl = new URL('@models_shared/bot1.glb', import.meta.url).href;
const modelurl2 = new URL('./bot2.glb', import.meta.url).href;



export async function init() {

  const store = _o;

  init3d(_o);
  // setupOrbitController(_o);
  // setupFirstPersonControls(_o, {movementSpeed:0.4, lookSpeed:0.2, dragToLook: true});
  
  setupFlyControls(_o, {movementSpeed:0.4, rollSpeed:0.4, dragToLook: true, autoForward: false});

  setupGameLoopWithFPSClamp(_o);

  addResizeWindow(_o);

  setupPlaneHelper(_o);
  // setupGridHelper({store:_o, type:"y"});

  const scene = _o.scene;
  const camera = _o.camera;
  const renderer = _o.renderer;


  const pointLight = new PointLight(0xffffff, 2, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  Lights.hemisphereLight(_o.scene);

  camera.position.z = 0.5;
  camera.position.y = 0.5;

  const ball = Primitives.ball({store:_o, scale: 0.1, color: 0x00ffff});
  ball.position.set(0,0,0);
  ball.scale.setScalar(0.4);
  SuperObject3D.decoSuper3D(ball);
  _o.addObject3D(ball);
  ball.material.color.setHex(0x111111)
  // ball.scale.setScalar(0.2);
  // ball.visible = false;
  ball.renderOrder = 0;
  ball.material.opacity = 0.9;
  ball.material.transparent = true;
  // ball.material.depthTest = false;


  const ball2 = Primitives.ball({store:_o, scale: 0.1, color: 0x00ffff});
  ball2.position.set(0,0,0);
  ball2.scale.setScalar(1);
  SuperObject3D.decoSuper3D(ball2);
  _o.addObject3D(ball2);
  ball2.renderOrder = 1;
  ball2.material.depthTest = false;
  ball.add(ball2);
  // ball2.material.wireframe = true;

  ball.scale.setScalar(2)
  ball.position.set(0,-2,0)


  ball2.material = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      side: FrontSide // Enables back-face culling
  });

  // ball.material.wireframe = true;
  // ball.material.side = FrontSide;

  camera.position.set(0,0.05,0)
  camera.position.set(0,0.2,0.9)

  store.currentControls.enabled = false;



  let isShiftDown = false;
  document.addEventListener('keydown', (event) => {
      // if (isScrolling) return;
      // console.log(event.key, event.shiftKey)

      if (event.shiftKey) {
        isShiftDown = true;
        store.currentControls.enabled = true;
      }
  });

  document.addEventListener('keyup', (event) => {
      // if (isScrolling) return;
      // console.log(event.key, event.shiftKey)

      if (isShiftDown && !event.shiftKey) {
        isShiftDown = false;
        store.currentControls.enabled = false;
      }
  });







  ball.controls = {
    dir : new Vector3(),
    isMoving : false,
    speed : 0.06
  };
  ball.update = function() {
    if(ball.controls.isMoving){
      ball.rotation.x += ball.controls.dir.x * ball.controls.speed;
      ball.rotation.y += ball.controls.dir.y * ball.controls.speed;
    }
  }


  document.addEventListener('keydown', (event) => {
      // if (isScrolling) return;
      // console.log(event.key, event.shiftKey)

      if(event.key === "ArrowUp"){
        // ball.rotation.x += 0.1;
        ball.controls.isMoving = true;
        ball.controls.dir.x = 1;
      }
      if(event.key === "ArrowDown"){
        // ball.rotation.x += 0.1;
        ball.controls.isMoving = true;
        ball.controls.dir.x = -1;
      }
      if(event.key === "ArrowLeft"){
        // ball.rotation.x += 0.1;
        ball.controls.isMoving = true;
        ball.controls.dir.y = 1;
      }
      if(event.key === "ArrowRight"){
        // ball.rotation.x += 0.1;
        ball.controls.isMoving = true;
        ball.controls.dir.y = -1;
      }

  });
  document.addEventListener('keyup', (event) => {
      // if (isScrolling) return;
      // console.log(event.key, event.shiftKey)


      let arrowKeyCount = 4;
      if(event.key === "ArrowUp"){
        arrowKeyCount--;
        ball.controls.dir.x = 0;
      }
      if(event.key === "ArrowDown"){
        // ball.rotation.x += 0.1;
        arrowKeyCount--;
        ball.controls.dir.x = 0;
      }
      if(event.key === "ArrowLeft"){
        // ball.rotation.x += 0.1;
        arrowKeyCount--;
        ball.controls.dir.y = 0;
      }
      if(event.key === "ArrowRight"){
        // ball.rotation.x += 0.1;
        arrowKeyCount--;
        ball.controls.dir.y = 0;
      }
      if(arrowKeyCount <= 0){
        ball.controls.isMoving = true;
      }

      
  });






    const model = new ModelLoaderObject3D(modelurl);
    // const model = new TenniShoe(mmodelurl);
    await model.init(_o);
    model.scaleTo(.5)
    model.playAnimations()

    model.checkMeshes();

    // debugger

    // const botbase = model.getObjectByName("botbase");
    // const botwire = model.getObjectByName("botwire");
    // if(botbase && botwire){
    //   botwire.material = botwire.material.clone();
    //   botwire.material.wireframe = true;
    //   botbase.visible = false;
    // }

//     for (let i = 0; i < model.meshes.length; i++) {
//       const item = model.meshes[i];
//       // console.log("item", item.name, item.material.transparent, item.material.opacity);
//       // item.material.transparent = true;
//       // item.material.wireframe = true;
//       // item.material.color.setHex(0x000000)
//       // item.material.opacity = val;
// //       const mesh = item;
// // const geo = new EdgesGeometry( mesh.geometry ); // or WireframeGeometry
// // const mat = new LineBasicMaterial( { color: 0xffffff } );
// // const wireframe = new LineSegments( geo, mat );
// // mesh.add( wireframe );

//         if (item.isSkinnedMesh) {
//           const geo = new WireframeGeometry(item.geometry.clone()); // Clone to avoid skinning issues
//           const mat = new LineBasicMaterial({ color: 0xffffff });
//           const wireframe = new LineSegments(geo, mat);
          
//           geo.attributes.position.needsUpdate = true;
//           item.add(wireframe);

//           // Update wireframe to follow animation
//           // function updateWireframe() {
//           //   geo.copy(item.geometry);
//           //   // requestAnimationFrame(updateWireframe);
//           // }

//           // updateWireframe(); // Start updating wireframe

//         }

//     }

    // model.mixer.stopAllAction();

// debugger
    // AvatarType(model);

    // just tweak the position a bit
    // model.children[0].position.y += 1;
    // store.scene.add(model);
    // store.sceneGrapth.add(model);
    _o.addObject3D(model);
    if(_o.selectorMesh){
      _o.selectorMesh.visible = false;
    }

return


// this stuff was just cheap stars effect but expenssive to run



  //
  //
  //

  // const vert = `
  //   uniform float time;
  //   uniform vec2 resolution;
  //   void main()	{
  //       gl_Position = vec4( position, 1.0 );
  //   }
  // `;

  // const vert = `
  //   uniform float time;
  //   varying vec3 vPosition;
  //
  //   void main() {
  //     vPosition = position; // Pass vertex position to fragment shader
  //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //   }
  // `;
  // const frag = `
  //   uniform float time;
  //   uniform vec2 resolution;
  //   void main()	{
  //       float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
  //       float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
  //       gl_FragColor = vec4(vec3(min(x, y)), 1.);
  //   }
  // `;

  const vert = `
    varying vec2 vUv; // Pass UV coordinates to fragment shader
    // uniform float uv_scale;
    uniform vec2 uv_scale;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vPosition = position;

      vUv = uv * uv_scale; // Assign built-in UV coordinates
      vNormal = -normal; // Flip normals inward
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // const frag = `
  //   uniform float time;
  //   varying vec2 vUv; // Receive UV coordinates
  //
  //   void main() {
  //     float x = mod(time + vUv.x * 20.0, 20.) < 10. ? 1. : 0.;
  //     float y = mod(time + vUv.y * 20.0, 20.) < 10. ? 1. : 0.;
  //
  //     gl_FragColor = vec4(vec3(min(x, y)), 1.0);
  //   }
  // `;

  const frag = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec4 bg_color;

  varying vec2 vUv; // Receive UV coordinates
  varying vec3 vPosition;

  // out vec4 fragColor;

  float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
      float size = 0.01;  // Adjust star density
      float prob = 10.9;

      vec3 worldPos = vPosition;  // 3D world position
      vec2 pos = floor(worldPos.xy * size); // Star grid based on world position
      float color = 0.0;
      float starValue = pos.x;

      if (starValue > prob) {
          vec2 center = pos / size + 0.5;
          float t = 0.9 + 0.2 * sin(u_time * 8.0 + (starValue - prob) / (1.0 - prob) * 45.0);
          color = 1.0 - distance(worldPos.xy, center) / (0.5 / size);
          color *= t / (abs(worldPos.y - center.y) + 0.01);
          color *= t / (abs(worldPos.x - center.x) + 0.01);
      }
      else if (rand(vUv * 0.05) > 0.996) {
          float r = vUv.x / vUv.y;
          color = r * (0.85 * sin(u_time * (r * 5.0) + 720.0 * r) + 0.95);
      }

      gl_FragColor = vec4(vec3(color), 1.0) + bg_color;
  }
  `;

  const scalar = 10.2;
  const unis = {
    u_time: { value: 1.0 },
    // uv_scale: { value: 100.0 },
    u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },

    uv_scale: { value: new Vector2(200.0,100.0).multiplyScalar(scalar) },
    resolution: { value: new Vector2() }
  };
  const altmaterial = new ShaderMaterial( {

  	uniforms: unis,

  	vertexShader: vert,
  	fragmentShader: frag,
    side: BackSide, // Render the inside of the object


  } );

  ball.material = altmaterial;
  // mesh.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

  ball.update = function (dt) {
    // console.log("?????¿¿¿¿");
    // console.log(dt);
    // const dtt = ( Math.sin(clock.getElapsedTime()) * 0.5 + 0.5) * 12.0;
    // console.log( dtt );
    ball.material.uniforms.u_time.value += 0.1;
    // ball.material.uniforms.uv_scale.value = dtt;

  }







}

// init();
