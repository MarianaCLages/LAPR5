import {Service} from "typedi";
import IArmazemRepo from "../services/IRepos/IArmazemRepo";
import * as https from "https";
import config from "../../config";
import fetch = require('node-fetch');


@Service()
export default class AmazemAPIGetter implements IArmazemRepo {

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    async exists(armazemId: string): Promise<boolean> {
        const address = config.amazemAPIAdress;
        const url = address + armazemId;
        const responseChegada = await fetch(url, {
            method: 'GET',
            agent: this.httpsAgent,
        });
        const valid = responseChegada.status === 200;
        if (!valid) {
            console.debug("Armazem " + armazemId + " não existe!");
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