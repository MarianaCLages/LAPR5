import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface cargaTotalProps {
    value: number;
}

export class CargaTotal extends ValueObject<cargaTotalProps> {
    public constructor(props: cargaTotalProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(cargaTotal: number): Result<CargaTotal> {
        const guardResult = Guard.inRange(cargaTotal, 0, Infinity, 'cargaTotal');
        if (!guardResult.succeeded) {
            return Result.fail<CargaTotal>("Carga total inválida, tem de ser um número positivo");
        } else {
            return Result.ok<CargaTotal>(new CargaTotal({value: cargaTotal}))
        }
    }
}
