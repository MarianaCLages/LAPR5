import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface pos3DX {
  value: number;
}

export class Pos3DY extends ValueObject<pos3DX> {
  public constructor(props: pos3DX) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(pos3DY: number): Result<Pos3DY> {
    if (!pos3DY || (pos3DY < 0 || pos3DY > 21)) {
      return Result.fail<Pos3DY>('Wrong Y position on the packaging! (Needs to be between 0-20');
    }
    return Result.ok<Pos3DY>(new Pos3DY({value: pos3DY}))
  }

}