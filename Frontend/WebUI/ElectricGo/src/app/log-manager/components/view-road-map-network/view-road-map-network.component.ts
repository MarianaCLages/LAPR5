import * as THREE from 'three';
import {GUI} from 'dat.gui';
import { Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GetPathsService } from 'src/app/services/get-paths.service';
import { GetWarehouseServiceService } from 'src/app/services/get-warehouse-service.service';
import { ICreateWarehouseDTO } from "../../../shared/createWarehouseDTO";
import IPathDTO from 'src/app/shared/pathDTO';
import { IPathViewRepresentation } from 'src/app/shared/pathViewRepresentation';
import { IWarehouseViewRepresentation } from 'src/app/shared/warehouseViewRepresentation';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';
import { GetTrucksService } from 'src/app/services/get-trucks.service';
import { ITruckViewRepresentation } from 'src/app/shared/truckViewRepresentation';

@Component({
  selector: 'app-view-road-map-network',
  templateUrl: './view-road-map-network.component.html',
  styleUrls: ['./view-road-map-network.component.css'],
})
export class ViewRoadMapNetworkComponent implements OnInit {

  private moovSpeed!: number;

  //Camera information
  @Input() public cameraZ: number = 2500;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 4000;

  private warehouses: any;
  private paths: any;
  private trucks: any;

  private info: any;
  private truck: any;
  private matosinhosX: any;
  private matosinhosY: any;
  private matosinhosZ: any;
  private gui = new GUI();

  //ANIMATION
  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  private camera!: THREE.PerspectiveCamera;

  //STAGE PROPERTIES
  private render!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private roadMap!: THREE.Group;
  private controls!: OrbitControls;

  //Audio
  private listener = new THREE.AudioListener();
  private audioLoader = new THREE.AudioLoader();
  private sound = new THREE.Audio( this.listener );

  private soundVolume = 0.5;

  public showPage: boolean = false;
  private trucksInfo: any[] = [];

  private availableTrucks : any[] = [];

  //Number of trucks
  private truckNumber : number = 1;

  private validRoles: string[] = ['LogisticManager', 'Admin'];

