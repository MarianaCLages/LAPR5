import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface empTruck {
  value: string;
}

export class TruckRef extends ValueObject<empTruck> {
  public constructor(props: empTruck) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(empTruck: string): Result<TruckRef> {
    if (!empTruck) {
      return Result.fail<TruckRef>('Error on the truck reference ID!');
    }
    return Result.ok<TruckRef>(new TruckRef({value: empTruck}))
  }

  public toString(): String {
    return this.props.value;
  }
}