import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface TareProps {
    value: number;
}

export class Tare extends ValueObject<TareProps> {
    public constructor(props: TareProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(tare: number): Result<Tare> {
        const guardResult = Guard.inRange(tare, 0, Infinity, 'tare');
        if (!guardResult.succeeded) {
            return Result.fail<Tare>("Invalid tare, it needs to be a positive number!");
        } else {
            return Result.ok<Tare>(new Tare({value: tare}))
        }
    }
}