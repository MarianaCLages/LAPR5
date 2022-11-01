import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

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
        const numberOfCharacters = config.armazenIDNumberOfCharacters;
        if (!caminhoArmazemChegadaId || caminhoArmazemChegadaId.length !== numberOfCharacters) {
            return Result.fail<CaminhoArmazemChegadaId>('caminhoArmazemChegadaId must be a string with ' + numberOfCharacters + ' characters');
        }
        return Result.ok<CaminhoArmazemChegadaId>(new CaminhoArmazemChegadaId({value: caminhoArmazemChegadaId}))
    }

    public toString(): String {
        return this.props.value;
    }
}