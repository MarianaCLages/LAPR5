import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface CapacidadeCargaProps {
    value: number;
}

export class CapacidadeCarga extends ValueObject<CapacidadeCargaProps> {
    public constructor(props: CapacidadeCargaProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(capacidadeCarga: number): Result<CapacidadeCarga> {
        const guardResult = Guard.inRange(capacidadeCarga, 0, Infinity, 'capacidadeCarga');
        if (!guardResult.succeeded) {
            return Result.fail<CapacidadeCarga>("Capacidade de carga inválida, tem de ser um número positivo");
        } else {
            return Result.ok<CapacidadeCarga>(new CapacidadeCarga({value: capacidadeCarga}))
        }
    }
}