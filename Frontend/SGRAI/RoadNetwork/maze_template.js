import * as THREE from "three";
import Roundabout from "./roundabout_template.js";
import Arc from "./arc_template.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
  constructor(parameters) {
    function onLoad(maze, description) {
      // Store the maze's map and size
      maze.map = description.map;
      maze.size = description.size;

      // Store the player's initial position and direction
      maze.initialPosition = maze.cellToCartesian(description.initialPosition);
      maze.initialDirection = description.initialDirection;

      // Create a group of objects
      maze.object = new THREE.Group();

      // Create a roundabout
      maze.roundabout = new Roundabout();

      let roundaboutObject;
      for (let i = 0; i < description.map.length; i++) {
        roundaboutObject = maze.roundabout.object.clone();
        roundaboutObject.position.set(
          description.map[i][0],
          description.map[i][1],
          description.map[i][2]
        );
        maze.object.add(roundaboutObject);
      }

      let points = [];

      // material

      var material = new THREE.LineBasicMaterial();

      for (let i = 0; i < description.roads.length; i++) {
        for (let j = 0; j < description.roads[i].length; j++) {
          if (description.roads[i][j] != 0) {

            points.push(
              new THREE.Vector3(
                description.map[i][0],
                description.map[i][1],
                description.map[i][2]
              )
            );
            points.push(
              new THREE.Vector3(
                description.map[j][0],
                description.map[j][1],
                description.map[j][2]
              )
            );

            var geometry = new THREE.BufferGeometry().setFromPoints(points);
            var line = new THREE.Line(geometry, material);

            maze.object.add(line);
          }
        }
      }


      /*
      let i = 2;
      let j = 1;
       
      let a = new THREE.Vector3(description.map[i][0], description.map[i][1],description.map[i][2]);
      let b = new THREE.Vector3(description.map[j][0], description.map[j][1], description.map[j][2]);
      let c = new THREE.Vector3(description.map[i][0] - 1, description.map[i][1] - 1,description.map[i][2] - 1);

      let geometry = new THREE.PlaneGeometry(a.x - b.x, a.y - b.y);

      a.normalize();
      b.normalize();
      c.normalize();

      var quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(a, b);

      var euler = new THREE.Euler();
      euler.setFromQuaternion(quaternion);
      geometry.rotateX(euler.toArray()[0]);
      geometry.rotateX(euler.toArray()[1]);
      geometry.rotateX(euler.toArray()[2]);

      var plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          color: "red",
          side: THREE.DoubleSide,
        })
      );

      */


      /*
      const geometry = new THREE.PlaneGeometry(16 / 10, 9 / 10, 16, 16);
      const positions = geometry.attributes.position;

      const axis = new THREE.Vector3(0, 1, 0);
      const axisPosition = new THREE.Vector3(-2, 0, 2);
      const vTemp = new THREE.Vector3(0, 0, 0);
      let lengthOfArc;
      let angleOfArc;

      for (let i = 0; i < description.roads.length; i++) {
        for (let j = 0; j < description.roads[i].length; j++) {
          if (description.roads[i][j] != 0) {
            for (let i = 0; i < positions.count; i++) {
              vTemp.fromBufferAttribute(positions, i);
              lengthOfArc = vTemp.x - axisPosition.x;
              angleOfArc = lengthOfArc / axisPosition.z;
              vTemp
                .setX(0)
                .setZ(-axisPosition.z)
                .applyAxisAngle(axis, -angleOfArc)
                .add(axisPosition);
              positions.setXYZ(i, vTemp.x - 1, vTemp.y, vTemp.z);
            }

            geometry.rotateY(1);
            geometry.translate(0, 0, -1.6);

            const material = new THREE.MeshBasicMaterial({ map: texture });
            material.side = THREE.DoubleSide;

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = 1.8;

            maze.object.add(line);
          }
        }
      }

      var myPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      */

      maze.object.scale.set(maze.scale.x, maze.scale.y, maze.scale.z);
      maze.loaded = true;
    }

    function onProgress(url, xhr) {
      console.log(
        "Resource '" +
          url +
          "' " +
          ((100.0 * xhr.loaded) / xhr.total).toFixed(0) +
          "% loaded."
      );
    }

    function onError(url, error) {
      console.error("Error loading resource " + url + " (" + error + ").");
    }

    for (const [key, value] of Object.entries(parameters)) {
      Object.defineProperty(this, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }
    this.loaded = false;

    // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
    THREE.Cache.enabled = true;

    // Create a resource file loader
    const loader = new THREE.FileLoader();

    // Set the response type: the resource file will be parsed with JSON.parse()
    loader.setResponseType("json");

    // Load a maze description resource file
    loader.load(
      //Resource URL
      this.url,

      // onLoad callback
      (description) => onLoad(this, description),

      // onProgress callback
      (xhr) => onProgress(this.url, xhr),

      // onError callback
      (error) => onError(this.url, error)
    );
  }

  // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
  cellToCartesian(position) {
    return new THREE.Vector3(
      (position[1] - this.size.height / 2.0 + 0.5) * this.scale.x,
      0.0,
      (position[0] - this.size.width / 2.0 + 0.5) * this.scale.z
    );
  }

  // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
  cartesianToCell(position) {
    return [
      Math.floor(position.z / this.scale.z + this.size.width / 2.0),
      Math.floor(position.x / this.scale.x + this.size.height / 2.0),
    ];
  }
}
