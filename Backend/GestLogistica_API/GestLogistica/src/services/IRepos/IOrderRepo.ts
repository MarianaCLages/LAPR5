import {Repo} from "../../core/infra/Repo";
import {Result} from "../../core/logic/Result";
import IOrderDTO from "../../dto/IOrderDTO";

export default interface IOrderRepo extends Repo<any> {
  exists(orderId: string): Promise<boolean>;
  getOrders(date: string): Promise<Result<IOrderDTO[]>>;
}