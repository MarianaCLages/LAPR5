import {Service} from "typedi";
import fetch from 'node-fetch';
import IOrderRepo from "../../services/IRepos/IOrderRepo";
import * as https from "https";

import {openSync, readFileSync, writeFileSync,statSync, promises as fsPromises} from 'fs';
import config from "../../../config";
import path, {join} from "path";
import FormData from "form-data";
import * as http from "http";


@Service()
export default class SendOrdersToPlanning implements IOrderRepo{



    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    httpAgent = new http.Agent({

    });



    async sendOrdersByTheTruckPackages(truckId : string){

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
        this.sendOrdersToProlog();

    }

    private async getOrders(ordersId= []){

        let orderIdVar : string;
        var orderArr = [];
        var os = require("os");
        let stringFormat : string;

        for(var i = 0; i < ordersId.length; i++) {

            orderIdVar = ordersId[i];
            const address = config.orderAPIAdress;
            const splitArr = orderIdVar.split("/");


            const url = address + "nextId=" + splitArr[1] + "&data=" + splitArr[0];

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

            stringFormat = "orders("+object.orderMass.toString() + "," + object.chargingTime.toString()+ "," + object.chargingTime.toString() + ","+ warehouseNumber + ").";
            orderArr.push(stringFormat);
        }

        for(var i = 0; i < orderArr.length;i++) {
            await fsPromises.appendFile(join(__dirname, "orders.pl"), orderArr[i] + "\r\n", {
                flag: 'a+',
            });

        }


    }

    private async sendOrdersToProlog() {

       // const file = new LocalFileData('C:\\Users\\Tiago Ferreira\\Documents\\lei21-22-s5-3dj-56\\Backend\\GestLogistica_API\\GestLogistica\\src\\core\\infra\\orderspath.txt');
       // const file = new LocalFileData('Backend/GestLogistica_API/GestLogistica/src/core/infra/orderspath.txt');

        let formData = new FormData();

        var buffer = require('fs').readFileSync('Backend/GestLogistica_API/GestLogistica/src/core/infra/orderspath.txt');
        formData.append('file',buffer);

        const rep = await fetch("http://localhost:5002/send_file_post", {
            method: "POST",
            agent: this.httpAgent,
            headers:{
                Accept: 'application/json',
            },
            body: formData,
        })


        var object = await rep;
        console.log("REQUEST DO PROLOG:"+object)

    }


    exists(orderId: string): Promise<boolean>;
    exists(t: any): Promise<boolean>;
    exists(orderId: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    save(t: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}