/**
 * ? 创建物体脚本模块
 */

// ! 引入依赖
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// ! 引入材质
import alltextures from "./texture";

// ! 模型加载器实例
const gltfloader = new GLTFLoader();

// * 草地材质与结构
const grassmaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  displacementScale: 0,
  aoMapIntensity: 1,
  roughness: 1,
  normalScale: new THREE.Vector2(0, 1),
  ...alltextures.grasstexture,
});
const grassgeometry = new THREE.PlaneGeometry(10, 10, 100, 100);

// * 房子材质与结构
const wallmaterial = new THREE.MeshStandardMaterial({
  displacementScale: 0,
  aoMapIntensity: 0,
  roughness: 1,
  ...alltextures.walltexture,
});
const wallgeometry = new THREE.BoxGeometry(1, 0.6, 1);

// * 房顶材质与结构
const roofmaterial = new THREE.MeshStandardMaterial({
  displacementScale: 0.05,
  aoMapIntensity: 0,
  roughness: 1,
  ...alltextures.rooftexture,
});
const roofgeometry = new THREE.ConeGeometry(1, 0.5, 4, 128, 128);

// * 门材质与结构
const doormaterial = new THREE.MeshStandardMaterial({
  displacementScale: 0.02,
  transparent: true,
  aoMapIntensity: 1,
  metalness: 0.8,
  roughness: 0.2,
  ...alltextures.doortexture,
});
const doorgeometry = new THREE.PlaneGeometry(0.4, 0.4, 100, 100);

// * 草丛材质与结构
const grassflowermaterial = new THREE.MeshStandardMaterial({
  displacementScale: 0.04,
  aoMapIntensity: 1,
  roughness: 1,
  ...alltextures.grassflower,
});
const setgrassflowergeometry = (radius) => {
  return new THREE.SphereGeometry(radius, 64, 128);
};

// * 创建下雪粒子
const num = 5000;
const snowarr = [];
for (let i = 0; i < num * 3; i++) {
  const index = i * 3;
  snowarr[index] = (Math.random() - 0.5) * 10;
  snowarr[index + 1] = 0.005;
  snowarr[index + 2] = (Math.random() - 0.5) * 10;
}

const snowgeometry = new THREE.BufferGeometry();
snowgeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(snowarr, 3)
);
const snowmaterial = new THREE.PointsMaterial({
  size: 10,
  sizeAttenuation: false,
  transparent: true,
  alphaTest: 0.1,
  ...alltextures.snowtexture,
});

// todo 创建草地
const grass = new THREE.Mesh(grassgeometry, grassmaterial);
grass.name = "草地";
grass.rotation.x = Math.PI / 2;
grass.receiveShadow = true;

// todo 创建房子
const wall = new THREE.Mesh(wallgeometry, wallmaterial);
wall.position.y = 0.31;
wall.castShadow = true;

// todo 创建房顶
const roof = new THREE.Mesh(roofgeometry, roofmaterial);
roof.position.y = 0.81;
roof.rotation.y = Math.PI / 4;
roof.castShadow = true;

// todo 创建门
const door = new THREE.Mesh(doorgeometry, doormaterial);
door.position.set(0, 0.2, 0.51);

// todo 创建墓碑群与僵尸
const getmodel = async () => {
  const num = 60;
  const tombstonearr = [];
  let zombies = {};
  const { scene: tombstone } = await gltfloader.loadAsync("./model/MUB.glb");
  const { scene: zombie, animations } = await gltfloader.loadAsync(
    "./model/zombie.glb"
  );
  zombie.traverse((item) => {
    item.castShadow = true;
  });
  zombie.scale.set(0.008, 0.008, 0.008);
  zombie.position.set(-3, 0, 1.5);
  zombie.rotation.y = Math.PI / 2;

  zombies.model = zombie;
  zombies.animation = animations;

  for (let i = 0; i <= num; i++) {
    tombstonearr.push(tombstone.clone());
  }
  return { tombstonearr, zombies };
};
const models = await getmodel();

models.tombstonearr.forEach((item) => {
  const angel = Math.random() * Math.PI * 2;
  const radius = Math.random() * 2 + 2;
  const x = Math.sin(angel) * radius;
  const z = Math.cos(angel) * radius;
  const rotationx = (Math.PI / 8) * (Math.random() - 0.5);
  const rotationy = (Math.PI / 8) * (Math.random() - 0.5);
  const rotationz = (Math.PI / 8) * (Math.random() - 0.5);
  item.traverse((item) => {
    item.castShadow = true;
  });
  item.scale.set(0.1, 0.1, 0.1);
  item.position.set(x, 0, z);
  item.rotation.set(rotationx, rotationy, rotationz);
});

// todo 创建草丛
const allgrassflower = [];
const grassflower_1 = new THREE.Mesh(
  setgrassflowergeometry(0.05),
  grassflowermaterial
);
grassflower_1.castShadow = true;
grassflower_1.position.set(-0.3, 0.05, 0.6);
const grassflower_2 = new THREE.Mesh(
  setgrassflowergeometry(0.1),
  grassflowermaterial
);
grassflower_2.castShadow = true;
grassflower_2.position.set(-0.2, 0.1, 0.6);
const grassflower_3 = new THREE.Mesh(
  setgrassflowergeometry(0.08),
  grassflowermaterial
);
grassflower_3.castShadow = true;
grassflower_3.position.set(0.2, 0.08, 0.6);
allgrassflower.push(grassflower_1, grassflower_2, grassflower_3);

// todo 创建雪花飘落
const snow = new THREE.Points(snowgeometry, snowmaterial);

// ! 整体导出
const allmesh = {
  grass,
  wall,
  roof,
  door,
  snow,
};

export { allmesh, models, allgrassflower, snow };
