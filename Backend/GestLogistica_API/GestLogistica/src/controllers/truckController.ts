import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from "../services/IServices/ITruckService";
import { ITruckDTO } from "../dto/truck/ITruckDTO";
import ITruckCaractDTO from "../dto/truck/ITruckCaractDTO";

import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";
import ITruckPlateDTO from "../dto/truck/ITruckPlateDTO";
import SendInfoToPlanningService from "../services/sendInfoToPlanningService";
import IGestBestPathService from "../services/IServices/IGestBestPathService";
import IVerifyAuthService from "../services/IServices/IVerifyAuthService";
import verifyAuthGoogleService from "../services/verifyAuthGoogleService";
import AuthRepo from "../repos/AuthRepo";
import IOrderRepo from "../services/IRepos/IOrderRepo";

@Service()
export default class truckController extends BaseController
  implements ITruckController {
  fileService = new SendInfoToPlanningService();
  private authService: IVerifyAuthService = new verifyAuthGoogleService(
    new AuthRepo()
  ); //TODO: não pode ficar assim mas a injeção não está a funcionar

  constructor(
    @Inject(config.services.truck.name)
    private truckServiceInstance: ITruckService,
    @Inject(config.services.bestpath.name)
    private bestPathServiceInstance: IGestBestPathService,
    @Inject(config.repos.order.name) private pathRepo: IOrderRepo
  ) {
    super();
  }

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }
      const truckOrError = (await this.truckServiceInstance.createTruck(
        req.body as ITruckDTO
      )) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .json(truckDTO)
        .status(201)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async getAllTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const truckOrError = await this.truckServiceInstance.getAllTrucks();

      if (truckOrError.isFailure) {
        return res.json(truckOrError.errorValue()).status(400);
      }

      if (truckOrError.getValue().length == 0) {
        return res
          .status(404)
          .json("No truck was found!")
          .send();
      }

      const trucksDTO = truckOrError.getValue();
      return res.json(trucksDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getTruckByCaract(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const truckOrError = await this.truckServiceInstance.getByCaract(
        req.body as ITruckCaractDTO
      );

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      if (truckOrError.getValue().length == 0) {
        return res
          .status(400)
          .json("No truck with that truckCaract was found!")
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(truckDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async getTruckByPlate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const truckOrError = await this.truckServiceInstance.getByPlate(
        req.body as ITruckPlateDTO
      );

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      if (truckOrError.getValue().length == 0) {
        return res
          .status(400)
          .json("No truck with that plate was found!")
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(truckDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const truckOrError = await this.truckServiceInstance.updateTruck(
        req.body as ITruckDTO
      );

      if (truckOrError.isFailure) {
        return res.status(400).send("The specified truck was not found!");
      }

      const truckDTO = truckOrError.getValue();
      return res.json(truckDTO).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async deleteTruck(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const truckOrError = await this.truckServiceInstance.deleteTruck(
        req.body as ITruckDTO
      );

      if (truckOrError.isFailure) {
        return res.status(400).send("The specified truck was not found!");
      }

      return res.json().status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async sendInfoToPlanning(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    //get the jwt token from the request
    const token = req.headers.authorization;
    const trucks = await this.authentication(token);
    if (!trucks.isSuccess) {
      return res
        .status(trucks.errorValue().code)
        .json(trucks.errorValue().error)
        .send();
    }

    let fileService = new SendInfoToPlanningService();
    this.fileService.generateFiles();
    await this.fileService.sendPaths();
    await this.fileService.sendWarehouse();
    await this.fileService.sendTrucks();

    return res.status(200).json("Info sent successfully!");
  }

  public async sendInfo(req: Request, res: Response, next: NextFunction) {
    //get the jwt token from the request
    const token = req.headers.authorization;
    const trucks = await this.authentication(token);
    if (!trucks.isSuccess) {
      return res
        .status(trucks.errorValue().code)
        .json(trucks.errorValue().error)
        .send();
    }

    let fileService = new SendInfoToPlanningService();
    let idTruck = req.params.idTruck;
    let stringTest: string;

    try {
      this.fileService.generateFiles();
      await this.fileService.sendPaths();
      await this.fileService.sendWarehouse();
      await this.fileService.sendTrucks();

      await this.fileService.getTruck(idTruck);
      await this.fileService.sendOrdersToPlanning(idTruck, req.params.date);

      stringTest = await fileService.getHeuristic();
    } catch (error) {
      return res.status(400).json(error.message);
    }

    return res.status(200).json(stringTest);
  }

  public async getHeuristicByWeight(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    //get the jwt token from the request
    const token = req.headers.authorization;
    const trucks = await this.authentication(token);
    if (!trucks.isSuccess) {
      return res
        .status(trucks.errorValue().code)
        .json(trucks.errorValue().error)
        .send();
    }

    let fileService = new SendInfoToPlanningService();
    let idTruck = req.params.idTruck;
    let stringTest: string;

    this.fileService.generateFiles();
    this.fileService.sendPaths();
    this.fileService.sendWarehouse();
    this.fileService.sendTrucks();

    this.fileService.sendOrdersToPlanning(idTruck, req.params.date);

    stringTest = await fileService.getHeuristicByWeight();

    return res.status(200).json(stringTest);
  }

  public async getHeuristicByTimeWeight(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    //get the jwt token from the request
    const token = req.headers.authorization;
    const trucks = await this.authentication(token);
    if (!trucks.isSuccess) {
      return res
        .status(trucks.errorValue().code)
        .json(trucks.errorValue().error)
        .send();
    }

    let idTruck = req.params.idTruck;

    let stringTest: string;
    this.fileService.generateFiles();
    await this.fileService.sendPaths();
    await this.fileService.sendWarehouse();
    await this.fileService.sendTrucks();

    await this.fileService.sendOrdersToPlanning(idTruck, req.params.date);

    stringTest = await this.fileService.getHeuristicByWeightTime();

    return res.status(200).json(stringTest);
  }

  public async getTruckByPlateParam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }
      const plate: string = req.params.plate;
      const dto: ITruckPlateDTO = {
        truckPlate: plate,
      };

      const truckOrError = await this.truckServiceInstance.getByPlate(dto);

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      if (truckOrError.getValue().length == 0) {
        return res
          .status(400)
          .json("No truck with that plate was found!")
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(truckDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async getTruckByCaractParam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }
      const caract: string = req.params.caractTruck;
      const dto: ITruckCaractDTO = {
        caractTruck: caract,
      };

      const truckOrError = await this.truckServiceInstance.getByCaract(dto);

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      if (truckOrError.getValue().length == 0) {
        return res
          .status(400)
          .json("No truck with that truckCaract was found!")
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(truckDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async getBestPathForEachTruck(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    /*
        //get the jwt token from the request
        const token = req.headers.authorization;
        const trucks = await this.authentication(token);
        if (!trucks.isSuccess) {
          return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
        }*/

    const ordersDTO = await this.pathRepo.getOrders(req.body.date);
    const truckArray = req.body.truck;

    let truckDTO = [];
    for (const element of truckArray) {
      let itruckdto: ITruckCaractDTO = { caractTruck: element };

      let dto = await this.truckServiceInstance.getByCaract(itruckdto);
      truckDTO.push(dto.getValue()[0]);
    }

    //let stringTest = await this.bestPathServiceInstance.createTripsFromPlanning();
    //let tripArray = await this.bestPathServiceInstance.convertStringIntoTrips(stringTest,req.params.date);

    if (ordersDTO.isSuccess) {
      let tripsArray = await this.bestPathServiceInstance.getTrip(
        truckDTO,
        ordersDTO.getValue()
      );
      return res.status(200).json(tripsArray);
    } else {
      return res
        .status(400)
        .json(ordersDTO.error)
        .send();
    }
  }

  public async deleteTruckSoftPlate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get the jwt token from the request
      // const token = req.headers.authorization;
      // const trucks = await this.authentication(token);
      // if (!trucks.isSuccess) {
      //   return res.status(trucks.errorValue().code).json(trucks.errorValue().error).send();
      // }

      const plate: string = req.params.plate;
      const dto: ITruckPlateDTO = {
        truckPlate: plate,
      };

      const truckOrError = await this.truckServiceInstance.deleteTruckSoftPlate(
        dto
      );

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(truckDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async deleteTruckSoftCaract(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const caract: string = req.params.caractTruck;
      const dto: ITruckCaractDTO = {
        caractTruck: caract,
      };

      const truckOrError = await this.truckServiceInstance.deleteTruckSoftCaract(
        dto
      );

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      const truckDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(truckDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  public async getTrips(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const date: string = req.params.date;

      const truckOrError = await this.bestPathServiceInstance.getAllTrips(date);

      if (truckOrError.isFailure) {
        return res
          .status(400)
          .json(truckOrError.error)
          .send();
      }

      if (truckOrError.getValue().length == 0) {
        return res
          .status(404)
          .json("No truck was found!")
          .send();
      }

      const tripDTO = truckOrError.getValue();
      return res
        .status(200)
        .json(tripDTO)
        .send();
    } catch (e) {
      return next(e);
    }
  }

  async getTripsTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }
      const truck = req.params.truck;
      const tripsOrError = await this.bestPathServiceInstance.getAllTripsAll();

      if (tripsOrError.isFailure) {
        return res
          .status(400)
          .json(tripsOrError.error)
          .send();
      }
      if (tripsOrError.getValue().length == 0) {
        return res
          .status(404)
          .json(tripsOrError.error)
          .send();
      }

      const tripsArr = tripsOrError.getValue();

      //find the trips with those trucks
      const tripsWithTrucks = tripsArr.filter(
        (trip) => trip.tripTruck == truck
      );

      if (tripsWithTrucks.length == 0) {
        return res
          .status(404)
          .json(tripsOrError.error)
          .send();
      }

      return res
        .status(200)
        .json(tripsWithTrucks)
        .send();
    } catch (err) {
      return next(err);
    }
  }

  async getAllTrips(req: Request, res: Response, next: NextFunction) {
    try {
      //get the jwt token from the request
      const token = req.headers.authorization;
      const trucks = await this.authentication(token);
      if (!trucks.isSuccess) {
        return res
          .status(trucks.errorValue().code)
          .json(trucks.errorValue().error)
          .send();
      }

      const tripsOrError = await this.bestPathServiceInstance.getAllTripsAll();
      if (tripsOrError.isFailure) {
        return res
          .status(400)
          .json(tripsOrError.error)
          .send();
      } else {
        return res
          .status(200)
          .json(tripsOrError.getValue())
          .send();
      }
    } catch (e) {}
  }

  protected executeImpl(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  private async authentication(token: string): Promise<Result<any>> {
    const acceptOrNot = await this.authService.VerifyUserJWT(token, [
      "FleetManager",
      "Admin",
    ]);

    if (!token) {
      return Result.fail({
        code: 401,
        error: "Unauthorized",
        description: "Unauthorized",
      });
    }

    if (acceptOrNot.isFailure) {
      if (acceptOrNot.error === "The user is not authorized") {
        return Result.fail({
          code: 403,
          error: "The user is not authorized",
        });
      } else {
        if (acceptOrNot.error === "The user does not exist") {
          return Result.fail({
            code: 401,
            error: "The user does not exist",
          });
        } else {
          return Result.fail({
            code: 400,
            error: acceptOrNot.error,
          });
        }
      }
    }
    return Result.ok(acceptOrNot.getValue());
  }
}
