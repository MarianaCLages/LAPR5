import { Result } from "../../core/logic/Result";
import {ITruckDTO} from '../../dto/truck/ITruckDTO';
import { ICreateTruckDTO } from "../../dto/truck/ICreateTruckDTO";
import ITruckCaractDTO from "../../dto/truck/ITruckCaractDTO";
import ITruckPlateDTO from "../../dto/truck/ITruckPlateDTO";
import {NextFunction, Request, Response} from "express";

export default interface IGestBestPathService {

    generateFiles();
    sendPaths();
    sendTrucks();
    sendWarehouse();
}