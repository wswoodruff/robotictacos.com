
// just for Stick class
import { BufferGeometry, BufferAttribute, MeshBasicMaterial, MeshStandardMaterial, Mesh, Vector3 } from 'three';

const v0 = new Vector3();
const dirTop = new Vector3();
const dirBottom = new Vector3();
const up = new Vector3(0,1,0);
const down = new Vector3(0,-1,0);

export class Stick extends Mesh{
  p0 = new Vector3(0,1,0);
  p1 = new Vector3(0,-1,0);
  radius = 1;
  
  driver0 = null;
  driver1 = null;
  
  // DONT mutate these after constructor
  top = [];
  bottom = [];
  
  constructor({radius=1}={}){
    
    const geometry = new BufferGeometry();

    // default geo is focused on 2d so y is top bottom
    // 
    // 3 - 2
    // 0 - 1
    // 
    // 7 - 6
    // 4 - 5
    const top = [
      new Vector3(-1.0, 1.0,  1.0),
      new Vector3(1.0, 1.0,  1.0),
      new Vector3(1.0,  1.0,  -1.0),
      new Vector3(-1.0,  1.0,  -1.0)
    ];
    const bottom = [
      new Vector3(-1.0, -1.0,  1.0),
      new Vector3(1.0, -1.0,  1.0),
      new Vector3(1.0,  -1.0,  -1.0),
      new Vector3(-1.0,  -1.0,  -1.0)
    ];
    const vertices = new Float32Array( [
    	// -1.0, -1.0,  1.0, // v0
    	//  1.0, -1.0,  1.0, // v1
    	//  1.0,  1.0,  1.0, // v2
    	// -1.0,  1.0,  1.0, // v3
      
      // start front then counter clockwise
      // top
      // -1.0, 1.0,  1.0, // v0
    	//  1.0, 1.0,  1.0, // v1
    	//  1.0,  1.0,  -1.0, // v2
    	// -1.0,  1.0,  -1.0, // v3
      ...top[0],
      ...top[1],
      ...top[2],
      ...top[3],
      
      // bottom, looking down same order
      // -1.0, -1.0,  1.0, // v0
      //  1.0, -1.0,  1.0, // v1
      //  1.0,  -1.0,  -1.0, // v2
      // -1.0,  -1.0,  -1.0, // v3
      ...bottom[0],
      ...bottom[1],
      ...bottom[2],
      ...bottom[3],
      
    ] );
    const indices = [

      // top
    	0, 1, 2,
    	2, 3, 0,
      
      // bottom
      // different winding order
      // looking from bottom up to y+
      // so still in counter clockwise
      7, 6, 5,
      5, 4, 7,
      
      // right hand
      5, 6, 2,
      2, 1, 5,
      
      // left
      7, 4, 0,
      0, 3, 7,
      
      // front
      4, 5, 1,
      1, 0, 4,
      
      // back
      6, 7, 3,
      3, 2, 6
    ];

    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );

    // const material = new MeshBasicMaterial( { color: 0xff0000 } );
    const material = new MeshStandardMaterial( { color: 0xff0000, wireframe: true } );
    // const mesh = new Mesh( geometry, material );
    
    
    super(geometry, material);
    
    this.geometry.computeVertexNormals();
    
    this.top = top;
    this.bottom = bottom;
    
    this.radius = radius;
    this.update();
    
  }
  
  update(){
    const pos = this.geometry.getAttribute( 'position' );
    // pos.setXYZ( i, x, y, z );
    
    // for (var i = 0; i < this.top.length; i++) {
    //   v0.copy(this.top[i]).setLength(this.radius).add(this.p0);
    //   // v0.applyAxisAngle(new Vector3(0,0,-1), 1);
    //   pos.setXYZ( i, v0.x, v0.y, v0.z );
    // }
    
    if(this.driver0 && this.driver1){
      this.p0.copy(this.driver0.position);
      this.p1.copy(this.driver1.position);
    }
    
    dirTop.copy(this.p0).sub(this.p1).normalize();
    const angle0 = up.angleTo(dirTop);
    
    dirBottom.copy(this.p1).sub(this.p0).normalize();
    const angle1 = down.angleTo(dirBottom);
    
    
    for (var i = 0; i < this.top.length; i++) {
      v0.x = this.top[i].x;
      v0.z = this.top[i].z;
      v0.y = 0;
      
      
      // v0.copy(this.top[i]);
      v0.applyAxisAngle(new Vector3(0,0,-1), -angle0);
      v0.setLength(this.radius).add(this.p0);
      // v0.applyAxisAngle(new Vector3(0,0,-1), 1);
      pos.setXYZ( i, v0.x, v0.y, v0.z );
    }
    
    for (var i = 0; i < this.bottom.length; i++) {
      v0.x = this.bottom[i].x;
      v0.z = this.bottom[i].z;
      v0.y = 0;
      
      // v0.copy(this.top[i]);
      v0.applyAxisAngle(new Vector3(0,0,-1), -angle1);
      v0.setLength(this.radius).add(this.p1);
      // v0.applyAxisAngle(new Vector3(0,0,-1), 1);
      pos.setXYZ( i+4, v0.x, v0.y, v0.z );
    }
    
    // for (var i = 0; i < this.bottom.length; i++) {
    //   v0.copy(this.bottom[i]).setLength(this.radius).add(this.p1);
    //   pos.setXYZ( i+4, v0.x, v0.y, v0.z );
    // }
    
    pos.needsUpdate = true; // required after the first render
  }
  
}
