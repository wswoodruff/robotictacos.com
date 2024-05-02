
import {Group, Vector3, Object3D} from 'three';

export class PatchObject3D extends Object3D{
  isPatrchObject3D = true;
  mPosition = new Vector3();
  constructor(){
    super();
  }
  cachePosition(){
    this.mPosition.copy(this.position);
  }
  
}
