import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface caminhoTempoProps {
    value: number;
}

export class CaminhoTempo extends ValueObject<caminhoTempoProps> {
    public constructor(props: caminhoTempoProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(caminhoTempo: number): Result<CaminhoTempo> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(caminhoTempo, 'caminhoTempo'),
            Guard.inRange(caminhoTempo, 1, Infinity, 'caminhoTempo')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<CaminhoTempo>(guardResult.message);
        } else {
            return Result.ok<CaminhoTempo>(new CaminhoTempo({value: caminhoTempo}))
        }
    }

    public toString(): string {
        return this.props.value.toString();
    }
}