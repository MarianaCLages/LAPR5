import { Request, Response, NextFunction } from 'express';

export default interface IEmpacotamentoController  {
  createEmpacotamento(req: Request, res: Response, next: NextFunction);
  updateEmpacotamento(req: Request, res: Response, next: NextFunction);
  apagaEmpacotamento(req: Request, res: Response, next: NextFunction);
  getAllEmpacotamentos(req: Request, res: Response, next: NextFunction);
}