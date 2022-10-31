import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CaractCamiaoProps {
    value: string;
}

export class CaractCamiao extends ValueObject<CaractCamiaoProps> {
    get value (): string {
        return this.props.value;
    }

    public constructor (props: CaractCamiaoProps) {
        super (props);
    }

    public static create (caractCamiao: string): Result<CaractCamiao> {
        const guardResult = Guard.againstNullOrUndefined(caractCamiao, 'caractCamiao');
        if (!guardResult.succeeded) {
            return Result.fail<CaractCamiao>(guardResult.message);
        }
        else {
            return Result.ok<CaractCamiao>(new CaractCamiao({ value: caractCamiao }))
        }
    }
}