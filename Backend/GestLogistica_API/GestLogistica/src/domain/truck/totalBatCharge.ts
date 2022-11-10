import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface totalBatChargeProps {
    value: number;
}

// total battery charge
export class TotalBatCharge extends ValueObject<totalBatChargeProps> {
    public constructor(props: totalBatChargeProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(totalBatCharge: number): Result<TotalBatCharge> {
        const guardResult = Guard.inRange(totalBatCharge, 0, Infinity, 'totalBatCharge');
        if (!guardResult.succeeded) {
            return Result.fail<TotalBatCharge>("Invalid total battery charge, it needs to be a positive number!");
        } else {
            return Result.ok<TotalBatCharge>(new TotalBatCharge({value: totalBatCharge}))
        }
    }
}
