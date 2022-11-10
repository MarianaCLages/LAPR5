import {Repo} from "../../core/infra/Repo";

export default interface IOrderRepo extends Repo<any> {
  exists(orderId: string): Promise<boolean>;
}