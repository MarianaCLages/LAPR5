import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface tripTruck {
  value: string;
}

export class TripTruck extends ValueObject<tripTruck> {

  constructor(props: tripTruck) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(truck: string) {
    if (!truck) {
      return Result.fail<TripTruck>("Day must not be empty");
    }
    const guardResult = Guard.againstNullOrUndefined(truck, "Day must not be null");
    if (!guardResult.succeeded) {
      return Result.fail<TripTruck>(guardResult);
    }

    return Result.ok<TripTruck>(new TripTruck({ value: truck }));
  }
}