import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface empPos3DX {
  value: number;
}

export class EmpPos3DX extends ValueObject<empPos3DX> {
  public constructor(props: empPos3DX) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(empPos3DX: number): Result<EmpPos3DX> {
    if (!empPos3DX || (empPos3DX < 0 || empPos3DX > 11)) {
      return Result.fail<EmpPos3DX>('Posição X do empacotamento está errada! (Tem de estar compreendida entre 0-10)');
    }
    return Result.ok<EmpPos3DX>(new EmpPos3DX({value: empPos3DX}))
  }

}