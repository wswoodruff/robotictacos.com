

// we dont have components
// so we need to add a collider onto an object and have events



import {Group, Box3, Vector3, MeshStandardMaterial, 
  MeshBasicMaterial, BoxGeometry, Mesh, AxesHelper } from 'three';

import {PatchObject3D} from "./patchObject3D.js"

// bring in other gltf import stuff later
export class CarModel extends PatchObject3D {
  
  isCarMode = true;
  
  bounds = null;
  
  constructor(item){
    super();
    
    // if (debug) {
      const axesHelper = new AxesHelper( 12 );
      this.add( axesHelper );
    // }
    
    if(item){
      for (var i = 0; i < item.children.length; i++) {
        item.children[i].position.setScalar(0,0,0)
        this.add(item.children[i]);
      }
    }
    
    // hard values for now
    // const geometry = new BoxGeometry(7, 6, 4);
    // // const material = new MeshStandardMaterial( { color: 0xaa88ee } );
    // const material = new MeshBasicMaterial( { wireframe: true, color: 0xaa88ee } );
    // this.volume = new Mesh( geometry, material );
    // this.volume.position.set(0,0,0)
    // this.volume.geometry.computeBoundingBox();
    // console.log(this.volume.geometry.boundingBox);
    // // boundingBox
    // 
    // this.add(this.volume);
    
    
  }
  
}
