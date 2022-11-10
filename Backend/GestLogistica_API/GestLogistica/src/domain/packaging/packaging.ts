import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { OrderRef } from "./orderRef";
import { TruckRef } from "./truckRef";
import ICreatePackagingDTO from "../../dto/packaging/ICreatePackagingDTO";
import IPackagingDTO from "../../dto/packaging/IPackagingDTO";
import { PathId } from "../path/pathId";

interface PackagingProps {
  orderRef: OrderRef;
  truckRef: TruckRef;
}

export class Packaging extends AggregateRoot<PackagingProps> {
  private constructor(props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get packId(): PathId {
    return new PathId(this.id.toValue());
  }

  get orderRef(): OrderRef {
    return this.props.orderRef;
  }

  get truckRef(): TruckRef {
    return this.props.truckRef;
  }

  set truckRef(value: TruckRef) {
    this.props.truckRef = value;
  }

  set orderRef(value: OrderRef) {
    this.props.orderRef = value;
  }

  public static create(packagingDTO: ICreatePackagingDTO, id?: UniqueEntityID): Result<Packaging> {
    const guardedProps = [
      { argument: packagingDTO.orderRef, argumentName: "referencedOrder" },
      { argument: packagingDTO.truckRef, argumentName: "referencedTruck" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    //path chega e partida não podem ser iguais
    if (packagingDTO.orderRef === packagingDTO.truckRef) {
      return Result.fail<Packaging>("You can't have the same references between the truck and the order!");
    }

    if (!guardResult.succeeded) {
      return Result.fail<Packaging>(guardResult.message);
    } else {
      try {
        const _orderRef = OrderRef.create(packagingDTO.orderRef);
        const _truckRef = TruckRef.create(packagingDTO.truckRef);

        if (_orderRef.isFailure || _truckRef.isFailure) {
          //adds to the message the errors of each value object if they exist
          let message = "It was not possible to create the packaging:\n";
          if (_orderRef.isFailure) {
            message += _orderRef.errorValue() + "\n";
          }
          if (_truckRef.isFailure) {
            message += _truckRef.errorValue() + "\n";
          }
          return Result.fail<Packaging>(message);
        }

        const packaging = new Packaging({
          orderRef: _orderRef.getValue(),
          truckRef: _truckRef.getValue()
        }, id);
        return Result.ok<Packaging>(packaging);
      } catch (err) {
        console.debug(err);
        return Result.fail<Packaging>(err.toString());
      }

    }
  }

  public static createWithId(packagingDTO: IPackagingDTO): Result<Packaging> {
    const guardedProps = [
      { argument: packagingDTO.orderRef, argumentName: "referencedOrder" },
      { argument: packagingDTO.truckRef, argumentName: "referencedTruck" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    //path chega e partida não podem ser iguais
    if (packagingDTO.orderRef === packagingDTO.truckRef) {
      return Result.fail<Packaging>("You can't have the same references between the truck and the order");
    }

    if (!guardResult.succeeded) {
      return Result.fail<Packaging>(guardResult.message);
    } else {
      try {
        const _orderRef = OrderRef.create(packagingDTO.orderRef);
        const _truckRef = TruckRef.create(packagingDTO.truckRef);

        if (_orderRef.isFailure || _truckRef.isFailure) {
          //adds to the message the errors of each value object if they exist
          let message = "It was not possible to create the path: \n";
          if (_orderRef.isFailure) {
            message += _orderRef.errorValue() + "\n";
          }
          if (_truckRef.isFailure) {
            message += _truckRef.errorValue() + "\n";
          }
          return Result.fail<Packaging>(message);
        }

        const packaging = new Packaging({
          orderRef: _orderRef.getValue(),
          truckRef: _truckRef.getValue()
        }, new UniqueEntityID(packagingDTO.id));
        return Result.ok<Packaging>(packaging);
      } catch (err) {
        console.debug(err);
        return Result.fail<Packaging>(err.toString());
      }

    }
  }
}
