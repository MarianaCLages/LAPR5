import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface TripIdentifierId {
  value: string;
}

export class TripIdentifier extends ValueObject<TripIdentifierId> {

  public constructor(tripIdentifier: TripIdentifierId) {
    super(tripIdentifier);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(truck: string, day: string) {
    let guardResult = Guard.againstNullOrUndefined(truck, "truckId");
    guardResult = guardResult || Guard.againstNullOrUndefined(day, "dayOfTrip");
    if (!guardResult.succeeded) {
      return Result.fail<TripIdentifier>(guardResult.message);
    }
    if (truck == "") {
      return Result.fail<TripIdentifier>("Truck must not be empty");
    }
    if (day == "") {
      return Result.fail<TripIdentifier>("day must not be empty");
    }

    const result = truck + "/" + day;

    return Result.ok<TripIdentifier>(new TripIdentifier({ value: result }));

  }
}