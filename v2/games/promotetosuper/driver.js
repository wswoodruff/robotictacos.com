


// basic car driving without turn for now

// import { utilites } from 'superneatlib';

import { Vector3, Vector2, Quaternion, MathUtils, Euler } from 'three';


export class Driver{
	
    // keyboard, joystick
    controllerType = "keyboard";
    axis = new Vector2();
    inverseAxis = false;
    inverseKeys = false;


	// Key states
	keys = {
		ArrowUp: false,
		ArrowDown: false,
		ArrowLeft: false,
		ArrowRight: false,
		KeyW: false,
		KeyS: false
	}

	frameID = -1;

	targetObject = null;

	// store = null;

	enabled = false;

	damping = 0.07;

	velocity = new Vector3();

	// acceleration = 0;
	speed = 0.02;

	acceleration = new Vector3();
    m_acceleration = new Vector3();
	// gravity = new Vector3(0,-0.09,0);
	gravity = new Vector3();

	friction = 0; // Lower value means stronger deceleration

	turnSpeed = 0.1;
    tiltAmount = Math.PI*2;



	allowTurning = true;
	allowTilt = true;
	
	constructor({object, store, 
		turnSpeed = 0.1,

		// only one will work at a time for now
		allowTurning = true,
		allowTilt = true,
		
		speed = 0.2, damping = 0.07, friction = 1, tilt = Math.PI*2 }){


		this.targetObject = object;
        this.tiltAmount = tilt;
		this.allowTurning = allowTurning;
		this.allowTilt = allowTilt;
		// this.store = store;
		this.damping = damping;
		this.speed = speed;
		this.friction = friction;
		this.turnSpeed = turnSpeed;

        // Event listeners for keypress
        document.addEventListener("keydown", this.keyDownEvents.bind(this));

        document.addEventListener("keyup", this.keyUpEvents.bind(this));
        this.enabled = true;

        const _this = this;

        let delta = 0;
//         function __animate() {
//             // Render the scene
            
//             if(_this.enabled){
//             	_this.frameID = requestAnimationFrame(animate);
//             }

//             const pawn = _this.targetObject;
//             const damping = _this.damping;
//             const vel = _this.velocity;
//             // const acc = _this.acceleration;
//             const speed = _this.speed;
//             const friction = _this.friction;
//             // const keys = _this.keys;

//             // Apply acceleration
//             if (_this.keys["ArrowLeft"]) vel.x -= speed;
//             if (_this.keys["ArrowRight"]) vel.x += speed;
//             if (_this.keys["ArrowUp"]) vel.z -= speed;
//             if (_this.keys["ArrowDown"]) vel.z += speed;
//             if (_this.keys["KeyW"]) vel.y += speed;
//             if (_this.keys["KeyS"]) vel.y -= speed;

//             // Apply friction when keys are not pressed
// 			if (!_this.keys["ArrowLeft"] && !_this.keys["ArrowRight"]) vel.x *= friction;
// 			if (!_this.keys["ArrowUp"] && !_this.keys["ArrowDown"]) vel.z *= friction;
// 			if (!_this.keys["KeyW"] && !_this.keys["KeyS"]) vel.y *= friction;


//             console.log("vel.z", vel.z)
//             // Apply easing (lerp to slow down)
//             pawn.position.x += (vel.x - pawn.position.x) * damping;
//             pawn.position.y += (vel.y - pawn.position.y) * damping;
//             pawn.position.z += (vel.z - pawn.position.z) * damping;


            
//             delta += 0.1;

//             const bb = (vel.z - pawn.position.z) * damping;
//             // console.log("bb", bb)

//             // pawn.rotation.z = Math.sin(delta) * Math.PI ;

//         // let t = (Math.sin(delta) + 1) / 2;  // Normalize sin from [-1,1] to [0,1]
//         // let t = (Math.sin(pawn.position.z*4.2) + 1) / 2;  // Normalize sin from [-1,1] to [0,1]
//         let t = (Math.sin(pawn.position.z) + 1) / 2;  // Normalize sin from [-1,1] to [0,1]
//         // let t = (Math.sin(delta) + 1) / 2;  // Normalize sin from [-1,1] to [0,1]
// 	// 	const min = Math.PI*0.25;
// 	// 	const max = 1-Math.PI*2*0.25;
//     // // let angle = min + (max - min) * t;
//     //             // pawn.rotation.x = angle;


//     //         // let tiltX = -vel.z * min; // Tilt forward/backward
// 	// 		const angle = pawn.rotation.x + (-vel.z * 1.2 - pawn.rotation.x) * damping;
//     //         pawn.rotation.x = Math.min(min,Math.max(angle,max))


// // const min = Math.PI*0.25;
// // const max = -Math.PI*0.25;
// // const angle = pawn.rotation.x + (-vel.z - pawn.rotation.x) * damping;
// // pawn.rotation.x = Math.max(min,Math.min(angle,max))


// 								// const min = -Math.PI * 0.25; // Max backward tilt
// 								// const max = Math.PI * 0.25;  // Max forward tilt
// 								// const tiltSpeed = 2.5; // Increase speed of tilt response
// 								// const targetAngle = -vel.z * tiltSpeed; // Tilt based on movement direction

// 								// const returnSpeed = 0.1; // How fast it returns to zero


// 								// // pawn.rotation.x += (targetAngle - pawn.rotation.x) * damping; // Easing
// 								// pawn.rotation.x += (targetAngle - pawn.rotation.x) * (damping * 2);

// 								// // Smoothly return to 0 tilt when velocity is small
// 								// pawn.rotation.x *= (1 - returnSpeed);

// 								// console.log("pawn.rotation.x", pawn.rotation.x)

// 								// pawn.rotation.x = Math.max(min, Math.min(pawn.rotation.x, max)); // Clamp


// const min = -Math.PI * 0.4; // More backward tilt
// const max = Math.PI * 0.4;  // More forward tilt
// const tiltSpeed = 2.5; // Speed of tilt response
// const returnSpeed = 0.1; // How fast it returns to zero

// // Target angle based on movement, but easing back to zero when stopping
// const targetAngle = -vel.z * tiltSpeed;
// pawn.rotation.x += (targetAngle - pawn.rotation.x) * (damping * 1);

// // Slowly return to zero when not moving
// pawn.rotation.x *= (1 - returnSpeed);

// // Clamp tilt range
// pawn.rotation.x = Math.max(min, Math.min(pawn.rotation.x, max));



//             // const yy = utilites.remap(pawn.rotation.z, -1, 1, 0.5, 1.0);
//             // console.log("yy", yy)
//             // console.log("pawn.rotation.z", pawn.rotation.z)

//             // console.log("lskmlkdfm")
//         }
            


        function animate(){
        	 if(_this.enabled){
            	_this.frameID = requestAnimationFrame(animate);
            }

        	      _this.applyForces();

        }



        animate();

	}




