import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface TempoCarregamentoProps {
    value: number;
}

export class TempoCarregamento extends ValueObject<TempoCarregamentoProps> {
    public constructor(props: TempoCarregamentoProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(tempoCarregamento: number): Result<TempoCarregamento> {
        const guardResult = Guard.inRange(tempoCarregamento, 0, Infinity, 'tempoCarregamento');
        if (!guardResult.succeeded) {
            return Result.fail<TempoCarregamento>("Tempo de carregamento inválido, tem de ser um número positivo");
        } else {
            return Result.ok<TempoCarregamento>(new TempoCarregamento({value: tempoCarregamento}))
        }
    }
}