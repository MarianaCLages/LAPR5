import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CapacidadeCargaProps {
    value: string;
  }
  
  export class CapacidadeCarga extends ValueObject<CapacidadeCargaProps> {
    get value (): string {
      return this.props.value;
    }
    
    public constructor (props: CapacidadeCargaProps) {
      super(props);
    }
  
    public static create (capacidadeCarga: string): Result<CapacidadeCarga> {
      const guardResult = Guard.againstNullOrUndefined(capacidadeCarga, 'capacidadeCarga');
      if (!guardResult.succeeded) {
        return Result.fail<CapacidadeCarga>(guardResult.message);
      } else {
        return Result.ok<CapacidadeCarga>(new CapacidadeCarga({ value: capacidadeCarga }))
      }
    }
  }