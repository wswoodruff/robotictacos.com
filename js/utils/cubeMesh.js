import { Mesh, BoxGeometry, MeshStandardMaterial, AxesHelper} from 'three';

export class CubeMesh extends Mesh {
  
  isCubeMesh = true;
  isPrimitive = true;

  constructor(props = {}){

    const {
      size = 1,
      color = 0x00ff00,
      debug = false,
      castShadow = false
    } = props;

    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshStandardMaterial( { color } );

    super(geometry, material);

    this.castShadow = castShadow;

    if (debug) {
      const axesHelper = new AxesHelper( 1 );
      this.add( axesHelper );
    }

    this.name = 'cubey';

    // pick.matrixWorldAutoUpdate
    // debugger
    this.matrixAutoUpdate = false;
  }
}
