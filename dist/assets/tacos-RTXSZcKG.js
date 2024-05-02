var ce=Object.defineProperty;var de=(o,e,t)=>e in o?ce(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var s=(o,e,t)=>(de(o,typeof e!="symbol"?e+"":e,t),t);import{a as z,b as te,c as oe,d as ne,e as he,V as h,f as se,C as ue,S as pe,g as W,P as we,W as me,h as fe,O as ge,B as N,M as Q,H as xe,i as ve,j as ye,k as Se,A as ze,D as ke,l as Pe,G as S,m as be,n as Me}from"./GLTFLoader-fsSZZYcH.js";class k extends z{constructor(t={}){const{radius:n=1,res:a=12,color:d=65280,debug:l=!1}=t,y=new te(n,a,a),L=new oe({color:d});super(y,L);s(this,"isSphereMesh",!0);s(this,"isPrimitive",!0);if(l){const C=new ne(1);this.add(C)}this.name="spherey"}}class A extends Array{constructor(){super(...arguments);s(this,"selectedIndex",0)}add(t){this.push(t)}swapFront(){return this.swap("front"),this}swapBack(){return this.swap("back"),this}swap(t){if(this.length<1){console.log("length must be greater than 1");return}if(t==="front"){const n=this.shift();this.push(n)}if(t==="back"){const n=this.pop();this.unshift(n)}}}class Be{constructor(e){s(this,"entities",[]);s(this,"owner",null);this.owner=e}setOwner(e){this.owner=e}add(e){this.entities.push(e),e.setup(e.owner)}run(){for(var e=0;e<this.entities.length;e++)this.entities[e].update.call(this.owner)}}class Ae{constructor(e=""){s(this,"name","");this.name=e}update(){}start(){}setup(){}}function Le(o,e,t){return(1-t)*o+t*e}function Ce(o,e,t){return Math.max(e,Math.min(o,t))}function U(o,e,t){return o>=e&&o<=t}function Te(o,e=4){return o*(1-o)*e}class Y extends he{constructor(){super();s(this,"isPatrchObject3D",!0);s(this,"mPosition",new h)}cachePosition(){this.mPosition.copy(this.position)}}const X=new h,We=new h,Z=new h,He=new h;new h;const _=new h;class De extends Y{constructor(){super();s(this,"isTilesController",!0);s(this,"vertical",new A);s(this,"horizontal",new A);s(this,"state","ready");s(this,"targetAnimation",{tile:null,positionA:new h,positionB:new h,positionStart:new h,positionStop:new h,currentTime:-1,alpha:0,runTime:.3,isRunning:!1,clock:new ue});this.entities=new Be(this),this.entities.add(new Ee)}addHorizontal(t){this.horizontal.add(t),this.add(t)}snap(t,n,a,d,l=!1){if(l===!1){let y=this.getSnapPosition(t,n,a,d);n.position.copy(y)}else this.snapWithAnimation(t,n,a,d)}snapWithAnimation(t,n,a,d){if(this.state==="running")return;t.updateMatrix(),n.updateMatrix();let l=this.targetAnimation;l.positionStart.copy(n.position),l.positionStop.copy(this.getSnapPosition(t,n,a,d)),l.tile=n,l.currentTime=0,l.alpha=0,l.isRunning=!0,l.clock.start(),this.state="running"}getSnapPosition(t,n,a,d){return t.updateMatrix(),n.updateMatrix(),t[a].getWorldPosition(X),n.getWorldPosition(He),n[d].getWorldPosition(We),Z.copy(n[d].position),_.copy(n.parent.worldToLocal(X)).sub(Z),_}snapBackToFront(t=!1){const n=this.horizontal[this.horizontal.length-1],a=this.horizontal[0];this.snap(n,a,"east","west",t),this.horizontal.swapFront(),console.log(this.horizontal[0].name,this.horizontal[1].name)}snapFrontToBack(t=!1){const n=this.horizontal[0],a=this.horizontal[this.horizontal.length-1];this.snap(n,a,"west","east",t),this.horizontal.swapBack(),console.log(this.horizontal[0].name,this.horizontal[1].name)}snapAllInOrder(){for(var t=1;t<this.horizontal.length;t++)this.snap(this.horizontal[t-1],this.horizontal[t],"east","west")}}const $=new se,H=new h;class D extends Y{constructor({item:t,paddingLeft:n=0,paddingRight:a=0,showDebugger:d=!1}={}){super();s(this,"isTile",!0);s(this,"verticalPoints",[]);s(this,"horizontalPoints",[]);s(this,"west",null);s(this,"east",null);s(this,"north",null);s(this,"south",null);s(this,"up",null);s(this,"down",null);if(t.position.set(0,0,0),t.rotation.set(0,0,0),t.updateMatrix(),t)for(var l=0;l<t.children.length;l++)t.children[l].position.setScalar(0),this.add(t.children[l]);$.setFromObject(this),$.getSize(H),this.verticalPoints[0]=new k({color:255,radius:2}),this.verticalPoints[1]=new k({color:255,radius:2}),this.add(this.verticalPoints[0]),this.add(this.verticalPoints[1]),this.west=this.verticalPoints[0],this.east=this.verticalPoints[1],this.west.position.x=-H.x/2+n,this.east.position.x=H.x/2+a,this.west.visible=d,this.east.visible=d}}const Re=new h;class Ee extends Ae{setup(){}constructor({name:e}={}){super(e)}update(){let e=this.targetAnimation;if(this.state==="running"&&e.isRunning){let t=e.clock.getDelta();e.currentTime+=t,e.alpha=e.currentTime/e.runTime,e.alpha=Ce(e.alpha,0,1),e.tile.position.copy(Re.lerpVectors(e.positionStart,e.positionStop,e.alpha)),e.tile.position.y=Le(e.positionStart.y,e.positionStart.y+-34,Te(e.alpha))}e.alpha>=1&&(e.isRunning=!1,this.state="ready")}}class Fe extends Y{constructor(t){super();s(this,"isCarMode",!0);s(this,"bounds",null);const n=new ne(12);if(this.add(n),t)for(var a=0;a<t.children.length;a++)t.children[a].position.setScalar(0,0,0),this.add(t.children[a])}}var R;let E=!1,F=!1;var x;let Oe=0;var m=null;const r={controller:null,originals:new A,box:new se},O=new A;function G(o){o.receiveShadow=!0,o.castShadow=!0,o.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)})}async function Ge(){const o=new pe;o.background=new W().setHSL(.5,1,.7);const e=document.getElementById("threedee1"),t=e.getBoundingClientRect().height;x=new we(75,window.innerWidth/t,.1,2e3),x.position.fromArray([0,21.22465751184184,40.4622033919508]),window.cam=x;const n=new me({antialias:!0});n.setSize(window.innerWidth,e.getBoundingClientRect().height),e.appendChild(n.domElement),n.shadowMap.enabled=!0,n.shadowMap.type=fe,R=new ge(x,n.domElement);const a=new N(1,1,1),d=new Q({color:65280});new z(a,d);const l=new xe(4329984,6086399,12);new ve(l,100);const y=document.getElementById("vertexShader").textContent,L=document.getElementById("fragmentShader").textContent,C={topColor:{value:new W(11392511)},bottomColor:{value:new W(15465727)},offset:{value:-1.1},exponent:{value:.4}},ae=new te(1e3,32,15),ie=new ye({uniforms:C,vertexShader:y,fragmentShader:L,side:Se}),re=new z(ae,ie);o.add(re);const q=new ze;q.intensity=1.81,o.add(q);const c=new ke;c.castShadow=!0,c.position.copy({x:-4.2,y:6,z:12.2}),c.intensity=2.7,c.color.setHex(16777215),o.add(c),c.shadow.mapSize.width=512*1,c.shadow.mapSize.height=512*1,c.shadow.camera.near=.5,c.shadow.camera.far=200,c.shadow.bias=1e-5,c.shadow.bias=1e-6,c.shadow.radius=.001,c.position.multiplyScalar(5);var P=48;c.shadow.camera.top=P,c.shadow.camera.bottom=-P,c.shadow.camera.left=P,c.shadow.camera.right=-P,new Pe(c.shadow.camera),window.addEventListener("resize",le);function le(){x.aspect=window.innerWidth/t,x.updateProjectionMatrix(),n.setSize(window.innerWidth,t)}function b({item:i,volumeW:p=1,volumeH:u=1,volumeD:M=1}){const g=new N(p,u,M),B=new Q({wireframe:!0,color:11176174});let f=new z(g,B);f.position.set(0,0,0),f.geometry.computeBoundingBox(),console.log(f.geometry.boundingBox),i.volume=f,i.add(f)}{var w=await new S().loadAsync("../models/tacocar/tacocar1.glb");let i=w.scene;m=new Fe(i),m.position.set(2,4,10),o.add(m),G(m),b({item:m,volumeW:7,volumeH:6,volumeD:4})}{var w=await new S().loadAsync("../models/tacocar/streetplate3.glb");let p=w.scene;r.originals.add(p),r.controller=new De,o.add(r.controller),r.controller.position.z=20,O.add(r.controller),r.controller.position.set(0,-10,12);let u=new D({item:r.originals[0].clone(),paddingLeft:2.4,paddingRight:-1.2,showDebugger:!0});r.controller.addHorizontal(u),u.name="111",u.position.x+=-40;let M=new k({color:16776960,radius:6});u.add(M),M.position.y=22,b({item:u,volumeW:50,volumeH:24,volumeD:10});let g=new D({item:r.originals[0].clone(),paddingLeft:2.4,paddingRight:-1.2,showDebugger:!0});r.controller.addHorizontal(g),g.name="222",g.position.x+=40;let B=new k({color:61166,radius:6});g.add(B),B.position.y=22,b({item:g,volumeW:50,volumeH:24,volumeD:10});let f=new D({item:r.originals[0].clone(),paddingLeft:2.4,paddingRight:-1.2,showDebugger:!0});r.controller.addHorizontal(f),f.name="222",f.position.x+=80;let K=new k({color:16772846,radius:6});f.add(K),K.position.y=22,b({item:f,volumeW:50,volumeH:24,volumeD:10}),r.controller.snapAllInOrder();for(var T=0;T<r.controller.horizontal.length;T++)r.controller.horizontal[T].cachePosition()}{const i=new be(1,1),p=new oe({color:65280,side:Me}),u=new z(i,p);u.scale.setScalar(144),u.rotation.x=Math.PI/2,u.position.z=-60,o.add(u),u.receiveShadow=!0}{var w=await new S().loadAsync("../models/tacocar/sidewalk.glb");let p=w.scene;o.add(w.scene),G(p)}{var w=await new S().loadAsync("../models/tacocar/tree1.glb");let p=w.scene;o.add(w.scene),G(p)}{var w=await new S().loadAsync("../models/tacocar/building1.glb");w.scene,o.add(w.scene)}document.addEventListener("wheel",i=>{Oe+=i.deltaY}),document.addEventListener("keydown",i=>{i.key==="z"&&(console.log("z"),r.controller.snapFrontToBack(!0)),i.key==="x"&&(console.log("z"),r.controller.snapBackToFront(!0)),(i.key==="ArrowLeft"||i.key==="a")&&(E=!0),(i.key==="ArrowRight"||i.key==="d")&&(F=!0)}),document.addEventListener("keyup",i=>{(i.key==="ArrowLeft"||i.key==="a")&&(E=!1),(i.key==="ArrowRight"||i.key==="d")&&(F=!1)}),new h;function J(){requestAnimationFrame(J),R!==void 0&&R.update();let i=.9;E&&m&&(m.position.x+=-i),F&&m&&(m.position.x+=i);for(var p=0;p<O.length;p++)O[p].entities.run();Ie(),n.render(o,x)}J()}let I=new h,j=new h,v=null,V=null,ee=!1;function Ie(){v=null;const o=r.controller.horizontal;m.getWorldPosition(j);for(var e=0;e<o.length;e++){o[e],o[e].getWorldPosition(I);let t=I.x+o[e].volume.geometry.boundingBox.min.x,n=I.x+o[e].volume.geometry.boundingBox.max.x,a=j.x+m.volume.geometry.boundingBox.min.x,d=j.x+m.volume.geometry.boundingBox.max.x;U(a,t,n)&&U(d,t,n)&&(v=o[e]),v&&(ee===!1&&(ee=!0,V=v),V!==v&&(V=v,r.controller.snapBackToFront(!1)))}}Ge();