  constructor(
    private getWarehouseService: GetWarehouseServiceService,
    private getPathService: GetPathsService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
    private getTrucksService: GetTrucksService,
  ) {
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  async ngOnInit(): Promise<void> {
    this.showPage = false;
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      //redirect to forbidden page
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if(!boolValue.exists && !boolValue.valid){
      this.redirect.logout();
    }

    this.showPage = true;

  }

  async ngAfterViewInit() {
    //get all warehouses and all paths from api on 2 arrays
    this.paths = this.getPathService.getPaths().then((data: IPathDTO[]) => {

      this.paths = data;

      this.getWarehouseService.getWarehouses().then((data: ICreateWarehouseDTO[]) => {

        this.warehouses = data;

        this.getTrucksService.getTrucks().then((data: any) => {

          this.trucks = data;

          this.saveConfFile(this.warehouses, this.paths, this.trucks);
          this.createScene();
          this.startRenderingLoop();
        });
      });
    });
  }

  private saveConfFile(warehouses: ICreateWarehouseDTO[], paths: any, trucks: any) {
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
        //limit in the width of the path
        thickness: (Math.random() * (1 - 0.2) + 0.2)
      };

      //add the pathRepresentation to the array
      pathRepresentation.push(pathRepresentationAux);
    });

    let truckRepresentation: ITruckViewRepresentation[] = [];

    trucks.forEach((truck: any) => {
      //create the truckRepresentation
      let truckRepresentationAux: ITruckViewRepresentation = {
        truckCaract: truck.caractTruck,
        truckPlate: truck.truckPlate,
        truckActive: truck.activeTruck
      };

      truckRepresentation.push(truckRepresentationAux);
    });

    //create an example json file
    this.info = {
      warehouses: warehouseViewRepresentation,
      paths: pathRepresentation,
      trucks: truckRepresentation
    };

  }

  private convertDMSToDD(latitudeDegrees: number, latitudeMinutes: number, latitudeSeconds: number) {
    return latitudeDegrees + latitudeMinutes / 60 + latitudeSeconds / 3600;
  }

  private createMap() {
    //Start the roadMap Objects
    this.roadMap = new THREE.Group();

    this.scene.add(this.roadMap);

    //ADD THE LIGHTS
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const texture = new THREE.TextureLoader().load("../../../../assets/road/road_texture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    let roadMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: texture
    });

    //MAP THE PATHS
    let pathsMap = new Map<string, number>();

    //Position of the warehouse
    let arrPos = new Map<string, number[]>();

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

      //PATHS MAP
      if (pathsMap.has(start.id)) {
        for (const key of pathsMap.keys()) {
          //If the key is equal to the beginningWarehouse of the path
          if (key === start.id) {
            //If the value of the key is smaller than the thickness of the path
            if (pathsMap.get(key) != undefined && pathsMap.get(key)! < element.thickness) {
              pathsMap.set(key, element.thickness);
            }
          }
        }
      } else {
        pathsMap.set(start.id, element.thickness);
      }

      if (pathsMap.has(end.id)) {
        for (const key of pathsMap.keys()) {
          //If the key is equal to the beginningWarehouse of the path
          if (key === end.id) {
            //If the value of the key is smaller than the thickness of the path
            if (pathsMap.get(key) != undefined && pathsMap.get(key)! < element.thickness) {
              pathsMap.set(key, element.thickness);
            }
          }
        }
      } else {
        pathsMap.set(end.id, element.thickness);
      }

      //WAREHOUSE LOCATIONS

      let incomingEdgeEndXW = end.x - 0.1 * difX;
      let incomingEdgeEndYW = end.y - 0.1 * difY;
      let incomingEdgeEndZW = end.z;

      let incomingEdgeStartXW = start.x + 0.1 * difX;
      let incomingEdgeStartYW = start.y + 0.1 * difY;
      let incomingEdgeStartZW = start.z;

      if (arrPos.has(start.id)) {
        for (const key of arrPos.keys()) {
          if (key === start.id) {
            arrPos.set(key, [incomingEdgeStartXW, incomingEdgeStartYW, incomingEdgeStartZW]);
          }
        }
      } else {
        arrPos.set(start.id, [incomingEdgeStartXW, incomingEdgeStartYW, incomingEdgeStartZW]);
      }

      if (arrPos.has(end.id)) {
        for (const key of arrPos.keys()) {
          if (key === end.id) {
            arrPos.set(key, [incomingEdgeEndXW, incomingEdgeEndYW, incomingEdgeEndZW]);
          }
        }
      } else {
        arrPos.set(end.id, [incomingEdgeEndXW, incomingEdgeEndYW, incomingEdgeEndZW]);
      }

    }

    // ROUNDABOUTS
    for (const element of this.info.warehouses) {
      let roundaboutWidth = pathsMap.get(element.id);

      let warehousePos = arrPos.get(element.id)!;

      let roundabout = this.createRoundAbout(roundaboutWidth);
      roundabout.position.set(element.x, element.y, element.z + 0.08);
      this.roadMap.add(roundabout);

      if (warehousePos == undefined) {
        warehousePos = [element.x + 3, element.y, element.z];

        let differenceDistance = Math.sqrt(
          Math.pow(warehousePos[0] - element.x, 2) +
          Math.pow(warehousePos[1] - element.y, 2) +
          Math.pow(warehousePos[2] - element.z, 2)
        );

        //VECTORIAL DIFFERENCE
        const difX = element.x - warehousePos[0];
        const difY = element.y - warehousePos[1];

        let incomingEdgeStartX = (element.x - 0.1 * difX) * 0.15;
        let incomingEdgeStartY = (element.y - 0.1 * difY) * 0.15;

        let warehouseX = element.x + incomingEdgeStartX;
        let warehouseY = element.y + incomingEdgeStartY;
        let warehouseZ = element.z;

        if (differenceDistance < 40) {
          warehousePos = [warehouseX, warehouseY, warehouseZ];
        }

        let angleIncoming = Math.sqrt(
          Math.pow(warehouseX - element.x, 2) +
          Math.pow(warehouseY - element.y, 2)
        );

        let warehouseRoad = new THREE.PlaneGeometry(roundaboutWidth, differenceDistance, 32);

        let incomingRoad = new THREE.Mesh(warehouseRoad, roadMaterial);

        incomingRoad.position.set(
          (element.x + warehouseX) / 2,
          (element.y + warehouseY) / 2,
          (element.z + warehouseZ) / 2
        );

        incomingRoad.rotation.z = Math.atan2(warehouseY - element.y, warehouseX - element.x) - Math.PI / 2;

        incomingRoad.rotateOnAxis(
          new THREE.Vector3(1, 0, 0),
          Math.atan2(warehouseZ - element.z, angleIncoming)
        );

        this.roadMap.add(incomingRoad);

      } else {

        let differenceDistance = Math.sqrt(
          Math.pow(warehousePos[0] - element.x, 2) +
          Math.pow(warehousePos[1] - element.y, 2) +
          Math.pow(warehousePos[2] - element.z, 2)
        );

        //VECTORIAL DIFFERENCE
        const difX = element.x - warehousePos[0];
        const difY = element.y - warehousePos[1];

        let incomingEdgeStartX = (element.x - 0.1 * difX) * 0.15;
        let incomingEdgeStartY = (element.y - 0.1 * difY) * 0.15;

        let warehouseX = element.x + incomingEdgeStartX;
        let warehouseY = element.y + incomingEdgeStartY;
        let warehouseZ = element.z;

        if (differenceDistance < 40) {
          warehousePos = [warehouseX, warehouseY, warehouseZ];
        }

        let angleIncoming = Math.sqrt(
          Math.pow(warehouseX - element.x, 2) +
          Math.pow(warehouseY - element.y, 2)
        );

        let warehouseRoad = new THREE.PlaneGeometry(roundaboutWidth, differenceDistance, 32);

        let incomingRoad = new THREE.Mesh(warehouseRoad, roadMaterial);

        incomingRoad.position.set(
          (element.x + warehouseX) / 2,
          (element.y + warehouseY) / 2,
          (element.z + warehouseZ) / 2
        );

        incomingRoad.rotation.z = Math.atan2(warehouseY - element.y, warehouseX - element.x) - Math.PI / 2;

        incomingRoad.rotateOnAxis(
          new THREE.Vector3(1, 0, 0),
          Math.atan2(warehouseZ - element.z, angleIncoming)
        );

        this.roadMap.add(incomingRoad);

      }

      //Get Matosinhos Coordinates
      if(element.id == "C05") {
        this.matosinhosX = element.x;
        this.matosinhosY = element.y;
        this.matosinhosZ = element.z;
      }

      this.loadWarehouseModel(warehousePos[0], warehousePos[1], warehousePos[2]);
    }

    //creates a truck model and animates it
    this.loadTruckModel(this.matosinhosX, this.matosinhosY, this.matosinhosZ);

  }

  private loadWarehouseModel(posX: number, posY: number, posZ: number) {
    const glftLoader = new GLTFLoader();
    glftLoader.load(
      'assets/warehouse_building/scene.gltf',
      (gltf) => {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(posX, posY, posZ);
        gltf.scene.rotation.x = Math.PI / 2.0;
        this.roadMap.add(gltf.scene);
      }
    );
  }

  private loadTruckModel(posX: number, posY: number, posZ: number) {
    const glftLoader = new GLTFLoader();
    glftLoader.load(
      'assets/truck/scene.gltf',
      (gltf) => {
        this.truck = gltf.scene;
        gltf.scene.scale.set(0.003, 0.003, 0.003);
        gltf.scene.position.set(posX, posY, posZ + 0.4);
        gltf.scene.rotation.x = Math.PI / 2.0;
        gltf.scene.rotation.y = Math.PI / 2.0;
        gltf.scene.name = this.trucksInfo[0];
        this.roadMap.add(gltf.scene);
      }
    );
  }

  private createRoundAbout(width: number | undefined): THREE.Mesh {

    if (width === undefined) {
      width = 1;
    }

    const geometry = new THREE.CircleGeometry(width, 32);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide
    });

    material.color.set(0x000000);
    let roundabout = new THREE.Mesh(geometry, material);

    roundabout.castShadow = true;
    roundabout.receiveShadow = true;

    return roundabout;

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
    this.generateTruckInfoArr();
    this.createMap();

    // Lights

    //Directional Light
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(this.fieldOfView, this.nearClippingPlane, this.farClippingPlane);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(-this.fieldOfView, -this.nearClippingPlane, -this.farClippingPlane);
    this.scene.add(dirLight2);

    //Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
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

  private startRenderingLoop( ) {
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

    this.moovSpeed = 0.001
    let component: ViewRoadMapNetworkComponent = this;

    window.addEventListener('popstate', event => this.destroyGUI())

    //Starting movement of the truck type

    //Get the first truck into the array
    this.availableTrucks.push(this.trucksInfo[0])

    var params = {
      truckMovement : 'Manual',
      Choose_Truck: this.availableTrucks,
      Number_Of_Trucks: 1,
      Music: false,
      Music_Volume: 50
    };

    this.gui.domElement.id = 'truck_movement_type';
    this.gui.width = 300;

    // GUI controls
    const truckFolder = this.gui.addFolder('Truck Information');
    truckFolder.add(params,'truckMovement',['Manual','Automatic']);
    truckFolder.add(params,'Choose_Truck', this.trucksInfo).onChange(function(value) {

      for(var i : number = 0 ; i < component.trucksInfo.length ; i++) {
        if(component.trucksInfo[i] == value) {
           component.truck = component.scene.getObjectByName(component.trucksInfo[i]);
        }
      }

    });

    truckFolder.open();

    // const manualTruckMovementFolder = this.gui.addFolder('Manual Truck Movement');
    // manualTruckMovementFolder.add(params,'Choose_Truck', params.Choose_Truck);
    // manualTruckMovementFolder.open();

    const automaticTruckMovementFolder = this.gui.addFolder('Automatic Truck Movement');

    let selectedObject : any;

    automaticTruckMovementFolder.add(params,'Number_Of_Trucks').min(1).max(component.trucksInfo.length).step(1).onChange(function(value) {
      if(value > component.truckNumber) {
        for(var i = component.truckNumber ; i < value; i++) {
          const truckClone = component.truck.clone();
          truckClone.position.set(component.matosinhosX, component.matosinhosY, component.matosinhosZ + 0.01);
          truckClone.name = component.trucksInfo[i];
          component.scene.add(truckClone);
        }
      }

       if(value < component.truckNumber) {
        for(var i : number = value ; i < component.truckNumber ; i++) {
          selectedObject = component.scene.getObjectByName(component.trucksInfo[i]);
          component.scene.remove( selectedObject );
        }
      }

      component.truckNumber = value;

    });

    automaticTruckMovementFolder.open();

    const geralFolder = this.gui.addFolder('Geral');
    geralFolder.add(params, 'Music').onChange(function(value) {
      if (value) {
        component.startBackgroundMusic(component.soundVolume);
      }
      else {
        component.stopBackgroundMusic();
      }
    });

    geralFolder.add(params,'Music_Volume').min(0).max(100).step(1).onChange(function(value) {
      component.sound.setVolume(value * 0.01);
    });

    geralFolder.open();
    this.gui.open();

    (function render() {
      requestAnimationFrame(render);
      component.controls.update();

      if (params.truckMovement == 'Manual') {
        component.updateTruckPosition();
      }
      else if (params.truckMovement == 'Automatic'){
        component.updateAutomaticPosition();
      }

      component.render.render(component.scene, component.camera);
      component.render.setPixelRatio(devicePixelRatio);
      component.render.setSize(
        component.canvas.clientWidth,
        component.canvas.clientHeight
      );
    })();

  }

  private generateTruckInfoArr() {
    let trucksInfoAux: any[] = [];

    this.info.trucks.forEach(function (truck: any) {
      let truckCaractString = truck.truckCaract;
      trucksInfoAux.push(truckCaractString);
    });

    this.trucksInfo = trucksInfoAux;
  }

  private startBackgroundMusic(soundVolume : number) {
    let soundV = this.sound;

    this.audioLoader.load( '../../../../assets/roadMap_music/Lil Nas X, Jack Harlow - INDUSTRY BABY (Official Video).mp3', function( buffer ) {
      soundV.setBuffer( buffer );
      soundV.setLoop( true );
      soundV.setVolume(soundVolume);
      soundV.play();
    });

  }

  private stopBackgroundMusic() {
    this.sound.stop();
  }

  private changeMusicVolume(volume: number) {
    this.sound.setVolume(volume);
  }

  private updateAutomaticPosition(){
    const x = this.truck.position.x;
    this.truck.position.x = x + this.moovSpeed;
  }

  private updateTruckPosition() {
    document.addEventListener("keydown",event => this.myFunc(event));

    //Atualizar para mais tarde a camera frontal estar dentro do camião e fazer 1º pessoa e 3º pessoa
    //this.camera.position.set(this.matosinhosX, this.matosinhosY, this.matosinhosZ);
  }

  private myFunc(evt : KeyboardEvent){
    if(evt.which == 87){
      this.truck.position.y += 0.0001;
    }
    else if(evt.which == 83){
      this.truck.position.y -= 0.0001;
    }
    else if(evt.which == 65){
      this.truck.position.x -= 0.0001;
    }
    else if(evt.which == 68){
      this.truck.position.x += 0.0001;
    }
  }

  private transformToCartesian(latitude: any, longitude: any) {
    let x = 6371 * Math.cos(latitude) * Math.cos(longitude);
    let y = 6371 * Math.sin(latitude) * Math.cos(longitude);
    let z = 6371 * Math.sin(longitude);

    return [x, y, z];
  }

  goBack() {
    this.gui.destroy();

    try{
      this.stopBackgroundMusic();
    } catch (e) {
      //EMPTY
    }

    window.history.back();
  }

  destroyGUI(){
    this.gui.destroy()
  }

}
