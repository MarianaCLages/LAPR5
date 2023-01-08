import { Inject, Service } from "typedi";

import fetch from "node-fetch";
import { promises as fsPromises } from "fs";
import config from "../../config";
import { join } from "path";
import IPathRepo from "./IRepos/IPathRepo";
import ITruckRepo from "./IRepos/ITruckRepo";
import IGestBestPathService from "./IServices/IGestBestPathService";
import FormData from "form-data";
import http from "http";
import { PathMap } from "../mappers/PathMap";
import https from "https";
import ITripRepo from "./IRepos/ITripRepo";
import { Trip } from "../domain/trip/trip";
import { TripMap } from "../mappers/TripMap";
import ITripDTO from "../dto/ITripDTO";
import { Result } from "../core/logic/Result";
import ITripGetter from "./IRepos/ITripGetter";
import { TripBuilder } from "../../tests/unit/domain/trip/tripBuilder";
import { ITruckDTO } from "../dto/truck/ITruckDTO";
import IOrderDTO from "../dto/IOrderDTO";

@Service()
export default class GetBestPathService implements IGestBestPathService, ITripGetter {


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
    @Inject(config.repos.trip.name) private tripRepo: ITripRepo
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

  public async sendOrders(orders: IOrderDTO[]) {


    let entrega_armazem: string;
    entrega_armazem = "entrega_armazens([";


    let orderArr = [];
    let stringFormat: string;
    let stringFormat2: string;
    var aspas = "'";
    stringFormat = "entrega_armazens([";


    for (let i = 0; i < orders.length; i++) {

      console.log(orders);

      //@ts-ignore
      var warehouseString = orders[i].warehouseId;

      warehouseString = warehouseString.substring(1);
      let warehouseNumber = +warehouseString;

      //@ts-ignore
      let idSplit = orders[i].identifier.split("/");

      //@ts-ignore
      stringFormat = "entrega(" + idSplit[0] + idSplit[1] + ",223," + orders[i].orderMass + "," + warehouseNumber + "," + orders[i].chargingTime + "," + orders[i].unloadingTime + ").";
      orderArr.push(stringFormat);

      if (i == orders.length - 1) {
        entrega_armazem = entrega_armazem + warehouseNumber + "]).";
      } else {
        entrega_armazem = entrega_armazem + warehouseNumber + ",";
      }

    }


    orderArr.push(entrega_armazem);
    for (var z = 0; z < orderArr.length; z++) {
      await fsPromises.appendFile(join(__dirname, "orders.txt"), orderArr[z] + "\r\n", {
        flag: "a+"
      });
    }

    //SEND Orders TO PROLOG

    let formData = new FormData();

    //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
    var buffer = require("fs").readFileSync(this.dirnameOrders);
    formData.append("file", buffer);

    const rep = await fetch("http://localhost:5003/receive_order_post", {
      method: "POST",
      agent: this.httpAgent,
      headers: {
        Accept: "application/json"
      },
      body: formData
    });


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

  public async sendTrucks(trucks: Array<ITruckDTO>) {


    console.log(trucks);

    let stringFormat: string;
    var aspas = "'";
    var pathArray = [];

    for (var i = 0; i < trucks.length; i++) {

      stringFormat = "carateristicasCam(" + aspas + trucks[i].caractTruck + aspas + "," + trucks[i].tare + "," + trucks[i].weightCapacity + "," + trucks[i].totalBatCharge + ",100," + trucks[i].chargingTime + ").";
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
        }

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
           /*  list.getValue().forEach(element => {
                let varAux = element.tripDay.value;
                if (varAux.trim() == date.trim()) {
                    listAux.push(element);
                }
            }); */


  public async createTripsFromPlanning(): Promise<string> {

    try {

      const rep = await fetch("http://localhost:5003/send_fleet_trip", {
        method: "GET",
        agent: this.httpAgent,
        headers: {
          Accept: "application/json"
        }
      });


      return await rep.text();
    }catch (e) {
      console.log(e);
      return null;
    }

  }

  public async convertStringIntoTrips(outputString: string, orders: Array<IOrderDTO>) {


    let ash = outputString.split("*").length - 1;
    let barrinhadireita = outputString.split("[").length - 1;
    let barrinhaesquerda = outputString.split("]").length - 1;

    for (let i = 0; i < ash; i++) {
      outputString = outputString.replace("*", ",");
    }
    for (let i = 0; i < barrinhadireita; i++) {
      outputString = outputString.replace("[", "");
    }
    for (let i = 0; i < barrinhaesquerda; i++) {
      outputString = outputString.replace("]", "");
    }


    console.log(outputString);

    let stringArray = outputString.split(",");
    let tripArray = [];
    let truck;
    let orderArray = [];
    let warehouseArray = [];
    // @ts-ignore
    let stringDate = orders[0].orderDate.toString().slice(0, 11);

    for (let i = 0; i < stringArray.length; i++) {

      if (stringArray[i].includes("T")) {

        truck = stringArray[i];


        const builder: TripBuilder = new TripBuilder(stringDate, truck);
        for (let i = 0; i < orderArray.length; i++) {


          let MINEORDER = orders.find((obj) => {


            // @ts-ignore
            let splitted = obj.identifier.split("/");
            let compareId = splitted[0] + splitted[1];

            return compareId == orderArray[i];
          });
          // @ts-ignore
          builder.addOrder(orderArray[i], MINEORDER.warehouseId);
          console.log(MINEORDER);
          // @ts-ignore
          warehouseArray.push(MINEORDER.warehouseId);
        }


        const trip = builder.build();
        const tripOrBad = await this.tripRepo.save(trip.getValue());
        const tripDTOResult = TripMap.toDTO(trip.getValue()) as ITripDTO;

        tripArray.push(tripDTOResult);
        orderArray.length = 0;
        warehouseArray.length = 0;
      } else {
        orderArray.push(stringArray[i]);
      }

    }

    return tripArray;
  }

  public async getAllTrips(date: string): Promise<Result<Array<ITripDTO>>> {

    console.log("\n\nOla " + date);

    //Substitue the '-' for '/'
    let dateArray = date.split("-");
    date = dateArray[0] + "/" + dateArray[1] + "/" + dateArray[2];

    var list = await this.tripRepo.getAllTrips();

    console.log(list.getValue());

    if (list.isFailure) {
      return Result.fail("No trips were found!");

    } else {
      var listAux = new Array<Trip>;

      list.getValue().forEach(element => {
        if (element.tripDay.value == date) {
          listAux.push(element);
        }
      });

      var listDTO = listAux.map(element => TripMap.toDTO(element));

      if (listDTO.length == 0) {
        return Result.fail("No trips were found for that day!");
      } else {
        return Result.ok<ITripDTO[]>(listDTO);
      }

    }

  }


  public async addTripTest() {

    const builder: TripBuilder = new TripBuilder("12/02/2023", "T02");
    builder.addOrder("1222", "C06");
    const trip = builder.build();
    const tripOrBad = await this.tripRepo.save(trip.getValue());

    console.log(tripOrBad);


    return Result.ok;
  }

  public async getTrip(trucks: Array<ITruckDTO>, orders: Array<IOrderDTO>): Promise<Result<ITripDTO[]>> {
    try {
      this.generateFiles();
      this.sendPaths();
      this.sendOrders(orders);
      this.sendTrucks(trucks);
      this.sendWarehouse();

      let string = await this.createTripsFromPlanning();
      let tripDtoArray = await this.convertStringIntoTrips(string, orders);


      return Promise.resolve(Result.ok<ITripDTO[]>(tripDtoArray));
    } catch (error) {
      console.log(error);
      return Result.fail(error.message);
    }
  }

  /* public async getTrip(trucks: Array<ITruckDTO>, orders: Array<IOrderDTO>): Promise<Result<ITripDTO[]>> {

       this.generateFiles();
       this.sendPaths();
       this.sendOrders(orders);
       this.sendTrucks(trucks);
       this.sendWarehouse();

       //this.createTripsFromPlanning();
       //tripsDTO = this.convertStringIntoTrips();


       return Promise.resolve(undefined);
   }*/


}
