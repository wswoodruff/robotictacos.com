import "./styles.css";
import {
  Clock,
  Color,
  MathUtils,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FatLinesBatch } from "./js/FatLinesBatch";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

console.clear();

let bg = {
  on: 0xaaaaaa,
  off: 0x000000
};
let scene = new Scene();
scene.background = new Color(bg.on);
let camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 15);
let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", (event) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
//controls.autoRotate = true;

let loader = new GLTFLoader().setPath(
  "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/"
);
loader.load("DamagedHelmet.gltf", (gltf) => {
  let model = gltf.scene;
  let gs = [];
  let nm = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.95
  });
  model.traverse((node) => {
    if (node.isMesh) {
      node.material = nm;
      node.updateMatrixWorld();
      gs.push(node.geometry.clone().applyMatrix4(node.matrixWorld));
    }
  });
  let flb = new FatLinesBatch(gs);
  flb.items.forEach((it, idx) => {
    flb.setColorAt(idx, 0x000000);
  });
  flb.material.linewidth = 4;
  flb.update();
  model.scale.setScalar(5);
  model.add(flb);
  scene.add(model);

  let gui = new GUI();
  let props = {
    thresholdAngle: 45
  };
  flb.thresholdAngle.value = MathUtils.degToRad(props.thresholdAngle);

  gui.add(flb.material, "linewidth", 1, 5).step(1).name("linewidth (px)");
  gui
    .add(props, "thresholdAngle", 0, 180)
    .name("thresholdAngle (deg)")
    .onChange((value) => {
      flb.thresholdAngle.value = MathUtils.degToRad(value);
    });
});

let clock = new Clock();

renderer.setAnimationLoop((_) => {
  let t = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
});
