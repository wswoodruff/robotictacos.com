
// see https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_terrain.html#L126
// for perlin notes

import { PointLight, BufferAttribute,
  PointsMaterial, Points, BufferGeometry,
  ShaderMaterial,
  Vector2, Clock, BackSide, Vector3 } from 'three';



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

import { OnScreenLogger } from "superneatlib";


import { ModelLoaderObject3D } from 'superneatlib';

const modelurl = new URL('@models_shared/bot1.glb', import.meta.url).href;

// const modelurl2 = new URL('./bot2.glb', import.meta.url).href;



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
  const perlinPlane = Primitives.plane({widthSegments:10, heightSegments:10,
   store:_o, scale: 10, color: 0xaffaff});
    SuperObject3D.decoSuper3D(perlinPlane);

  perlinPlane.material.wireframe = true;
  perlinPlane.position.set(0,0.1,0);
  // perlinPlane.scale.setScalar(0.2);
  perlinPlane.scale.setScalar(14);
  SuperObject3D.decoSuper3D(perlinPlane);
  _o.addObject3D(perlinPlane);
  // perlinPlane.material.color.setHex(0x111111)
  // perlinPlane.material = new MeshStandardMaterial( { color: 0xffaaaa } );
  
  perlinPlane.add( new AxisHelperWithLetters({store:store, size:1, letterSize:0.2}) );




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
      const ny = perlin.noise(x*scalar,z*scalar,0);

      positionAttribute.setXYZ(i, x, ny*height, z);
  }
    // Mark the position attribute as needing an update
  positionAttribute.needsUpdate = true;




    // hoverboard.updateMatrix();
    // hoverboard.updateWorldMatrix();
    // perlinPlane.updateWorldMatrix();
    // perlinPlane.updateMatrix();
  


  perlinPlane.update = function (delta, elapsedTime) {

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
hoverboard.update = function (dt, et) {

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










  const _driver = new Driver({store:store, object: hoverboard, 
  	friction: 0, 
    // damping: 0.80502, 
    damping: 0.80502, 
    // speed: 0.006, 
    speed: 0.03, 
    tilt: Math.PI*2*0.5,
  	allowTilt: true,
  	allowTurning: false })
    console.log("dijdiojsod2222")

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

    // model.checkMeshes();

    // if(_o.selectorMesh){
    //   _o.selectorMesh.visible = false;
    // }







}

// init();
