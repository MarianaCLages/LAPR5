import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface PathEnergyProps {
    value: number;
}

export class PathEnergy extends ValueObject<PathEnergyProps> {
    public constructor(props: PathEnergyProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(pathEnergy: number): Result<PathEnergy> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(pathEnergy, 'pathEnergy'),
            Guard.inRange(pathEnergy, 1, Infinity, 'pathEnergy')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<PathEnergy>(guardResult.message);
        } else {
            return Result.ok<PathEnergy>(new PathEnergy({value: pathEnergy}))
        }
    }

    public toString(): number {
        return this.props.value;
    }
}