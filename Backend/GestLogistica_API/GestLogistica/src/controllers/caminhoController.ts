import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import ICaminhoController from "./IControllers/ICaminhoController";
import ICaminhoService from "../services/IServices/ICaminhoService";
import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";

import { Result } from "../core/logic/Result";

@Service()
export default class caminhoController
  implements
    ICaminhoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.role.name) private roleServiceInstance: ICaminhoService
  ) {}

  public async createCaminho(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = (await this.roleServiceInstance.createCaminho(
        req.body as ICaminhoDTO
      )) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(402).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
