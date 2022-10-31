import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface camingoTmpCarregamentoProps {
    value: number;
}

export class CaminhoTmpCarregamento extends ValueObject<camingoTmpCarregamentoProps> {
    public constructor(props: camingoTmpCarregamentoProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(camingoTmpCarregamento: number): Result<CaminhoTmpCarregamento> {
        const guardResult = Guard.againstNullOrUndefined(camingoTmpCarregamento, 'Tempo que demora a carregar');
        if (!guardResult.succeeded) {
            return Result.fail<CaminhoTmpCarregamento>(guardResult.message);
        } else {
            return Result.ok<CaminhoTmpCarregamento>(new CaminhoTmpCarregamento({value: camingoTmpCarregamento}))
        }
    }

    public toString(): number {
        return this.props.value;
    }
}