import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";

import {ITruckPersistence} from "../dataschema/ITruckPersistence";

import {ITruckDTO} from "../dto/truck/ITruckDTO";
import {Truck} from "../domain/truck/truck";

import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class TruckMap extends Mapper<Truck> {
    public static toDTO(truck: Truck): ITruckDTO {
        return {
            domainId: truck.id.toString(),
            caractTruck: truck.caractTruck.value,
            truckPlate: truck.truckPlate.value,
            tare: truck.tare.value,
            weightCapacity: truck.weightCapacity.value,
            cargaMax: truck.cargaMax.value,
            totalBatCharge: truck.totalBatCharge.value,
            chargingTime: truck.chargingTime.value
        };
    }

    public static toDomain(
        truck: any | Model<ITruckPersistence & Document>
    ): Truck {
        try {
            const roleOrError = Truck.create(truck, new UniqueEntityID(truck.truckId));

            roleOrError.isFailure ? console.log(roleOrError.error) : "";
            return roleOrError.isSuccess ? roleOrError.getValue() : null;
        } catch (err) {
            console.log(err + " " + truck + " " + truck.truckId + "\n\n\b");
        }

    }

    public static toPersistence(truck: Truck): any {
        return {
            domainId: truck.id.toString(),
            caractTruck: truck.caractTruck.value,
            truckPlate: truck.truckPlate.value,
            tare: truck.tare.value,
            weightCapacity: truck.weightCapacity.value,
            cargaMax: truck.cargaMax.value,
            totalBatCharge: truck.totalBatCharge.value,
            chargingTime: truck.chargingTime.value,
        };

    }
}