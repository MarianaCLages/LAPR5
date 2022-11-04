import {Service} from "typedi";
import IArmazemRepo from "../services/IRepos/IArmazemRepo";
import * as https from "https";
import config from "../../config";
import fetch = require('node-fetch');
import IEncomendaRepo from "../services/IRepos/IEncomendaRepo";


@Service()
export default class EncomendaAPIGetter implements IEncomendaRepo {

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  async exists(encomendaId: string): Promise<boolean> {
    const address = config.encomendaAPIAdress;

    const splitArr = encomendaId.split("/");

    const url = address + splitArr[0] + '/' + splitArr[1];
    const responseChegada = await fetch(url, {
      method: 'GET',
      agent: this.httpsAgent,
    });
    const valid = responseChegada.status === 200;

    if (!valid && responseChegada.message == config.errorNotFoundEncomenda) {
      console.debug("Encomenda " + encomendaId + " não existe!");
      return false;
    }
    if (!valid) {
      console.debug("Não foi possível verificar se a encomenda " + encomendaId + " existe!");
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