import { Request, Response, NextFunction } from 'express';

export default interface ICaminhoController  {
  createCaminho(req: Request, res: Response, next: NextFunction);
  updateCaminho(req: Request, res: Response, next: NextFunction);
  apagaCaminho(req: Request, res: Response, next: NextFunction);
}