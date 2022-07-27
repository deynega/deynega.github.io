const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "/src/applications/libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
  console.log('started');

  const isiPhone = navigator.userAgent.indexOf(' iPhone ') >= 0

  console.log('navigator.userAgent - ' + JSON.stringify(navigator.userAgent));


  const start = async() => {
    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './src/assets/targets/card.mind',
    });

    // mindarThree.switchCamera();
    const {renderer, scene, camera} = mindarThree;

    // add light
    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    // add gltf model
    const raccoon = await loadGLTF('/src/assets/models/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);


    // add model to anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    // get animation
    const mixer = new THREE.AnimationMixer(raccoon.scene);
    const action = mixer.clipAction(raccoon.animations[0]);
    action.play();

    const clock = new THREE.Clock();


    anchor.onTargetFound = () => {
      console.log("on target found");
    }
    anchor.onTargetLost = () => {
      console.log("on target lost");
    }

    document.querySelector("#switch").addEventListener("click", () => {
      console.log('switch click');
      // mindarThree.switchCamera();
    });

    document.querySelector("#check").addEventListener("click", async () => {
      console.log('check click');

      const dev = navigator.mediaDevices.enumerateDevices().then(mediaD => {

        console.log('mediaD - ' + JSON.stringify(mediaD));


       let mediaDevices = mediaD.filter(d => d.kind === 'videoinput');
        console.log(JSON.stringify(`mediaDevices - ${ JSON.stringify(mediaDevices) }`));

      })

      console.log('enumerateDevices - ', navigator.mediaDevices.enumerateDevices());

    });
    
    
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      // raccoon.scene.rotation.set(0, raccoon.scene.rotation.y+delta, 0);
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  }
  start();
});
