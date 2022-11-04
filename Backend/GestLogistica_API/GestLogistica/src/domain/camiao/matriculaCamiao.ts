import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { PromiseProvider } from "mongoose";

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
        if (!guardResult.succeeded || !RegExp('^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$').test(matriculaCamiao)) {
            return Result.fail<MatriculaCamiao>(guardResult.message);
        }
        else {
            return Result.ok<MatriculaCamiao>(new MatriculaCamiao({ value: matriculaCamiao }))
        }
    }
}
