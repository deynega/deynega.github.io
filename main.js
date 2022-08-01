const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "/src/applications/libs/loader.js";
import {mockWithVideo} from '/src/applications/libs/camera-mock.js';


document.addEventListener('DOMContentLoaded', () => {
  console.log('started');

  // const isiPhone = navigator.userAgent.indexOf(' iPhone ') >= 0

  // console.log('navigator.userAgent - ' + JSON.stringify(navigator.userAgent));


  const start = async() => {

    mockWithVideo("./src/assets/video/mock.mov");


    // initialize MindAR
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: './src/assets/targets/icvr.mind',
      uiScanning: '#scanning',
      uiLoading: 'yes',
      maxTrack: 5,
    });

    // mindarThree.switchCamera();
    const {renderer, scene, camera} = mindarThree;

    // add light
    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);


    /////
    // add gltf model
    const raccoon = await loadGLTF('/src/assets/models/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    // add model to anchor
    const raccoonAnchor = mindarThree.addAnchor(0);
    raccoonAnchor.group.add(raccoon.scene);

    // get animation
    const raccoonMixer = new THREE.AnimationMixer(raccoon.scene);
    const raccoonAction = raccoonMixer.clipAction(raccoon.animations[0]);
    raccoonAction.play();

    ///////


    //
    // //
    // const bear = await loadGLTF('/src/assets/models/musicband-bear/scene.gltf');
    // bear.scene.scale.set(0.1, 0.1, 0.1);
    // bear.scene.position.set(0, -0.4, 0);
    //
    // const bearAnchor = mindarThree.addAnchor(1);
    // bearAnchor.group.add(bear.scene);
    //
    // const bearMixer = new THREE.AnimationMixer(bear.scene);
    // const bearAction = bearMixer.clipAction(bear.animations[0]);
    // bearAction.play();
    //
    //
    // //
    // const bear2 = await loadGLTF('/src/assets/models/musicband-bear/scene.gltf');
    // bear2.scene.scale.set(0.1, 0.1, 0.1);
    // bear2.scene.position.set(0, -0.4, 0);
    //
    // const bearAnchor2 = mindarThree.addAnchor(2);
    // bearAnchor2.group.add(bear2.scene);
    //
    // const bearMixer2 = new THREE.AnimationMixer(bear2.scene);
    // const bearAction2 = bearMixer2.clipAction(bear2.animations[0]);
    // bearAction2.play();
    //
    //
    // //
    // const bear3 = await loadGLTF('/src/assets/models/musicband-bear/scene.gltf');
    // bear3.scene.scale.set(0.1, 0.1, 0.1);
    // bear3.scene.position.set(0, -0.4, 0);
    //
    // const bearAnchor3 = mindarThree.addAnchor(3);
    // bearAnchor3.group.add(bear3.scene);
    //
    // const bearMixer3 = new THREE.AnimationMixer(bear3.scene);
    // const bearAction3 = bearMixer3.clipAction(bear3.animations[0]);
    // bearAction3.play();
    //
    //
    // //
    // const bear4 = await loadGLTF('/src/assets/models/musicband-bear/scene.gltf');
    // bear4.scene.scale.set(0.1, 0.1, 0.1);
    // bear4.scene.position.set(0, -0.4, 0);
    //
    // const bearAnchor4 = mindarThree.addAnchor(4);
    // bearAnchor4.group.add(bear4.scene);
    //
    // const bearMixer4 = new THREE.AnimationMixer(bear4.scene);
    // const bearAction4 = bearMixer4.clipAction(bear4.animations[0]);
    // bearAction4.play();
    //
    //




    // // add model to anchor
    // const anchor = mindarThree.addAnchor(0);
    // anchor.group.add(raccoon.scene);

    // // get animation
    // const raccoonMixer = new THREE.AnimationMixer(raccoon.scene);
    // const raccoonAction = raccoonMixer.clipAction(raccoon.animations[0]);
    // raccoonAction.play();

    // const bearMixer = new THREE.AnimationMixer(bear.scene);
    // const bearAction = bearMixer.clipAction(bear.animations[0]);
    // bearAction.play();



    const clock = new THREE.Clock();


    raccoonAnchor.onTargetFound = () => {
      console.log("raccoonAnchor on target found");
    }
    raccoonAnchor.onTargetLost = () => {
      console.log("raccoonAnchor on target lost");
    }
    // bearAnchor.onTargetFound = () => {
    //   console.log("bearAnchor on target found");
    // }
    // bearAnchor.onTargetLost = () => {
    //   console.log("bearAnchor on target lost");
    // }
    // bearAnchor2.onTargetFound = () => {
    //   console.log("bearAnchor2 on target found");
    // }
    // bearAnchor2.onTargetLost = () => {
    //   console.log("bearAnchor2 on target lost");
    // }
    // bearAnchor3.onTargetFound = () => {
    //   console.log("bearAnchor3 on target found");
    // }
    // bearAnchor3.onTargetLost = () => {
    //   console.log("bearAnchor3 on target lost");
    // }
    // bearAnchor4.onTargetFound = () => {
    //   console.log("bearAnchor4 on target found");
    // }
    // bearAnchor4.onTargetLost = () => {
    //   console.log("bearAnchor4 on target lost");
    // }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      // raccoon.scene.rotation.set(0, raccoon.scene.rotation.y+delta, 0);
      // mixer.update(delta);
      raccoonMixer.update(delta);
      // bearMixer.update(delta);
      // bearMixer2.update(delta);
      // bearMixer3.update(delta);
      // bearMixer4.update(delta);
      renderer.render(scene, camera);
    });
  }
  start();
});
