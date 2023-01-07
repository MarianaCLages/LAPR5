import * as https from "https";

import IOrderRepo from "../services/IRepos/IOrderRepo";
import IWarehouseRepo from "../services/IRepos/IWarehouseRepo";
import {Service} from "typedi";
import config from "../../config";

import fetch = require('node-fetch');
import {Result} from "../core/logic/Result";
import IOrderDTO from "../dto/IOrderDTO";


@Service()
export default class OrderAPIGetter implements IOrderRepo {

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });


    async getOrders(date: string): Promise<Result<IOrderDTO[]>> {

        const addres = config.orderAPIAdressDate;
        const url = addres + date;

        const token = config.jwtTokenClient;

        const responseChegada = await fetch(url, {
            method: 'GET',
            agent: this.httpsAgent,
            headers: {
                'Authorization': token,
            }
        });
        const valid = responseChegada.status === 200;
        if (valid) {
            const json = await responseChegada.json();
            console.log(json);
            let orderDTO : any[] = [];

            for(let i = 0; i < json.length; i++){
                console.log(json[i].identifier);

                let ord = json[i] as IOrderDTO;

                orderDTO.push(ord);

            }

            return Result.ok(orderDTO);

        } else {
            console.log("Deu merda")
            return Result.fail("Deu merda")
        }

    }

    async exists(orderId: string): Promise<boolean> {
        const address = config.orderAPIAdress;

        const splitArr = orderId.split("/");

        const url = address + "nextId=" + splitArr[0] + "&data=" + splitArr[1];

        const token = await config.jwtTokenClient;

        const responseChegada = await fetch(url, {
            method: 'GET',
            agent: this.httpsAgent,
            headers: {
                'Authorization': token,
            }
        });
        const valid = responseChegada.status === 200;

        if (!valid && responseChegada.message == config.errorNotFoundOrder) {
            console.debug("Order " + orderId + " does not exist!");
            return false;
        }
        if (!valid) {
            console.debug("It wasn't possible to check if the order " + orderId + " exists!");
            return false;
        }

        return true;
    }

    save(t: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }


}