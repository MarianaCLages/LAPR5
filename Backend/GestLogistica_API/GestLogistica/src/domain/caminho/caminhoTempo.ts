
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface caminhoTempoProps {
  value: string;
}

export class CaminhoTempo extends ValueObject<caminhoTempoProps> {
  get value (): string {
    return this.props.value;
  }
  
  public constructor (props: caminhoTempoProps) {
    super(props);
  }

  public toString() : String {
    return this.props.value;
  }

  public static create (caminhoTempo: string): Result<CaminhoTempo> {
    const guardResult = Guard.againstNullOrUndefined(caminhoTempo, 'Tempo que demora a percorrer o caminho');
    if (!guardResult.succeeded) {
      return Result.fail<CaminhoTempo>(guardResult.message);
    } else {
      return Result.ok<CaminhoTempo>(new CaminhoTempo({ value: caminhoTempo }))
    }
  }
}