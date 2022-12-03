import {Path} from "../../domain/path/path";
import {PathId} from "../../domain/path/pathId";
import {Repo} from "../../core/infra/Repo";
import {Result} from "../../core/logic/Result";

export default interface IPathRepo extends Repo<Path> {
    //removeByRoleIds (roles: RoleId[]): Promise<any>
    async

    save(path: Path): Promise<Path>;

    findByDomainId(pathId: PathId | string): Promise<Path>;

    getAllPaths();

    getByBeginningWarehouseId(string): Promise<Result<Array<Path>>>;

    getByEndingWarehouseId(IPathBeginningWarehouseId): Promise<Result<Array<Path>>>;

    getByBeginningAndEndingWarehouseId(beginningWarehouseId: string, endingWarehouseId: string): Promise<Result<Array<Path>>>;

    save(path: Path): Promise<Path>;

    //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
    //saveCollection (roles: Role[]): Promise<Role[]>;

    delete(pathId: PathId): Promise<boolean>;

    update(path: Path): Promise<Result<Path>>;
}