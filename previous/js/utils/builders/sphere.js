


import {
  SphereGeometry, MeshBasicMaterial, MeshStandardMaterial, Mesh
  } from 'three';

export function sphere(scene,{color=0x00ff00, materialShader="standard", radius=1, computeBounds=false, autoAdd=false}={}){
  const geometry = new SphereGeometry( radius, 12, 12 ); 
  let material;
  if (materialShader === "basic") {
    material = new MeshBasicMaterial( { color: color } );
  }
  else if(materialShader === "standard"){
    material = new MeshStandardMaterial( { color: color } );
  }
  const _sphere = new Mesh( geometry, material );
  if(computeBounds){
    _sphere.geometry.computeBoundingBox();
    _sphere.geometry.computeBoundingSphere();
  }
  if(autoAdd){
    scene.add( _sphere );
  }
  return _sphere;
}
