import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { TripIdentifier } from "./tripIdentifier";
import { TripTruck } from "./tripTruck";
import { TripDay } from "./tripDay";
import { TripWarehouse } from "./tripWarehouses";
import { TripOrders } from "./tripOrders";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import {ICreateTripDTO} from "../../dto/trip/ICreateTripDTO";

interface tripProps{
  tripIdentifier: TripIdentifier;
  tripTruck: TripTruck;
  tripDay: TripDay;
  tripWarehouses: TripWarehouse;
  tripOrders: TripOrders;
}

export class Trip extends AggregateRoot<tripProps>{

  private constructor(props: tripProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get tripOrders(): TripOrders{
    return this.props.tripOrders;
  }

  get tripIdentifier(): TripIdentifier{
    return this.props.tripIdentifier;
  }

  get tripWarehouses(): TripWarehouse{
    return this.props.tripWarehouses;
  }

  get tripTruck(): TripTruck{
    return this.props.tripTruck;
  }

  get tripDay(): TripDay{
    return this.props.tripDay;
  }

  public static create(tripDTO: ICreateTripDTO) : Result<Trip>{
    const guardProps = [
      {argument: tripDTO.tripIdentifier, argumentName: 'tripIdentifier'},
      {argument: tripDTO.tripWarehouses, argumentName: 'tripWarehouses'},
      {argument: tripDTO.tripTruck, argumentName: 'tripTruck'},
      {argument: tripDTO.tripDay, argumentName: 'tripDay'},
      {argument: tripDTO.tripOrders, argumentName: 'tripOrders'},
    ]
    const guard =  Guard.againstNullOrUndefinedBulk(guardProps)

    if (!guard.succeeded){
      return Result.fail(guard.message)
    }
    const id =  new UniqueEntityID();

    const tripOrdersErrorOrSuccess = TripOrders.create(tripDTO.tripOrders);
    const tripIdentifierErrorOrSuccess = TripIdentifier.create(tripDTO.tripTruck,tripDTO.tripDay);
    const tripWarehousesErrorOrSuccess = TripWarehouse.create(tripDTO.tripWarehouses);
    const tripTruckErrorOrSuccess = TripTruck.create(tripDTO.tripTruck);
    const TripDayErrorOrSuccess = TripDay.create(tripDTO.tripDay);

    const trip = new Trip({
      tripIdentifier: tripIdentifierErrorOrSuccess.getValue(),
      tripTruck: tripTruckErrorOrSuccess.getValue(),
      tripDay: TripDayErrorOrSuccess.getValue(),
      tripWarehouses: tripWarehousesErrorOrSuccess.getValue(),
      tripOrders: tripOrdersErrorOrSuccess.getValue()
    },id);


    return Result.ok<Trip>(trip)
  }

}