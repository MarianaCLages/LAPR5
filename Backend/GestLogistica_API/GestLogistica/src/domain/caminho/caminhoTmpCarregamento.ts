
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface camingoTmpCarregamentoProps {
  value: string;
}

export class CaminhoTmpCarregamento extends ValueObject<camingoTmpCarregamentoProps> {
  get value (): string {
    return this.props.value;
  }
  
  public constructor (props: camingoTmpCarregamentoProps) {
    super(props);
  }

  public toString() : String {
    return this.props.value;
  }

  public static create (camingoTmpCarregamento: string): Result<CaminhoTmpCarregamento> {
    const guardResult = Guard.againstNullOrUndefined(camingoTmpCarregamento, 'Tempo que demora a carregar');
    if (!guardResult.succeeded) {
      return Result.fail<CaminhoTmpCarregamento>(guardResult.message);
    } else {
      return Result.ok<CaminhoTmpCarregamento>(new CaminhoTmpCarregamento({ value: camingoTmpCarregamento }))
    }
  }
}