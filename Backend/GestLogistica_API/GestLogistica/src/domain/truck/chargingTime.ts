import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ChargingTimeProps {
    value: number;
}
// time that takes to charge the truck from 20 to 80% (minutes)
export class ChargingTime extends ValueObject<ChargingTimeProps> {
    public constructor(props: ChargingTimeProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(chargingTime: number): Result<ChargingTime> {
        const guardResult = Guard.inRange(chargingTime, 0, Infinity, 'chargingTime');
        if (!guardResult.succeeded) {
            return Result.fail<ChargingTime>("Invalid charging time, it needs to be a positive number!");
        } else {
            return Result.ok<ChargingTime>(new ChargingTime({value: chargingTime}))
        }
    }
}