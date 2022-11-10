import { Result } from "../../core/logic/Result";
import ICreatePackagingDTO from "../../dto/packaging/ICreatePackagingDTO";
import IPackagingDTO from "../../dto/packaging/IPackagingDTO";
import IPackagingIdDTO from "../../dto/packaging/IPackagingIdDTO";
import IPathIdDto from "../../dto/path/IPathIdDto";
import IPackagingOrderDTO from "../../dto/packaging/IPackagingOrderDTO";
import IPackagingTruckDTO from "../../dto/packaging/IPackagingTruckDTO";

export default interface IPackagingService {
  createPackaging(packagingDTO: ICreatePackagingDTO): Promise<Result<IPackagingDTO>>;
  updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  deletePackaging(pathId : IPackagingIdDTO): Promise<Result<IPackagingDTO>>;


  getPackaging (packagingDTO: IPackagingIdDTO): Promise<Result<IPackagingDTO>>;
  getAllPackagings() : Promise<Result<Array<IPackagingDTO>>> ;
  getByOrderS(orderId : IPackagingOrderDTO) : Promise<Result<Array<IPackagingDTO>>>;
  getByTruckAsync(orderId : IPackagingTruckDTO) : Promise<Result<Array<IPackagingDTO>>>;
}
