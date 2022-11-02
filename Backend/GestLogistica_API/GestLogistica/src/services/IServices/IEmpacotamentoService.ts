import { Result } from "../../core/logic/Result";
import ICriarEmpacotamentoDTO from "../../dto/empacotamento/ICriarEmpacotamentoDTO";
import IEmpacotamentoDTO from "../../dto/empacotamento/IEmpacotamentoDTO";
import IEmpacotamentoIdDTO from "../../dto/empacotamento/IEmpacotamentoIdDTO";

export default interface IEmpacotamentoService  {
  createEmpacotamento(empacotamentoDTO: ICriarEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;
  updateEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;
  getEmpacotamento (empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;
  getAllEmpacotamentos();
  apagaEmpacotamento(caminhoId : IEmpacotamentoIdDTO): Promise<Result<IEmpacotamentoDTO>>;
}
