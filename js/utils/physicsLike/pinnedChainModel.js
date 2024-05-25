import { CheapPool } from '../cheapPool.js';
import { SpringTypeCoil } from './springs.js';
import { DriverBase } from './driverBase.js';

import { Vector3 } from 'three';


// this one DOES not factor the most strecthed out as the 
// central attractor

const dir = new Vector3();
const dir2 = new Vector3();
const clampPoint = new Vector3();

export class PinnedChainModel extends DriverBase{
  
  pinnedJoints = new CheapPool();
  draggingJoints = new CheapPool();
  targetJoint = null;
  
  // one per joints pair
  // rest lengths
  initalLengths = new CheapPool();
  
  constructor(props){
    super(props);
    for (var i = 0; i < this.pointer.joints.length-1; i++) {
      this.initalLengths.add( this.pointer.joints[i].position.distanceTo(this.pointer.joints[i+1].position) );
      console.log(this.initalLengths[i]);
    }
  }
  
  addSpring(positionA=[0,0,0]){
    this.springs.add( new SpringTypeCoil({
      positionA:positionA, 
      gravityA:[0,this.gravity,0],
      mass: this.mass,
      stiffness: this.stiffness,
      damping: this.damping
     }) );
  }
  
  addPinned(joint){
    this.pinnedJoints.add(joint);
  }
  
  addDragging(item){
    if ( ! this.draggingJoints.includes(item) ) {
      this.draggingJoints.add(item);
    }
  }
  
  removeDragging(item){
    this.draggingJoints.remove(item);
  }
  
  setTargetJoint(item){
    this.targetJoint = item;
  }
  
  update(){
    if (!this.pointer) {
      console.warn("missing pointer object");
      return;
    }
    // console.log("¿¿¿");
    // mouse drag controls the first or so
    
    
    // see top note
    // we still need to calc from the top goiung down
    
    // WElllll the first has to go somewhere so lets try moving it TOWARDS
    // the next but the next will be pulling towards the first, derp...
    // debugger
    // 
    // if( ! this.pinnedJoints.includes(this.pointer.joints[0]) && 
    //     ! this.draggingJoints.includes(this.pointer.joints[0]) ){
    //   // debugger
    //   this.springs[0].update(this.springs[1].position);
    //   this.pointer.joints[0].position.copy(this.springs[0].position);
    // }
    // else{
    //   this.springs[0].position.copy(this.pointer.joints[0].position);
    //   this.springs[0].velocity.setScalar(0);
    // }
    // 
    // // skip first
    // for (var i = 1; i < this.springs.length; i++) {
    //   if( ! this.pinnedJoints.includes(this.pointer.joints[i]) &&
    //       ! this.draggingJoints.includes(this.pointer.joints[i]) ){
    //     this.springs[i].update(this.springs[i-1].position);
    //     this.pointer.joints[i].position.copy(this.springs[i].position);
    //   }
    //   else {
    //     this.springs[i].position.copy(this.pointer.joints[i].position);
    //     this.springs[i].velocity.setScalar(0);
    //   }
    // }
    
    
    // try 2!!
    // in this, theres always a "target" source of attractor to
    // starting with the first
    // once selected it just retains
    const index = this.pointer.joints.indexOf(this.targetJoint);
    if (index === -1) {
      // just assign the top if none ideally
      this.targetJoint = this.pointer.joints[0];
    }
    if(index > -1){
      
      this.springs[index].position.copy(this.pointer.joints[index].position);
      this.springs[index].velocity.setScalar(0);
    }

    
    
    // forwards
    for (var i = index+1; i < this.springs.length; i++) {
      // console.log(arr[i]);
      if( ! this.pinnedJoints.includes(this.pointer.joints[i]) &&
          ! this.draggingJoints.includes(this.pointer.joints[i]) ) {
          
          // this is not correct but its a stop gap
          // we get the clamped limit of the distances between the joints
          // and hard assign if below, this removes
          // a damping ease bounce however
          const cur = this.springs[i];
          const pre = this.springs[i-1];
          dir.copy(cur.position).sub(pre.position);
          clampPoint.copy(dir).normalize().multiplyScalar(this.initalLengths[i-1]).add(pre.position);
          
          // MIGHT, need to clone the valuse of spring to copy back from
          // due to this hard copy clamp, need to test
          cur.update(pre.position);
          dir2.copy(cur.position).sub(pre.position);
          const dis = dir2.length();
          if(dis <= this.initalLengths[i-1]){
            cur.position.copy(clampPoint);
            cur.velocity.setScalar(0);
          }
          
          this.pointer.joints[i].position.copy(this.springs[i].position);
          
      }
      else {
        // assume we are dragging it or its pinned
        // it just copies the position
        this.springs[i].position.copy(this.pointer.joints[i].position);
        this.springs[i].velocity.setScalar(0);
      }
    }
    
    
    // backwards
    // for (var i = index+1; i < this.springs.length; i++) {
    for (var i = index-1; i > -1; i--) {
      // console.log(arr[i]);
      if( ! this.pinnedJoints.includes(this.pointer.joints[i]) &&
          ! this.draggingJoints.includes(this.pointer.joints[i]) ) {
          
          // this.springs[i].update(this.springs[i+1].position);
          // this.pointer.joints[i].position.copy(this.springs[i].position);
          
          
          // this is not correct but its a stop gap
          // we get the clamped limit of the distances between the joints
          // and hard assign if below, this removes
          // a damping ease bounce however
          const cur = this.springs[i];
          const pre = this.springs[i+1];
          dir.copy(cur.position).sub(pre.position);
          clampPoint.copy(dir).normalize().multiplyScalar(this.initalLengths[i+1]).add(pre.position);
          
          // MIGHT, need to clone the valuse of spring to copy back from
          // due to this hard copy clamp, need to test
          cur.update(pre.position);
          dir2.copy(cur.position).sub(pre.position);
          const dis = dir2.length();
          if(dis <= this.initalLengths[i+1]){
            cur.position.copy(clampPoint);
            cur.velocity.setScalar(0);
          }
          
          this.pointer.joints[i].position.copy(this.springs[i].position);
          
          
      }
      else {
        // assume we are dragging it or its pinned
        this.springs[i].position.copy(this.pointer.joints[i].position);
        this.springs[i].velocity.setScalar(0);
      }
    }
    

    this.pointer.update();

    
  }
  
    
}
