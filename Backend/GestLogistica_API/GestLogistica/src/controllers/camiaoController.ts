import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import ICamiaoController from "./IControllers/ICamiaoController";
import ICamiaoService from "../services/IServices/ICamiaoService";
import {ICamiaoDTO} from "../dto/camiao/ICamiaoDTO";
import ICamiaoCaractDTO from "../dto/camiao/ICamiaoCaractDTO";

import {Result} from "../core/logic/Result";
import {BaseController} from "../core/infra/BaseController";
import ICamiaoMatriculaDTO from "../dto/camiao/ICamiaoMatriculaDTO";

@Service()
export default class camiaoController
    extends BaseController
    implements ICamiaoController {
    constructor(
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
            return res.json(camiaoDTO).status(201).send();
        } catch (e) {
            return next(e);
        }
    }

    public async getAllCamioes(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getAllCamioes();

            if (camiaoOrError.isFailure) {
                return res.json(camiaoOrError.error).status(400);
            }

            const camioesDTO = camiaoOrError.getValue();
            return res.json(camioesDTO).status(200);

        } catch (e) {
            return next(e);
        }
    }

    public async getCamiaoByCaract(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getByCaract(req.body as ICamiaoCaractDTO);

            if (camiaoOrError.isFailure) {
                return res.status(400).json(camiaoOrError.error).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.status(200).json(camiaoDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async getCamiaoByMatricula(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getByMatricula(req.body as ICamiaoMatriculaDTO);

            if (camiaoOrError.isFailure) {
                return res.status(400).json(camiaoOrError.error).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.status(200).json(camiaoDTO).send();

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
            throw e;
        }
    }

    protected executeImpl(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
