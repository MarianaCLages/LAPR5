import { Repo } from "../../core/infra/Repo";
import { Caminho } from "../../domain/caminho/caminho";
import { CaminhoId } from "../../domain/caminho/caminhoId";

export default interface ICaminhoRepo extends Repo<Caminho> {
  save(caminho: Caminho): Promise<Caminho>;
  findByDomainId (caminhoId: CaminhoId | string): Promise<Caminho>;
  delete(caminhoId: CaminhoId);

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}