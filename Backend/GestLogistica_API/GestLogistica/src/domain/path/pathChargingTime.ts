import {Guard} from "../../core/logic/Guard";
import {Result} from "../../core/logic/Result";
import {ValueObject} from "../../core/domain/ValueObject";

interface pathChargingTimeProps {
    value: number;
}

export class PathChargingTime extends ValueObject<pathChargingTimeProps> {
    public constructor(props: pathChargingTimeProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(pathChargingTime: number): Result<PathChargingTime> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(pathChargingTime, 'pathChargingTime'),
            Guard.inRange(pathChargingTime, 1, Infinity, 'pathChargingTime')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<PathChargingTime>(guardResult.message);
        } else {
            return Result.ok<PathChargingTime>(new PathChargingTime({value: pathChargingTime}))
        }
    }

    public toString(): number {
        return this.props.value;
    }
}