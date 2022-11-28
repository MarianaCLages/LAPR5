import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface pos3DX {
  value: number;
}

export class Pos3DX extends ValueObject<pos3DX> {
  public constructor(props: pos3DX) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(pos3DX: number): Result<Pos3DX> {
    if (!pos3DX || (pos3DX < 0 || pos3DX > 10)) {
      return Result.fail<Pos3DX>('Wrong X position on the packaging! (Needs to be between 0-10');
    }
    return Result.ok<Pos3DX>(new Pos3DX({value: pos3DX}))
  }

}