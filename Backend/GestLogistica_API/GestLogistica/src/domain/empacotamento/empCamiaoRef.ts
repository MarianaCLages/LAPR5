import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface empCamiao {
  value: string;
}

export class EmpCamiaoRef extends ValueObject<empCamiao> {
  public constructor(props: empCamiao) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(empCamiao: string): Result<EmpCamiaoRef> {
    if (!empCamiao) {
      return Result.fail<EmpCamiaoRef>('Matricula do camiao tem de ser uma string!');
    }
    return Result.ok<EmpCamiaoRef>(new EmpCamiaoRef({value: empCamiao}))
  }

  public toString(): String {
    return this.props.value;
  }
}