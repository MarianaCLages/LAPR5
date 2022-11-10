import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/path/IPathDTO";
import ICreatePathDTO from "../../dto/path/ICreatePathDTO";
import IPathIdDto from "../../dto/path/IPathIdDto";
import IPathBeginningWarehouseIdDTO from "../../dto/path/IPathBeginningWarehouseIdDTO";
import IPathEndingWarehouseIdDTO from "../../dto/path/IPathEndingWarehouseIdDTO";

export default interface IPathService  {
  createPath(pathDTO: ICreatePathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getPath (pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getAllPaths(): Promise<Result<IPathDTO[]>>;
  getByBeginningWarehouseId(beginningWarehouseId: IPathBeginningWarehouseIdDTO): Promise<Result<IPathDTO[]>>;
  getByEndingWarehouseId(endingWarehouseId: IPathEndingWarehouseIdDTO): Promise<Result<IPathDTO[]>>;
  deletePath(pathId : IPathIdDto): Promise<Result<IPathDTO>>;
}
