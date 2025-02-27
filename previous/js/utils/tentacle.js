

import { CheapPool } from './cheapPool.js';
import { Stick } from './stick.js';
import { Object3D } from 'three';

import { sphere } from '@builders';


// needs an interface
// joints : []
// update : ()

export class Tentacle extends Object3D{
  joints = new CheapPool();
  sticks = new CheapPool();
  constructor({jointRadius=0.4, stickRadius=0.4}={}){
    super();
    this.addJoint([0,0,0], jointRadius, stickRadius);
    // this.stickRadius = stickRadius;
  }
  // @pos : T : array [0,2,1]
  addJoint(pos, jointRadius, stickRadius=1){
    let aa = sphere(pos);
    this.add(aa);
    aa.position.fromArray(pos);
    aa.scale.setScalar(jointRadius);
    aa.geometry.computeBoundingBox();
    aa.geometry.computeBoundingSphere();
    this.joints.add(aa);
    
    if(this.joints.length > 1){
      let bb = new Stick({radius:stickRadius});
      this.add(bb);
      this.sticks.add(bb);
      bb.driver0 = this.joints[this.joints.length-2];
      bb.driver1 = this.joints[this.joints.length-1];
      
    }
    
    this.update();
    
  }
  
  update(){
    for (var i = 0; i < this.sticks.length; i++) {
      this.sticks[i].update();
    }
  }
}
