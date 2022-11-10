import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import {BaseController} from "../core/infra/BaseController";
import IPackagingController from "./IControllers/IPackagingController";
import IPackagingService from "../services/IServices/IPackagingService";
import ICreatePackagingDTO from "../dto/packaging/ICreatePackagingDTO";
import IPackagingDTO from "../dto/packaging/IPackagingDTO";
import IPackagingIdDTO from "../dto/packaging/IPackagingIdDTO";
import IPackagingOrderDTO from "../dto/packaging/IPackagingOrderDTO";
import IPackagingTruckDTO from "../dto/packaging/IPackagingTruckDTO";

@Service()
export default class PackagingController
  extends BaseController
  implements IPackagingController {
  constructor(
    @Inject(config.services.packaging.name) private packagingServiceInstance: IPackagingService
  ) {
    super();
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.getPackaging(req.body as IPackagingIdDTO);

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json(pathDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getByOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.getByOrderS(req.body as IPackagingOrderDTO);

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      if(pathOrError.getValue().length == 0) {
        return res.status(404).json("No packaging with that order was found!").send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json(pathDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getByTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.getByTruckAsync(req.body as IPackagingTruckDTO);

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      if(pathOrError.getValue().length == 0) {
        return res.status(404).json("No packaging with that truck was found!").send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json(pathDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async createPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.createPackaging(req.body as ICreatePackagingDTO);

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(201).json(pathDTO).send();
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPackagings(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.getAllPackagings();

      if (pathOrError.isFailure) {
        return res.json(pathOrError.error).status(400);
      }

      if(pathOrError.getValue().length == 0) {
        return res.status(404).json("No packaging was found!").send();
      }

      const pathsDTO = pathOrError.getValue();
      return res.json(pathsDTO).status(200).send();

    } catch (e) {
      return next(e);
    }
  }

  public async updatePackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.updatePackaging(req.body as IPackagingDTO);

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.errorValue());
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(200).send();
    } catch (e) {
      return next(e);
    }
  }

  public async deletePackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.packagingServiceInstance.deletePackaging(req.body as IPackagingIdDTO);

      if (pathOrError.isFailure) {
        return res.status(400).send("The specified path was not found!");
      }

      return res.json().status(200).send();
    } catch (e) {
      return next(e);
    }
  }

  protected executeImpl(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}