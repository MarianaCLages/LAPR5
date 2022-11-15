import {Service} from "typedi";
import fetch from 'node-fetch';
import IOrderRepo from "../../services/IRepos/IOrderRepo";
import * as https from "https";
import {openSync, readFileSync, writeFileSync, promises as fsPromises} from 'fs';
import config from "../../../config";
import {join} from "path";



@Service()
export default class SendOrdersToPlanning implements IOrderRepo{

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
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

        var orderArr = this.getOrders(orderTruck);

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

            stringFormat = "Orders("+object.orderMass.toString() + "," + object.chargingTime.toString()+ "," + object.chargingTime.toString() + ","+ object.warehouseId.toString() + ").";
            orderArr.push(stringFormat);
        }

        for(var i = 0; i < orderArr.length;i++) {
            await fsPromises.appendFile(join(__dirname, "orders.txt"), orderArr[i] + "\r\n", {
                flag: 'a+',
            });

        }

        return orderArr;

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