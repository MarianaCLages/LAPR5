import {Repo} from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import {Trip} from "../../domain/trip/trip";
import {Truck} from "../../domain/truck/truck";

export default interface ITripRepo extends Repo<Trip> {
    save(trip: Trip): Promise<Trip>;
    findByTruck(trip: string): Promise<Trip>;
    getAllWarehouses(warehouses: string);
    getAllTrips(): Promise<Result<Array<Trip>>>;
}