import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CaminhoEnergiaProps {
  value: string;
}

export class CaminhoEnergia extends ValueObject<CaminhoEnergiaProps> {
  get value (): string {
    return this.props.value;
  }

  public toString() : String {
    return this.props.value;
  }
  
  public constructor (props: CaminhoEnergiaProps) {
    super(props);
  }

  public static create (caminhoEnergia: string): Result<CaminhoEnergia> {
    const guardResult = Guard.againstNullOrUndefined(caminhoEnergia, 'Energia que vai gastar durante a viagem toda');
    if (!guardResult.succeeded) {
      return Result.fail<CaminhoEnergia>(guardResult.message);
    } else {
      return Result.ok<CaminhoEnergia>(new CaminhoEnergia({ value: caminhoEnergia }))
    }
  }
}