import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";


import {Trip} from "../domain/trip/trip";
import ITripDTO from "../dto/ITripDTO";
import {ITripPersistence} from "../dataschema/ITripPersistence";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {TripBuilder} from "../../tests/unit/domain/trip/tripBuilder";

export class TripMap extends Mapper<Trip> {
    public static toDTO(trip: Trip): ITripDTO {

        const warehouseOrders = trip.tripOrders.value;

        // @ts-ignore
        let value: [{
            warehouse: string,
            order: string[]
        }] = [];

        warehouseOrders.forEach(
            (warehouseOrders) => {
                value.push({
                    warehouse: warehouseOrders.warehouse,
                    order: warehouseOrders.order
                })
            }
        )


        return {
            tripIdentifier: trip.tripIdentifier.value,
            tripTruck: trip.tripTruck.value,
            tripDay: trip.tripDay.value,
            tripWarehouses: trip.tripWarehouses.value,
            tripOrders: value
        };
    }

    public static toDomain(
        trip: any | Model<ITripPersistence & Document>
    ): Trip {
        try {
            const builder: TripBuilder = new TripBuilder(trip.tripDay, trip.tripTruck);


            trip.tripOrders.forEach(
                (wa) => {
                    wa.order.forEach(
                        (or) => {
                            builder.addOrder(or, wa);
                        }
                    )
                }
            )
            const roleOrError = builder.build();


            roleOrError.isFailure ? console.log(roleOrError.error) : "";
            return roleOrError.isSuccess ? roleOrError.getValue() : null;
        } catch (err) {
            console.log(err + " " + trip + " " + trip.id + "\n\n\b");
        }

    }

    public static toPersistence(trip: Trip): any {


        const warehouseOrders = trip.tripOrders.value;

        // @ts-ignore
        let value: [{
            warehouse: string,
            order: string[]
        }] = [];

        warehouseOrders.forEach(
            (warehouseOrders) => {
                value.push({
                    warehouse: warehouseOrders.warehouse,
                    order: warehouseOrders.order
                })
            }
        )

        return {
            id: trip.id.toString(),
            tripIdentifier: trip.tripIdentifier.value,
            tripTruck: trip.tripTruck.value,
            tripDay: trip.tripDay.value,
            tripWarehouses: trip.tripWarehouses.value,
            tripOrders: value,

        };

    }
}