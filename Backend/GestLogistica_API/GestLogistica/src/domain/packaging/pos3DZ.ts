import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface pos3DZ {
  value: number;
}

export class Pos3DZ extends ValueObject<pos3DZ> {
  public constructor(props: pos3DZ) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(pos3DZ: number): Result<Pos3DZ> {
    if (!pos3DZ || (pos3DZ < 0 || pos3DZ > 9)) {
      return Result.fail<Pos3DZ>('Wrong Z position on the packaging! (Needs to be between 0-9');
    }
    return Result.ok<Pos3DZ>(new Pos3DZ({value: pos3DZ}))
  }

}