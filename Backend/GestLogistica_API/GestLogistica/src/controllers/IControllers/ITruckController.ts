import { NextFunction, Request, Response } from "express";

export default interface ITruckController {
  createTruck(req: Request, res: Response, next: NextFunction);

  getAllTrucks(req: Request, res: Response, next: NextFunction);

  getTruckByCaract(req: Request, res: Response, next: NextFunction);

  getTruckByPlate(req: Request, res: Response, next: NextFunction);

  updateTruck(req: Request, res: Response, next: NextFunction);

  deleteTruck(req: Request, res: Response, next: NextFunction);

  sendInfo(req: Request, res: Response, next: NextFunction);

  getHeuristicByWeight(req: Request, res: Response, next: NextFunction);

  getHeuristicByTimeWeight(req: Request, res: Response, next: NextFunction);

  sendInfoToPlanning(req: Request, res: Response, next: NextFunction);

  getTruckByPlateParam(req: Request, res: Response, next: NextFunction);

  getTruckByCaractParam(req: Request, res: Response, next: NextFunction);

  getBestPathForEachTruck(req: Request, res: Response, next: NextFunction);

  deleteTruckSoftCaract(req: Request, res: Response, next: NextFunction);

  deleteTruckSoftPlate(req: Request, res: Response, next: NextFunction);

  getTrips(req: Request, res: Response, next: NextFunction);

  getAllTrips(req: Request, res: Response, next: NextFunction);

  getTripsTrucks(req: Request, res: Response, next: NextFunction);
}