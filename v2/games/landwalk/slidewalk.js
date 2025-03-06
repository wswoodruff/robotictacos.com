
// see https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_terrain.html#L126
// for perlin notes

import { PointLight, BufferAttribute,
  PointsMaterial, Points, BufferGeometry,
  ShaderMaterial, GLSL3,
  Vector2, Clock, BackSide, Vector3, Object3D, AmbientLight } from 'three';



import { MeshStandardMaterial, MeshBasicMaterial, FrontSide, WireframeGeometry, EdgesGeometry, LineBasicMaterial,  LineSegments } from 'three';

import { ImprovedNoise } from '/three/examples/jsm/math/ImprovedNoise.js';


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

// import { OnScreenLogger , onConsole} from "superneatlib";


import { ModelLoaderObject3D } from 'superneatlib';

const modelurl = new URL('@models_shared/bot1.glb', import.meta.url).href;

// const modelurl2 = new URL('./bot2.glb', import.meta.url).href;

import { gameData } from './gameData.js';

import vertShader from './shaders/vert.glsl?raw';
// import fragShader from './shaders/basicFrag.frag?raw';
import fragShader from './shaders/gridlines1.frag?raw';


export async function init() {

  const store = _o;

  init3d(_o);
  setupOrbitController(_o);
  // setupFirstPersonControls(_o, {movementSpeed:0.4, lookSpeed:0.2, dragToLook: true});
  
  // setupFlyControls(_o, {movementSpeed:0.4, rollSpeed:0.4, dragToLook: true, autoForward: false});

  setupGameLoopWithFPSClamp(_o);

  addResizeWindow(_o);

  // setupPlaneHelper(_o);
  const grid = setupGridHelper({store:_o, type:"y", divisions: 40, size: 4});
  grid.visible = false;

  const scene = _o.scene;
  const camera = _o.camera;
  const renderer = _o.renderer;


  const pointLight = new PointLight(0xffffff, 2, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  Lights.hemisphereLight(_o.scene);

  camera.position.set(1,2,3.5)

  // const light_amb = new AmbientLight( 0xffffff );
  // scene.add(light_amb)
  // light_amb.intensity = 12;

  const hoverboard = Primitives.plane({store:_o, scale: 1, color: 0xaffaff});

  hoverboard.position.set(0,0.1,0);
  // hoverboard.scale.setScalar(0.2);
  hoverboard.scale.setScalar(1);
  SuperObject3D.decoSuper3D(hoverboard);
  _o.addObject3D(hoverboard);
  // hoverboard.material.color.setHex(0x111111)
  // hoverboard.material = new MeshStandardMaterial( { color: 0xffaaaa } );
  
  hoverboard.add( new AxisHelperWithLetters({store:store, size:1, letterSize:0.2}) );





  // const size = width * height, data = new Uint8Array( size );
  const perlin = new ImprovedNoise();//, z = Math.random() * 100;



  // const perlinPlane = Primitives.plane({widthSegments:10, heightSegments:10,
  //  store:_o, scale: 1, color: 0xaffaff});
  const segs = 40;
  const perlinPlane = Primitives.plane({widthSegments:segs, heightSegments:segs,
   store:_o, scale: 10, color: 0xaffaff});
    SuperObject3D.decoSuper3D(perlinPlane);

  // perlinPlane.material.wireframe = true;
  // perlinPlane.material = new MeshStandardMaterial({color:0xaaaaaa})
  // perlinPlane.material.metalness = 0.7;
  // perlinPlane.material.roughness = 0;

// Create the shader material
// const vertexShader = vertShader;
// const fragmentShader = `
// varying vec2 vUv;
// uniform float time;
// void main() {
//     vec3 color = vec3(sin(vUv.x * 10.0 + time), cos(vUv.y * 10.0 + time), sin(time)); 
//     gl_FragColor = vec4(color, 1.0);
// }
// `;
// https://madebyevan.com/shaders/grid/
// License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
// const fragmentShader = `
// // License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
// #extension GL_OES_standard_derivatives : enable

// varying vec3 vertex;

// void main() {
//   // Pick a coordinate to visualize in a grid
//   float coord = vertex.y;

//   // Compute anti-aliased world-space grid lines
//   float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);

//   // Just visualize the grid lines directly
//   float color = 1.0 - min(line, 1.0);

//   // Apply gamma correction
//   color = pow(color, 1.0 / 2.2);
//   gl_FragColor = vec4(vec3(color), 1.0);
// }
// `;


  // perlinPlane.material = new ShaderMaterial({
  //     vertShader,
  //     fragmentShader,
  //     uniforms: {
  //         time: { value: 0.0 }
  //     },
  //     // glslVersion: GLSL3 // Explicitly set GLSL3
  // });
// const vv2 = `varying vec2 vUv;
// void main() {
//     vUv = uv; // Pass UV coordinates to fragment shader
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }`;
// const ff2 = `varying vec2 vUv;
// uniform float time;
// void main() {
//     vec3 color = vec3(sin(vUv.x * 10.0 + time), cos(vUv.y * 10.0 + time), sin(time)); 
//     gl_FragColor = vec4(color, 1.0);
// }`;
  perlinPlane.material = new ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
          time: { value: 0.0 }
      },
      glslVersion: GLSL3 // Explicitly set GLSL3
  });
  perlinPlane.material.transparent = true;




  perlinPlane.position.set(0,0.1,0);
  // perlinPlane.scale.setScalar(0.2);
  perlinPlane.scale.setScalar(14);
  SuperObject3D.decoSuper3D(perlinPlane);
  _o.addObject3D(perlinPlane);
  // perlinPlane.material.color.setHex(0x111111)
  // perlinPlane.material = new MeshStandardMaterial( { color: 0xffaaaa } );
  
  perlinPlane.add( new AxisHelperWithLetters({store:store, size:1, letterSize:0.2}) );




  // const positionAttribute = perlinPlane.geometry.getAttribute('position');
  // const scalar = 2.5;
  // const height = 0.2;

  // // Apply an offset (e.g., move all vertices by (1, 1, 1))
  // const offset = new Vector3(0, 0, 0);
  // for (let i = 0; i < positionAttribute.count; i++) {

  //     // const x = positionAttribute.getX(i) + offset.x;
  //     // const y = positionAttribute.getY(i) + offset.y + (Math.random()*2);
  //     // const z = positionAttribute.getZ(i) + offset.z;
  //     const x = positionAttribute.getX(i);
  //     const y = positionAttribute.getY(i);
  //     const z = positionAttribute.getZ(i);

  //     // const ny = noise(x,y,z);
  //     const ny = perlin.noise(x*scalar,z*scalar,0);

  //     positionAttribute.setXYZ(i, x, ny*height, z);
  // }
  //   // Mark the position attribute as needing an update
  // positionAttribute.needsUpdate = true;




    // hoverboard.updateMatrix();
    // hoverboard.updateWorldMatrix();
    // perlinPlane.updateWorldMatrix();
    // perlinPlane.updateMatrix();
  


  perlinPlane._____update = function (delta, elapsedTime) {

    // console.log("delta", delta);
    // console.log("elapsedTime", elapsedTime);
    const positionAttribute = perlinPlane.geometry.getAttribute('position');
    const scalar = 2.5;
    const height = 0.2;

  // Apply an offset (e.g., move all vertices by (1, 1, 1))
    const offset = new Vector3(0, 0, 0);
    for (let i = 0; i < positionAttribute.count; i++) {

        // const x = positionAttribute.getX(i) + offset.x;
        // const y = positionAttribute.getY(i) + offset.y + (Math.random()*2);
        // const z = positionAttribute.getZ(i) + offset.z;
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);

        // const ny = noise(x,y,z);
        const ny = perlin.noise(x*scalar+elapsedTime,z*scalar,0);

        positionAttribute.setXYZ(i, x, ny*height, z);
    }

    // Mark the position attribute as needing an update
    positionAttribute.needsUpdate = true;

  }

