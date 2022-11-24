import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

import jsonInfo from './roadMap/roadMap.json';

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

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  @Input() public texture: string = './assets/texture.jpg';

  //STAGE PROPERTIES

  @Input() public cameraZ: number = 8000;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 10000;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({ color: '#00FF00' });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private cirGeometry: THREE.CircleGeometry = new THREE.CircleGeometry(
    (2.1 * 1) / 2,
    32
  );
  private cirMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: '#00FF00',
  });
  private roundabout: THREE.Mesh = new THREE.Mesh(
    this.cirGeometry,
    this.cirMaterial
  );

  private render!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private roadMap!: THREE.Group;

  private controls!: OrbitControls;

  private createRoadMap() {
    this.roadMap = new THREE.Group();

    this.createRoundAbout();

    for (let i = 0; i < jsonInfo.map.length; i++) {
      const geometry = new THREE.CircleGeometry((2.1 * 1) / 2, 32); // alturar o 1 para wi (largura do nó)
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
      });

      let roundabouT = new THREE.Mesh(geometry, material);

      roundabouT.rotation.x = -Math.PI / 2.0;
      roundabouT.scale.set(1.5, 1.5, 1.5);

      roundabouT.castShadow = true;
      roundabouT.receiveShadow = true;

      roundabouT.position.set(
        jsonInfo.map[i][0],
        jsonInfo.map[i][1],
        jsonInfo.map[i][2]
      );

      this.scene.add(roundabouT);
    }

    // ROADS
    for (let i = 0; i < jsonInfo.roads.length; i++) {
      for (let j = 0; j < jsonInfo.roads[i].length; j++) {
        if (jsonInfo.roads[i][j] != 0) {
          let roadLength = Math.sqrt(
            Math.pow(jsonInfo.map[j][0] - jsonInfo.map[i][0], 2) +
              Math.pow(jsonInfo.map[j][1] - jsonInfo.map[i][1], 2) +
              Math.pow(jsonInfo.map[j][2] - jsonInfo.map[i][2], 2)
          );

          const circleConstant = 2;
          const connectionConstant = 0.5;

          let connectionLength = connectionConstant * circleConstant;

          let angle =
            Math.sqrt(
              Math.pow(jsonInfo.map[j][0] - jsonInfo.map[i][0], 2) +
                Math.pow(jsonInfo.map[j][1] - jsonInfo.map[i][1], 2)
            ) -
            connectionLength * 2;

          let roadGeometry = new THREE.PlaneGeometry(
            0.2,
            roadLength,
            32
          );
          let roadMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
          });
          let road = new THREE.Mesh(roadGeometry, roadMaterial);
          road.position.set(
            (jsonInfo.map[j][0] + jsonInfo.map[i][0]) / 2,
            (jsonInfo.map[j][1] + jsonInfo.map[i][1]) / 2,
            (jsonInfo.map[j][2] + jsonInfo.map[i][2]) / 2
          );

          road.rotation.z =
            Math.atan2(jsonInfo.map[j][1] - jsonInfo.map[i][1], jsonInfo.map[j][0] - jsonInfo.map[i][0]) -
            Math.PI / 2;

          road.rotateOnAxis(
            new THREE.Vector3(1, 0, 0),
            Math.atan2(jsonInfo.map[j][2] - jsonInfo.map[i][2], angle)
          );

          this.scene.add(road);
        }
      }
    }
  }

  private createRoundAbout() {
    const geometry = new THREE.CircleGeometry((2.1 * 1) / 2, 32); // alturar o 1 para wi (largura do nó)
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    });
    this.roundabout = new THREE.Mesh(geometry, material);

    this.roundabout.rotation.x = -Math.PI / 2.0;
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

  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private startRenderingLoop() {
    //Renderer
    //Use canvas element in template
    this.render = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.render.setPixelRatio(devicePixelRatio);
    this.render.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // controls
    this.controls = new OrbitControls(this.camera, this.render.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    let component: ViewRoadMapNetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.render.render(component.scene, component.camera);
    })();
  }
}
