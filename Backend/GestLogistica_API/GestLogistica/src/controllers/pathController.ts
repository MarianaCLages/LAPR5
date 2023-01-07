import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import IPathController from "./IControllers/IPathController";
import IPathService from "../services/IServices/IPathService";
import ICreatePathDTO from "../dto/path/ICreatePathDTO";
import IPathDTO from "../dto/path/IPathDTO";
import { BaseController } from "../core/infra/BaseController";
import IPathIdDto from "../dto/path/IPathIdDto";
import IPathBeginningWarehouseIdDTO from "../dto/path/IPathBeginningWarehouseIdDTO";
import IPathEndingWarehouseIdDTO from "../dto/path/IPathEndingWarehouseIdDTO";
import { Result } from "../core/logic/Result";
import IVerifyAuthService from "../services/IServices/IVerifyAuthService";
import verifyAuthGoogleService from "../services/verifyAuthGoogleService";
import AuthRepo from "../repos/AuthRepo";

@Service()
export default class pathController
  extends BaseController
  implements IPathController {
  private authService: IVerifyAuthService = new verifyAuthGoogleService(new AuthRepo()); //TODO: não pode ficar assim mas a injeção não está a funcionar

  constructor(
    @Inject(config.services.path.name) private pathServiceInstance: IPathService
  ) {
    super();
  }

  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
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
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
      const pathOrError = await this.pathServiceInstance.getAllPaths();

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      if (pathOrError.getValue().length == 0) {
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
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
      const id = req.params.id;
      const warehouse: IPathBeginningWarehouseIdDTO = { beginningWarehouseId: id };
      const pathOrError = await this.pathServiceInstance.getByBeginningWarehouseId(warehouse);

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      if (pathOrError.getValue().length == 0) {
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
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
      const id = req.params.id;
      const warehouse: IPathEndingWarehouseIdDTO = { endingWarehouseId: id };
      const pathOrError = await this.pathServiceInstance.getByEndingWarehouseId(warehouse);

      if (pathOrError.isFailure) {
        return res.status(400).json(pathOrError.error).send();
      }

      if (pathOrError.getValue().length == 0) {
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
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
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
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
      const pathOrError = await this.pathServiceInstance.deletePath(req.body as IPathIdDto);

      if (pathOrError.isFailure) {
        return res.status(400).send("The specified path was not found!");
      }

      return res.status(200).send("Successfuly deleted path!");
    } catch (e) {
      return next(e);
    }
  }

  public async getByBeginningAndEndingWarehouseId(req: Request, res: Response, next: NextFunction) {

    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      }
      const beginningWarehouseId = req.params.beginningId;
      const endingWarehouseId = req.params.endingId;

      const pathOrError = await this.pathServiceInstance.getByBeginningAndEndingWarehouseId(beginningWarehouseId, endingWarehouseId);

      if (pathOrError.isFailure) {
        return res.status(404).json("Nenhum path com esse armazém de partida e chegada foi encontrado!").send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json(pathDTO).send();
    } catch (e) {
      return next(e);
    }
  }


  protected executeImpl(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  private async authentication(token: string): Promise<Result<any>> {
    const acceptOrNot = await this.authService.VerifyUserJWT(token, ["LogisticManager", "Admin"]);

    if (!token) {
      return Result.fail({
        code: 401,
        error: "Unauthorized",
        description: "Unauthorized"
      });
    }

    if (acceptOrNot.isFailure) {
      if (acceptOrNot.error === "The user is not authorized") {
        return Result.fail({
          code: 403,
          error: "The user is not authorized"
        });
      } else {
        if (acceptOrNot.error === "The user does not exist") {
          return Result.fail({
            code: 401,
            error: "The user does not exist"
          });
        } else {
          return Result.fail({
            code: 400,
            error: acceptOrNot.error
          });
        }
      }
    }
    return Result.ok(acceptOrNot.getValue());

  }

}
