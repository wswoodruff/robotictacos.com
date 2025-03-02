
import { PointLight, BufferAttribute,
  PointsMaterial, Points, BufferGeometry,
  ShaderMaterial,
  Vector2, Clock, BackSide, Vector3 } from 'three';



import { MeshStandardMaterial, MeshBasicMaterial, FrontSide, WireframeGeometry, EdgesGeometry, LineBasicMaterial,  LineSegments } from 'three';


import { setupPlaneHelper, setupGridHelper,
  addResizeWindow, Primitives, Lights, init3d,
  setupOrbitController, setupGameLoopWithFPSClamp,
  SuperObject3D,
  setupFirstPersonControls, setupFlyControls } from 'superneatlib';
// import {CheapPool} from './superneatlib.js';

// need to know how references
import { APP as _o } from "superneatlib";

const clock = new Clock();

import { Driver } from "@promotetosuper/driver.js";
import { AxisHelperWithLetters } from "superneatlib";

import { OnScreenLogger } from "superneatlib";


export async function init() {

  const store = _o;

  init3d(_o);
  setupOrbitController(_o);
  // setupFirstPersonControls(_o, {movementSpeed:0.4, lookSpeed:0.2, dragToLook: true});
  
  // setupFlyControls(_o, {movementSpeed:0.4, rollSpeed:0.4, dragToLook: true, autoForward: false});

  setupGameLoopWithFPSClamp(_o);

  addResizeWindow(_o);

  setupPlaneHelper(_o);
  setupGridHelper({store:_o, type:"y"});

  const scene = _o.scene;
  const camera = _o.camera;
  const renderer = _o.renderer;


  const pointLight = new PointLight(0xffffff, 2, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  Lights.hemisphereLight(_o.scene);

  camera.position.z = 0.5;
  camera.position.y = 0.5;





  const cube = Primitives.cubey({store:_o, scale: 0.1, color: 0x00ffff});
  cube.position.set(0,0.1,0);
  cube.scale.setScalar(0.2);
  SuperObject3D.decoSuper3D(cube);
  _o.addObject3D(cube);
  // cube.material.color.setHex(0x111111)
  cube.material = new MeshStandardMaterial( { color: 0xffaa22 } );
  
  cube.add( new AxisHelperWithLetters({store:store, size:1, letterSize:0.2}) );

  const _driver = new Driver({store:store, object: cube, 
  	friction: 0, damping: 0.82002, speed: 0.007,
  	allowTilt: true,
  	allowTurning: false })
  console.log("dijdiojsod2222")

  // setTimeout( ()=> { OnScreenLogger.onConsole("fish") }, 100)
  window.cubey = cube;
  





					  // const ball = Primitives.ball({store:_o, scale: 0.1, color: 0x00ffff});
					  // ball.position.set(0,0,0);
					  // ball.scale.setScalar(0.4);
					  // SuperObject3D.decoSuper3D(ball);
					  // _o.addObject3D(ball);
					  // ball.material.color.setHex(0x111111)
					  // // ball.scale.setScalar(0.2);
					  // // ball.visible = false;
					  // ball.renderOrder = 0;
					  // ball.material.opacity = 0.9;
					  // ball.material.transparent = true;
					  // // ball.material.depthTest = false;


					  // const ball2 = Primitives.ball({store:_o, scale: 0.1, color: 0x00ffff});
					  // ball2.position.set(0,0,0);
					  // ball2.scale.setScalar(1);
					  // SuperObject3D.decoSuper3D(ball2);
					  // _o.addObject3D(ball2);
					  // ball2.renderOrder = 1;
					  // ball2.material.depthTest = false;
					  // ball.add(ball2);
					  // // ball2.material.wireframe = true;

					  // ball.scale.setScalar(2)
					  // ball.position.set(0,-2,0)


					  // ball2.material = new MeshBasicMaterial({
					  //     color: 0xffffff,
					  //     wireframe: true,
					  //     side: FrontSide // Enables back-face culling
					  // });

  // ball.material.wireframe = true;
  // ball.material.side = FrontSide;

  camera.position.set(0,0.05,0)

  camera.position.set(0,0.6,0.5)

  // store.currentControls.enabled = false;



  // let isShiftDown = false;
  // document.addEventListener('keydown', (event) => {
  //     // if (isScrolling) return;
  //     // console.log(event.key, event.shiftKey)

  //     if (event.shiftKey) {
  //       isShiftDown = true;
  //       store.currentControls.enabled = true;
  //     }
  // });

  // document.addEventListener('keyup', (event) => {
  //     // if (isScrolling) return;
  //     // console.log(event.key, event.shiftKey)

  //     if (isShiftDown && !event.shiftKey) {
  //       isShiftDown = false;
  //       store.currentControls.enabled = false;
  //     }
  // });







  // ball.controls = {
  //   dir : new Vector3(),
  //   isMoving : false,
  //   speed : 0.06
  // };
  // ball.update = function() {
  //   if(ball.controls.isMoving){
  //     ball.rotation.x += ball.controls.dir.x * ball.controls.speed;
  //     ball.rotation.y += ball.controls.dir.y * ball.controls.speed;
  //   }
  // }


  // document.addEventListener('keydown', (event) => {
  //     // if (isScrolling) return;
  //     // console.log(event.key, event.shiftKey)

  //     if(event.key === "ArrowUp"){
  //       // ball.rotation.x += 0.1;
  //       ball.controls.isMoving = true;
  //       ball.controls.dir.x = 1;
  //     }
  //     if(event.key === "ArrowDown"){
  //       // ball.rotation.x += 0.1;
  //       ball.controls.isMoving = true;
  //       ball.controls.dir.x = -1;
  //     }
  //     if(event.key === "ArrowLeft"){
  //       // ball.rotation.x += 0.1;
  //       ball.controls.isMoving = true;
  //       ball.controls.dir.y = 1;
  //     }
  //     if(event.key === "ArrowRight"){
  //       // ball.rotation.x += 0.1;
  //       ball.controls.isMoving = true;
  //       ball.controls.dir.y = -1;
  //     }

  // });
  // document.addEventListener('keyup', (event) => {
  //     // if (isScrolling) return;
  //     // console.log(event.key, event.shiftKey)


  //     let arrowKeyCount = 4;
  //     if(event.key === "ArrowUp"){
  //       arrowKeyCount--;
  //       ball.controls.dir.x = 0;
  //     }
  //     if(event.key === "ArrowDown"){
  //       // ball.rotation.x += 0.1;
  //       arrowKeyCount--;
  //       ball.controls.dir.x = 0;
  //     }
  //     if(event.key === "ArrowLeft"){
  //       // ball.rotation.x += 0.1;
  //       arrowKeyCount--;
  //       ball.controls.dir.y = 0;
  //     }
  //     if(event.key === "ArrowRight"){
  //       // ball.rotation.x += 0.1;
  //       arrowKeyCount--;
  //       ball.controls.dir.y = 0;
  //     }
  //     if(arrowKeyCount <= 0){
  //       ball.controls.isMoving = true;
  //     }

      
  // });





}

// init();
