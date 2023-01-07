import ITripGetter from "../services/IRepos/ITripGetter";
import IOrderDTO from "../dto/IOrderDTO";
import { Result } from "../core/logic/Result";
import ITripDTO from "../dto/ITripDTO";
import { ITruckDTO } from "../dto/truck/ITruckDTO";

export default class PlanGetter implements ITripGetter {
  getTrip(trucks: Array<ITruckDTO>, orders: Array<IOrderDTO>): Promise<Result<ITripDTO[]>> {
    return Promise.resolve(undefined);
  }


}

