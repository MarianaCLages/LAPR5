import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {CaminhoArmazemChegadaId} from "./caminhoArmazemChegadaId";
import {CaminhoArmazemPartidaId} from "./caminhoArmazemPartidaId";
import {CaminhoDistancia} from "./caminhoDistancia";
import {CaminhoEnergia} from "./caminhoEnergia";
import {CaminhoId} from "./caminhoId";
import {CaminhoTempo} from "./caminhoTempo";
import {CaminhoTmpCarregamento} from "./caminhoTmpCarregamento";
import {Guard} from "../../core/logic/Guard";
import ICaminhoDTO from "../../dto/caminho/ICaminhoDTO";
import {Result} from "../../core/logic/Result";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import ICriarCaminhoDTO from "../../dto/caminho/ICriarCaminhoDTO";

interface CaminhoProps {
    armazemChegadaId: CaminhoArmazemChegadaId;
    armazemPartidaId: CaminhoArmazemPartidaId;
    distancia: CaminhoDistancia;
    energia: CaminhoEnergia;
    tempo: CaminhoTempo;
    tmpCarregamento: CaminhoTmpCarregamento;
}

export class Caminho extends AggregateRoot<CaminhoProps> {
    private constructor(props: CaminhoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get caminhoId(): CaminhoId {
        return new CaminhoId(this.caminhoId.toValue());
    }

    get caminhoArmazemPartidaId(): CaminhoArmazemPartidaId {
        return this.props.armazemPartidaId;
    }

    set caminhoArmazemPartidaId(value: CaminhoArmazemPartidaId) {
        this.props.armazemPartidaId = value;
    }

    get caminhoChegadaId(): CaminhoArmazemChegadaId {
        return this.props.armazemChegadaId;
    }

    get caminhoDistancia(): CaminhoDistancia {
        return this.props.distancia;
    }

    set caminhoDistancia(value: CaminhoDistancia) {
        this.props.distancia = value;
    }

    get caminhoEnergia(): CaminhoEnergia {
        return this.props.energia;
    }

    set caminhoEnergia(value: CaminhoEnergia) {
        this.props.energia = value;
    }

    get caminhoTempo(): CaminhoTempo {
        return this.props.tempo;
    }

    set caminhoTempo(value: CaminhoTempo) {
        this.props.tempo = value;
    }

    get caminhoTmpCarregamento(): CaminhoTmpCarregamento {
        return this.props.tmpCarregamento;
    }

    set caminhoTmpCarregamento(value: CaminhoTmpCarregamento) {
        this.props.tmpCarregamento = value;
    }

    set caminhoArmazemChegadaId(value: CaminhoArmazemChegadaId) {
        this.props.armazemChegadaId = value;
    }

    public static create(caminhoDTO: ICriarCaminhoDTO, id?: UniqueEntityID): Result<Caminho> {
        const guardedProps = [
            {argument: caminhoDTO.armazemPartidaId, argumentName: "armazemPartidaId",},
            {argument: caminhoDTO.armazemChegadaId, argumentName: "armazemChegadaId",},
            {argument: caminhoDTO.energia, argumentName: "energia"},
            {argument: caminhoDTO.distancia, argumentName: "distancia"},
            {argument: caminhoDTO.tempo, argumentName: "tempo"},
            {argument: caminhoDTO.tmpCarregamento, argumentName: "tmpCarregamento"},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Caminho>(guardResult.message);
        } else {
            const caminho = new Caminho({
                armazemChegadaId: new CaminhoArmazemChegadaId({value: caminhoDTO.armazemChegadaId,}),
                armazemPartidaId: new CaminhoArmazemPartidaId({value: caminhoDTO.armazemPartidaId,}),
                distancia: new CaminhoDistancia({value: caminhoDTO.distancia}),
                energia: new CaminhoEnergia({value: caminhoDTO.energia}),
                tempo: new CaminhoTempo({value: caminhoDTO.tempo}),
                tmpCarregamento: new CaminhoTmpCarregamento({value: caminhoDTO.tmpCarregamento,}),
            }, id);

            return Result.ok<Caminho>(caminho);
        }
    }
}
