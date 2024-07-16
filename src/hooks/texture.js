/**
 * ? 创建纹理脚本模块
 */

// ! 引入依赖
import * as THREE from "three";

// ! 定义变量
let textureloader;

// todo 创建纹理跟踪器
const manager = new THREE.LoadingManager();
manager.onStart = () => {};
manager.onProgress = (url, loaded, total) => {
  const index = (loaded / total) * 100;
  console.log(index);
  const bar = document.querySelector(".line_bar");
  bar.style.width = `${Math.ceil(index)}%`;
};
manager.onLoad = () => {
  const mask_layer = document.querySelector(".mask_layer");
  const title = document.querySelector(".mask_title");
  title.innerHTML = "加载完毕";
  setTimeout(() => {
    mask_layer.style.opacity = 0;
    mask_layer.style.display = "none";
  }, 2000);
  console.log("加载完毕");
};

// todo 加载纹理
textureloader = new THREE.TextureLoader(manager);

// * 加载草地纹理
const grasstexture = {};
grasstexture.map = textureloader.load("./img/grass/Grass002_2K-JPG_Color.jpg");
grasstexture.aoMap = textureloader.load(
  "./img/grass/Grass002_2K-JPG_AmbientOcclusion.jpg"
);
grasstexture.displacementMap = textureloader.load(
  "./img/grass/Grass002_2K-JPG_Displacement.jpg"
);
grasstexture.normalMap = textureloader.load(
  "./img/grass/Grass002_2K-JPG_NormalDX.jpg"
);
grasstexture.roughnessMap = textureloader.load(
  "./img/grass/Grass002_2K-JPG_Roughness.jpg"
);

for (const key in grasstexture) {
  grasstexture[key].colorSpace = THREE.SRGBColorSpace;
  grasstexture[key].wrapS = THREE.RepeatWrapping;
  grasstexture[key].wrapT = THREE.RepeatWrapping;
  grasstexture[key].repeat = new THREE.Vector2(4, 4);
}

// * 加载房子纹理
const walltexture = {};
walltexture.map = textureloader.load(
  "./img/wall/Stylized_Bricks_004_basecolor.png"
);
walltexture.aoMap = textureloader.load(
  "./img/wall/Stylized_Bricks_004_ambientOcclusion.png"
);
walltexture.displacementMap = textureloader.load(
  "./img/wall/Stylized_Bricks_004_height.png"
);
walltexture.normalMap = textureloader.load(
  "./img/wall/Stylized_Bricks_004_normal.png"
);
walltexture.roughnessMap = textureloader.load(
  "./img/wall/Stylized_Bricks_004_roughness.png"
);

for (const key in walltexture) {
  walltexture[key].colorSpace = THREE.SRGBColorSpace;
  walltexture[key].wrapS = THREE.RepeatWrapping;
  walltexture[key].wrapT = THREE.RepeatWrapping;
  walltexture[key].repeat = new THREE.Vector2(2, 2);
}

// * 加载房顶纹理
const rooftexture = {};
rooftexture.map = textureloader.load(
  "./img/roof/Roof_Tiles_Terracotta_006_basecolor.jpg"
);
rooftexture.aoMap = textureloader.load(
  "./img/roof/Roof_Tiles_Terracotta_006_ambientOcclusion.jpg"
);
rooftexture.displacementMap = textureloader.load(
  "./img/roof/Roof_Tiles_Terracotta_006_height.png"
);
rooftexture.normalMap = textureloader.load(
  "./img/roof/Roof_Tiles_Terracotta_006_normal.jpg"
);
rooftexture.roughnessMap = textureloader.load(
  "./img/roof/Roof_Tiles_Terracotta_006_roughness.jpg"
);

for (const key in rooftexture) {
  rooftexture[key].colorSpace = THREE.SRGBColorSpace;
  rooftexture[key].wrapS = THREE.RepeatWrapping;
  rooftexture[key].wrapT = THREE.RepeatWrapping;
  rooftexture[key].repeat = new THREE.Vector2(2, 2);
}

// * 加载门纹理
const doortexture = {};
doortexture.map = textureloader.load("./img/door/Door_Wood_001_basecolor.jpg");
doortexture.aoMap = textureloader.load(
  "./img/door/Door_Wood_001_ambientOcclusion.jpg"
);
doortexture.displacementMap = textureloader.load(
  "./img/door/Door_Wood_001_height.png"
);
doortexture.normalMap = textureloader.load(
  "./img/door/Door_Wood_001_normal.jpg"
);
doortexture.roughnessMap = textureloader.load(
  "./img/door/Door_Wood_001_roughness.jpg"
);
doortexture.alphaMap = textureloader.load(
  "./img/door/Door_Wood_001_opacity.jpg"
);
doortexture.metalnessMap = textureloader.load(
  "./img/door/Door_Wood_001_metallic.jpg"
);

for (const key in doortexture) {
  doortexture[key].colorSpace = THREE.SRGBColorSpace;
}

// * 加载草丛纹理
const grassflower = {};
grassflower.map = textureloader.load(
  "./img/grassflower/Stylized_Grass_002_basecolor.jpg"
);
grassflower.aoMap = textureloader.load(
  "./img/grassflower/Stylized_Grass_002_ambientOcclusion.jpg"
);
grassflower.displacementMap = textureloader.load(
  "./img/grassflower/Stylized_Grass_002_height.png"
);
grassflower.normalMap = textureloader.load(
  "./img/grassflower/Stylized_Grass_002_normal.jpg"
);
grassflower.roughnessMap = textureloader.load(
  "./img/grassflower/Stylized_Grass_002_roughness.jpg"
);

for (const key in grassflower) {
  grassflower[key].colorSpace = THREE.SRGBColorSpace;
}

// * 加载雪花纹理
const snowtexture = {};
snowtexture.map = textureloader.load("./img/snow/snow.png");

// ! 整体导出纹理
const alltextures = {
  grasstexture,
  walltexture,
  rooftexture,
  doortexture,
  grassflower,
  snowtexture,
};

export default alltextures;
