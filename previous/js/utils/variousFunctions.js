
import { Vector3, Matrix4 } from 'three';

export function lerpBackgroundColor_CM(root,c1,c2,time) {
  const alpha = remapNormal(-1,1,Math.sin(time))
  // console.log("alpha", alpha);
  root.scene.background.lerpColors(c1,c2,alpha);
}



// https://stackoverflow.com/questions/29758233/three-js-check-if-object-is-still-in-view-of-the-camera
// item needs .box3
const viewVec = new Vector3();

export function testIfInView(root,item,modeX, modeY) {
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


// theres a better one on stackoverflow

export function crappyScreenWrapIn3D(root,item) {
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
  } else{
    item.wasInView = true;
  }
}
