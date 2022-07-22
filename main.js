const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  console.log('started');
  const start = async() => {
    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './src/assets/targets/test2.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    // create AR object
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    // create anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    // start AR
    console.log('start AR---');
    await mindarThree.start();
    console.log('mindarThree started');
    renderer.setAnimationLoop(() => {
      console.log('render');
      renderer.render(scene, camera);
    });
  }
  start();
});