// expenssize but simplest form of y offset get on plane


  const pointball = Primitives.ball({scene:scene, scale: 1, color: 0xaffaff});

  pointball.position.set(0,0.1,0);
  pointball.scale.setScalar(0.1);
  
  SuperObject3D.decoSuper3D(pointball);
  _o.addObject3D(pointball);
  pointball.material.color.setHex(0x00ffaa)
  // pointball.material = new MeshStandardMaterial( { color: 0xffaaaa } );
  
  pointball.add( new AxisHelperWithLetters({store:store, size:1, letterSize:0.2}) );




const vv893284 = new Vector3();
const pick = new Vector3();
const hoverpos = new Vector3();

// ignore 
hoverboard.____update = function (dt, et) {

// hoverboard.position.y = Math.sin(et)

  // const pos = hoverboard.position;

    // hoverboard.updateMatrix();
    // hoverboard.updateWorldMatrix();
    // perlinPlane.updateWorldMatrix();
    // perlinPlane.updateMatrix();

  hoverpos.copy(hoverboard.position);

  let m_dis = 9999999999;

    const positionAttribute = perlinPlane.geometry.getAttribute('position');


    for (let i = 0; i < positionAttribute.count; i++) {

        // const x = positionAttribute.getX(i) + offset.x;
        // const y = positionAttribute.getY(i) + offset.y + (Math.random()*2);
        // const z = positionAttribute.getZ(i) + offset.z;
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        vv893284.set(x,y,z);
        perlinPlane.localToWorld(vv893284);
        
        const dis = hoverpos.distanceTo(vv893284);
        if(dis < m_dis){
          // debugger
          m_dis = dis;
          pick.copy(vv893284)
          // console.log("pick", pick.toArray())
        }

    }

    // hoverboard.position.copy(vv893284)

            // pawn.position.z += (vel.z - pawn.position.z) * damping;


    // hoverboard.position.y = pick.y;
    hoverboard.position.y += (pick.y - hoverboard.position.y) * 0.12;
    // pointball.position.copy(pick)
    pointball.position.x += (pick.x - pointball.position.x) * 0.12;
    pointball.position.y += (pick.y - pointball.position.y) * 0.12;
    pointball.position.z += (pick.z - pointball.position.z) * 0.12;
  
}


        // for ( let j = 0; j < 4; j ++ ) {

        //   for ( let i = 0; i < size; i ++ ) {

        //     const x = i % width, y = ~ ~ ( i / width );
        //     data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

        //   }

        //   quality *= 5;

        // }







  // model goes onto hoverboard
  // hoverboard does not move
  // model moves but is locked to a distance
  // to make a visual moving effect


    const _driver = new Driver({store:store, object: hoverboard, 
  	friction: 0, 
    // damping: 0.80502, 
    damping: 0.80502, 
    // speed: 0.006, 
    // speed: 0.03, 
    speed: 0.025, 
    tilt: -Math.PI*2*0.5,
  	allowTilt: true,
  	allowTurning: false })
    console.log("dijdiojsod2222")


    // this a typical idea in 3d game apps to use 
    // in game 3d objects for their update function
    // as an MVC controller
    const joystickBinder = new Object3D();
    scene.add(joystickBinder);
    _o.addObject3D(joystickBinder);
    // _driver.inverseAxis = true;
    joystickBinder.update = function() {
      // console.log("???¿¿¿");
      if(gameData.joystickController && gameData.joystickAxis){
        _driver.axis.copy(gameData.joystickAxis);
      }
    }



    // setTimeout( ()=> { OnScreenLogger.onConsole("fish") }, 100)
    // window.planey = plane;
  


    const model = new ModelLoaderObject3D(modelurl);
    // const model = new TenniShoe(mmodelurl);
    await model.init(store);
    model.scaleTo(1.5)
    model.playAnimations()
    _o.addObject3D(model);
    hoverboard.add(model)
    model.setColorAll(0xff00ff)
    hoverboard.position.y = 2;
    // model.checkMeshes();

    // if(_o.selectorMesh){
    //   _o.selectorMesh.visible = false;
    // }

    window.hoverboard = hoverboard;


    const proxxyPos = new Vector3().copy(hoverboard.position);


    // this clamps the distance to the space
    // need a if no keys down then return to 0,0,0
    hoverboard.update = function() {


      const limdis = 1;
      const damping = 0.2;

      proxxyPos.add(_driver.velocity);
          // pointball.position.copy(proxxyPos)


      // this clamps the distance to the space
      if(hoverboard.position.z > limdis){
        // // hoverboard.position.z = limdis;
        hoverboard.position.z += (limdis - hoverboard.position.z) * damping;
      }
      else if(hoverboard.position.z < -limdis){
        hoverboard.position.z += (-limdis - hoverboard.position.z) * damping;
      }
      if(hoverboard.position.x > limdis){
        hoverboard.position.x += (limdis - hoverboard.position.x) * damping;
      }
      else if(hoverboard.position.x < -limdis){
        hoverboard.position.x += (-limdis - hoverboard.position.x) * damping;
      }
      if(hoverboard.position.y > limdis){
        hoverboard.position.y += (limdis - hoverboard.position.y) * damping;
      }
      else if(hoverboard.position.y < -limdis){
        hoverboard.position.y += (-limdis - hoverboard.position.y) * damping;
      }
      
      // this pulls it back to center
              hoverboard.position.x += -hoverboard.position.x * damping/2;
              // hoverboard.position.y += -hoverboard.position.y * damping/2;
              hoverboard.position.z += -hoverboard.position.z * damping/2;

      // onConsole("vel", _driver.velocity.toArray())


      // shoe horning this in
      // move the perlinplane from the velocity`


    }


