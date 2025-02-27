
// import { CheapPool } from '../cheapPool.js';
import { SpringTypeCoil } from './springs.js';
import { DriverBase } from './driverBase.js';

import { Vector3 } from 'three';

// not sure the logics of this vs Tentacle
// holds a cache of joints and physics them!!
// would rely on an Interface then effectively like kinda
export class ChainModel extends DriverBase{
  
  constructor(props){
    super(props);
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
  
  update(){
    if (!this.pointer) {
      console.warn("missing pointer object");
      return;
    }
    // console.log("¿¿¿");
    // mouse drag controls the first or so
    this.springs[0].position.copy(this.pointer.joints[0].position);
    // skip first
    for (var i = 1; i < this.springs.length; i++) {
      //   s2.update(s1.x, s1.y);
      // s2.display(s1.x, s1.y);
      this.springs[i].update(this.springs[i-1].position);
      
      // display
      this.pointer.joints[i].position.copy(this.springs[i].position);
    }
    this.pointer.update();

    
  }
  
}
