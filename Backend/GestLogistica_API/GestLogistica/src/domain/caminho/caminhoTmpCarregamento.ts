import {Guard} from "../../core/logic/Guard";
import {Result} from "../../core/logic/Result";
import {ValueObject} from "../../core/domain/ValueObject";

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

    public static create(caminhoTmpCarregamento: number): Result<CaminhoTmpCarregamento> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(caminhoTmpCarregamento, 'camingoTmpCarregamento'),
            Guard.inRange(caminhoTmpCarregamento, 1, Infinity, 'camingoTmpCarregamento')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<CaminhoTmpCarregamento>(guardResult.message);
        } else {
            return Result.ok<CaminhoTmpCarregamento>(new CaminhoTmpCarregamento({value: caminhoTmpCarregamento}))
        }
    }

    public toString(): number {
        return this.props.value;
    }
}