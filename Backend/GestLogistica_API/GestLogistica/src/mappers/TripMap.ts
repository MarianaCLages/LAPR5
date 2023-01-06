import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";


import {Trip} from "../domain/trip/trip";
import ITripDTO from "../dto/ITripDTO";
import {ITripPersistence} from "../dataschema/ITripPersistence";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TripMap extends Mapper<Trip> {
    public static toDTO(trip: Trip): ITripDTO {
        return {
            domainId: trip.id.toString(),
            tripIdentifier: trip.tripIdentifier.value,
            tripTruck: trip.tripTruck.value,
            tripDay: trip.tripDay.value,
            tripWarehouses: trip.tripWarehouses.value,
            tripOrders: trip.tripOrders.value
        };
    }

    public static toDomain(
        trip: any | Model<ITripPersistence & Document>
    ): Trip {
        try {
            const roleOrError = Trip.create(trip, new UniqueEntityID(trip.id));

            roleOrError.isFailure ? console.log(roleOrError.error) : "";
            return roleOrError.isSuccess ? roleOrError.getValue() : null;
        } catch (err) {
            console.log(err + " " + trip + " " + trip.id + "\n\n\b");
        }

    }

    public static toPersistence(trip: Trip): any {
        return {
            id: trip.id.toString(),
            tripIdentifier: trip.tripIdentifier.value,
            tripTruck: trip.tripTruck.value,
            tripDay: trip.tripDay.value,
            tripWarehouses: trip.tripWarehouses.value,
            tripOrders: trip.tripOrders.value,

        };

    }
}