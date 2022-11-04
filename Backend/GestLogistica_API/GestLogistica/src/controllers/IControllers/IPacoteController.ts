import { Request, Response, NextFunction } from 'express';

export default interface IPacoteController  {
  createPacote(req: Request, res: Response, next: NextFunction);
  updatePacote(req: Request, res: Response, next: NextFunction);
  apagaPacote(req: Request, res: Response, next: NextFunction);
  getAllPacotes(req: Request, res: Response, next: NextFunction);
  getById(req: Request, res: Response, next: NextFunction);
  getByEntrega(req: Request, res: Response, next: NextFunction);
  getByCamiao(req: Request, res: Response, next: NextFunction);
}