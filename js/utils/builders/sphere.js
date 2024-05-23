


import {
  SphereGeometry, MeshBasicMaterial, MeshStandardMaterial, Mesh
  } from 'three';

export function sphere(scene,{color=0x00ff00, materialShader="standard", radius=1}={}){
  const geometry = new SphereGeometry( radius, 12, 12 ); 
  let material;
  if (materialShader === "basic") {
    material = new MeshBasicMaterial( { color: color } );
  }
  else if(materialShader === "standard"){
    material = new MeshStandardMaterial( { color: color } );
  }
  const _sphere = new Mesh( geometry, material );
  // scene.add( sphere );
  return _sphere;
}
