import {Service} from "typedi";
import IWarehouseRepo from "../services/IRepos/IWarehouseRepo";
import * as https from "https";
import config from "../../config";
import fetch = require('node-fetch');


@Service()
export default class WarehouseAPIGetter implements IWarehouseRepo {

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    async exists(warehouseId: string): Promise<boolean> {
        const address = config.warehouseAPIAdress;
        const url = address + warehouseId;
        try {
            const responseChegada = await fetch(url, {
                method: 'GET',
                agent: this.httpsAgent,
            });

            const valid = responseChegada.status === 200;

            if (!valid && responseChegada.message == config.errorNotFoundWarehouse) {
                console.debug("Warehouse " + warehouseId + " does not exist!");
                return false;
            }
            if (!valid) {
                console.debug("It wasn't possible to check if the warehouse " + warehouseId + " exists!");
                return false;
            }
        } catch (e) {
            console.debug("It wasn't possible to check if the warehouse " + warehouseId + " exists!");
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