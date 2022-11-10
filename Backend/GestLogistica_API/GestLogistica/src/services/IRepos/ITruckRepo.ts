import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck/truck";
import { CaractTruck } from "../../domain/truck/caractTruck";
import {Result} from "../../core/logic/Result";
import {TruckPlate} from "../../domain/truck/truckPlate";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface ITruckRepo extends Repo<Truck> {
    save(truck: Truck): Promise<Truck>;
    findByDomainId(caractTruck: CaractTruck | string): Promise<Truck>; 
    update(truck: Truck): Promise<Result<Truck>>;
    findByCaractTruck(caractCam: string): Promise<Truck>;
    getAllTrucks() : Promise<Result<Array<Truck>>>;
    getByCaractAsync(caract: CaractTruck | string): Promise<Result<Array<Truck>>>;
    getByPlateAsync(plate: TruckPlate | string): Promise<Result<Array<Truck>>>;
    deleteTruck(domainId: UniqueEntityID | string): Promise<boolean>;
}