import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface empPos3DX {
  value: number;
}

export class EmpPos3DY extends ValueObject<empPos3DX> {
  public constructor(props: empPos3DX) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(empPos3DY: number): Result<EmpPos3DY> {
    if (!empPos3DY || (empPos3DY < 0 || empPos3DY > 21)) {
      return Result.fail<EmpPos3DY>('Posição Y do empacotamento está errada! (Tem de estar compreendida entre 0-20)');
    }
    return Result.ok<EmpPos3DY>(new EmpPos3DY({value: empPos3DY}))
  }

}