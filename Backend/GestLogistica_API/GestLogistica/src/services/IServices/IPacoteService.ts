import { Result } from "../../core/logic/Result";
import ICriarEmpacotamentoDTO from "../../dto/empacotamento/ICriarEmpacotamentoDTO";
import IEmpacotamentoDTO from "../../dto/empacotamento/IEmpacotamentoDTO";
import IEmpacotamentoIdDTO from "../../dto/empacotamento/IEmpacotamentoIdDTO";
import ICaminhoIdDto from "../../dto/caminho/ICaminhoIdDto";
import IEmpacotamentoEntregaDTO from "../../dto/empacotamento/IEmpacotamentoEntregaDTO";
import IEmpacotamentoCamiaoDTO from "../../dto/empacotamento/IEmpacotamentoCamiaoDTO";

export default interface IPacoteService {
  createEmpacotamento(empacotamentoDTO: ICriarEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;
  updateEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;
  apagaEmpacotamento(caminhoId : IEmpacotamentoIdDTO): Promise<Result<IEmpacotamentoDTO>>;


  getEmpacotamento (empacotamentoDTO: IEmpacotamentoIdDTO): Promise<Result<IEmpacotamentoDTO>>;
  getAllEmpacotamentos() : Promise<Result<Array<IEmpacotamentoDTO>>> ;
  getByEntregaS(entregaId : IEmpacotamentoEntregaDTO) : Promise<Result<Array<IEmpacotamentoDTO>>>;
  getByCamiaoAsync(entregaId : IEmpacotamentoCamiaoDTO) : Promise<Result<Array<IEmpacotamentoDTO>>>;
}
