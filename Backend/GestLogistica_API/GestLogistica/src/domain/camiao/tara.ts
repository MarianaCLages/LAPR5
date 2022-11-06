import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface TaraProps {
    value: number;
}

export class Tara extends ValueObject<TaraProps> {
    public constructor(props: TaraProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(tara: number): Result<Tara> {
        const guardResult = Guard.inRange(tara, 0, Infinity, 'tara');
        if (!guardResult.succeeded) {
            return Result.fail<Tara>("Tara inválida, tem de ser um número positivo");
        } else {
            return Result.ok<Tara>(new Tara({value: tara}))
        }
    }
}