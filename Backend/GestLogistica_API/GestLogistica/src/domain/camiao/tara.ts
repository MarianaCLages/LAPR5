import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TaraProps {
    value: string;
  }
  
  export class Tara extends ValueObject<TaraProps> {
    get value (): string {
      return this.props.value;
    }
    
    public constructor (props: TaraProps) {
      super(props);
    }
  
    public static create (tara: string): Result<Tara> {
      const guardResult = Guard.againstNullOrUndefined(tara, 'tara');
      if (!guardResult.succeeded) {
        return Result.fail<Tara>(guardResult.message);
      } else {
        return Result.ok<Tara>(new Tara({ value: tara }))
      }
    }
  }