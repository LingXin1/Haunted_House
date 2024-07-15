/**
 * ? 创建灯光脚本模块
 */

// ! 引入依赖
import * as THREE from "three";

// todo 创建环境光
const ambient = new THREE.AmbientLight("#b9d5ff", 0.1);
ambient.name = "环境光";

// todo 创建平行光
const directiona = new THREE.DirectionalLight("#b9d5ff", 1);
directiona.name = "平行光";
directiona.position.set(2, 2, 1);
directiona.castShadow = true;
directiona.shadow.camera.far = 5;
directiona.shadow.camera.near = 0.5;
directiona.shadow.camera.top = 3;
directiona.shadow.camera.bottom = -3;
directiona.shadow.camera.left = 3;
directiona.shadow.camera.right = -3;
directiona.shadow.mapSize.width = 1024;
directiona.shadow.mapSize.height = 1024;

// todo 创建门灯光源
const doorlight = new THREE.PointLight("#ff7d46", 1);
doorlight.position.set(0, 0.5, 0.8);
doorlight.castShadow = true;
doorlight.shadow.camera.far = 1;
doorlight.shadow.camera.near = 0.1;

// todo 创建鬼魂光源
const ghost_1 = new THREE.PointLight("#00ff00", 2, 10, 2);
ghost_1.position.set(3, 1, 1);
ghost_1.castShadow = true;
ghost_1.shadow.camera.fov = 120;
ghost_1.shadow.camera.far = 2;
ghost_1.shadow.camera.near = 0.1;

const ghost_2 = new THREE.PointLight("#00ffff", 1.5, 10, 2);
ghost_2.position.set(2, 0.8, 1);
ghost_2.castShadow = true;
ghost_2.shadow.camera.fov = 120;
ghost_2.shadow.camera.far = 2;
ghost_2.shadow.camera.near = 0.1;

const ghost_3 = new THREE.PointLight("#ffff00", 0.5, 10, 2);
ghost_3.position.set(1.5, 0.5, 1);
ghost_3.castShadow = true;
ghost_3.shadow.camera.fov = 120;
ghost_3.shadow.camera.far = 2;
ghost_3.shadow.camera.near = 0.1;

// ? 灯光辅助
const directionahelp = new THREE.DirectionalLightHelper(directiona, 0.5);
const doorhelp = new THREE.PointLightHelper(doorlight, 0.1);
const ghost_1help = new THREE.PointLightHelper(ghost_1, 0.1);
const ghost_2help = new THREE.PointLightHelper(ghost_2, 0.1);
const ghost_3help = new THREE.PointLightHelper(ghost_3, 0.1);

// ? 阴影灯光辅助
const directionashadowhelp = new THREE.CameraHelper(directiona.shadow.camera);
const doorshadowhelp = new THREE.CameraHelper(doorlight.shadow.camera);
const ghost_1shadowhelp = new THREE.CameraHelper(ghost_1.shadow.camera);
const ghost_2shadowhelp = new THREE.CameraHelper(ghost_2.shadow.camera);
const ghost_3shadowhelp = new THREE.CameraHelper(ghost_3.shadow.camera);

// ! 整体导出
const alllight = {
  ambient,
  directiona,
  doorlight,
  ghost_1,
  ghost_2,
  ghost_3,
  // * 灯光辅助
  //   directionahelp,
  //   doorhelp,
  //   ghost_1help,
  //   ghost_2help,
  //   ghost_3help,
  // * 阴影灯光辅助
  //   directionashadowhelp,
  //   doorshadowhelp,
  //   ghost_1shadowhelp,
  //   ghost_2shadowhelp,
  //   ghost_3shadowhelp,
};

export default alllight;
