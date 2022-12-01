import * as THREE from 'three';

import { Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GetPathsService } from 'src/app/services/get-paths.service';
import { GetWarehouseServiceService } from 'src/app/services/get-warehouse-service.service';
import { ICreateWarehouseDTO } from "../../../shared/createWarehouseDTO";
import IPathDTO from 'src/app/shared/pathDTO';
import { IPathViewRepresentation } from 'src/app/shared/pathViewRepresentation';
import { IWarehouseViewRepresentation } from 'src/app/shared/warehouseViewRepresentation';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import jsonInfo from './roadMap/roadMap.json';

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
    //Start the roadMap Objects
    this.roadMap = new THREE.Group();
    this.createRoundAbout();
    this.scene.add(this.roadMap);

    //ADD THE LIGHTS
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // ROUNDABOUTS
    for (const element of this.info.warehouses) {
      let roundabout = this.roundabout.clone();
      roundabout.position.set(element.x, element.y, element.z);
      this.roadMap.add(roundabout);
      this.loadModel(element);
    }

    const texture = new THREE.TextureLoader().load("../../../../assets/road/road_texture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    let roadMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: texture
    });

    // PATHS
    for (const element of this.info.paths) {
      const start = this.info.warehouses.find(
        (x: any) => x.id === element.beginningWarehouse
      );
      const end = this.info.warehouses.find(
        (x: any) => x.id === element.endingWarehouse
      );

      //INCOMING START EDGE
      const difX = start.x - end.x;
      const difY = start.y - end.y;

      let incomingEdgeStartX = start.x - 0.1 * difX;
      let incomingEdgeStartY = start.y - 0.1 * difY;
      let incomingEdgeStartZ = start.z;

      let incomingEdgeLength = Math.sqrt(
        Math.pow(incomingEdgeStartX - start.x, 2) +
        Math.pow(incomingEdgeStartY - start.y, 2) +
        Math.pow(incomingEdgeStartZ - start.z, 2)
      );

      let angleIncoming = Math.sqrt(
        Math.pow(incomingEdgeStartX - start.x, 2) +
        Math.pow(incomingEdgeStartY - start.y, 2)
      );

      let incomingRoadGeometry = new THREE.PlaneGeometry(element.thickness, incomingEdgeLength, 32);

      let incomingRoad = new THREE.Mesh(incomingRoadGeometry, roadMaterial);

      incomingRoad.position.set(
        (start.x + incomingEdgeStartX) / 2,
        (start.y + incomingEdgeStartY) / 2,
        (start.z + incomingEdgeStartZ) / 2
      );

      incomingRoad.rotation.z = Math.atan2(incomingEdgeStartY - start.y, incomingEdgeStartX - start.x) - Math.PI / 2;

      incomingRoad.rotateOnAxis(
        new THREE.Vector3(1, 0, 0),
        Math.atan2(incomingEdgeStartZ - start.z, angleIncoming)
      );

      this.roadMap.add(incomingRoad);

       //INCOMING OUTGOING EDGE
      let incomingEdgeEndX = end.x + 0.1 * difX;
      let incomingEdgeEndY = end.y + 0.1 * difY;
      let incomingEdgeEndZ = end.z;

      let outgoingEdgeLength = Math.sqrt(
        Math.pow(incomingEdgeEndX - end.x, 2) +
        Math.pow(incomingEdgeEndY - end.y, 2) +
        Math.pow(incomingEdgeEndZ - end.z, 2)
      );

      let angleOutgoing = Math.sqrt(
        Math.pow(incomingEdgeEndX - end.x, 2) +
        Math.pow(incomingEdgeEndY - end.y, 2)
      );

      let outgoingRoadGeometry = new THREE.PlaneGeometry(element.thickness, outgoingEdgeLength, 32);

      let outgoingRoad = new THREE.Mesh(outgoingRoadGeometry, roadMaterial);

      outgoingRoad.position.set(
        (end.x + incomingEdgeEndX) / 2,
        (end.y + incomingEdgeEndY) / 2,
        (end.z + incomingEdgeEndZ) / 2
      );

      outgoingRoad.rotation.z = Math.atan2(incomingEdgeEndY - end.y, incomingEdgeEndX - end.x) - Math.PI / 2;

      outgoingRoad.rotateOnAxis(
        new THREE.Vector3(1, 0, 0),
        Math.atan2(incomingEdgeEndZ - end.z, angleOutgoing)
      );

      this.roadMap.add(outgoingRoad);

      let roadLength = Math.sqrt(
        Math.pow(incomingEdgeEndX - incomingEdgeStartX, 2) +
        Math.pow(incomingEdgeEndY - incomingEdgeStartY, 2) +
        Math.pow(incomingEdgeEndZ - incomingEdgeStartZ, 2)
      );

      let angle = Math.sqrt(
        Math.pow(incomingEdgeEndX - incomingEdgeStartX, 2) +
        Math.pow(incomingEdgeEndY - incomingEdgeStartY, 2)
      );

      let roadGeometry = new THREE.PlaneGeometry(element.thickness, roadLength, 32);

      let road = new THREE.Mesh(roadGeometry, roadMaterial);

      road.position.set(
        (incomingEdgeEndX + incomingEdgeStartX) / 2,
        (incomingEdgeEndY + incomingEdgeStartY) / 2,
        (incomingEdgeEndZ + incomingEdgeStartZ) / 2
      );

      road.rotation.z = Math.atan2(incomingEdgeEndY - incomingEdgeStartY, incomingEdgeEndX - incomingEdgeStartX) - Math.PI / 2;

      road.rotateOnAxis(
        new THREE.Vector3(1, 0, 0),
        Math.atan2(incomingEdgeEndZ - incomingEdgeStartZ, angle)
      );

      this.roadMap.add(road);
    }
  }

  private loadModel(element: IWarehouseViewRepresentation) {

    const glftLoader = new GLTFLoader();
    glftLoader.load(
      'assets/warehouse_building/scene.gltf',
      (gltf) => {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(element.x, element.y, element.z + 0.05);
        gltf.scene.rotation.x = Math.PI / 2.0;
        this.roadMap.add(gltf.scene);
      }
    );

    const objLoader = new OBJLoader();
    objLoader.load(
      'assets/warehouse_building/warehouse.obj',
      (obj) => {
        obj.scale.set(0.1, 0.1, 0.1);
        obj.position.set(element.x, element.y, element.z);
        obj.rotation.x = Math.PI / 2.0;
        this.roadMap.add(obj);
      });
  }

  private createRoundAbout() {
    const geometry = new THREE.CircleGeometry((2.1 * 1) / 2, 32);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide
    });

    material.color.set(0xD3D3D3);
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

    const path = '../../../../assets/skybox2/sky_box.jpg';

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      path,
    );

    this.scene.background = texture;
    this.createMap();

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(this.fieldOfView, this.nearClippingPlane, this.farClippingPlane);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(-this.fieldOfView, -this.nearClippingPlane, -this.farClippingPlane);
    this.scene.add(dirLight2);
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);

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
    this.camera.position.set(0, 0, 0);
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
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

  goBack() {
    window.history.back();
  }

}
