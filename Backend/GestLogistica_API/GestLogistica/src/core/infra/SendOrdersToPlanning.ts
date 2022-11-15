import {Service} from "typedi";
import fetch from 'node-fetch';
import IOrderRepo from "../../services/IRepos/IOrderRepo";
import * as https from "https";
import config from "../../../config";

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





    }

    private async getOrders(ordersId: []){}

    exists(orderId: string): Promise<boolean>;
    exists(t: any): Promise<boolean>;
    exists(orderId: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    save(t: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}