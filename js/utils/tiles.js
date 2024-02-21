// if(store.state.keyboard.keys.w) {
//   this.translateZ( 0.1 );
// }

import {Group, Box3, Vector3} from 'three';
import {SphereMesh} from './sphereMesh.js';


class CheapCache extends Array {
  
  selectedIndex = 0;
  
  // constructor() {
  //   super();
  // }
  // 0 to length
  add(item){
    this.push(item);
  }
  // 0 to length
  // [a,b,c] to:
  // [b,c,a]
  swapFront(){
    this.swap("front");
    return this;
  }
  // length to 0
  // [a,b,c] to:
  // [c,a,b]
  swapBack(){
    this.swap("back");
    return this;
  }
  swap(side){
    if(this.length < 1){
      console.log("length must be greater than 1");
      return;
    }
    if(side === "front"){
      const aa = this.shift();
      this.push(aa);
    }
    if(side === "back"){
      const aa = this.pop();
      this.unshift(aa);
    }
  }
  
  
}


const vv1 = new Vector3();
const vv2 = new Vector3();
const vv3 = new Vector3();
const pos = new Vector3();
const localB = new Vector3();

export class TilesController extends Group {
  vertical = new CheapCache();
  horizontal = new CheapCache();
  // constructor(){
  // 
  // }
  
  addHorizontal(item){
    this.horizontal.add(item);
    this.add(item);
  }
  
  // of 
  // aa is non moving
  // bb is the snapping
  // so ex:
  // aa interest is east, then bb is west
  // bb is index 0 going to length
  snap(aa,bb,sideA, sideB){
    // debugger
    aa.updateMatrix();
    // aa.updateWorldMatrix();
    bb.updateMatrix();
    // bb.updateWorldMatrix();
    // aa[sideA].updateMatrix();
    // aa[sideA].updateWorldMatrix();
    // bb[sideB].updateMatrix();
    // bb[sideB].updateWorldMatrix();
    
    aa[sideA].getWorldPosition(vv1);
    bb.getWorldPosition(pos);
    bb[sideB].getWorldPosition(vv2);
    
    vv3.copy(bb[sideB].position);
    
    bb.position.copy(bb.parent.worldToLocal(vv1)).sub(vv3)

    
  }
  
  snapBackToFront(){
    const aa = this.horizontal[this.horizontal.length-1];
    const bb = this.horizontal[0];
    this.snap(aa,bb,"east","west");
    this.horizontal.swapFront();
    console.log(this.horizontal[0].name,this.horizontal[1].name);
  }
  snapFrontToBack(){
    const aa = this.horizontal[0];
    const bb = this.horizontal[this.horizontal.length-1];
    this.snap(aa,bb,"west","east");
    this.horizontal.swapBack();
    console.log(this.horizontal[0].name,this.horizontal[1].name);
  }
  
  snapAllInOrder(){
    for (var i = 1; i < this.horizontal.length; i++) {
      this.snap(this.horizontal[i-1], this.horizontal[i], "east","west");
    }
  }
  
}


const box = new Box3();
const vv = new Vector3();


export class Tile extends Group{
  isTile = true;
  verticalPoints = []; // 0 left
  horizontalPoints = [];
  // looking from top down as normal ecludian y up 
  west=null;
  east=null;
  north=null;
  south=null;
  up=null;
  down=null;
  
  constructor({item, paddingLeft=0, paddingRight=0, showDebugger=false}={}){
    super();
    item.position.set(0,0,0);
    item.rotation.set(0,0,0);
    item.updateMatrix();
    
    window.pw = this;
    
    // swap out objects IF its the first time model is loaded
    if(item){
      for (var i = 0; i < item.children.length; i++) {
        this.add(item.children[i]);
      }
    }
    
    box.setFromObject(this);
    box.getSize(vv);
    
    // for (var i = 0; i < 2; i++) {
    //   this.verticalPoints[i] = new SphereMesh({color:0x0000ff, radius: 2});
    //   this.add(this.verticalPoints[i]);
    // }
    
    this.verticalPoints[0] = new SphereMesh({color:0x0000ff, radius: 2});
    this.verticalPoints[1] = new SphereMesh({color:0x0000ff, radius: 2});
    this.add(this.verticalPoints[0]);
    this.add(this.verticalPoints[1]);
    this.west = this.verticalPoints[0];
    this.east = this.verticalPoints[1];
    
    this.west.position.x = -vv.x/2 + paddingLeft;
    this.east.position.x = vv.x/2 + paddingRight;

    this.west.visible = showDebugger;
    this.east.visible = showDebugger;
    
    
    // this.verticalPoints[0].position.x = 2;
    // this.verticalPoints[0].position.;
    // this.verticalPoints[0].position.x = vv.x;
    
  }
}


// var n4 = new TilesLine("a","b","c");
