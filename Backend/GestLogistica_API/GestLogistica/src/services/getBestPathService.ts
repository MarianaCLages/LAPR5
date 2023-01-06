import { Inject, Service } from "typedi";

import fetch from "node-fetch";
import { promises as fsPromises } from "fs";
import config from "../../config";
import { join } from "path";
import IPathRepo from "./IRepos/IPathRepo";
import ITruckRepo from "./IRepos/ITruckRepo";
import IPackagingRepo from "../repos/packagingRepo";
import IGestBestPathService from "./IServices/IGestBestPathService";
import FormData from "form-data";
import http from "http";
import { TruckMap } from "../mappers/TruckMap";
import { PathMap } from "../mappers/PathMap";
import https from "https";
import { ICreateTripDTO} from "../dto/trip/ICreateTripDTO";
import {TextDecoder} from "util";
import ITripRepo from "./IRepos/ITripRepo";
import {Path} from "../domain/path/path";
import {Trip} from "../domain/trip/trip";
import {TripIdentifier} from "../domain/trip/tripIdentifier";
import {TripMap} from "../mappers/TripMap";
import ITripDTO from "../dto/ITripDTO";
import {result} from "lodash";
import {Result} from "../core/logic/Result";
import e from "express";

@Service()
export default class GetBestPathService implements IGestBestPathService {


  httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });
  httpAgent = new http.Agent({});
  dirnamePaths: string;
  dirnameWarehouse: string;
  dirnameOrders: string;
  dirnameTruck: string;
  dirnameTrucks: string;
  key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik1pZ3VlbCBKb3JkYW8iLCJlbWFpbCI6Im1pZ3VlbDk4am9yZGFvMTNAZ21haWwuY29tIiwibmJmIjoxNjcyOTE4MTY2LCJleHAiOjE2NzM1MjI5NjYsImlhdCI6MTY3MjkxODE2Nn0.-453uZKLu6wHV2g_jikmT7xmrXS1C_91-QkXYiU45LM";

  constructor(
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo,
    @Inject(config.repos.path.name) private pathRepo: IPathRepo,
    @Inject(config.repos.trip.name) private tripRepo: ITripRepo,
  ) {
  }

  public generateFiles() {
    fsPromises.open(join(__dirname, "paths.txt"), "w");
    this.dirnamePaths = __dirname + "/paths.txt";
    fsPromises.open(join(__dirname, "warehouse.txt"), "w");
    this.dirnameWarehouse = __dirname + "/warehouse.txt";
    fsPromises.open(join(__dirname, "orders.txt"), "w");
    this.dirnameOrders = __dirname + "/orders.txt";
    fsPromises.open(join(__dirname, "truck.txt"), "w");
    this.dirnameTruck = __dirname + "/truck.txt";
    fsPromises.open(join(__dirname, "/trucks.txt"), "w");
    this.dirnameTrucks = __dirname + "/trucks.txt";
  }

  public async sendOrders(date : string){


    var orderArr = [];
    let dateArray = date.split('_');
    let goodDateFormat = '';
    goodDateFormat = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];
    let entrega_armazem: string;
    entrega_armazem = 'entrega_armazens([';

    let realDate = new Date(goodDateFormat);

    const url = "http://localhost:5000/api/Order";


    const response = await fetch(url, {
      method: "GET",
      agent: this.httpAgent,
      headers: {
        Accept: "application/json",
        authorization: this.key
        },

      });


    var object = (await response.json());
    let stringFormat: string;
    let stringFormat2: string;
    var aspas = "'";
    stringFormat = "entrega_armazens([";


    for(let i = 0; i < object.length;i++){

      console.log(object[i].orderDate);
      let dateOrder = new Date(object[i].orderDate);

      let dateObj = dateOrder.toLocaleDateString();

      if (goodDateFormat == dateObj.toString()) {

        var warehouseString = object[i].warehouseId.toString();
        warehouseString = warehouseString.substring(1);
        let warehouseNumber = +warehouseString;
        let idSplit = object[i].identifier.toString().split('/');
        stringFormat = "entrega(" + idSplit[0] + idSplit[1] + ",223," + object[i].orderMass.toString() + "," + warehouseNumber + ',' + object[i].chargingTime.toString() + ',' + object[i].unloadingTime.toString() + ").";
        orderArr.push(stringFormat);

        if (i == object.length - 1) {
          entrega_armazem = entrega_armazem + warehouseNumber + ']).';
        } else {
          entrega_armazem = entrega_armazem + warehouseNumber + ',';
        }
      }
    }

    entrega_armazem = entrega_armazem.slice(0,-1);
    entrega_armazem = entrega_armazem + ']).'
    orderArr.push(entrega_armazem);
    for(var z = 0; z < orderArr.length;z++) {
      await fsPromises.appendFile(join(__dirname, "orders.txt"), orderArr[z] + "\r\n", {
        flag: 'a+',
      });
    }

    //SEND Orders TO PROLOG

    let formData = new FormData();

    //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
    var buffer = require('fs').readFileSync(this.dirnameOrders);
    formData.append('file',buffer);

    const rep = await fetch("http://localhost:5003/receive_order_post", {
      method: "POST",
      agent: this.httpAgent,
      headers:{
        Accept: 'application/json',
      },
      body: formData,
    })


    var object = await rep;
    console.log("Orders to Planning sent!");

    return object;

  }

  public async sendPaths() {

    const paths = await this.pathRepo.getAllPaths();
    console.log(paths);
    const pathsDTO = paths.getValue().map(cam => PathMap.toDTO(cam));

    var pathArray = [];
    var stringFormat: string;

    for (var i = 0; i < paths._value.length; i++) {

      var warehouseBegginingString = pathsDTO[i].beginningWarehouseId;
      var warehouseEndingString = pathsDTO[i].endingWarehouseId;

      warehouseBegginingString = warehouseBegginingString.substring(1);
      warehouseEndingString = warehouseEndingString.substring(1);

      var warehouseBegginingNumber = +warehouseBegginingString;
      var warehouseEndingNumber = +warehouseEndingString;

      stringFormat = "dadosCam_t_e_ta(truck," + warehouseBegginingNumber + "," + warehouseEndingNumber + "," + pathsDTO[i].time + "," + pathsDTO[i].energy + "," + pathsDTO[i].chargingTime + ").";
      pathArray.push(stringFormat);
    }

    for (var i = 0; i < paths._value.length; i++) {
      await fsPromises.appendFile(join(__dirname, "paths.txt"), pathArray[i] + "\r\n", {
        flag: "a+"
      });

    }

    //SEND PATHS TO PROLOG

    let formData = new FormData();

    //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
    var buffer = require("fs").readFileSync(this.dirnamePaths);
    formData.append("file", buffer);

    const rep = await fetch("http://localhost:5003/receive_path_post", {
      method: "POST",
      agent: this.httpAgent,
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

  }

  public async sendTrucks() {

    const trucks = await this.truckRepo.getAllTrucks();
    console.log(trucks);
    const truckDTO = trucks.getValue().map(cam => TruckMap.toDTO(cam));

    let stringFormat: string;
    var aspas = "'";
    var pathArray = [];

    for (var i = 0; i < truckDTO.length; i++) {

      stringFormat = "carateristicasCam(" + aspas + truckDTO[i].caractTruck + aspas + "," + truckDTO[i].tare + "," + truckDTO[i].weightCapacity + "," + truckDTO[i].totalBatCharge + ",100," + truckDTO[i].chargingTime + ").";
      pathArray.push(stringFormat);
    }

    for (var i = 0; i < pathArray.length; i++) {
      await fsPromises.appendFile(join(__dirname, "trucks.txt"), pathArray[i] + "\r\n", {
        flag: "a+"
      });
    }


    //SEND TRUCKS TO PROLOG

    let formData = new FormData();

    //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
    var buffer = require("fs").readFileSync(this.dirnameTrucks);
    formData.append("file", buffer);

    const rep = await fetch("http://localhost:5003/receive_trucks_post", {
      method: "POST",
      agent: this.httpAgent,
      headers: {
        Accept: "application/json"
      },
      body: formData
    });


    var object = await rep;
    console.log("Trucks to Planning sent!");

  }

  public async sendWarehouse() {

    const url = "http://localhost:5000/api/Warehouse";

    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        agent: this.httpAgent,
        headers: {
          Accept: "application/json",
          authorization: this.key
        },

      });
    } catch (error) {
      throw  TypeError("GestArm not connected!");
    }

    const result = (await response.json());
    var pathArray = [];
    var stringFormat: string;
    var aspas = "'";
    for (var i = 0; i < result.length; i++) {

      var warehouseId = result[i].alphaNumId;
      warehouseId = warehouseId.substring(1);

      var warehouseIdNumber = +warehouseId;

      stringFormat = "idArmazem(" + aspas + result[i].street + aspas + "," + warehouseIdNumber + ").";

      pathArray.push(stringFormat);
    }

    for (var i = 0; i < result.length; i++) {
      await fsPromises.appendFile(join(__dirname, "warehouse.txt"), pathArray[i] + "\r\n", {
        flag: "a+"
      });
    }

    //SEND Warehouse TO PROLOG

    let formData = new FormData();

    //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
    var buffer = require("fs").readFileSync(this.dirnameWarehouse);
    formData.append("file", buffer);

    const rep = await fetch("http://localhost:5003/receive_warehouse_post", {
      method: "POST",
      agent: this.httpAgent,
      headers: {
        Accept: "application/json"
      },
      body: formData
    });


    var object = await rep;
    console.log("Warehouses to Planning sent!");

  }

  public async createTripsFromPlanning(): Promise<string>{

    const rep = await fetch("http://localhost:5003/send_fleet_trip", {
      method: 'GET',
      agent: this.httpAgent,
      headers:{
        Accept: 'application/json',
      },
    })

    return await rep.text();

  }

  public async convertStringIntoTrips(outputString : string,date : string){

    const url = "http://localhost:5000/api/Order";

    let dateArray = date.split('_');
    date = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];


    const response = await fetch(url, {
      method: "GET",
      agent: this.httpAgent,
      headers: {
        Accept: "application/json",
        authorization: this.key
      },

    });


    var object = (await response.json());



    let ash = outputString.split("*").length - 1;
    let barrinhadireita = outputString.split("[").length - 1;
    let barrinhaesquerda = outputString.split("]").length - 1;

    for(let i = 0; i < ash; i++) {
      outputString = outputString.replace('*', ',');
    }
    for(let i = 0; i < barrinhadireita; i++) {
      outputString = outputString.replace('[', '');
    }
    for(let i = 0; i < barrinhaesquerda; i++) {
      outputString = outputString.replace(']', '');
    }


    console.log(outputString);

    let stringArray = outputString.split(',');
    let tripArray = [];
    let truck;
    let orderArray = [];
    let warehouseArray = [];

    for(let i = 0; i < stringArray.length; i++){

      if(stringArray[i].includes('T')){

        truck = stringArray[i];

        for(let i = 0; i < orderArray.length; i++){


          let MINEORDER = object.find((obj) =>{

            let splitted = obj.identifier.split('/');
            let compareId = splitted[0] + splitted[1];

            return compareId == orderArray[i]
          });

          console.log(MINEORDER);
          warehouseArray.push(MINEORDER.warehouseId)
        }


        let tripDto = new ICreateTripDTO(truck + '/' + date,truck,date,warehouseArray,orderArray)
        const tripOrError = Trip.create(tripDto);
        const tripResult = tripOrError.getValue();
        await this.tripRepo.save(tripResult);
        const tripDTOResult = TripMap.toDTO(tripResult) as ITripDTO;

        tripArray.push(tripDTOResult);
        orderArray.length = 0;
        warehouseArray.length = 0;
      }
      else{
        orderArray.push(stringArray[i]);
      }

    }

    return tripArray;

   /* let tripDto = new ICreateTripDTO('11122','T01','12/12/2023',['C20','C22'],['11112','11333']);

    const tripOrError = Trip.create(tripDto);
    const tripResult = tripOrError.getValue()
    await this.tripRepo.save(tripResult);

    const tripDTOResult = TripMap.toDTO(tripResult) as ITripDTO;
    return Result.ok<ITripDTO>(tripDTOResult);*/


  }


  public async getAllTrips(date: string): Promise<Result<Array<ITripDTO>>>{

    console.log("\n\nOla " + date);

    //Substitue the '-' for '/'
    let dateArray = date.split('-');
    date = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

    var list = await this.tripRepo.getAllTrips();

    console.log(list.getValue());
    
    if(list.isFailure) {
      return Result.fail("No trips were found!");

    } else {
      var listAux = new Array<Trip>;

      list.getValue().forEach(element => {
        if(element.tripDay.value == date){
          listAux.push(element);
        }
      });

      var listDTO = listAux.map(element => TripMap.toDTO(element));

      if(listDTO.length == 0){
        return Result.fail("No trips were found for that day!");
      } else {
        return Result.ok<ITripDTO[]>(listDTO);
      }

    }

  }

}