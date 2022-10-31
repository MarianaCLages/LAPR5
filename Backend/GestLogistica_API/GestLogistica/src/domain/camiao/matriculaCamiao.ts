import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface MatriculaCamiaoProps {
    value: string;
}

export class MatriculaCamiao extends ValueObject<MatriculaCamiaoProps> {
    get value (): string {
        return this.props.value;
    }

    public constructor (props: MatriculaCamiaoProps) {
        super (props);
    }

    public static create (matriculaCamiao: string): Result<MatriculaCamiao> {
        const guardResult = Guard.againstNullOrUndefined(matriculaCamiao, 'matriculaCamiao');
        if (!guardResult.succeeded) {
            return Result.fail<MatriculaCamiao>(guardResult.message);
        }
        else {
            return Result.ok<MatriculaCamiao>(new MatriculaCamiao({ value: matriculaCamiao }))
        }
    }
}
