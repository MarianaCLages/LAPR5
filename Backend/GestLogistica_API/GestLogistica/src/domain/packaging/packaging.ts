import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { OrderRef } from "./orderRef";
import { TruckRef } from "./truckRef";
import ICreatePackagingDTO from "../../dto/packaging/ICreatePackagingDTO";
import IPackagingDTO from "../../dto/packaging/IPackagingDTO";
import { PathId } from "../path/pathId";

import { Pos3DX } from "./pos3DX";
import { Pos3DY } from "./pos3DY";
import { Pos3DZ } from "./pos3DZ";

interface PackagingProps {
  orderRef: OrderRef;
  truckRef: TruckRef;
  pos3DX: Pos3DX;
  pos3DY: Pos3DY;
  pos3DZ: Pos3DZ;
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

  get pos3DX(): Pos3DX {
    return this.props.pos3DX;
  }

  get pos3DY(): Pos3DY {
    return this.props.pos3DY;
  }

  get pos3DZ(): Pos3DZ {
    return this.props.pos3DZ;
  }

  set pos3DX(value: Pos3DX) {
    this.props.pos3DX = value;
  }

  set pos3DY(value: Pos3DY) {
    this.props.pos3DY = value;
  }

  set pos3DZ(value: Pos3DZ) {
    this.props.pos3DZ = value;
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
      { argument: packagingDTO.truckRef, argumentName: "referencedTruck" },
      { argument: packagingDTO.pos3DX, argumentName: "packaging3DXPosition" },
      { argument: packagingDTO.pos3DY, argumentName: "packaging3DYPosition" },
      { argument: packagingDTO.pos3DZ, argumentName: "packaging3DZPosition" }
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
        const _3DXPosition = Pos3DX.create(packagingDTO.pos3DX);
        const _3DYPosition = Pos3DY.create(packagingDTO.pos3DY);
        const _3DZPosition = Pos3DZ.create(packagingDTO.pos3DZ);

        const result = Result.combine(
          [
            _orderRef, _truckRef, _3DZPosition, _3DYPosition, _3DXPosition
          ]
        );

        if (result.isFailure) {
          return Result.fail<Packaging>(result.errorValue());
        } else {
          const packaging = new Packaging({
            orderRef: _orderRef.getValue(),
            truckRef: _truckRef.getValue(),
            pos3DX: _3DXPosition.getValue(),
            pos3DY: _3DYPosition.getValue(),
            pos3DZ: _3DZPosition.getValue()
          }, id);
          return Result.ok<Packaging>(packaging);
        }
      } catch (err) {
        console.debug(err);
        return Result.fail<Packaging>(err.toString());
      }


    }


  }

  public static createWithId(packagingDTO: IPackagingDTO): Result<Packaging> {

    const guardedProps = [
      { argument: packagingDTO.orderRef, argumentName: "referencedOrder" },
      { argument: packagingDTO.truckRef, argumentName: "referencedTruck" },
      { argument: packagingDTO.pos3DX, argumentName: "packaging3DXPosition" },
      { argument: packagingDTO.pos3DY, argumentName: "packaging3DYPosition" },
      { argument: packagingDTO.pos3DZ, argumentName: "packaging3DZPosition" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    //path chega e partida não podem ser iguais
    if (packagingDTO.orderRef === packagingDTO.truckRef
    ) {
      return Result.fail<Packaging>("You can't have the same references between the truck and the order");
    }

    if (!guardResult.succeeded) {
      return Result.fail<Packaging>(guardResult.message);
    } else {
      try {
        const _orderRef = OrderRef.create(packagingDTO.orderRef);
        const _truckRef = TruckRef.create(packagingDTO.truckRef);
        const _3DXPosition = Pos3DX.create(packagingDTO.pos3DX);
        const _3DYPosition = Pos3DY.create(packagingDTO.pos3DY);
        const _3DZPosition = Pos3DZ.create(packagingDTO.pos3DZ);

        const result = Result.combine(
          [
            _orderRef, _truckRef, _3DZPosition, _3DYPosition, _3DXPosition
          ]
        );

        if (result.isFailure) {
          return Result.fail<Packaging>(result.errorValue());
        } else {
          const packaging = new Packaging({
            orderRef: _orderRef.getValue(),
            truckRef: _truckRef.getValue(),
            pos3DX: _3DXPosition.getValue(),
            pos3DY: _3DYPosition.getValue(),
            pos3DZ: _3DZPosition.getValue()
          }, new UniqueEntityID(packagingDTO.id));
          return Result.ok<Packaging>(packaging);
        }

      } catch (err) {
        console.debug(err);
        return Result.fail<Packaging>(err.toString());
      }

    }
  }
}
