var P=Object.defineProperty;var z=(n,t,s)=>t in n?P(n,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[t]=s;var e=(n,t,s)=>z(n,typeof t!="symbol"?t+"":t,s);import{O as S,f as r,M as y,c as T,e as M,K as k,J as A,C as O}from"./GLTFLoader-wlXMjBjz.js";class x extends S{constructor(){super();e(this,"isPatrchObject3D",!0);e(this,"mPosition",new r)}cachePosition(){this.mPosition.copy(this.position)}}class p extends y{constructor(s={}){const{radius:i=1,res:a=12,color:l=65280,debug:o=!1}=s,h=new T(i,a,a),m=new M({color:l});super(h,m);e(this,"isSphereMesh",!0);e(this,"isPrimitive",!0);if(o){const v=new k(1);this.add(v)}this.name="spherey"}}class u extends Array{constructor(){super(...arguments);e(this,"selectedIndex",0)}add(...s){this.push(...s)}remove(s){const i=this.indexOf(s);i>-1&&this.splice(i,1)}swapFront(){return this.swap("front"),this}swapBack(){return this.swap("back"),this}swap(s){if(this.length<1){console.log("length must be greater than 1");return}if(s==="front"){const i=this.shift();this.push(i)}if(s==="back"){const i=this.pop();this.unshift(i)}}}class C{constructor(t){e(this,"entities",[]);e(this,"owner",null);this.owner=t}setOwner(t){this.owner=t}add(t){this.entities.push(t),t.setup(t.owner)}run(){for(var t=0;t<this.entities.length;t++)this.entities[t].update.call(this.owner)}}class W{constructor(t=""){e(this,"name","");this.name=t}update(){}start(){}setup(){}}function B(n,t,s){return(1-s)*n+s*t}function F(n,t,s){return Math.max(t,Math.min(n,s))}function G(n,t,s){return n>=t&&n<=s}function j(n,t=4){return n*(1-n)*t}const d=new r,R=new r,w=new r,D=new r;new r;const f=new r;class J extends x{constructor(){super();e(this,"isTilesController",!0);e(this,"vertical",new u);e(this,"horizontal",new u);e(this,"state","ready");e(this,"targetAnimation",{tile:null,positionA:new r,positionB:new r,positionStart:new r,positionStop:new r,currentTime:-1,alpha:0,runTime:.3,isRunning:!1,clock:new O});this.entities=new C(this),this.entities.add(new V)}addHorizontal(s){this.horizontal.add(s),this.add(s)}snap(s,i,a,l,o=!1){if(o===!1){let h=this.getSnapPosition(s,i,a,l);i.position.copy(h)}else this.snapWithAnimation(s,i,a,l)}snapWithAnimation(s,i,a,l){if(this.state==="running")return;s.updateMatrix(),i.updateMatrix();let o=this.targetAnimation;o.positionStart.copy(i.position),o.positionStop.copy(this.getSnapPosition(s,i,a,l)),o.tile=i,o.currentTime=0,o.alpha=0,o.isRunning=!0,o.clock.start(),this.state="running"}getSnapPosition(s,i,a,l){return s.updateMatrix(),i.updateMatrix(),s[a].getWorldPosition(d),i.getWorldPosition(D),i[l].getWorldPosition(R),w.copy(i[l].position),f.copy(i.parent.worldToLocal(d)).sub(w),f}snapBackToFront(s=!1){const i=this.horizontal[this.horizontal.length-1],a=this.horizontal[0];this.snap(i,a,"east","west",s),this.horizontal.swapFront(),console.log(this.horizontal[0].name,this.horizontal[1].name)}snapFrontToBack(s=!1){const i=this.horizontal[0],a=this.horizontal[this.horizontal.length-1];this.snap(i,a,"west","east",s),this.horizontal.swapBack(),console.log(this.horizontal[0].name,this.horizontal[1].name)}snapAllInOrder(){for(var s=1;s<this.horizontal.length;s++)this.snap(this.horizontal[s-1],this.horizontal[s],"east","west")}}const g=new A,c=new r;class K extends x{constructor({item:s,paddingLeft:i=0,paddingRight:a=0,showDebugger:l=!1}={}){super();e(this,"isTile",!0);e(this,"verticalPoints",[]);e(this,"horizontalPoints",[]);e(this,"west",null);e(this,"east",null);e(this,"north",null);e(this,"south",null);e(this,"up",null);e(this,"down",null);if(s.position.set(0,0,0),s.rotation.set(0,0,0),s.updateMatrix(),s)for(var o=0;o<s.children.length;o++)s.children[o].position.setScalar(0),this.add(s.children[o]);g.setFromObject(this),g.getSize(c),this.verticalPoints[0]=new p({color:255,radius:2}),this.verticalPoints[1]=new p({color:255,radius:2}),this.add(this.verticalPoints[0]),this.add(this.verticalPoints[1]),this.west=this.verticalPoints[0],this.east=this.verticalPoints[1],this.west.position.x=-c.x/2+i,this.east.position.x=c.x/2+a,this.west.visible=l,this.east.visible=l}}const H=new r;class V extends W{setup(){}constructor({name:t}={}){super(t)}update(){let t=this.targetAnimation;if(this.state==="running"&&t.isRunning){let s=t.clock.getDelta();t.currentTime+=s,t.alpha=t.currentTime/t.runTime,t.alpha=F(t.alpha,0,1),t.tile.position.copy(H.lerpVectors(t.positionStart,t.positionStop,t.alpha)),t.tile.position.y=B(t.positionStart.y,t.positionStart.y+-34,j(t.alpha))}t.alpha>=1&&(t.isRunning=!1,this.state="ready")}}export{u as C,x as P,p as S,J as T,K as a,G as i};