import {Repo} from "../../core/infra/Repo";

export default interface IEncomendaRepo extends Repo<any> {
  exists(entregaId: string): Promise<boolean>;
}