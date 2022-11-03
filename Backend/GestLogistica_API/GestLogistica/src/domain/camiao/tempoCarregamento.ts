import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TempoCarregamentoProps {
    value: number;
  }
  
  export class TempoCarregamento extends ValueObject<TempoCarregamentoProps> {
    get value (): number {
      return this.props.value;
    }
    
    public constructor (props: TempoCarregamentoProps) {
      super(props);
    }
  
    public static create (tempoCarregamento: number): Result<TempoCarregamento> {
      const guardResult = Guard.againstNullOrUndefined(tempoCarregamento, 'tempoCarregamento');
      if (!guardResult.succeeded) {
        return Result.fail<TempoCarregamento>(guardResult.message);
      } else {
        return Result.ok<TempoCarregamento>(new TempoCarregamento({ value: tempoCarregamento }))
      }
    }
  }