import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface tripOrders {
  value: Array<string>;
}

export class TripOrders extends ValueObject<tripOrders> {

  constructor(props: tripOrders) {
    super(props);
  }

  get value(): Array<string> {
    return this.props.value;
  }

  public static create(orders: string[]) {
    if (orders.length === 0) {
      return Result.fail<TripOrders>("The list of orders must not be empty");
    }

    const array = Array.from(orders);

    return Result.ok(new TripOrders({ value: array }));
  }

}