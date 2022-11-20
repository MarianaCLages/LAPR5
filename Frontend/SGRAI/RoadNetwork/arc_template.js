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

    var ls = 200; // length segments
    var ws = 2; // width segments, tracks

    var lss = ls + 1;
    var wss = ws + 1;

    var faceCount = ls * ws * 2;
    var vertexCount = lss * wss;

    var g = new THREE.BufferGeometry();

    g.faceIndices = new Uint32Array(faceCount * 3);
    g.vertices = new Float32Array(vertexCount * 3);

    g.setIndex(new THREE.BufferAttribute(g.faceIndices, 1));
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(g.vertices, 3).setDynamic(true)
    );

    var idxCount = 0;

    for (var j = 0; j < ls; j++) {
      for (var i = 0; i < ws; i++) {
        // 2 faces / segment,  3 vertex indices
        a = wss * j + i;
        b1 = wss * (j + 1) + i; // right-bottom
        c1 = wss * (j + 1) + 1 + i;
        b2 = wss * (j + 1) + 1 + i; // left-top
        c2 = wss * j + 1 + i;

        g.faceIndices[idxCount] = a; // right-bottom
        g.faceIndices[idxCount + 1] = b1;
        g.faceIndices[idxCount + 2] = c1;

        g.faceIndices[idxCount + 3] = a; // left-top
        (g.faceIndices[idxCount + 4] = b2), (g.faceIndices[idxCount + 5] = c2);

        g.addGroup(idxCount, 6, i); // write groups for multi material

        idxCount += 6;
      }
    }

    var curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-25, 0, -25),
      new THREE.Vector3(-4, 2, -9),
      new THREE.Vector3(4, 1, -6),
      new THREE.Vector3(6, 0, 0),
      new THREE.Vector3(-3, 1, 1),
      new THREE.Vector3(-11, 0, 6),
      new THREE.Vector3(-12, 1, 1),
      new THREE.Vector3(-7, 1, -3),
      new THREE.Vector3(7, 8, -9),
      new THREE.Vector3(13, 2, -12),
    ]);

    var points = curve.getPoints(ls);
    var curveGeometry = new THREE.BufferGeometry().setFromPoints(points);

    var tangent;
    var normal = new THREE.Vector3(0, 0, 0);
    var binormal = new THREE.Vector3(0, 1, 0);

    var vIdx = 0; // vertex index
    var posIdx; // position  index

    for (var j = 0; j < lss; j++) {
      // length

      for (var i = 0; i < wss; i++) {
        // width

        // calculate here the coordinates according to your wishes

        tangent = curve.getTangent(j / ls); //  .. / length segments

        normal.cross(tangent, binormal);

        binormal.cross(normal, tangent); // new binormal

        normal.normalize().multiplyScalar(0.25);

        var x = points[j].x + (i - ws / 2) * normal.x;
        var y = points[j].y;
        var z = points[j].z + (i - ws / 2) * normal.z;

        xyzSet();

        vIdx++;
      }
    }

    g.attributes.position.needsUpdate = true;
    //g.attributes.normal.needsUpdate = true;

    var material = [
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        side: THREE.DoubleSide,
        wireframe: true,
      }),
    ];

    var mesh = new THREE.Mesh(g, material);
    this.object.add(mesh);

    var curveMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    var curveLine = new THREE.Line(curveGeometry, curveMaterial);
    
    this.object.add(curveLine);
  }
}
