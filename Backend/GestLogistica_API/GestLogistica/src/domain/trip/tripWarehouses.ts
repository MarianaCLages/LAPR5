import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface tripWarehouses {
  value: Array<string>;
}

export class TripWarehouse extends ValueObject<tripWarehouses> {

  constructor(props: tripWarehouses) {
    super(props);
  }

  get value(): Array<string> {
    return this.props.value;
  }

  public static create(warehouse: string[]) {

    //check if the array is empty
    if (warehouse.length === 0) {
      return Result.fail<TripWarehouse>("Must have at least one warehouse");
    }

    const array = Array.from(warehouse);

    return Result.ok(new TripWarehouse({ value: array }));
  }
}
