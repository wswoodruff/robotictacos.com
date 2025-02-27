
import { Vector3 } from 'three';

// a bit from https://p5js.org/examples/simulate-chain.html
// but its the basics of springs reguardless
// also converted to 3d

const force = new Vector3();
const gravity = new Vector3();



// only thing different from this vs Spring with -k
// is that is does not behave with a bounce back effect
// So its really just not complete and should be replaced
export class SpringTypeCoil{
  position = new Vector3();
  velocity = new Vector3();
  mass = 2.0;
  gravity = new Vector3(0,0.8349054,0);
  stiffness = 0.2;
  damping = 0.4950;
  pointer = null; // T: Object3D
  
  // constructor({positionA, mass = 2.0, gravityA=[0,0.8349054,0], stiffness=0.2, damping=0.4950}={}){
  constructor(props){
    const {
      positionA, mass = 2.0, gravityA=[0,0.8349054,0], stiffness=0.2, damping=0.4950
    } = props;
    this.position.fromArray(positionA);
    this.mass = mass;
    this.gravity.fromArray(gravityA);
    this.stiffness = stiffness;
    this.damping = damping;
  }
  update(targetV){
    // force.x = (target.x-this.position.x) * this.stiffness;
    // const ax = force.x / this.mass;
    // this.velocity.x = this.damping * (this.velocity.x + ax);
    // this.position.x += this.velocity.x;
    
    force.copy(targetV).sub(this.position).multiplyScalar(this.stiffness);
    force.add(this.gravity);
    const acceleration = force.divideScalar(this.mass);
    this.velocity.add(acceleration).multiplyScalar(this.damping);
    this.position.add(this.velocity);
  }
  
}
