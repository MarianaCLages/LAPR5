import * as THREE from 'three';

import {Component, ElementRef, Input, OnInit, ViewChild,} from '@angular/core';

import {GetPathsService} from 'src/app/services/get-paths.service';
import {GetWarehouseServiceService} from 'src/app/services/get-warehouse-service.service';
import IPathDTO from 'src/app/shared/pathDTO';
import {IPathViewRepresentation} from 'src/app/shared/pathViewRepresentation';
import {IWarehouseViewRepresentation} from 'src/app/shared/warehouseViewRepresentation';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import jsonInfo from './roadMap/roadMap.json';
import {ICreateWarehouseDTO} from "../../../shared/createWarehouseDTO";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



@Component({
  selector: 'app-view-road-map-network',
  templateUrl: './view-road-map-network.component.html',
  styleUrls: ['./view-road-map-network.component.css'],
})
export class ViewRoadMapNetworkComponent implements OnInit {
  @Input() public size: number = 200;
  //Road Texture
  @Input() public texture: string = './roadMap/road_free.png';
  @Input() public cameraZ: number = 1500;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 3000;
  private warehouses: any;
  private paths: any;
  private info: any;

  //ANIMATION
  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  private camera!: THREE.PerspectiveCamera;

  //STAGE PROPERTIES
  private loader = new THREE.TextureLoader();
  private roundabout!: THREE.Mesh;
  private render!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private roadMap!: THREE.Group;
  private controls!: OrbitControls;

  constructor(
    private getWarehouseService: GetWarehouseServiceService,
    private getPathService: GetPathsService
  ) {
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    //get all warehouses and all paths from api on 2 arrays

    this.paths = this.getPathService.getPaths().then((data: IPathDTO[]) => {

      this.paths = data;

      this.getWarehouseService.getWarehouses().then((data: ICreateWarehouseDTO[]) => {

        this.warehouses = data;
        this.saveConfFile(this.warehouses, this.paths);
        this.createScene();
        this.startRenderingLoop();

      });
    });
  }

  saveConfFile(warehouses: ICreateWarehouseDTO[], paths: any) {
    //transform warehouse to warehouseViewRepresentation
    let warehouseViewRepresentation: IWarehouseViewRepresentation[] = [];


    warehouses.forEach((warehouse: ICreateWarehouseDTO) => {

        let latitude = this.convertDMSToDD(
          warehouse.latitudeDegree,
          warehouse.latitudeMinute,
          warehouse.latitudeSecond
        );
        let longitude = this.convertDMSToDD(
          warehouse.longitudeDregree,
          warehouse.longitudeMinute,
          warehouse.longitudeSecond
        );

        //calculate the x,y,z coordinates
        let coordinates = this.transformToCartesian(latitude, longitude);

        //create the warehouseViewRepresentation
        let warehouseViewRepresentationAux: IWarehouseViewRepresentation = {
          id: warehouse.alphaNumId,
          x: coordinates[0] / 300,
          y: coordinates[1] / 300,
          z: coordinates[2] / 300,
        };

        //add the warehouseViewRepresentation to the array
        warehouseViewRepresentation.push(warehouseViewRepresentationAux);
      }
    );

    //transform paths to pathRepresentation
    let pathRepresentation: IPathViewRepresentation[] = [];
    paths.forEach((path: any) => {
      //create the pathRepresentation
      let pathRepresentationAux: IPathViewRepresentation = {
        beginningWarehouse: path.beginningWarehouseId,
        endingWarehouse: path.endingWarehouseId,
        thickness: Math.random()
      };

      //add the pathRepresentation to the array
      pathRepresentation.push(pathRepresentationAux);
    });

    //create an example json file
    this.info = {
      warehouses: warehouseViewRepresentation,
      paths: pathRepresentation,
    };
    console.log(this.info);
  }

