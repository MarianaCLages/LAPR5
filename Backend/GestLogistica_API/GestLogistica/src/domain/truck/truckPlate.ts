import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { PromiseProvider } from "mongoose";

interface TruckPlateProps {
    value: string;
}

// truck plate (e.g. AA-11-AA)
export class TruckPlate extends ValueObject<TruckPlateProps> {
    get value (): string {
        return this.props.value;
    }

    public constructor (props: TruckPlateProps) {
        super (props);
    }

    public static create (truckPlate: string): Result<TruckPlate> {
        const guardResult = Guard.againstNullOrUndefined(truckPlate, 'truckPlate');
        if (!guardResult.succeeded || !RegExp('^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$').test(truckPlate)) {
            return Result.fail<TruckPlate>("Invalid truck plate, it needs to be in the format LL-NN-LL!");
        }
        else {
            return Result.ok<TruckPlate>(new TruckPlate({ value: truckPlate }))
        }
    }
}
