import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface empPos3DZ {
  value: number;
}

export class EmpPos3DZ extends ValueObject<empPos3DZ> {
  public constructor(props: empPos3DZ) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(empPos3DZ: number): Result<EmpPos3DZ> {
    if (!empPos3DZ || (empPos3DZ < 0 || empPos3DZ > 9)) {
      return Result.fail<EmpPos3DZ>('Posição Z do empacotamento está errada! (Tem de estar compreendida entre 0-9)');
    }
    return Result.ok<EmpPos3DZ>(new EmpPos3DZ({value: empPos3DZ}))
  }

}