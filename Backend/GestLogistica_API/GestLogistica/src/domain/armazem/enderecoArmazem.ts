import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnderecoArmazemProps {
    endereco: string;
}

export class EnderecoArmazem extends ValueObject<EnderecoArmazemProps> {

    get endereco(): string {
        return this.props.endereco
    }

    private constructor(props) {
        super(props)
    }
  
    
    public static create(enderecoArmazem: EnderecoArmazemProps): Result<EnderecoArmazem> {
        const guardResult = Guard.againstNullOrUndefined(enderecoArmazem, 'endereco');
        if (!guardResult.succeeded) {
            return Result.fail<EnderecoArmazem>(guardResult.message);
        } else {
            return Result.ok<EnderecoArmazem>(new EnderecoArmazem({ value: enderecoArmazem }))
        }
    }


}  