  convertDMSToDD(latitudeDegrees: number, latitudeMinutes: number, latitudeSeconds: number) {
    return latitudeDegrees + latitudeMinutes / 60 + latitudeSeconds / 3600;
  }

  private createMap() {
    this.roadMap = new THREE.Group();
    this.createRoundAbout();
    this.scene.add(this.roadMap);
    //this.roadMap.scale.set(2,2,2);

    //DEFINE THE BACKGROUND COLOR
    this.scene.background = new THREE.Color(0xadd8e6);

    // ROUNDABOUTS
    for (const element of this.info.warehouses) {
      let roundabout = this.roundabout.clone();
      roundabout.position.set(element.x, element.y, element.z);
      this.roadMap.add(roundabout);
      const glftLoader = new GLTFLoader();
      glftLoader.load(
        'assets/warehouse_building/scene.gltf',
        (gltf) => {
          gltf.scene.scale.set(0.1, 0.1, 0.1);
          gltf.scene.position.set(element.x, element.y, element.z);
          this.roadMap.add(gltf.scene);
        }
      );
    }

    const circleConstant = 2;
    const connectionConstant = 0.5;

    const connectionLength = connectionConstant * circleConstant;

    const radius = 2.1;

    // PATHS
    for (const element of this.info.paths) {
      const start = this.info.warehouses.find(
        (x: any) => x.id === element.beginningWarehouse
      );
      const end = this.info.warehouses.find(
        (x: any) => x.id === element.endingWarehouse
      );

      const material2 = new THREE.LineBasicMaterial({color: 0xff0000});

      let roadLength = Math.sqrt(
        Math.pow(end.x - start.x, 2) +
        Math.pow(end.y - start.y, 2) +
        Math.pow(end.z - start.z, 2)
      );

      let angle = Math.sqrt(
        Math.pow(end.x - start.x, 2) +
        Math.pow(end.y - start.y, 2)
      );

      let roadGeometry = new THREE.PlaneGeometry(element.thickness, roadLength, 32);

      let roadMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
      });

      let road = new THREE.Mesh(roadGeometry, roadMaterial);

      road.position.set(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2,
        (start.z + end.z) / 2
      );

      road.rotation.z = Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2;

      road.rotateOnAxis(
        new THREE.Vector3(1, 0, 0),
        Math.atan2(end.z - start.z, angle)
      );

      this.roadMap.add(road);

    }


  }

  private createRoadMap() {
    this.roadMap = new THREE.Group();
    this.createRoundAbout();
    this.scene.add(this.roadMap);
    //this.roadMap.scale.set(2,2,2);

    //DEFINE THE BACK GROUND COLOR
    this.scene.background = new THREE.Color(0xadd8e6);

    // ROUNDABOUTS
    for (const element of jsonInfo.map) {
      let roundabouT = this.roundabout.clone();

      //Set the position of the roundabout
      roundabouT.position.set(
        element[0],
        element[1],
        element[2]
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

    for (const element of jsonInfo.paths) {
      //INFO
      let initWarehouse = element[0] - 1;
      let finalWarehouse = element[1] - 1;
      let roadWidth = element[2];

      // //Incoming Edges
      const material2 = new THREE.LineBasicMaterial({color: 0xff0000});

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

    this.createMap();

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


    //this.camera.position.set( 0, 0, this.cube.position.z - 1000 );// OrbitControls target is the origin


    this.camera.position.set(0, 0, 0);
    this.camera.position.z = this.cameraZ;


  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }


  private startRenderingLoop() {
    //Renderer
    //Use canvas element in template
    this.render = new THREE.WebGLRenderer({canvas: this.canvas});
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

  private transformToCartesian(latitude: any, longitude: any) {
    let x = 6371 * Math.cos(latitude) * Math.cos(longitude);
    let y = 6371 * Math.sin(latitude) * Math.cos(longitude);
    let z = 6371 * Math.sin(longitude);

    return [x, y, z];
  }


}
