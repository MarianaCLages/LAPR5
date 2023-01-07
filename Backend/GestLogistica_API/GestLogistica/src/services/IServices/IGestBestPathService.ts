import { Result } from "../../core/logic/Result";
import {ITruckDTO} from '../../dto/truck/ITruckDTO';
import { ICreateTruckDTO } from "../../dto/truck/ICreateTruckDTO";
import ITruckCaractDTO from "../../dto/truck/ITruckCaractDTO";
import ITruckPlateDTO from "../../dto/truck/ITruckPlateDTO";
import {NextFunction, Request, Response} from "express";
import ITripDTO from "../../dto/ITripDTO";
import IOrderDTO from "../../dto/IOrderDTO";

export default interface IGestBestPathService {

    generateFiles();
    sendPaths();
    sendTrucks(trucks : Array<ITruckDTO>);
    sendWarehouse();
    sendOrders(orders: Array<IOrderDTO>);
    createTripsFromPlanning();
    convertStringIntoTrips(outputString : string,orders: Array<IOrderDTO>);
    getAllTrips(date: string) : Promise<Result<Array<ITripDTO>>>;
    addTripTest();
    getTrip(trucks: Array<ITruckDTO>, orders: Array<IOrderDTO>): Promise<Result<ITripDTO[]>>;
}