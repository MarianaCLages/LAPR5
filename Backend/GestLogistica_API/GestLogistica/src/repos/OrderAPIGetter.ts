import * as https from "https";

import IOrderRepo from "../services/IRepos/IOrderRepo";
import { Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IOrderDTO from "../dto/IOrderDTO";
import fetch = require("node-fetch");


@Service()
export default class OrderAPIGetter implements IOrderRepo {

  httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });


  async getOrders(date: string): Promise<Result<IOrderDTO[]>> {

    const addres = config.orderAPIAdressDate;
    const url = addres + date;

    const token = config.jwtTokenClient;

    const responseChegada = await fetch(url, {
      method: "GET",
      agent: this.httpsAgent,
      headers: {
        "Authorization": token
      }
    });
    const valid = responseChegada.status === 200;
    if (valid) {
      const json = await responseChegada.json();
      console.log(json);
      let orderDTO: any[] = [];

      for (const element of json) {
        console.log(element.identifier);
        let ord = element as IOrderDTO;
        orderDTO.push(ord);
      }

      return Result.ok(orderDTO);

    } else {
      if (responseChegada.code === 404) {
        console.log("Not found");
        return Result.fail("Not found");
      }
      return Result.fail("Orders Not Found in this date");
    }
  }

  async exists(orderId: string): Promise<boolean> {
    const address = config.orderAPIAdress;

    const splitArr = orderId.split("/");

    const url = address + "nextId=" + splitArr[0] + "&data=" + splitArr[1];

    const token = await config.jwtTokenClient;

    const responseChegada = await fetch(url, {
      method: "GET",
      agent: this.httpsAgent,
      headers: {
        "Authorization": token
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
      where: {}
    };
  }


}