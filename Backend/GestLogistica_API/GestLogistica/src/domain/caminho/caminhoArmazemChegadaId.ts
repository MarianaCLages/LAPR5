import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface caminhoArmazemChegadaId {
    value: string;
}

export class CaminhoArmazemChegadaId extends ValueObject<caminhoArmazemChegadaId> {
    public constructor(props: caminhoArmazemChegadaId) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(caminhoArmazemChegadaId: string): Result<CaminhoArmazemChegadaId> {
        const guardResult = Guard.againstNullOrUndefined(caminhoArmazemChegadaId, 'Armazem de chegada');
        if (!guardResult.succeeded) {
            return Result.fail<CaminhoArmazemChegadaId>(guardResult.message);
        } else {
            return Result.ok<CaminhoArmazemChegadaId>(new CaminhoArmazemChegadaId({value: caminhoArmazemChegadaId.toString()}))
        }
    }

    public toString(): String {
        return this.props.value;
    }
}