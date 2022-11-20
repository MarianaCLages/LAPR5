// import * as THREE from "three";


 /* parameters = {
 textureUrl: String,
 size: Vector2
 } */ 

/*
export default class Ground {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        // Create a texture
        // Load the ground texture image
        const texture = new THREE.TextureLoader().load(this.textureUrl);

        // Set the texture wrapping modes
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);

        // Configure the magnification and minification filters:
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a ground box that receives shadows but does not cast them
        const geometry = new THREE.PlaneGeometry(this.size.width, this.size.height);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
        this.object = new THREE.Mesh(geometry, material);
        this.object.rotation.x = -Math.PI / 2.0;

        // Set the ground box to receive shadows but not cast them
        this.object.castShadow = false;
        this.object.receiveShadow = true;
    }
}
*/