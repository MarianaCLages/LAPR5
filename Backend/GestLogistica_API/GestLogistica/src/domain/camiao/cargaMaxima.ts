import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface CargaMaximaProps {
    value: number;
}

export class CargaMaxima extends ValueObject<CargaMaximaProps> {
    public constructor(props: CargaMaximaProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(cargaMax: number): Result<CargaMaxima> {
        const guardResult = Guard.inRange(cargaMax, 0, Infinity, 'cargaMax');
        if (!guardResult.succeeded) {
            return Result.fail<CargaMaxima>("Carga máxima inválida, tem de ser um número positivo");
        } else {
            return Result.ok<CargaMaxima>(new CargaMaxima({value: cargaMax}))
        }
    }
}