import ICreatePathDTO from "../../dto/path/ICreatePathDTO";
import IPathBeginningWarehouseIdDTO from "../../dto/path/IPathBeginningWarehouseIdDTO";
import IPathDTO from "../../dto/path/IPathDTO";
import IPathEndingWarehouseIdDTO from "../../dto/path/IPathEndingWarehouseIdDTO";
import IPathIdDto from "../../dto/path/IPathIdDto";
import { Result } from "../../core/logic/Result";

export default interface IPathService  {
  getByBeginningAndEndingWarehouseId(beginningWarehouseId: string, endingWarehouseId: string): Promise<Result<IPathDTO[]>>;
  createPath(pathDTO: ICreatePathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getPath (pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getAllPaths(): Promise<Result<IPathDTO[]>>;
  getByBeginningWarehouseId(beginningWarehouseId: IPathBeginningWarehouseIdDTO): Promise<Result<IPathDTO[]>>;
  getByEndingWarehouseId(endingWarehouseId: IPathEndingWarehouseIdDTO): Promise<Result<IPathDTO[]>>;
  deletePath(pathId : IPathIdDto): Promise<Result<IPathDTO>>;
}
