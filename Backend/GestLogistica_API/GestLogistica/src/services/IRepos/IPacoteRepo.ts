import {Repo} from "../../core/infra/Repo";
import {Caminho} from "../../domain/caminho/caminho";
import {CaminhoId} from "../../domain/caminho/caminhoId";
import {Result} from "../../core/logic/Result";
import { Empacotamento } from "../../domain/empacotamento/empacotamento";
import { EmpId } from "../../domain/empacotamento/empId";
import IEmpacotamentoDTO from "../../dto/empacotamento/IEmpacotamentoDTO";
import { EmpEntregaRef } from "../../domain/empacotamento/empEntregaRef";
import { EmpCamiaoRef } from "../../domain/empacotamento/empCamiaoRef";

export default interface IPacoteRepo extends Repo<Empacotamento> {
  async
  save(empacotamento: Empacotamento): Promise<Empacotamento>;
  findByDomainId(empId: EmpId | string): Promise<Empacotamento>;
  getAllEmpacotamentos() : Promise<Result<Array<Empacotamento>>>;
  delete(empId: EmpId): Promise<boolean>;
  update(empacotamento: Empacotamento): Promise<Result<Empacotamento>>;
  getByCamiaoAsync(entregaId: EmpCamiaoRef | string) : Promise<Result<Array<Empacotamento>>>;
  getByEntregaAsync(entregaId: EmpEntregaRef | string): Promise<Result<Array<Empacotamento>>>;
}