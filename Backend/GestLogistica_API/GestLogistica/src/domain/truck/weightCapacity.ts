import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface WeightCapacityProps {
    value: number;
}

export class WeightCapacity extends ValueObject<WeightCapacityProps> {
    public constructor(props: WeightCapacityProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(weightCapacity: number): Result<WeightCapacity> {
        const guardResult = Guard.inRange(weightCapacity, 0, Infinity, 'weightCapacity');
        if (!guardResult.succeeded) {
            return Result.fail<WeightCapacity>("Invalid weight capacity, it needs to be a positive number!");
        } else {
            return Result.ok<WeightCapacity>(new WeightCapacity({value: weightCapacity}))
        }
    }
}