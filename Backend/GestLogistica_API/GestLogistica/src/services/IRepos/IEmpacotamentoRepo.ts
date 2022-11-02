import {Repo} from "../../core/infra/Repo";
import {Caminho} from "../../domain/caminho/caminho";
import {CaminhoId} from "../../domain/caminho/caminhoId";
import {Result} from "../../core/logic/Result";
import { Empacotamento } from "../../domain/empacotamento/empacotamento";
import { EmpId } from "../../domain/empacotamento/empId";

export default interface IEmpacotamentoRepo extends Repo<Empacotamento> {
  //removeByRoleIds (roles: RoleId[]): Promise<any>
  async

  save(empacotamento: Empacotamento): Promise<Empacotamento>;

  findByDomainId(empacotamentoId: EmpId | string): Promise<Empacotamento>;

  getAllEmpacotamentos() : Promise<Result<Array<Empacotamento>>>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;

  delete(empacotamentoId: EmpId): Promise<boolean>;

  update(empacotamento: Empacotamento): Promise<Result<Empacotamento>>;
}