import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ActiveTruckProps {
    value: boolean;
}

export class ActiveTruck extends ValueObject<ActiveTruckProps> {
    get value (): boolean {
        return this.props.value;
    }

    set value (value: boolean) {
        this.props.value = value;
    }

    public constructor (props: ActiveTruckProps) {
        super (props);
    }

    public static create (activeTruck: boolean): Result<ActiveTruck> {
        const guardResult = Guard.againstNullOrUndefined(activeTruck, 'activeTruck');
        if (!guardResult.succeeded) {
            return Result.fail<ActiveTruck>(guardResult.message);
        }
        else {
            return Result.ok<ActiveTruck>(new ActiveTruck({ value: activeTruck }))
        }
    }
}