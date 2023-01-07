import {OrderWarehouse, TripOrders} from "../../../../src/domain/trip/tripOrders";
import { TripDay} from "../../../../src/domain/trip/tripDay";
import { TripTruck} from "../../../../src/domain/trip/tripTruck";
import { TripWarehouse} from "../../../../src/domain/trip/tripWarehouses";
import { Result} from "../../../../src/core/logic/Result";
import { Trip} from "../../../../src/domain/trip/trip";
import { tripProps} from "../../../../src/domain/trip/trip";
import { TripIdentifier} from "../../../../src/domain/trip/tripIdentifier";

export class TripBuilder {
  private date: TripDay;
  private truck: TripTruck;
  private orders: TripOrders;
  private warehouse: TripWarehouse;
  private orderMap: Map<string, string[]> = new Map<string, string[]>();
  private ordersList: Array<OrderWarehouse> = new Array<OrderWarehouse>();

  private warehouseList: Array<string> = new Array<string>();


  constructor(date: string, truck: string) {
    this.date = TripDay.create(date).getValue();
    this.truck = TripTruck.create(truck).getValue();
  }

  public addOrder(order: string, warehouse: string): Result<string> {
    if (!order) {
      return Result.fail("order cannot be empty or not specified");
    }
    if (!warehouse) {
      return Result.fail("warehouse cannot be empty or not specified");
    }
    if (this.warehouseList.includes(warehouse)){
      this.orderMap.get(warehouse).push(order);
    } else {
      this.orderMap.set(warehouse, [order]);
      this.warehouseList.push(warehouse);
    }
    return Result.ok("order added successfully");
  }

  public build(): Result<Trip> {
    //transforms the map in a list of objects
    this.orderMap.forEach((value, key) => {
      const orderWarehouse: OrderWarehouse = {
        order: value,
        warehouse: key
      }
      this.ordersList.push(orderWarehouse)
    })

    const tripProps = {
      tripIdentifier: TripIdentifier.create(this.truck.value, this.date.value).getValue(),
      tripTruck: this.truck,
      tripDay: this.date,
      tripWarehouses: TripWarehouse.create(this.warehouseList).getValue(),
      tripOrders: TripOrders.create(this.ordersList).getValue()
    } as tripProps

    const tripOrError = Trip.create(tripProps)

    if (tripOrError.isSuccess){
      return tripOrError
    }
    return Result.fail("")
  }
}


