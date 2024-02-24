
import {Group, Vector3} from 'three';

export class PatchObject3D extends Group{
  
  mPosition = new Vector3();
  constructor(){
    super();
  }
  cachePosition(){
    this.mPosition.copy(this.position);
  }
  
}
