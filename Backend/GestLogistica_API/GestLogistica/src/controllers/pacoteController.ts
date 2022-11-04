import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import ICaminhoController from "./IControllers/ICaminhoController";
import ICaminhoService from "../services/IServices/ICaminhoService";
import ICriarCaminhoDTO from "../dto/caminho/ICriarCaminhoDTO";
import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";
import {BaseController} from "../core/infra/BaseController";
import ICaminhoIdDto from "../dto/caminho/ICaminhoIdDto";
import IPacoteController from "./IControllers/IPacoteController";
import IPacoteService from "../services/IServices/IPacoteService";
import ICriarEmpacotamentoDTO from "../dto/empacotamento/ICriarEmpacotamentoDTO";
import IEmpacotamentoDTO from "../dto/empacotamento/IEmpacotamentoDTO";
import IEmpacotamentoIdDTO from "../dto/empacotamento/IEmpacotamentoIdDTO";
import IEmpacotamentoEntregaDTO from "../dto/empacotamento/IEmpacotamentoEntregaDTO";
import IEmpacotamentoCamiaoDTO from "../dto/empacotamento/IEmpacotamentoCamiaoDTO";

@Service()
export default class PacoteController
  extends BaseController
  implements IPacoteController {
  constructor(
    @Inject(config.services.pacote.name) private pacoteServiceInstance: IPacoteService
  ) {
    super();
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.getEmpacotamento(req.body as IEmpacotamentoIdDTO);

      if (caminhoOrError.isFailure) {
        return res.status(400).json(caminhoOrError.error).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.status(200).json(caminhoDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getByEntrega(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.getByEntregaS(req.body as IEmpacotamentoEntregaDTO);

      if (caminhoOrError.isFailure) {
        return res.status(400).json(caminhoOrError.error).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.status(200).json(caminhoDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getByCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.getByCamiaoAsync(req.body as IEmpacotamentoCamiaoDTO);

      if (caminhoOrError.isFailure) {
        return res.status(400).json(caminhoOrError.error).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.status(200).json(caminhoDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async createPacote(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.createEmpacotamento(req.body as ICriarEmpacotamentoDTO);

      if (caminhoOrError.isFailure) {
        return res.status(400).json(caminhoOrError.error).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.status(201).json(caminhoDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPacotes(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.getAllEmpacotamentos();

      if (caminhoOrError.isFailure) {
        return res.json(caminhoOrError.error).status(400);
      }

      const caminhosDTO = caminhoOrError.getValue();
      return res.json(caminhosDTO).status(200);

    } catch (e) {
      return next(e);
    }
  }



  public async updatePacote(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.updateEmpacotamento(req.body as IEmpacotamentoDTO);

      if (caminhoOrError.isFailure) {
        return res.status(400).send("O pacote especificado nao foi encontrado!");
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async apagaPacote(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.pacoteServiceInstance.apagaEmpacotamento(req.body as IEmpacotamentoIdDTO);

      if (caminhoOrError.isFailure) {
        return res.status(400).send("O caminho especificado nao foi encontrado!");
      }

      return res.json().status(200);
    } catch (e) {
      return next(e);
    }
  }

  protected executeImpl(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
