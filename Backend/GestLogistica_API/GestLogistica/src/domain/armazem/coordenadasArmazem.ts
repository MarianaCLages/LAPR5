import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface CoordenadasArmazemProps {
  x: number;
  y: number;
}


export class CoordenadasArmazem extends ValueObject<CoordenadasArmazemProps> {


  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  private constructor(props) {
    super(props)
  }

  public static create (coordenadasArmazem: CoordenadasArmazemProps): Result<CoordenadasArmazem> {
    const guardResult = Guard.againstNullOrUndefined(coordenadasArmazem, 'coordenadas');
    if (!guardResult.succeeded) {
      return Result.fail<CoordenadasArmazem>(guardResult.message);
    } else {
      return Result.ok<CoordenadasArmazem>(new CoordenadasArmazem({ value: coordenadasArmazem }))
    }
  }

}