function smoothstep(edge0, edge1, x) {
    // Scale, and clamp x to 0 - 1 range
    let t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    // Smooth interpolation
    return t * t * (3 - 2 * t);
}

    perlinPlane.update = function (delta, elapsedTime) {

      // console.log("delta", delta);
      // console.log("elapsedTime", elapsedTime);
      const positionAttribute = perlinPlane.geometry.getAttribute('position');
      // const scalar = 2.5;
      const scalar = 0.8;
      const height = 0.1;

    // Apply an offset (e.g., move all vertices by (1, 1, 1))
      const offset = new Vector3(0, 0, 0);
      for (let i = 0; i < positionAttribute.count; i++) {

          // const x = positionAttribute.getX(i) + offset.x;
          // const y = positionAttribute.getY(i) + offset.y + (Math.random()*2);
          // const z = positionAttribute.getZ(i) + offset.z;
          const x = positionAttribute.getX(i);
          const y = positionAttribute.getY(i);
          const z = positionAttribute.getZ(i);

          // const ny = noise(x,y,z);
          // const ny = perlin.noise(x*scalar+elapsedTime,z*scalar,0);


          // const x2 = (x*4) + (elapsedTime* 0.5) * (_driver.velocity.x * 92.4);
          const x2 = (x*5) + (proxxyPos.x * 0.2);
          const y2 = (z*5) + (proxxyPos.z * 0.2);
          // const x2 = (x*4) +   (_driver.velocity.x * 92.4);
          // const y2 = z*4;

          // const x2 = x+(proxxyPos.x*scalar);
          // const y2 = z+(proxxyPos.z*scalar);

          // const x2 = x + (proxxyPos.x * 0.24) * 12;
          // const y2 = z + (proxxyPos.z * 0.24) * 12;

          // const ny = perlin.noise(x2,y2,0);
          let ny = perlin.noise(x2,y2,0);
          ny = smoothstep(0.1,0.4,ny)

          positionAttribute.setXYZ(i, x, ny*height, z);
      }

      // Mark the position attribute as needing an update
      positionAttribute.needsUpdate = true;

      hoverboardStick(delta, elapsedTime)

    }