    applyForces() {
      // Apply gravity

            const pawn = this.targetObject;
            const damping = this.damping;
            const velocity = this.velocity;
            // const acc = this.acceleration;
            const speed = this.speed;
            const friction = this.friction;
            // const keys = _this.keys;


    	const acceleration = this.acceleration;

      acceleration.add(this.gravity);


      // might need an invert option 

        const axis = this.axis;


           if (this.keys["ArrowLeft"]) axis.x = -1;
            if (this.keys["ArrowRight"]) axis.x = 1;
            if (this.keys["ArrowUp"]) axis.y = 1;
            if (this.keys["ArrowDown"]) axis.y = -1;
            // if (this.keys["KeyW"]) 
            // if (this.keys["KeyS"]) 
            axis.x *= -1;

            if (this.keys["KeyW"]) acceleration.y += speed;
            if (this.keys["KeyS"]) acceleration.y -= speed; 


            if (this.inverseAxis) {
                axis.x *= -1;
                axis.y *= -1;
            }

            acceleration.x += speed * axis.x;
            acceleration.z += speed * axis.y;

            // console.log("axis", axis);

            // if (this.controllerType) {

            //    if (this.keys["ArrowLeft"]) acceleration.x += speed;
            //     if (this.keys["ArrowRight"]) acceleration.x -= speed;
            //     if (this.keys["ArrowUp"]) acceleration.z += speed;
            //     if (this.keys["ArrowDown"]) acceleration.z -= speed;
            //     if (this.keys["KeyW"]) acceleration.y += speed;
            //     if (this.keys["KeyS"]) acceleration.y -= speed;


            // }

           // if (this.keys["ArrowLeft"]) acceleration.x += speed;
           //  if (this.keys["ArrowRight"]) acceleration.x -= speed;
           //  if (this.keys["ArrowUp"]) acceleration.z += speed;
           //  if (this.keys["ArrowDown"]) acceleration.z -= speed;
           //  if (this.keys["KeyW"]) acceleration.y += speed;
           //  if (this.keys["KeyS"]) acceleration.y -= speed;






      // Apply user-controlled forces (key movements)
      // if (this.keys['w']) acceleration.z -= speed; // Move forward
      // if (this.keys['s']) acceleration.z += speed; // Move backward
      // if (this.keys['a']) acceleration.x -= speed; // Move left
      // if (this.keys['d']) acceleration.x += speed; // Move right

      // Apply friction (to slow down over time)
      // velocity.multiplyScalar(friction); // Simulate friction (reduce speed over time)
            // const damping2 = 0.823;
      
      // velocity.multiplyScalar(friction); // Simulate friction (reduce speed over time)
      // velocity.subScalar(friction); // Simulate friction (reduce speed over time)
      

      // putting dampen before add makes more jelly
        //  and inversely makes it more stop and go
      velocity.multiplyScalar(damping); // Simulate friction (reduce speed over time)
      
      velocity.add(acceleration);

      // console.log("acceleration", acceleration.toArray())

      // this does nothing, just an api to read from
      // _this.m_acceleration.copy(_this.acceleration);

      acceleration.set(0, 0, 0); // Reset acceleration after applying

      // Update position with velocity
      pawn.position.add(velocity);


// const min = -Math.PI * 1; // More backward tilt
// // const min = -0.7; // More backward tilt
// const max = Math.PI * 1;  // More forward tilt
// const tiltSpeed = 2.5; // Speed of tilt response
// const returnSpeed = 0.1; // How fast it returns to zero

// // Target angle based on movement, but easing back to zero when stopping
// const targetAngle = -velocity.z * tiltSpeed;
// pawn.rotation.x += (targetAngle - pawn.rotation.x) * (damping * 1);

// // Slowly return to zero when not moving
// // pawn.rotation.x *= (1 - returnSpeed);

// // Clamp tilt range
// // pawn.rotation.x = Math.max(min, Math.min(pawn.rotation.x, max));


      // this tilt is not great
      // const tiltAmount = 4.5; // How much tilt you want to apply


      // only one will work at a time for now
        if(this.allowTurning){
        	this.applyTurning();
        }

        if(this.allowTilt){
			this.applyTilt();
        }

    }


