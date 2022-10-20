import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


interface DesignacaoArmazemProps {
    designacao: string;
}


export class DesignacaoArmazem extends ValueObject<DesignacaoArmazemProps> {


    get designacao(): string {
        return this.props.designacao;
    }

    private constructor(props) {
        super(props)
    }

    public static create(designacao: string): Result<DesignacaoArmazem> {
        const guardResult = Guard.againstNullOrUndefined(designacao, 'designacao');
        if (!guardResult.succeeded) {
            return Result.fail<DesignacaoArmazem>(guardResult.message);
        } else {
            return Result.ok<DesignacaoArmazem>(new DesignacaoArmazem({ value: designacao }))
        }
    }

}
