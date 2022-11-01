import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface caminhoArmazemPartidaId {
    value: string;
}

export class CaminhoArmazemPartidaId extends ValueObject<caminhoArmazemPartidaId> {
    public constructor(props: caminhoArmazemPartidaId) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(caminhoArmazemPartidaId: string): Result<CaminhoArmazemPartidaId> {
        const numberOfCharacters = config.armazenIDNumberOfCharacters;
        if (!caminhoArmazemPartidaId || caminhoArmazemPartidaId.length !== numberOfCharacters) {
            return Result.fail<CaminhoArmazemPartidaId>('caminhoArmazemPartidaId must be a string with ' + numberOfCharacters + ' characters');
        }
        return Result.ok<CaminhoArmazemPartidaId>(new CaminhoArmazemPartidaId({value: caminhoArmazemPartidaId}))
    }

    public toString(): String {
        return this.props.value;
    }
}