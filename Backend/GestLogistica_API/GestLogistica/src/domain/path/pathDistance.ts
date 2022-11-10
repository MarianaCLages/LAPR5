import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface pathDistanceProps {
    value: number;
}

export class PathDistance extends ValueObject<pathDistanceProps> {
    public constructor(props: pathDistanceProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(pathDistance: number): Result<PathDistance> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(pathDistance, 'pathDistance'),
            Guard.inRange(pathDistance, 1, Infinity, 'pathDistance')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<PathDistance>(guardResult.message);
        } else {
            return Result.ok<PathDistance>(new PathDistance({value: pathDistance}))
        }
    }

    public toString(): number {
        return this.props.value;
    }
}