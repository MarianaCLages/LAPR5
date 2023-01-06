import { NextFunction, Request, Response } from "express";

export default interface ITripController {

    createTrip(req: Request, res: Response, next: NextFunction);

    getTripByTruck(req: Request, res: Response, next: NextFunction);
}