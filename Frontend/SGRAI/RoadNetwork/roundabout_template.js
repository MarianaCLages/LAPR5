import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String
 * }
 */

export default class Roundabout {
  constructor(parameters) {
    /*
    for (const [key, value] of Object.entries(parameters)) {
       Object.defineProperty(this, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: true,
      }); 
    } */

    // Create a texture
    /* To-do #8 - Load the wall texture image
            - image location: this.textureUrl
        const texture = new THREE.TextureLoader().load(this.textureUrl); */

    /* To-do #9 - Configure the magnification and minification filters:
            - magnification filter: linear
            - minification filter: mipmapping and trilinear
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter; */

    // Create a group of objects
    this.object = new THREE.Group();

    const geometry = new THREE.CircleGeometry(2.1 * 1 / 2, 32); // alturar o 1 para wi (largura do nó)
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
    });
    const roundabout = new THREE.Mesh(geometry, material);

    this.object.rotation.x = -Math.PI / 2.0;
    this.object.scale.set(1.5, 1.5, 1.5);

    /* To-do #35 - Set the left faces to cast and receive shadows */
    roundabout.castShadow = true;
    roundabout.receiveShadow = true;
    this.object.add(roundabout);
  }
}
