import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface tripDay {
  value: string;
}

export class TripDay extends ValueObject<tripDay> {

  constructor(props: tripDay) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(day: string) {
    if (!day) {
      return Result.fail<TripDay>("Day must not be empty");
    }
    const guardResult = Guard.againstNullOrUndefined(day, "Day must not be null");
    if (!guardResult.succeeded) {
      return Result.fail<TripDay>(guardResult);
    }

    return Result.ok<TripDay>(new TripDay({ value: day }));
  }
}
