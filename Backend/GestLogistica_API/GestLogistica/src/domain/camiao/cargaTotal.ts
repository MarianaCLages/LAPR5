import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface cargaTotalProps {
    value: string;
}

export class CargaTotal extends ValueObject<cargaTotalProps> {
    get value(): string {
        return this.props.value;
    }

    public constructor(props: cargaTotalProps) {
        super(props);
    }

    public static create(cargaTotal: string): Result<CargaTotal> {
        const guardResult = Guard.againstNullOrUndefined(cargaTotal, 'cargaTotal');
        if (!guardResult.succeeded) {
            return Result.fail<CargaTotal>(guardResult.message);
        } else {
            return Result.ok<CargaTotal>(new CargaTotal({ value: cargaTotal }))
        }
    }
}
