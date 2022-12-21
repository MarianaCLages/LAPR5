import {Inject, Service} from "typedi";
import IOrderRepo from "./IRepos/IOrderRepo";

import fetch from 'node-fetch';
import {openSync, readFileSync, writeFileSync,statSync, promises as fsPromises} from 'fs';
import config from "../../config";
import path, {join} from "path";
import IPathRepo from "./IRepos/IPathRepo";
import ITruckRepo from "./IRepos/ITruckRepo";
import IWarehouseRepo from "./IRepos/IWarehouseRepo";
import IPackagingRepo from "../repos/packagingRepo";
import IGestBestPathService from "./IServices/IGestBestPathService";
import FormData from "form-data";
import http from "http";
import {TruckMap} from "../mappers/TruckMap";
import {PathMap} from "../mappers/PathMap";
import https from "https";

@Service()
export default class GetBestPathService implements IGestBestPathService {


    constructor(
        @Inject(config.repos.packaging.name) private packagingRepo: IPackagingRepo,
        @Inject(config.repos.truck.name) private truckRepo: ITruckRepo,
        @Inject(config.repos.path.name) private pathRepo: IPathRepo,
    )   {
    }

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    httpAgent = new http.Agent({

    });

    dirnamePaths : string;
    dirnameWarehouse : string;
    dirnameOrders : string;
    dirnameTruck : string;
    dirnameTrucks : string;


    public generateFiles(){
        fsPromises.open(join(__dirname,'paths.txt'),'w');
        this.dirnamePaths = __dirname + '/paths.txt';
        fsPromises.open(join(__dirname,'warehouse.txt'),'w');
        this.dirnameWarehouse = __dirname + '/warehouse.txt';
        fsPromises.open(join(__dirname,'orders.txt'),'w');
        this.dirnameOrders = __dirname + '/orders.txt';
        fsPromises.open(join(__dirname,'truck.txt'),'w');
        this.dirnameTruck = __dirname + '/truck.txt';
        fsPromises.open(join(__dirname,'/trucks.txt'),'w');
        this.dirnameTrucks = __dirname + '/trucks.txt';
    }


    public async sendPaths(){

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

            stringFormat = 'dadosCam_t_e_ta(truck,' + warehouseBegginingNumber + ',' + warehouseEndingNumber + ',' + pathsDTO[i].time + ',' + pathsDTO[i].energy + ',' + pathsDTO[i].chargingTime + ').';
            pathArray.push(stringFormat);
        }

        for (var i = 0; i < paths._value.length; i++) {
            await fsPromises.appendFile(join(__dirname, "paths.txt"), pathArray[i] + "\r\n", {
                flag: 'a+',
            });

        }

        //SEND PATHS TO PROLOG

        let formData = new FormData();

        //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
        var buffer = require('fs').readFileSync(this.dirnamePaths);
        formData.append('file',buffer);

        const rep = await fetch("http://localhost:5003/receive_path_post", {
            method: "POST",
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
            body: formData,
        })

    }

    public async sendTrucks(){

        const trucks = await this.truckRepo.getAllTrucks();
        console.log(trucks);
        const truckDTO = trucks.getValue().map(cam => TruckMap.toDTO(cam));

        let stringFormat : string;
        var aspas = "'";
        var pathArray = [];

        for(var i = 0; i < truckDTO.length; i++) {

            stringFormat = 'carateristicasCam('+ aspas +truckDTO[i].caractTruck + aspas + ","+truckDTO[i].tare+","+truckDTO[i].weightCapacity+","+truckDTO[i].totalBatCharge+",100,"+truckDTO[i].chargingTime+").";
            pathArray.push(stringFormat);
        }

        for(var i = 0; i < pathArray.length; i++) {
            await fsPromises.appendFile(join(__dirname, "trucks.txt"), pathArray[i] + "\r\n", {
                flag: 'a+',
            });
        }


        //SEND TRUCKS TO PROLOG

        let formData = new FormData();

        //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
        var buffer = require('fs').readFileSync(this.dirnameTrucks);
        formData.append('file',buffer);

        const rep = await fetch("http://localhost:5003/receive_trucks_post", {
            method: "POST",
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
            body: formData,
        })


        var object = await rep;
        console.log("Trucks to Planning sent!");

    }

    public async sendWarehouse() {

        const url = 'https://localhost:5001/api/Warehouse';

        let  response
        try {
            response = await fetch(url, {
                method: 'GET',
                agent: this.httpsAgent,
                headers: {
                    Accept: 'application/json',
                }
            })
        }catch (error){
            throw  TypeError("GestArm not connected!");
        }

        const result = (await response.json());
        var pathArray = [];
        var stringFormat: string;
        var aspas = "'";
        for(var i = 0; i < result.length; i++){

            var warehouseId = result[i].alphaNumId
            warehouseId = warehouseId.substring(1);

            var warehouseIdNumber = +warehouseId;

            stringFormat = 'idArmazem(' + aspas + result[i].street + aspas+ ',' + warehouseIdNumber + ').';

            pathArray.push(stringFormat);
        }

        for(var i = 0; i < result.length; i++){
            await fsPromises.appendFile(join(__dirname, "warehouse.txt"), pathArray[i] + "\r\n", {
                flag: 'a+',
            });
        }

        //SEND Warehouse TO PROLOG

        let formData = new FormData();

        //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
        var buffer = require('fs').readFileSync(this.dirnameWarehouse);
        formData.append('file',buffer);

        const rep = await fetch("http://localhost:5003/receive_warehouse_post", {
            method: "POST",
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
            body: formData,
        })


        var object = await rep;
        console.log("Warehouses to Planning sent!");

    }
}