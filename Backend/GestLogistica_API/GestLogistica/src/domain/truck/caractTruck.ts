import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CaractTruckProps {
    value: string;
}

export class CaractTruck extends ValueObject<CaractTruckProps> {
    get value (): string {
        return this.props.value;
    }

    public constructor (props: CaractTruckProps) {
        super (props);
    }

    public static create (caractTruck: string): Result<CaractTruck> {
        const guardResult = Guard.againstNullOrUndefined(caractTruck, 'caractTruck');
        if (!guardResult.succeeded) {
            return Result.fail<CaractTruck>(guardResult.message);
        }
        else {
            return Result.ok<CaractTruck>(new CaractTruck({ value: caractTruck }))
        }
    }
}