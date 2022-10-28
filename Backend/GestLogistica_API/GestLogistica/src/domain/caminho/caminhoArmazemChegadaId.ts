
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface caminhoArmazemChegadaId {
  value: string;
}

export class CaminhoArmazemChegadaId extends ValueObject<caminhoArmazemChegadaId> {
  get value (): string {
    return this.props.value;
  }

  public toString() : String {
    return this.props.value;
  }
  
  public constructor (props: caminhoArmazemChegadaId) {
    super(props);
  }

  public static create (caminhoArmazemChegadaId: string): Result<CaminhoArmazemChegadaId> {
    const guardResult = Guard.againstNullOrUndefined(caminhoArmazemChegadaId, 'Tempo que demora a percorrer o caminho');
    if (!guardResult.succeeded) {
      return Result.fail<CaminhoArmazemChegadaId>(guardResult.message);
    } else {
      return Result.ok<CaminhoArmazemChegadaId>(new CaminhoArmazemChegadaId({ value: caminhoArmazemChegadaId.toString() }))
    }
  }
}