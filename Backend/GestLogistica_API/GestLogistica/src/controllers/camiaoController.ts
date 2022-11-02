import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import ICamiaoController from "./IControllers/ICamiaoController";
import ICamiaoService from "../services/IServices/ICamiaoService";
import {ICamiaoDTO} from "../dto/camiao/ICamiaoDTO";

import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";

@Service()
export default class camiaoController 
 extends BaseController
 implements
 ICamiaoController {
    protected executeImpl(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    constructor (
        @Inject(config.services.camiao.name) private camiaoServiceInstance: ICamiaoService
) {
        super();

    }

    public async createCamiao(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.createCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if (camiaoOrError.isFailure) {
                return res.status(400).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json(camiaoDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async updateCamiao(req: Request, res: Response, next: NextFunction) {
        
        try{
            const camiaoOrError = await this.camiaoServiceInstance.updateCamiao(req.body as ICamiaoDTO);

            if (camiaoOrError.isFailure) {
                return res.status(400).send("O camiao especificado nao foi encontrado!");
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json(camiaoDTO).status(200);
        }catch(e){
            return next(e);
        }
    }
}