    applyTilt(){

        // this tiltAmount needs tweaking
      // const tiltAmount = Math.PI*2;

              const tiltAmount = this.tiltAmount;
		const pawn = this.targetObject;
		// pawn.updateWorldMatrix();
		// pawn.updateMatrix();
		const velocity = this.velocity;
      // Tilt based on the velocity (opposite of the movement)
      if (velocity.length() > 0.000001) {
        pawn.rotation.x = -velocity.z * tiltAmount; // Tilt along X axis (forward/backward)
        pawn.rotation.z = velocity.x * tiltAmount;  // Tilt along Z axis (left/right)
        pawn.rotation.y = velocity.y * tiltAmount;  // Tilt along Z axis (left/right)
      
      }
    }



    forward = new Vector3(0,0,-1);
	direction = new Vector3();
	targetRotation = new Quaternion();
	eulerR = new Euler();

	pawnForward = new Vector3();

    applyTurning() {
    	const velocity = this.velocity;
		const pawn = this.targetObject;
		// pawn.updateWorldMatrix();

		// pawn.updateWorldMatrix();
		// pawn.getWorldDirection(this.pawnForward);
		// pawn.getWorldDirection(this.forward);


      // Only turn if the cube is moving
        // Get the direction of movement (normalize velocity)
        this.direction.set(velocity.x, 0, velocity.z).normalize();
        // this.direction.set(0, 0, 1);//.normalize();
        this.pawnForward.set(0,0,1);

        // Create a quaternion that represents the desired rotation to face the movement direction
        
        this.targetRotation.setFromUnitVectors(this.pawnForward, this.direction); // Z-axis forward is (0, 0, -1)

        this.turnSpeed = 0.1;
// pawn.rotation.y += 0.1;
// console.log("???¿¿¿¿")
      if (velocity.length() > 0.000001) {

        pawn.quaternion.slerp(this.targetRotation, this.turnSpeed);

        // this.eulerR.setFromQuaternion(this.targetRotation)
        // // Smoothly interpolate from the current rotation to the target rotation
        // // pawn.rotation.y = MathUtils.lerpAngle(pawn.rotation.y, this.targetRotation.eulerAngles().y, this.turnSpeed);
        // pawn.rotation.y = MathUtils.lerpAngle(pawn.rotation.y, this.eulerR.y, this.turnSpeed);

      }
    }


	destroy(){
        document.removeEventListener("keydown", this.keyDownEvents);
        document.removeEventListener("keydown", this.keyUpEvents);
        cancelRequestAnimationFrame(_this.frameID);
	}

	keyDownEvents(ev){
		// console.log("this.keys[ev.code]", this.keys[ev.code])
	    if (this.keys.hasOwnProperty(ev.code)) this.keys[ev.code] = true;
	}

	keyUpEvents(ev){
	    if (this.keys.hasOwnProperty(ev.code)) this.keys[ev.code] = false;
        // does a quick reset of axis, though will fight with joystick
        let count = 0;
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i] === true) count++;
        }
        if(count === 0){
            this.axis.set(0,0);
        }
	}

}