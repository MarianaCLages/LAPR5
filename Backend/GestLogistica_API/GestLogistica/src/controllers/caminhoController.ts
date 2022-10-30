import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import ICaminhoController from "./IControllers/ICaminhoController";
import ICaminhoService from "../services/IServices/ICaminhoService";
import ICriarCaminhoDTO from "../dto/caminho/ICriarCaminhoDTO";
import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";

import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";
import { CaminhoId } from "../domain/caminho/caminhoId";

@Service()
export default class caminhoController
  extends BaseController
  implements
  ICaminhoController  {
  protected executeImpl(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  constructor(
    @Inject(config.services.caminho.name) private caminhoServiceInstance: ICaminhoService
  ) {
    super();
  }

  public async createCaminho(req: Request, res: Response, next: NextFunction) {
    try { 
      const caminhoOrError = await this.caminhoServiceInstance.createCaminho(req.body as ICriarCaminhoDTO) as Result<ICaminhoDTO>;
    
      if (caminhoOrError.isFailure) {
        return res.status(400).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateCaminho(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.updateCaminho(req.body as ICaminhoDTO) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(400).send("O caminho especificado nao foi encontrado!");
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async apagaCaminho(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.apagaCaminho(req.body as CaminhoId) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(400).send("O caminho especificado nao foi encontrado!");
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }


}