// this hunts for nearest point on wave

function hoverboardStick (dt, et) {

// hoverboard.position.y = Math.sin(et)

  // const pos = hoverboard.position;

    // hoverboard.updateMatrix();
    // hoverboard.updateWorldMatrix();
    // perlinPlane.updateWorldMatrix();
    // perlinPlane.updateMatrix();

  hoverpos.copy(hoverboard.position);
  hoverboard.material.transparent = true;
  hoverboard.material.opacity = 0;


  let m_dis = 9999999999;

    const positionAttribute = perlinPlane.geometry.getAttribute('position');


    for (let i = 0; i < positionAttribute.count; i++) {

        // const x = positionAttribute.getX(i) + offset.x;
        // const y = positionAttribute.getY(i) + offset.y + (Math.random()*2);
        // const z = positionAttribute.getZ(i) + offset.z;
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        vv893284.set(x,y,z);
        perlinPlane.localToWorld(vv893284);
        
        const dis = hoverpos.distanceTo(vv893284);
        if(dis < m_dis){
          // debugger
          m_dis = dis;
          pick.copy(vv893284)
          // console.log("pick", pick.toArray())
        }

    }

    // hoverboard.position.copy(vv893284)

            // pawn.position.z += (vel.z - pawn.position.z) * damping;


    // hoverboard.position.y = pick.y;
    hoverboard.position.y += (pick.y - hoverboard.position.y) * 0.12;

    // hoverboard.position.y = Math.sin(et * 42 *  _driver.velocity.z) * 0.5 ;

    // pointball.position.copy(pick)
    pointball.position.x += (pick.x - pointball.position.x) * 0.12;
    pointball.position.y += (pick.y - pointball.position.y) * 0.12;
    pointball.position.z += (pick.z - pointball.position.z) * 0.12;
  
}





}

// init();
