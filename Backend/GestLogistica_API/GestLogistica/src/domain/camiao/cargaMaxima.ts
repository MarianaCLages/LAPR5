import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CargaMaximaProps {
    value: number;
  }
  
  export class CargaMaxima extends ValueObject<CargaMaximaProps> {
    get value (): number {
      return this.props.value;
    }
    
    public constructor (props: CargaMaximaProps) {
      super(props);
    }
  
    public static create (cargaMax: number): Result<CargaMaxima> {
      const guardResult = Guard.againstNullOrUndefined(cargaMax, 'cargaMax');
      if (!guardResult.succeeded) {
        return Result.fail<CargaMaxima>(guardResult.message);
      } else {
        return Result.ok<CargaMaxima>(new CargaMaxima({ value: cargaMax }))
      }
    }
  }