import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import IPathController from "./IControllers/IPathController";
import IPathService from "../services/IServices/IPathService";
import ICreatePathDTO from "../dto/path/ICreatePathDTO";
import IPathDTO from "../dto/path/IPathDTO";
import {BaseController} from "../core/infra/BaseController";
import IPathIdDto from "../dto/path/IPathIdDto";
import IPathBeginningWarehouseIdDTO from "../dto/path/IPathBeginningWarehouseIdDTO";
import IPathEndingWarehouseIdDTO from "../dto/path/IPathEndingWarehouseIdDTO";

@Service()
export default class pathController
    extends BaseController
    implements IPathController {
    constructor(
        @Inject(config.services.path.name) private pathServiceInstance: IPathService
    ) {
        super();
    }

    public async createPath(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.createPath(req.body as ICreatePathDTO);

            if (pathOrError.isFailure) {
                return res.status(400).json(pathOrError.error).send();
            }

            const pathDTO = pathOrError.getValue();
            return res.status(201).json(pathDTO).send();
        } catch (e) {
            return next(e);
        }
    }

    public async getAllPaths(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.getAllPaths();

            if (pathOrError.isFailure) {
                return res.status(400).json(pathOrError.error).send();
            }

            if(pathOrError.getValue().length == 0) {
                return res.status(404).json("Nenhum path foi encontrado").send();
            }

            const pathsDTO = pathOrError.getValue();
            return res.status(200).json(pathsDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async getByBeginningWarehouseId(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.getByBeginningWarehouseId(req.body as IPathBeginningWarehouseIdDTO);

            if (pathOrError.isFailure) {
                return res.status(400).json(pathOrError.error).send();
            }

            if(pathOrError.getValue().length == 0) {
                return res.status(404).json("Nenhum path com esse armazém de partida foi encontrado!").send();
            }

            const pathDTO = pathOrError.getValue();
            return res.status(200).json(pathDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async getByEndingWarehouseId(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.getByEndingWarehouseId(req.body as IPathEndingWarehouseIdDTO);

            if (pathOrError.isFailure) {
                return res.status(400).json(pathOrError.error).send();
            }

            if(pathOrError.getValue().length == 0) {
                return res.status(404).json("Nenhum path com esse armazém de chegada foi encontrado!").send();
            }
            
            const pathDTO = pathOrError.getValue();
            return res.status(200).json(pathDTO).send();

        } catch (e) {
            return next(e);
        }
    }



    public async updatePath(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.updatePath(req.body as IPathDTO);

            if (pathOrError.isFailure) {
                return res.status(400).send("The specified path was not found!");
            }

            const pathDTO = pathOrError.getValue();
            return res.status(200).json(pathDTO).send();
        } catch (e) {
            return next(e);
        }
    }

    public async deletePath(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.deletePath(req.body as IPathIdDto);

            if (pathOrError.isFailure) {
                return res.status(400).send("The specified path was not found!");
            }

            return res.status(200).send("Successfuly deleted path!");
        } catch (e) {
            return next(e);
        }
    }

    protected executeImpl(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}
