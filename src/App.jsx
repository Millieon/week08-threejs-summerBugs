import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {

    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load('./assets/budda/scene.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(1, 1, 1);
      test.scene.add(gltfScene.scene);
    });

    const fontLoader = new FontLoader();
    fontLoader.load(
      'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => {
        const textGeometry = new TextGeometry('Take a bow', {
          size: 20,
          height: 4,
          font: droidFont,
        });
        const textMaterial = new THREE.MeshNormalMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -70;
        textMesh.position.y = -25;
        test.scene.add(textMesh);
      }
    );




    const animate = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.x += 0.001;
        //loadedModel.scene.rotation.y += 0.01;
        //loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
