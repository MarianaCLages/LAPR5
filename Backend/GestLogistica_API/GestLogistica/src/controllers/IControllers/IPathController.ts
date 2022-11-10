import { Request, Response, NextFunction } from 'express';

export default interface IPathController  {
  createPath(req: Request, res: Response, next: NextFunction);
  getAllPaths(req: Request, res: Response, next: NextFunction);
  getByBeginningWarehouseId(req: Request, res: Response, next: NextFunction);
  getByEndingWarehouseId(req: Request, res: Response, next: NextFunction);
  updatePath(req: Request, res: Response, next: NextFunction);
  deletePath(req: Request, res: Response, next: NextFunction);
}