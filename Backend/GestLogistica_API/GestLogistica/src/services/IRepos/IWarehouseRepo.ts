import {Repo} from "../../core/infra/Repo";

export default interface IWarehouseRepo extends Repo<any> {
    exists(warehouseId: string): Promise<boolean>;
}