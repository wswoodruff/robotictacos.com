
import { Vector3 } from 'three';

// https://natureofcode.com/oscillation/#spring-forces
// and whatever alteration needed to make it 3d
// this should be the full effect of taking forces and have
// recoil as needed in factors to mass and damping
// and http://www.myphysicslab.com/spring2d.html

const _force = new Vector3();

export class SpringV2{
  position = new Vector3();
  velocity = new Vector3();
  mass;
  _k; // stiffness but lets use the maths name
  damping;
  restLength;
  // gravity = new Vector3(0,0.8349054,0);
  // gravity being a force... so "should" be exterior 
  pointer; // T: Object3D
  acceleration = new Vector3();
  
  constructor({ 
    position = new Vector3(),
    mass = 2.0, 
    // gravityA=[0,0.8349054,0], 
    k = 0.2, 
    damping = 0.4950,
    restLength = 0,
    pointer = null
  }){
    this.position.copy(position);
    this.mass = mass;
    this._k = k;
    this.damping = damping;
    this.restLength = restLength;
    this.pointer = pointer;
  }
  
  // Newton's law: F = M * A
  // @force T : Vector3
  applyForce(forceIn){
    
    // _force.copy(targetV).sub(this.position).multiplyScalar(this.stiffness);
    // _force.add(this.gravity);
    // const acceleration = _force.divideScalar(this.mass);
    // this.velocity.add(acceleration).multiplyScalar(this.damping);
    // this.position.add(this.velocity);
    // 
    _force.copy(forceIn).divideScalar(this.mass);
    this.acceleration.add(_force);
    // 
    // // Newton's law: F = M * A
    // applyForce(force) {
    //   let f = force.copy();
    //   f.div(this.mass);
    //   this.acceleration.add(f);
    // }
    
    
  }
  
  // Euler integration
  // update(){
  //   this.velocity.add(this.acceleration).multiplyScalar(this.damping);
  //   this.position.add(this.velocity);
  //   this.acceleration.multiplyScalar(0);
  // }
  // @target : Vector3
  update(target){
  // applySpring(target){
    
    // apply spring effect after other forces like gravity
    _force.copy(this.position).sub(target);
    const mag = _force.length();
    const stretch = mag - this.restLength; // x
    _force.normalize().multiplyScalar( -1 * this._k * stretch );
    this.applyForce(_force);

  }
  
  applyAll(){
    
    // update vel and position and clear accel
    this.velocity.add(this.acceleration).multiplyScalar(this.damping);
    this.position.add(this.velocity);
    this.acceleration.setScalar(0);
    
  }
  
  remoteControl(position){
    this.position.copy(position);
    this.velocity.setScalar(0);
    this.acceleration.setScalar(0);
  }
  
  // update(){
  // 
  // }
  
}





export class CoilSample{
  spring;
  pointer;
  anchor;
  gravity = new Vector3();
  constructor({pointer, anchor, position, mass, k, damping, restLength, gravity = new Vector3() }){
    this.pointer = pointer;
    this.anchor = anchor;
    this.gravity.copy(gravity);
    this.spring = new SpringV2({ position, mass, k, damping, restLength, pointer});
  }
  update(){
    
    if(this.pointer.isDragging){
      this.spring.remoteControl(this.pointer.position);
    }
    else {
      // console.log("¿");
      this.spring.applyForce(this.gravity);
      // this.spring.applyForce({x:1.0,y:0,z:0});
      this.spring.update(this.anchor.position);
      this.spring.applyAll();
      this.pointer.position.copy(this.spring.position);
    }
  }
}
