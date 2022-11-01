import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface caminhoDistanciaProps {
    value: number;
}

export class CaminhoDistancia extends ValueObject<caminhoDistanciaProps> {
    public constructor(props: caminhoDistanciaProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(caminhoDistancia: number): Result<CaminhoDistancia> {
        const guardResult = Guard.combine([
            Guard.againstNullOrUndefined(caminhoDistancia, 'caminhoDistancia'),
            Guard.inRange(caminhoDistancia, 1, Infinity, 'caminhoDistancia')
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<CaminhoDistancia>(guardResult.message);
        } else {
            return Result.ok<CaminhoDistancia>(new CaminhoDistancia({value: caminhoDistancia}))
        }
    }

    public toString(): Number {
        return this.props.value;
    }
}