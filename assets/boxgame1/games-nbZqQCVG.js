import"../cawad-regular-LUVKtMNm.js";import{i as u,s as m,a as y,b as w,c as h,P as g,A as o,L as b,d,S as f,M as k,F as L,V as M,e as x}from"../superneatlib-CKHqtxPn.js";const A=new URL("/assets/bot1-BN9gAiQy.glb",import.meta.url).href;new URL("/assets/bot2-2ay7QdwQ.glb",import.meta.url).href;async function S(){const a=o;u(o),m(o,{movementSpeed:.4,rollSpeed:.4,dragToLook:!0,autoForward:!1}),y(o),w(o),h(o);const p=o.scene,n=o.camera;o.renderer;const c=new g(16777215,2,100);c.position.set(5,5,5),p.add(c),b.hemisphereLight(o.scene),n.position.z=.5,n.position.y=.5;const e=d.ball({store:o,scale:.1,color:65535});e.position.set(0,0,0),e.scale.setScalar(.4),f.decoSuper3D(e),o.addObject3D(e),e.material.color.setHex(1118481),e.renderOrder=0,e.material.opacity=.9,e.material.transparent=!0;const r=d.ball({store:o,scale:.1,color:65535});r.position.set(0,0,0),r.scale.setScalar(1),f.decoSuper3D(r),o.addObject3D(r),r.renderOrder=1,r.material.depthTest=!1,e.add(r),e.scale.setScalar(2),e.position.set(0,-2,0),r.material=new k({color:16777215,wireframe:!0,side:L}),n.position.set(0,.05,0),n.position.set(0,.2,.9),a.currentControls.enabled=!1;let l=!1;document.addEventListener("keydown",t=>{t.shiftKey&&(l=!0,a.currentControls.enabled=!0)}),document.addEventListener("keyup",t=>{l&&!t.shiftKey&&(l=!1,a.currentControls.enabled=!1)}),e.controls={dir:new M,isMoving:!1,speed:.06},e.update=function(){e.controls.isMoving&&(e.rotation.x+=e.controls.dir.x*e.controls.speed,e.rotation.y+=e.controls.dir.y*e.controls.speed)},document.addEventListener("keydown",t=>{t.key==="ArrowUp"&&(e.controls.isMoving=!0,e.controls.dir.x=1),t.key==="ArrowDown"&&(e.controls.isMoving=!0,e.controls.dir.x=-1),t.key==="ArrowLeft"&&(e.controls.isMoving=!0,e.controls.dir.y=1),t.key==="ArrowRight"&&(e.controls.isMoving=!0,e.controls.dir.y=-1)}),document.addEventListener("keyup",t=>{let i=4;t.key==="ArrowUp"&&(i--,e.controls.dir.x=0),t.key==="ArrowDown"&&(i--,e.controls.dir.x=0),t.key==="ArrowLeft"&&(i--,e.controls.dir.y=0),t.key==="ArrowRight"&&(i--,e.controls.dir.y=0),i<=0&&(e.controls.isMoving=!0)});const s=new x(A);await s.init(o),s.scaleTo(.5),s.playAnimations(),s.checkMeshes(),o.addObject3D(s),o.selectorMesh&&(o.selectorMesh.visible=!1)}function D(){S()}D();console.log("sldknldkfnglk");
