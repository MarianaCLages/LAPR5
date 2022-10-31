
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface caminhoArmazemPartidaId {
  value: string;
}

export class CaminhoArmazemPartidaId extends ValueObject<caminhoArmazemPartidaId> {
  get value (): string {
    return this.props.value;
  }

  public toString() : String {
    return this.props.value;
  }
  
  public constructor (props: caminhoArmazemPartidaId) {
    super(props);
  }

  public static create (caminhoArmazemPartidaId: string): Result<CaminhoArmazemPartidaId> {
    const guardResult = Guard.againstNullOrUndefined(caminhoArmazemPartidaId, 'Armazem de partida');
    if (!guardResult.succeeded) {
      return Result.fail<CaminhoArmazemPartidaId>(guardResult.message);
    } else {
      return Result.ok<CaminhoArmazemPartidaId>(new CaminhoArmazemPartidaId({ value: caminhoArmazemPartidaId }))
    }
  }
}