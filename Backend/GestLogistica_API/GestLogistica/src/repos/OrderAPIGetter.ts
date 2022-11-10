import {Service} from "typedi";
import IWarehouseRepo from "../services/IRepos/IWarehouseRepo";
import * as https from "https";
import config from "../../config";
import fetch = require('node-fetch');
import IOrderRepo from "../services/IRepos/IOrderRepo";


@Service()
export default class OrderAPIGetter implements IOrderRepo {

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  async exists(orderId: string): Promise<boolean> {
    const address = config.orderAPIAdress;

    const splitArr = orderId.split("/");

    const url = address + splitArr[0] + '/' + splitArr[1];
    const responseChegada = await fetch(url, {
      method: 'GET',
      agent: this.httpsAgent,
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