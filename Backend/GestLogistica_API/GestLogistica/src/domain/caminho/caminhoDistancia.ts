import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface caminhoDistanciaProps {
  value: number;
}

export class CaminhoDistancia extends ValueObject<caminhoDistanciaProps> {
  get value (): number {
    return this.props.value;
  }

  public toString() : Number {
    return this.props.value;
  }
  
  public constructor (props: caminhoDistanciaProps) {
    super(props);
  }

  public static create (caminhoDistancia: number): Result<CaminhoDistancia> {
    const guardResult = Guard.againstNullOrUndefined(caminhoDistancia, 'Distancia entre os armazens');
    if (!guardResult.succeeded) {
      return Result.fail<CaminhoDistancia>(guardResult.message);
    } else {
      return Result.ok<CaminhoDistancia>(new CaminhoDistancia({ value: caminhoDistancia }))
    }
  }
}