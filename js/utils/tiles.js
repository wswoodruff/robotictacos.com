
// Tiles controller and tile class
// controls the tiles and their snapping
// Car though is another layer, not sure where that goes


import { Group, Box3, Vector3, Clock, MeshStandardMaterial, 
  MeshBasicMaterial, Mesh, AxesHelper } from 'three';
  
import {SphereMesh} from './sphereMesh.js';

import { CheapPool } from './cheapPool.js';
import { Entities, Enty } from './basicEntites.js';

import { clamp, lerp } from './mathness.js';
import { bellCurve1 } from './curves.js';

import {PatchObject3D} from "./patchObject3D.js"

const vv1 = new Vector3();
const vv2 = new Vector3();
const vv3 = new Vector3();
const pos = new Vector3();
const localB = new Vector3();
const v345 = new Vector3();

export class TilesController extends PatchObject3D {
  
  isTilesController = true;
  
  vertical = new CheapPool();
  horizontal = new CheapPool();
  
  // dont know where or how this should go in
  state = "ready"; // ready running
  
  targetAnimation = {
    tile : null,
    positionA : new Vector3(),
    positionB : new Vector3(),
    positionStart : new Vector3(),
    positionStop : new Vector3(),
    currentTime : -1,
    alpha : 0,
    runTime : 0.3,
    isRunning : false,
    clock : new Clock()
  }
  
  
  constructor(){
    super();
    this.entities = new Entities(this);
    this.entities.add(new Walk());
  }
  

  
  addHorizontal(item){
    this.horizontal.add(item);
    this.add(item);
  }
  
  // of 
  // aa is non moving tile object
  // bb is the snapping tile object
  // so ex:
  // aa interest is east, then bb is west
  // bb is index 0 going to length
  snap(aa,bb,sideA, sideB,useAnimation=false){
    
    if(useAnimation === false){
      let mm = this.getSnapPosition(aa,bb,sideA, sideB);
      bb.position.copy(mm);
    }
    else {
      this.snapWithAnimation(aa,bb,sideA, sideB);
    }

  }
  snapWithAnimation(aa,bb,sideA, sideB){
    // assigns positions, the reading here is weird since its trying to reuse
    // a function or two
    
    if(this.state === "running") return;
    
    
    aa.updateMatrix();
    bb.updateMatrix();
    
    let tt = this.targetAnimation;
    tt.positionStart.copy(bb.position);
    // tt.positionStart.copy(aa[sideA].getWorldPosition(tt.positionA));
    tt.positionStop.copy( this.getSnapPosition(aa,bb,sideA, sideB) );
    // aa[sideA].getWorldPosition(tt.positionA);
    tt.tile = bb;
    tt.currentTime = 0;
    tt.alpha = 0;
    tt.isRunning = true;
    tt.clock.start();
    this.state = "running";
  }
  getSnapPosition(aa,bb,sideA, sideB){
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
    
    // bb.position.copy(bb.parent.worldToLocal(vv1)).sub(vv3);
    v345.copy(bb.parent.worldToLocal(vv1)).sub(vv3);
    return v345;
  }
  
  snapBackToFront(useAnimation=false){
    const aa = this.horizontal[this.horizontal.length-1];
    const bb = this.horizontal[0];
    this.snap(aa,bb,"east","west", useAnimation);
    this.horizontal.swapFront();
    console.log(this.horizontal[0].name,this.horizontal[1].name);
  }
  snapFrontToBack(useAnimation=false){
    const aa = this.horizontal[0];
    const bb = this.horizontal[this.horizontal.length-1];
    this.snap(aa,bb,"west","east", useAnimation);
    this.horizontal.swapBack();
    console.log(this.horizontal[0].name,this.horizontal[1].name);
  }
  
  snapAllInOrder(){
    for (var i = 1; i < this.horizontal.length; i++) {
      this.snap(this.horizontal[i-1], this.horizontal[i], "east","west");
    }
  }
  
}



// 
// Tile
// 


const box = new Box3();
const vv = new Vector3();


export class Tile extends PatchObject3D{
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
  
  constructor({item, paddingLeft=0, paddingRight=0, showDebugger=false }={}){
    super();
    item.position.set(0,0,0);
    item.rotation.set(0,0,0);
    item.updateMatrix();
    
    // window.pw = this;
    
    // swap out objects IF its the first time model is loaded
    if(item){
      for (var i = 0; i < item.children.length; i++) {
        item.children[i].position.setScalar(0);
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






// 
// Walk entity
// 
// 



const walkV = new Vector3();

export class Walk extends Enty {
  setup() {
    // document.addEventListener( 'mousemove', onDocumentMouseMove );
    // document.addEventListener("keydown", (event) => this.stuff.bind(owner, event) );
  }
  constructor({name, }={}){
    super(name);
    // debugger
    // these wont read due to the .call above
    // this.walkSpeed = walkSpeed;
    // this.spinSpeed = spinSpeed;

    
  }

  update() {

    // if(store.state.keyboard.keys.w) {
    //   this.translateZ( 0.1 );
    // }
    let tt = this.targetAnimation;
    if(this.state === "running" && tt.isRunning){
      let delta = tt.clock.getDelta();
      tt.currentTime += delta;
      tt.alpha = tt.currentTime / tt.runTime;
      tt.alpha = clamp(tt.alpha,0,1);
      tt.tile.position.copy( walkV.lerpVectors(tt.positionStart, tt.positionStop, tt.alpha) );
      tt.tile.position.y = lerp( tt.positionStart.y, tt.positionStart.y + -34, bellCurve1(tt.alpha) );
    }
    if(tt.alpha >= 1.0){
      tt.isRunning = false;
      this.state = "ready";
    }
    

  }

}



// var n4 = new TilesLine("a","b","c");
