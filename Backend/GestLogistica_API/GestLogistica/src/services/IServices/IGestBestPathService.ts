import { Result } from "../../core/logic/Result";
import {ITruckDTO} from '../../dto/truck/ITruckDTO';
import { ICreateTruckDTO } from "../../dto/truck/ICreateTruckDTO";
import ITruckCaractDTO from "../../dto/truck/ITruckCaractDTO";
import ITruckPlateDTO from "../../dto/truck/ITruckPlateDTO";
import {NextFunction, Request, Response} from "express";
import ITripDTO from "../../dto/ITripDTO";

export default interface IGestBestPathService {

    generateFiles();
    sendPaths();
    sendTrucks();
    sendWarehouse();
    sendOrders(date:string);
    createTripsFromPlanning();
    convertStringIntoTrips(outputString : string,date : string);
    getAllTrips(date: string) : Promise<Result<Array<ITripDTO>>>;
}