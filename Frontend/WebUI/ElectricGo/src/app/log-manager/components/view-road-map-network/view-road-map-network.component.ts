import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

//import Stats from 'stats.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

import jsonInfo from './roadMap/roadMap.json';
import { single } from 'rxjs';

@Component({
  selector: 'app-view-road-map-network',
  templateUrl: './view-road-map-network.component.html',
  styleUrls: ['./view-road-map-network.component.css'],
})
export class ViewRoadMapNetworkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  //ANIMATION

  @Input() public size: number = 200;

  //Road Texture
  @Input() public texture: string = './roadMap/road_free.png';

  //STAGE PROPERTIES

  @Input() public cameraZ: number = 6000;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 10000;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();

  private roundabout!: THREE.Mesh;

  private render!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private roadMap!: THREE.Group;

  private controls!: OrbitControls;

  private createRoadMap() {
    this.roadMap = new THREE.Group();
    this.createRoundAbout();
    this.scene.add(this.roadMap);
    //this.roadMap.scale.set(2,2,2);

    //DEFINE THE BACK GROUND COLOR
    this.scene.background = new THREE.Color(0xadd8e6);

    // ROUNDABOUTS
    for (let i = 0; i < jsonInfo.map.length; i++) {
      let roundabouT = this.roundabout.clone();

      //Set the position of the roundabout
      roundabouT.position.set(
        jsonInfo.map[i][0],
        jsonInfo.map[i][1],
        jsonInfo.map[i][2]
      );

      this.roadMap.add(roundabouT);
    }

    const circleConstant = 2;
    const connectionConstant = 0.5;

    const connectionLength = connectionConstant * circleConstant;

    const radius = 2.1;

    // const roadTexture = new THREE.TextureLoader().load(
    //   'Frontend/WebUI/ElectricGo/src/app/log-manager/components/view-road-map-network/roadMap/road_1.jpg'
    // );

    for (let i = 0; i < jsonInfo.paths.length; i++) {
      //INFO
      let initWarehouse = jsonInfo.paths[i][0] - 1;
      let finalWarehouse = jsonInfo.paths[i][1] - 1;
      let roadWidth = jsonInfo.paths[i][2];

      // //Incoming Edges
      const material2 = new THREE.LineBasicMaterial({ color: 0xff0000 });

      let points = [];
      let points2 = [];

      const difX =
        jsonInfo.map[initWarehouse][0] - jsonInfo.map[finalWarehouse][0];
      const difY =
        jsonInfo.map[initWarehouse][1] - jsonInfo.map[finalWarehouse][1];
      const difZ =
        jsonInfo.map[initWarehouse][2] - jsonInfo.map[finalWarehouse][2];

      points.push(
        new THREE.Vector3(
          jsonInfo.map[initWarehouse][0],
          jsonInfo.map[initWarehouse][1],
          jsonInfo.map[initWarehouse][2]
        )
      );
      points.push(
        new THREE.Vector3(
          jsonInfo.map[initWarehouse][0] - 0.1 * difX,
          jsonInfo.map[initWarehouse][1] - 0.1 * difY,
          jsonInfo.map[initWarehouse][2]
        )
      );
      points2.push(
        new THREE.Vector3(
          jsonInfo.map[finalWarehouse][0],
          jsonInfo.map[finalWarehouse][1],
          jsonInfo.map[finalWarehouse][2]
        )
      );
      points2.push(
        new THREE.Vector3(
          jsonInfo.map[finalWarehouse][0] + 0.1 * difX,
          jsonInfo.map[finalWarehouse][1] + 0.1 * difY,
          jsonInfo.map[finalWarehouse][2]
        )
      );

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);

      const line = new THREE.Line(geometry, material2);
      const line2 = new THREE.Line(geometry2, material2);

      this.roadMap.add(line);
      this.roadMap.add(line2);

      //Outgoing Edges

      //Incoming Edge final
      let finalWarehousePosX = jsonInfo.map[finalWarehouse][0] + 0.1 * difX;
      let finalWarehousePosY = jsonInfo.map[finalWarehouse][1] + 0.1 * difY;
      let finalWarehousePosZ = jsonInfo.map[finalWarehouse][2];

      //Incoming Edge init
      let initWarehousePosX = jsonInfo.map[initWarehouse][0] - 0.1 * difX;
      let initWarehousePosY = jsonInfo.map[initWarehouse][0] - 0.1 * difY;
      let initWarehousePosZ = jsonInfo.map[initWarehouse][2];


      let roadLength = Math.sqrt(
        Math.pow(
          jsonInfo.map[finalWarehouse][0] - jsonInfo.map[initWarehouse][0],
          2
        ) +
          Math.pow(
            jsonInfo.map[finalWarehouse][1] - jsonInfo.map[initWarehouse][1],
            2
          ) +
          Math.pow(
            jsonInfo.map[finalWarehouse][2] - jsonInfo.map[initWarehouse][2],
            2
          )
      );

      let angle =
        Math.sqrt(
          Math.pow(
            jsonInfo.map[finalWarehouse][0] - jsonInfo.map[initWarehouse][0],
            2
          ) +
            Math.pow(
              jsonInfo.map[finalWarehouse][1] - jsonInfo.map[initWarehouse][1],
              2
            )
        ) -
        connectionLength * 2;

      //Road information
      let roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength, 32);
      let roadMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
      });

      let road = new THREE.Mesh(roadGeometry, roadMaterial);

      road.position.set(
        (jsonInfo.map[finalWarehouse][0] + jsonInfo.map[initWarehouse][0]) / 2,
        (jsonInfo.map[finalWarehouse][1] + jsonInfo.map[initWarehouse][1]) / 2,
        (jsonInfo.map[finalWarehouse][2] + jsonInfo.map[initWarehouse][2]) / 2
      );

      road.rotation.z =
        Math.atan2(
          jsonInfo.map[finalWarehouse][1] - jsonInfo.map[initWarehouse][1],
          jsonInfo.map[finalWarehouse][0] - jsonInfo.map[initWarehouse][0]
        ) -
        Math.PI / 2;

      road.rotateOnAxis(
        new THREE.Vector3(1, 0, 0),
        Math.atan2(
          jsonInfo.map[finalWarehouse][2] - jsonInfo.map[initWarehouse][2],
          angle
        )
      );

      this.roadMap.add(road);
    }
  }

  private createRoundAbout() {
    const geometry = new THREE.CircleGeometry((2.1 * 1) / 2, 32);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    });
    this.roundabout = new THREE.Mesh(geometry, material);

    //this.roundabout.rotation.x = -Math.PI / 2.0;

    this.roundabout.scale.set(1.5, 1.5, 1.5);

    this.roundabout.castShadow = true;
    this.roundabout.receiveShadow = true;
  }

  //CREATE THE SCENE

  private createScene() {
    //SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    //this.scene.add(this.cube);

    this.createRoadMap();

    //Rotate the scene to a correct angle
    this.scene.rotation.x = -Math.PI / 2.0;

    //CAMERA
    let aspectRatio = this.getAspectRatio();

    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );

    this.camera.position.z = this.cameraZ;

    //this.camera.position.set( 0, 0, this.cube.position.z - 1000 );// OrbitControls target is the origin

    //this.camera.position.set(26.6951, -36.7615, 34.375);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private calculateCoordinates() {
    // x = R * cos(lat) * cos(lon)

    // y = R * cos(lat) * sin(lon)

    // z = R *sin(lat)

    const r = 6371;

    // let x = r * Math.cos(lat) * Math.cos(lon);
    // let y = r * Math.sin(lat) * Math.cos(lon);
    // let z = r * Math.sin(lat);
  }

  private startRenderingLoop() {
    //Renderer
    //Use canvas element in template
    this.render = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.render.setPixelRatio(devicePixelRatio);
    this.render.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // Camera controls
    this.controls = new OrbitControls(this.camera, this.render.domElement);
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.enableDamping = true;

    let div = document.createElement('div');
    div.innerHTML = '<br><br><br><br><br><br><br>';
    document.body.appendChild(div);

    // const stats = new Stats()
    // stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(stats.dom)

    // function animate() {

    //   stats.begin();

    //   // monitored code goes here

    //   stats.end();

    //   requestAnimationFrame( animate );

    // }

    let component: ViewRoadMapNetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.controls.update();
      component.render.render(component.scene, component.camera);
      component.render.setPixelRatio(devicePixelRatio);
      component.render.setSize(
        component.canvas.clientWidth,
        component.canvas.clientHeight
      );
    })();
  }
}
