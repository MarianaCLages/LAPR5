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

    public generateFiles(){
        fsPromises.open(join(__dirname,'paths.txt'),'w');
        this.dirnamePaths = __dirname + '/paths.txt';
        fsPromises.open(join(__dirname,'warehouse.txt'),'w');
        this.dirnameWarehouse = __dirname + '/warehouse.txt';
        fsPromises.open(join(__dirname,'orders.txt'),'w');
        this.dirnameOrders = __dirname + '/orders.txt';
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

    public async sendWarehouse(){
        const url = 'https://localhost:5001/api/Warehouse';

        const response = await fetch(url, {
            method: 'GET',
            agent: this.httpsAgent,
            headers: {
                Accept: 'application/json',
            }
        })

        const result = (await response.json());
        var pathArray = [];
        var stringFormat: string;

        for(var i = 0; i < result.length; i++){

            var warehouseId = result[i].alphaNumId
            warehouseId = warehouseId.substring(1);

            var warehouseIdNumber = +warehouseId;

            stringFormat = 'warehouses(' + result[i].street + ',' + warehouseIdNumber + ').';

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

    public async sendOrdersToPlanning(truckId : string){

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

        this.getOrders(orderTruck);
        //this.sendOrdersToProlog();
    }


    private async getOrders(ordersId= []){

        let orderIdVar : string;
        var orderArr = [];
        var os = require("os");
        let stringFormat : string;
        let entrega_armazem: string;

        entrega_armazem = 'entrega_armazens([';

        for(var i = 0; i < ordersId.length; i++) {

            orderIdVar = ordersId[i];
            const address = config.orderAPIAdress;
            const splitArr = orderIdVar.split("/");


            const url = address + "nextId=" + splitArr[0] + "&data=" + splitArr[1];

            const response = await fetch(url,{
                method: 'GET',
                agent: this.httpsAgent,
                headers:{
                    Accept: 'application/json',
                }
            })

            var object = await response.json();
            var warehouseString = object.warehouseId.toString();

            warehouseString = warehouseString.substring(1);
            let warehouseNumber = +warehouseString;

            let idSplit = object.identifier.toString().split('/');

            stringFormat = "entrega("+ idSplit[0] + idSplit[1]+ ",222," + object.orderMass.toString() + ","+ warehouseNumber + ','+ object.chargingTime.toString()+ ','+ object.unloadingTime.toString()+ ").";
            orderArr.push(stringFormat);

            if(i == ordersId.length - 1){
                entrega_armazem = entrega_armazem + warehouseNumber + ']).';
            }
            else {
                entrega_armazem = entrega_armazem + warehouseNumber + ',';
            }
        }

        orderArr.push(entrega_armazem);
        for(var i = 0; i < orderArr.length;i++) {
            await fsPromises.appendFile(join(__dirname, "orders.txt"), orderArr[i] + "\r\n", {
                flag: 'a+',
            });

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

/*
    private async sendOrdersToProlog() {

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

*/


}