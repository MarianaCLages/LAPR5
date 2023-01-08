import ITripGetter from "../services/IRepos/ITripGetter";
import IOrderDTO from "../dto/IOrderDTO";
import { Result } from "../core/logic/Result";
import ITripDTO from "../dto/ITripDTO";
import { ITruckTripDTO } from "../dto/truck/ITruckTripDTO";
import { TripBuilder } from "../domain/trip/tripBuilder";
import { TripIdentifier } from "../domain/trip/tripIdentifier";
import { ITruckDTO } from "../dto/truck/ITruckDTO";

export default class TruckOrderPlan implements ITripGetter {

  getTrip(trucks: Array<ITruckDTO>, orders: Array<IOrderDTO>): Promise<Result<ITripDTO[]>> {
    const truckMapped: Array<ITruckTripDTO> = [];
    trucks.forEach((truck) => {
      truckMapped.push(mapTruckToTruckTrip(truck));
    });

    trucks.sort((a, b) => a.weightCapacity - b.weightCapacity);


    //map, key is truck and the value is an array of orders.
    //Initialize the map an array for all the trucks
    const map = new Map<string, Array<IOrderDTO>>();
    truckMapped.forEach((truck) => {
      map.set(truck.caractTruck, []);
    });
    let trip: ITripDTO[] = [];

    orders.forEach(order => {
      let assigned = false;
      for (const element of truckMapped) {
        if (element.remainingSpace >= parseInt(order.OrderMass)) {
          map.get(element.caractTruck).push(order);
          element.remainingSpace -= parseInt(order.OrderMass);
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        return Result.fail("Not enough trucks to handle all packages");
      }
    });

    for (const entry of map.entries()) {
      if (entry[1].length != 0) {
        const dateString = this.getTodaysDate();
        const builder = new TripBuilder(dateString, entry[0]);

        entry[1].forEach((order) => builder.addOrder(order.Identifier, order.WarehouseId));

        const tripBuilded = builder.build();

        //gets the warehouseOrderObject
        const warehouseOrderObject = tripBuilded.getValue().props.tripOrders.value;

        // @ts-ignore
        let value: [{
          warehouse: string,
          order: string[]
        }] = [];
        warehouseOrderObject.forEach(
          (warehouseOrder) => {
            value.push({
              warehouse: warehouseOrder.warehouse,
              order: warehouseOrder.order
            });
            return value;
          });

        //transforms the trip into a DTO object
        trip.push({
          tripIdentifier: TripIdentifier.create(tripBuilded.getValue().props.tripTruck.value, tripBuilded.getValue().props.tripDay.value).getValue().value,
          tripTruck: tripBuilded.getValue().props.tripTruck.value,
          tripDay: tripBuilded.getValue().props.tripDay.value,
          tripWarehouses: tripBuilded.getValue().props.tripWarehouses.value,
          tripOrders: value
        });
      }
    }
    console.log(trip);

    return Promise.resolve(Result.ok(trip));
  }

  private getTodaysDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // add leading zero if necessary
    const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading zero and add 1 because getMonth() returns a 0-based number (0 for January, 1 for February, and so on)
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }


}

function mapTruckToTruckTrip(truck: ITruckDTO): ITruckTripDTO {
  return {
    domainId: truck.domainId,
    caractTruck: truck.caractTruck,
    truckPlate: truck.truckPlate,
    weightCapacity: truck.weightCapacity,
    cargaMax: truck.cargaMax,
    tare: truck.tare,
    chargingTime: truck.chargingTime,
    remainingSpace: truck.weightCapacity
  };
}