import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import ICaminhoController from "./IControllers/ICaminhoController";
import ICaminhoService from "../services/IServices/ICaminhoService";
import ICriarCaminhoDTO from "../dto/caminho/ICriarCaminhoDTO";
import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";
import {BaseController} from "../core/infra/BaseController";
import ICaminhoIdDto from "../dto/caminho/ICaminhoIdDto";
import ICaminhoArmazemPartidaIdDTO from "../dto/caminho/ICaminhoArmazemPartidaIdDTO";
import ICaminhoArmazemChegadaIdDTO from "../dto/caminho/ICaminhoArmazemChegadaIdDTO";

@Service()
export default class caminhoController
    extends BaseController
    implements ICaminhoController {
    constructor(
        @Inject(config.services.caminho.name) private caminhoServiceInstance: ICaminhoService
    ) {
        super();
    }

    public async createCaminho(req: Request, res: Response, next: NextFunction) {
        try {
            const caminhoOrError = await this.caminhoServiceInstance.createCaminho(req.body as ICriarCaminhoDTO);

            if (caminhoOrError.isFailure) {
                return res.status(400).json(caminhoOrError.error).send();
            }

            const caminhoDTO = caminhoOrError.getValue();
            return res.status(201).json(caminhoDTO).send();
        } catch (e) {
            return next(e);
        }
    }

    public async getAllCaminhos(req: Request, res: Response, next: NextFunction) {
        try {
            const caminhoOrError = await this.caminhoServiceInstance.getAllCaminhos();

            if (caminhoOrError.isFailure) {
                return res.status(400).json(caminhoOrError.error).send();
            }

            if(caminhoOrError.getValue().length == 0) {
                return res.status(404).json("Nenhum caminho foi encontrado").send();
            }

            const caminhosDTO = caminhoOrError.getValue();
            return res.status(200).json(caminhosDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async getByArmazemPartidaId(req: Request, res: Response, next: NextFunction) {
        try {
            const caminhoOrError = await this.caminhoServiceInstance.getByArmazemPartidaId(req.body as ICaminhoArmazemPartidaIdDTO);

            if (caminhoOrError.isFailure) {
                return res.status(400).json(caminhoOrError.error).send();
            }

            if(caminhoOrError.getValue().length == 0) {
                return res.status(404).json("Nenhum caminho com esse armazém de partida foi encontrado!").send();
            }

            const caminhoDTO = caminhoOrError.getValue();
            return res.status(200).json(caminhoDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async getByArmazemChegadaId(req: Request, res: Response, next: NextFunction) {
        try {
            const caminhoOrError = await this.caminhoServiceInstance.getByArmazemChegadaId(req.body as ICaminhoArmazemChegadaIdDTO);

            if (caminhoOrError.isFailure) {
                return res.status(400).json(caminhoOrError.error).send();
            }

            if(caminhoOrError.getValue().length == 0) {
                return res.status(404).json("Nenhum caminho com esse armazém de chegada foi encontrado!").send();
            }
            
            const caminhoDTO = caminhoOrError.getValue();
            return res.status(200).json(caminhoDTO).send();

        } catch (e) {
            return next(e);
        }
    }



    public async updateCaminho(req: Request, res: Response, next: NextFunction) {
        try {
            const caminhoOrError = await this.caminhoServiceInstance.updateCaminho(req.body as ICaminhoDTO);

            if (caminhoOrError.isFailure) {
                return res.status(400).send("O caminho especificado nao foi encontrado!");
            }

            const caminhoDTO = caminhoOrError.getValue();
            return res.status(200).json(caminhoDTO).send();
        } catch (e) {
            return next(e);
        }
    }

    public async apagaCaminho(req: Request, res: Response, next: NextFunction) {
        try {
            const caminhoOrError = await this.caminhoServiceInstance.apagaCaminho(req.body as ICaminhoIdDto);

            if (caminhoOrError.isFailure) {
                return res.status(400).send("O caminho especificado nao foi encontrado!");
            }

            return res.status(200).send("Caminho apagado com sucesso!");
        } catch (e) {
            return next(e);
        }
    }

    protected executeImpl(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}
