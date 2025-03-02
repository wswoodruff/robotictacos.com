var w=Object.defineProperty;var u=(r,t,i)=>t in r?w(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var e=(r,t,i)=>u(r,typeof t!="symbol"?t+"":t,i);import{V as a,Q as f,E as m}from"./superneatlib-Bv2Rw9sR.js";class v{constructor({object:t,store:i,turnSpeed:n=.1,allowTurning:o=!0,allowTilt:s=!0,speed:c=.2,damping:y=.07,friction:d=1,tilt:p=Math.PI*2}){e(this,"keys",{ArrowUp:!1,ArrowDown:!1,ArrowLeft:!1,ArrowRight:!1,KeyW:!1,KeyS:!1});e(this,"frameID",-1);e(this,"targetObject",null);e(this,"enabled",!1);e(this,"damping",.07);e(this,"velocity",new a);e(this,"speed",.02);e(this,"acceleration",new a);e(this,"gravity",new a);e(this,"friction",0);e(this,"turnSpeed",.1);e(this,"tiltAmount",Math.PI*2);e(this,"allowTurning",!0);e(this,"allowTilt",!0);e(this,"forward",new a(0,0,-1));e(this,"direction",new a);e(this,"targetRotation",new f);e(this,"eulerR",new m);e(this,"pawnForward",new a);this.targetObject=t,this.tiltAmount=p,this.allowTurning=o,this.allowTilt=s,this.damping=y,this.speed=c,this.friction=d,this.turnSpeed=n,document.addEventListener("keydown",this.keyDownEvents.bind(this)),document.addEventListener("keyup",this.keyUpEvents.bind(this)),this.enabled=!0;const l=this;function h(){l.enabled&&(l.frameID=requestAnimationFrame(h)),l.applyForces()}h()}applyForces(){const t=this.targetObject,i=this.damping,n=this.velocity,o=this.speed;this.friction;const s=this.acceleration;s.add(this.gravity),this.keys.ArrowLeft&&(s.x-=o),this.keys.ArrowRight&&(s.x+=o),this.keys.ArrowUp&&(s.z-=o),this.keys.ArrowDown&&(s.z+=o),this.keys.KeyW&&(s.y+=o),this.keys.KeyS&&(s.y-=o),n.multiplyScalar(i),n.add(s),s.set(0,0,0),t.position.add(n),this.allowTurning&&this.applyTurning(),this.allowTilt&&this.applyTilt()}applyTilt(){const t=this.tiltAmount,i=this.targetObject,n=this.velocity;n.length()>1e-6&&(i.rotation.x=-n.z*t,i.rotation.z=n.x*t,i.rotation.y=n.y*t)}applyTurning(){const t=this.velocity,i=this.targetObject;this.direction.set(t.x,0,t.z).normalize(),this.pawnForward.set(0,0,1),this.targetRotation.setFromUnitVectors(this.pawnForward,this.direction),this.turnSpeed=.1,t.length()>1e-6&&i.quaternion.slerp(this.targetRotation,this.turnSpeed)}destroy(){document.removeEventListener("keydown",this.keyDownEvents),document.removeEventListener("keydown",this.keyUpEvents),cancelRequestAnimationFrame(_this.frameID)}keyDownEvents(t){this.keys.hasOwnProperty(t.code)&&(this.keys[t.code]=!0)}keyUpEvents(t){this.keys.hasOwnProperty(t.code)&&(this.keys[t.code]=!1)}}export{v as D};
