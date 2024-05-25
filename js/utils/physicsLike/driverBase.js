
import { CheapPool } from '../cheapPool.js';
import { Vector3 } from 'three';
// import { SpringTypeCoil } from './springs.js';

// for a chain of joints
export class DriverBase{
  
  pointer = null; // Tentacle or so
  gravity = 0.8;
  mass = 2.0;
  
  springs = new CheapPool();
  
  // @pointer is tentacle?
  constructor(props){
    const {
      pointer=null, 
      autoBuild = true, 
      gravity = -0.8, 
      mass = 2.0, 
      stiffness = 0.2, 
      damping = 0.4950
    } = props;
    this.pointer = pointer;
    this.gravity = gravity;
    this.mass = mass;
    this.stiffness = stiffness;
    this.damping = damping;
    if(autoBuild && pointer){
      // debugger
      for (var i = 0; i < this.pointer.joints.length; i++) {
        this.addSpring(this.pointer.joints[i].position.toArray());
      }
    }  
  }
  addSpring(){}
  
  update(){}
}
