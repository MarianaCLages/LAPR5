import {Repo} from "../../core/infra/Repo";
import {Path} from "../../domain/path/path";
import {PathId} from "../../domain/path/pathId";
import {Result} from "../../core/logic/Result";
import { Packaging } from "../../domain/packaging/packaging";
import { PackId } from "../../domain/packaging/packId";
import IPackagingDTO from "../../dto/packaging/IPackagingDTO";
import { OrderRef } from "../../domain/packaging/orderRef";
import { TruckRef } from "../../domain/packaging/truckRef";

export default interface IPackagingRepo extends Repo<Packaging> {
  async
  save(packaging: Packaging): Promise<Packaging>;
  findByDomainId(packId: PackId | string): Promise<Packaging>;
  getAllPackagings() : Promise<Result<Array<Packaging>>>;
  delete(packId: PackId): Promise<boolean>;
  update(packaging: Packaging): Promise<Result<Packaging>>;
  getByTruckAsync(orderId: TruckRef | string) : Promise<Result<Array<Packaging>>>;
  getByOrderAsync(orderId: OrderRef | string): Promise<Result<Array<Packaging>>>;
}