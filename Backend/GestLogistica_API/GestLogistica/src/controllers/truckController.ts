import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from "../services/IServices/ITruckService";
import {ITruckDTO} from "../dto/truck/ITruckDTO";
import ITruckCaractDTO from "../dto/truck/ITruckCaractDTO";

import {Result} from "../core/logic/Result";
import {BaseController} from "../core/infra/BaseController";
import ITruckPlateDTO from "../dto/truck/ITruckPlateDTO";
import SendInfoToPlanningService from "../services/sendInfoToPlanningService";

@Service()
export default class truckController
    extends BaseController
    implements ITruckController {
    constructor(
        @Inject(config.services.truck.name) private truckServiceInstance: ITruckService
    ) {
        super();

    }

    public async createTruck(req: Request, res: Response, next: NextFunction) {
        try {
            const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

            if (truckOrError.isFailure) {
                return res.status(400).json(truckOrError.error).send();
            }

            const truckDTO = truckOrError.getValue();
            return res.json(truckDTO).status(201).send();
        } catch (e) {
            return next(e);
        }
    }

    public async getAllTrucks(req: Request, res: Response, next: NextFunction) {
        try {
            const truckOrError = await this.truckServiceInstance.getAllTrucks();

            if (truckOrError.isFailure) {
                return res.json(truckOrError.error).status(400);
            }

            if(truckOrError.getValue().length == 0) {
                return res.status(404).json("No truck was found!").send();
            }

            const trucksDTO = truckOrError.getValue();
            return res.json(trucksDTO).status(200);

        } catch (e) {
            return next(e);
        }
    }

    public async getTruckByCaract(req: Request, res: Response, next: NextFunction) {
        try {
            const truckOrError = await this.truckServiceInstance.getByCaract(req.body as ITruckCaractDTO);

            if (truckOrError.isFailure) {
                return res.status(400).json(truckOrError.error).send();
            }

            if(truckOrError.getValue().length == 0) {
                return res.status(404).json("No truck with that truckCaract was found!").send();
            }

            const truckDTO = truckOrError.getValue();
            return res.status(200).json(truckDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async getTruckByPlate(req: Request, res: Response, next: NextFunction) {
        try {
            const truckOrError = await this.truckServiceInstance.getByPlate(req.body as ITruckPlateDTO);

            if (truckOrError.isFailure) {
                return res.status(400).json(truckOrError.error).send();
            }

            if(truckOrError.getValue().length == 0) {
                return res.status(404).json("No truck with that plate was found!").send();
            }

            const truckDTO = truckOrError.getValue();
            return res.status(200).json(truckDTO).send();

        } catch (e) {
            return next(e);
        }
    }

    public async updateTruck(req: Request, res: Response, next: NextFunction) {

        try {
            const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO);

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
            const truckOrError = await this.truckServiceInstance.deleteTruck(req.body as ITruckDTO);

            if (truckOrError.isFailure) {
                return res.status(400).send("The specified truck was not found!");
            }


            return res.json().status(200);
        } catch (e) {
            return next(e);
        }
    }

    public async sendInfo(req: Request, res: Response, next: NextFunction){

        var fileService = new SendInfoToPlanningService();
        let idTruck = req.params.idTruck;

        let stringTest: string;
        fileService.generateFiles();
        fileService.sendPaths();
        fileService.sendWarehouse();
        fileService.sendOrdersToPlanning(idTruck);

        stringTest = await fileService.getHeuristic();

        return res.status(200).json(stringTest);
    }

    public async getHeuristicByWeight(req: Request,res: Response,next: NextFunction){
        var fileService = new SendInfoToPlanningService();
        let idTruck = req.params.idTruck;

        let stringTest: string;
        fileService.generateFiles();
        fileService.sendPaths();
        fileService.sendWarehouse();
        fileService.sendOrdersToPlanning(idTruck);

        stringTest = await fileService.getHeuristicByWeight();

        return res.status(200).json(stringTest);
    }

    public async getHeuristicByTimeWeight(req: Request, res: Response, next: NextFunction){

        var fileService = new SendInfoToPlanningService();
        let idTruck = req.params.idTruck;

        let stringTest: string;
        fileService.generateFiles();
        fileService.sendPaths();
        fileService.sendWarehouse();
        fileService.sendOrdersToPlanning(idTruck);

        stringTest = await fileService.getHeuristicByWeightTime();

        return res.status(200).json(stringTest);
    }


    protected executeImpl(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
