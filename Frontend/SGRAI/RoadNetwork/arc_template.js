import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String
 * }
 */

export default class Arc {
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

    // Create a material
    /* To-do #10 - Create a material
            - material type: MeshBasicMaterial      
    this.object.add(curveLine);
    */
  }
}
