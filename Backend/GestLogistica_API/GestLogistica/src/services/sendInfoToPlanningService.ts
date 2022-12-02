import {Service} from "typedi";
import fetch from 'node-fetch';
import IOrderRepo from "./IRepos/IOrderRepo";
import * as https from "https";

import {openSync, readFileSync, writeFileSync,statSync, promises as fsPromises} from 'fs';
import config from "../../config";
import path, {join} from "path";
import FormData from "form-data";
import * as http from "http";

@Service()
export default class SendInfoToPlanningService {

    constructor() {

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

        const url = 'http://localhost:3000/api/paths/allPaths';

        const response = await fetch(url, {
            method: 'GET',
            agent: this.httpAgent,
            headers: {
                Accept: 'application/json',
            }
        })


        const result = (await response.json());
        var pathArray = [];
        var stringFormat: string;

        for (var i = 0; i < result.length; i++) {

            var warehouseBegginingString = result[i].beginningWarehouseId.toString();
            var warehouseEndingString = result[i].endingWarehouseId.toString();

            warehouseBegginingString = warehouseBegginingString.substring(1);
            warehouseEndingString = warehouseEndingString.substring(1);

            var warehouseBegginingNumber = +warehouseBegginingString;
            var warehouseEndingNumber = +warehouseEndingString;

            stringFormat = 'dadosCam_t_e_ta(truck,' + warehouseBegginingNumber + ',' + warehouseEndingNumber + ',' + result[i].time.toString() + ',' + result[i].energy.toString() + ',' + result[i].chargingTime.toString() + ').';
            pathArray.push(stringFormat);
        }


        for (var i = 0; i < result.length; i++) {
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


        var object = await rep;
        console.log("Paths to Planning sent!");
    }

    public async sendTrucks(){

        const response = await fetch('http://localhost:3000/api/trucks/all',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        const result = (await response.json());

        let stringFormat : string;
        var aspas = "'";
        var pathArray = [];


        for(var i = 0; i < result.length; i++) {

            stringFormat = 'carateristicasCam('+ aspas +result[i].caractTruck + aspas + ","+result[i].tare+","+result[i].weightCapacity+","+result[i].totalBatCharge+",100,"+result[i].chargingTime+").";
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

    public async sendWarehouse(){
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

    public async sendOrdersToPlanning(truckId : string, date : string){

        const response = await fetch('http://localhost:3000/api/packagings/all',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })


        const result = (await response.json());
        var orderTruck = [];

        for(var i = 0; i < result.length;i++){

            let string = result[i].truckRef.toString();

            if(string.includes(truckId)){
                orderTruck.push(result[i].orderRef.toString());
            }
        }

        this.getOrders(orderTruck,date);
        //this.sendOrdersToProlog();
    }


    public async getHeuristic(): Promise<string>{

        let object: string;

        let rep
        try {
                rep = await fetch("http://localhost:5003/send_heuristic", {
                method: 'GET',
                agent: this.httpAgent,
                headers: {
                    Accept: 'application/json',
                },
            })

        }catch (error){
            throw  TypeError("Planning not connected!");
        }
        return await rep.text();

    }

    public async getHeuristicByWeight(): Promise<string>{

        let object: string;

        const rep = await fetch("http://localhost:5003/send_heuristic_weight", {
            method: 'GET',
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
        })


        return await rep.text();


    }

    public async getHeuristicByWeightTime(): Promise<string>{

        let object: string;

        const rep = await fetch("http://localhost:5003/send_heuristic_weight_time", {
            method: 'GET',
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
        })


        return await rep.text();


    }

    public async getTruck(truckId : string){


        const response = await fetch('http://localhost:3000/api/trucks/all',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        const object = (await response.json());
        var truckObject;
        let stringFormat: string;
        var aspas = "'";
        stringFormat = "cam(" + aspas;

        for(let i = 0; i < object.length;i++){

            if(object[i].caractTruck.toString() == truckId){
                truckObject = object[i];
            }
        }

        if(truckObject == null){
            throw TypeError("Truck does not exist!");
        }

        stringFormat = stringFormat + truckObject.caractTruck + aspas +"," + truckObject.totalBatCharge + ").";

        await fsPromises.writeFile(join(__dirname, "truck.txt"), stringFormat , {
            flag: 'a+',
        });


        let formData = new FormData();

        //var buffer = require('fs').readFileSync('C:/Users/Tiago Ferreira/Documents/lei21-22-s5-3dj-56/Backend/GestLogistica_API/GestLogistica/src/core/infra/paths.txt');
        var buffer = require('fs').readFileSync(this.dirnameTruck);
        formData.append('file',buffer);

        const rep = await fetch("http://localhost:5003/receive_truck_post", {
            method: "POST",
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
            body: formData,
        })


        var object2 = await rep;
        console.log("Truck to Planning sent!");
    }

    private async getOrders(ordersId= [],date : string){

        let orderIdVar : string;
        var orderArr = [];
        var os = require("os");
        let stringFormat : string;
        let entrega_armazem: string;

        let dateArray = date.split('_');
        let goodDateFormat = '';

        goodDateFormat = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

        let realDate = new Date(goodDateFormat);

        entrega_armazem = 'entrega_armazens([';

        for(var i = 0; i < ordersId.length; i++) {

            orderIdVar = ordersId[i];
            const address = config.orderAPIAdress;
            const splitArr = orderIdVar.split("/");


            const url = address + "nextId=" + splitArr[0] + "&data=" + splitArr[1];

            const response = await fetch(url, {
                method: 'GET',
                agent: this.httpsAgent,
                headers: {
                    Accept: 'application/json',
                }
            })


            var object = await response.json();
            let dateOrder = new Date(object.orderDate);

            let dateClient = realDate.toLocaleDateString();
            let dateObj = dateOrder.toLocaleDateString();

            if (dateObj == dateClient){
                var warehouseString = object.warehouseId.toString();

            warehouseString = warehouseString.substring(1);
            let warehouseNumber = +warehouseString;

            let idSplit = object.identifier.toString().split('/');

            stringFormat = "entrega(" + idSplit[0] + idSplit[1] + ",222," + object.orderMass.toString() + "," + warehouseNumber + ',' + object.chargingTime.toString() + ',' + object.unloadingTime.toString() + ").";
            orderArr.push(stringFormat);

            if (i == ordersId.length - 1) {
                entrega_armazem = entrega_armazem + warehouseNumber + ']).';
            } else {
                entrega_armazem = entrega_armazem + warehouseNumber + ',';
            }
        }
        }

        orderArr.push(entrega_armazem);
        for(var z = 0; z < orderArr.length;z++) {
            await fsPromises.appendFile(join(__dirname, "orders.txt"), orderArr[z] + "\r\n", {
                flag: 'a+',
            });
        }
            // const file = new LocalFileData('C:\\Users\\Tiago Ferreira\\Documents\\lei21-22-s5-3dj-56\\Backend\\GestLogistica_API\\GestLogistica\\src\\core\\infra\\orderspath.txt');
            // const file = new LocalFileData('Backend/GestLogistica_API/GestLogistica/src/core/infra/orderspath.txt');

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



    }




}