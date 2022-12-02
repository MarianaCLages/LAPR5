import { Request, Response, NextFunction } from 'express';

export default interface IPackagingController  {
  createPackaging(req: Request, res: Response, next: NextFunction);
  updatePackaging(req: Request, res: Response, next: NextFunction);
  deletePackaging(req: Request, res: Response, next: NextFunction);
  getAllPackagings(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  getByOrder(req: Request, res: Response, next: NextFunction);
  getByTruck(req: Request, res: Response, next: NextFunction);
  getPackagingByTruckParams(req: Request, res: Response, next: NextFunction);
  getPackagingByOrderParams(req: Request, res: Response, next: NextFunction);
}