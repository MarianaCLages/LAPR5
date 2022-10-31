import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface CaminhoEnergiaProps {
    value: number;
}

export class CaminhoEnergia extends ValueObject<CaminhoEnergiaProps> {
    public constructor(props: CaminhoEnergiaProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(caminhoEnergia: number): Result<CaminhoEnergia> {
        const guardResult = Guard.againstNullOrUndefined(caminhoEnergia, 'Energia que vai gastar durante a viagem toda');
        if (!guardResult.succeeded) {
            return Result.fail<CaminhoEnergia>(guardResult.message);
        } else {
            return Result.ok<CaminhoEnergia>(new CaminhoEnergia({value: caminhoEnergia}))
        }
    }

    public toString(): number {
        return this.props.value;
    }
}