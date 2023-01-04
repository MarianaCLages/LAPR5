import { Result } from "../../core/logic/Result";
import IOrderDTO from "../../dto/IOrderDTO";
import ITripDTO from "../../dto/ITripDTO";
import { ITruckDTO } from "../../dto/truck/ITruckDTO";

export default interface ITripGetter {
  getTrip(trucks: Array<ITruckDTO>, orders: Array<IOrderDTO>): Promise<Result<ITripDTO>>;

}