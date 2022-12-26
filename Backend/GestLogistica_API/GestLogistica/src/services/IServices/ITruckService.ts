import { Result } from "../../core/logic/Result";
import {ITruckDTO} from '../../dto/truck/ITruckDTO';
import { ICreateTruckDTO } from "../../dto/truck/ICreateTruckDTO";
import ITruckCaractDTO from "../../dto/truck/ITruckCaractDTO";
import ITruckPlateDTO from "../../dto/truck/ITruckPlateDTO";
import {NextFunction, Request, Response} from "express";

export default interface ITruckService {
    createTruck(truckDTO: ICreateTruckDTO): Promise<Result<ITruckDTO>>;
    updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
    getAllTrucks() : Promise<Result<Array<ITruckDTO>>>;
    getByCaract(caract: ITruckCaractDTO): Promise<Result<Array<ITruckDTO>>>;
    getByPlate(plate: ITruckPlateDTO): Promise<Result<Array<ITruckDTO>>>;
    deleteTruck(truckId: ITruckDTO): Promise<Result<ITruckDTO>>;
    deleteTruckSoftCaract(caract: ITruckCaractDTO): Promise<Result<ITruckDTO>>;
    deleteTruckSoftPlate(plate: ITruckPlateDTO): Promise<Result<ITruckDTO>>;
}