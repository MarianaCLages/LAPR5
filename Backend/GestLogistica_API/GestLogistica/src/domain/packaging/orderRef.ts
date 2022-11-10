import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface orderRef {
  value: string;
}

export class OrderRef extends ValueObject<orderRef> {
  public constructor(props: orderRef) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(empWarehouseId: string): Result<OrderRef> {
    if (!empWarehouseId) {
      return Result.fail<OrderRef>('Order ID creation error!');
    }
    return Result.ok<OrderRef>(new OrderRef({value: empWarehouseId}))
  }

  public toString(): String {
    return this.props.value;
  }
}