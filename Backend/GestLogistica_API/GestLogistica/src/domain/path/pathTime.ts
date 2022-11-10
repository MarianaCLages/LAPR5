import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface pathTimeProps {
    value: number;
}

export class PathTime extends ValueObject<pathTimeProps> {
    public constructor(props: pathTimeProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(pathTime: number): Result<PathTime> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(pathTime, 'pathTime'),
            Guard.inRange(pathTime, 1, Infinity, 'pathTime')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<PathTime>(guardResult.message);
        } else {
            return Result.ok<PathTime>(new PathTime({value: pathTime}))
        }
    }

    public toString(): string {
        return this.props.value.toString();
    }
}