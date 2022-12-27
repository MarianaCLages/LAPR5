import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface tripOrders {
  ordersWarehouses: Array<OrderWarehouse>;
}

export interface OrderWarehouse {
  order: string[],
  warehouse: string
}

export class TripOrders extends ValueObject<tripOrders> {

  constructor(props: tripOrders) {
    super(props);
  }

  get value(): Array<OrderWarehouse> {
    return this.props.ordersWarehouses;
  }

  public static create(orders: OrderWarehouse[]) {
    if (orders.length === 0) {
      return Result.fail("The list of orders must not be empty");
    }

    return Result.ok(new TripOrders({ ordersWarehouses: Array.from(orders) }));
  }

}