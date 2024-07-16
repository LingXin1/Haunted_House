<script setup>
// ! 引入依赖
import { ref, onMounted } from "vue";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { allmesh, models, allgrassflower, snow } from "./hooks/mesh";
import alllight from "./hooks/light";

// ! 定义变量
let scene, camera, renderer, controls;
const canvas = ref(null);

// ! 定义控制器面板
const gui = new GUI({
  title: "控制面板",
  closeFolders: true,
});
gui.close();

const light_controller = gui.addFolder("灯光控制");
const grass_controller = gui.addFolder("地面材质");

// todo 创建场景
scene = new THREE.Scene();
scene.background = new THREE.Color("#262837");
scene.fog = new THREE.Fog("#262837", 2, 6);

// todo 添加模型
for (const key in allmesh) {
  scene.add(allmesh[key]);
}
grass_controller
  .add(allmesh.grass.material, "roughness")
  .min(0)
  .max(1)
  .step(0.1)
  .name("粗糙程度");

models.tombstonearr.forEach((item) => {
  scene.add(item);
});

scene.add(models.zombies.model);

allgrassflower.forEach((item) => {
  scene.add(item);
});

scene.add(snow);

// todo 模型动画
const mixer = new THREE.AnimationMixer(models.zombies.model);
const action = mixer.clipAction(models.zombies.animation[0]);
action.play();

// todo 添加灯光
for (const key in alllight) {
  scene.add(alllight[key]);
}
light_controller
  .add(alllight.ambient, "intensity")
  .min(0)
  .max(5)
  .step(0.1)
  .name(alllight.ambient.name);
light_controller
  .add(alllight.directiona, "intensity")
  .min(0)
  .max(5)
  .step(0.1)
  .name(alllight.directiona.name);

// todo 创建相机
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 0.2, 3);

// ! 动画函数
const clock = new THREE.Clock();
const tick = () => {
  const elapsed = clock.getElapsedTime();
  const amplitude_1 = elapsed * 0.5;
  const amplitude_2 = -elapsed * 0.3;
  const amplitude_3 = elapsed * 0.4;
  requestAnimationFrame(tick);
  // todo 鬼魂动画
  alllight.ghost_1.position.x = Math.cos(amplitude_1) * 2;
  alllight.ghost_1.position.y = Math.sin(amplitude_1 * 2);
  alllight.ghost_1.position.z = Math.sin(amplitude_1) * 2;

  alllight.ghost_2.position.x = Math.cos(amplitude_2) * 2;
  alllight.ghost_2.position.y =
    Math.sin(amplitude_2 * 2) + Math.sin(amplitude_2 * 1.5);
  alllight.ghost_2.position.z = Math.sin(amplitude_2) * 2;

  alllight.ghost_3.position.x =
    Math.cos(amplitude_3) * (2 + Math.sin(amplitude_3 * 0.3));
  alllight.ghost_3.position.y =
    Math.sin(amplitude_3 * 2) + Math.sin(amplitude_3 * 0.3);
  alllight.ghost_3.position.z =
    Math.sin(amplitude_3) * Math.sin(amplitude_3 * 0.3);

  // todo 僵尸动画
  mixer.update(0.01);
  models.zombies.model.position.x = -3 + elapsed / 20;

  renderer.render(scene, camera);
  controls.update();
};

onMounted(() => {
  // todo 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  // todo 创建轨道控制器
  controls = new OrbitControls(camera, canvas.value);

  // todo 执行动画
  tick();
});

// todo 窗口自适应
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio = window.devicePixelRatio;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
</script>

<template>
  <canvas ref="canvas" id="canvas"></canvas>
</template>

<style scoped>
#canvas {
  position: absolute;
  top: 0;
}
</style>
