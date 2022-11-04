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
    const numberOfCharacters = config.armazenIDNumberOfCharacters;
    if (!empArmazemId) {
      return Result.fail<EmpEntregaRef>('caminhoArmazemChegadaId must be a string with ' + numberOfCharacters + ' characters');
    }
    return Result.ok<EmpEntregaRef>(new EmpEntregaRef({value: empArmazemId}))
  }

  public toString(): String {
    return this.props.value;
  }
}