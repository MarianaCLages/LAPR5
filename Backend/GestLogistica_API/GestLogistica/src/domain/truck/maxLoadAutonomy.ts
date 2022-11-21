import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface MaxLoadAutonomyProps {
    value: number;
}

// autonomy with maximum load of truck (km)
export class MaxLoadAutonomy extends ValueObject<MaxLoadAutonomyProps> {
    public constructor(props: MaxLoadAutonomyProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(cargaMax: number): Result<MaxLoadAutonomy> {
        const guardResult = Guard.inRange(cargaMax, 0, Infinity, 'cargaMax');
        if (!guardResult.succeeded) {
            return Result.fail<MaxLoadAutonomy>("Invalid autonomy, it needs to be a positive number!");
        } else {
            return Result.ok<MaxLoadAutonomy>(new MaxLoadAutonomy({value: cargaMax}))
        }
    }
}