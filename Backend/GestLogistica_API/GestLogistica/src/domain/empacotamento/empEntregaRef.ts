import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface empEntregaRef {
  value: string;
}

export class EmpEntregaRef extends ValueObject<empEntregaRef> {
  public constructor(props: empEntregaRef) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(empArmazemId: string): Result<EmpEntregaRef> {
    if (!empArmazemId) {
      return Result.fail<EmpEntregaRef>('Erro na criação da identificação da entrega');
    }
    return Result.ok<EmpEntregaRef>(new EmpEntregaRef({value: empArmazemId}))
  }

  public toString(): String {
    return this.props.value;
  }
}