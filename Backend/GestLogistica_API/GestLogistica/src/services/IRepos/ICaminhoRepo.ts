import {Repo} from "../../core/infra/Repo";
import {Caminho} from "../../domain/caminho/caminho";
import {CaminhoId} from "../../domain/caminho/caminhoId";
import {Result} from "../../core/logic/Result";
import { CaminhoArmazemChegadaId } from "../../domain/caminho/caminhoArmazemChegadaId";
import { CaminhoArmazemPartidaId } from "../../domain/caminho/caminhoArmazemPartidaId";

export default interface ICaminhoRepo extends Repo<Caminho> {
    //removeByRoleIds (roles: RoleId[]): Promise<any>
    async

    save(caminho: Caminho): Promise<Caminho>;

    findByDomainId(caminhoId: CaminhoId | string): Promise<Caminho>;

    getAllCaminhos();

    getByArmazemPartidaId(armazemPartidaId: CaminhoArmazemPartidaId | string): Promise<Result<Array<Caminho>>>;

    getByArmazemChegadaId(armazemChegadaId: CaminhoArmazemChegadaId | string): Promise<Result<Array<Caminho>>>;


    save(caminho: Caminho): Promise<Caminho>;

    //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
    //saveCollection (roles: Role[]): Promise<Role[]>;

    delete(caminhoId: CaminhoId): Promise<boolean>;

    update(caminho: Caminho): Promise<Result<Caminho>>;
}