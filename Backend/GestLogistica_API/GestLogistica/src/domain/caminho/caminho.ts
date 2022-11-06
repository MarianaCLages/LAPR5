import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {CaminhoArmazemChegadaId} from "./caminhoArmazemChegadaId";
import {CaminhoArmazemPartidaId} from "./caminhoArmazemPartidaId";
import {CaminhoDistancia} from "./caminhoDistancia";
import {CaminhoEnergia} from "./caminhoEnergia";
import {CaminhoId} from "./caminhoId";
import {CaminhoTempo} from "./caminhoTempo";
import {CaminhoTmpCarregamento} from "./caminhoTmpCarregamento";
import {Guard} from "../../core/logic/Guard";
import {Result} from "../../core/logic/Result";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import ICriarCaminhoDTO from "../../dto/caminho/ICriarCaminhoDTO";
import ICaminhoDTO from "../../dto/caminho/ICaminhoDTO";

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
        return new CaminhoId(this.id.toValue());
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

    set caminhoChegadaId(value: CaminhoArmazemChegadaId) {
        this.props.armazemChegadaId = value;
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
        //caminho chega e partida não podem ser iguais
        if (caminhoDTO.armazemPartidaId === caminhoDTO.armazemChegadaId) {
            return Result.fail<Caminho>("Caminho partida e chegada não podem ser iguais");
        }

        if (!guardResult.succeeded) {
            return Result.fail<Caminho>(guardResult.message);
        } else {
            const armazemPartidaIdOrError = CaminhoArmazemPartidaId.create(caminhoDTO.armazemPartidaId);
            const armazemChegadaIdOrError = CaminhoArmazemChegadaId.create(caminhoDTO.armazemChegadaId);
            const energiaOrError = CaminhoEnergia.create(caminhoDTO.energia);
            const distanciaOrError = CaminhoDistancia.create(caminhoDTO.distancia);
            const tempoOrError = CaminhoTempo.create(caminhoDTO.tempo);
            const tmpCarregamentoOrError = CaminhoTmpCarregamento.create(caminhoDTO.tmpCarregamento);

            const result = Result.combine([
                armazemPartidaIdOrError,
                armazemChegadaIdOrError,
                energiaOrError,
                distanciaOrError,
                tempoOrError,
                tmpCarregamentoOrError,
            ]);

            if (!result.isSuccess) {
                return Result.fail<Caminho>(result.errorValue());
            } else {
                const caminhoProps: CaminhoProps = {
                    armazemPartidaId: armazemPartidaIdOrError.getValue(),
                    armazemChegadaId: armazemChegadaIdOrError.getValue(),
                    energia: energiaOrError.getValue(),
                    distancia: distanciaOrError.getValue(),
                    tempo: tempoOrError.getValue(),
                    tmpCarregamento: tmpCarregamentoOrError.getValue(),
                };

                return Result.ok<Caminho>(new Caminho(caminhoProps, id));
            }
        }
    }

    public static createWithId(caminhoDTO: ICaminhoDTO): Result<Caminho> {
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
            try {
                const _armazemChegadaId = CaminhoArmazemChegadaId.create(caminhoDTO.armazemChegadaId);
                const _armazemPartidaId = CaminhoArmazemPartidaId.create(caminhoDTO.armazemPartidaId);
                const _distancia = CaminhoDistancia.create(caminhoDTO.distancia);
                const _energia = CaminhoEnergia.create(caminhoDTO.energia);
                const _tempo = CaminhoTempo.create(caminhoDTO.tempo);
                const _tmpCarregamento = CaminhoTmpCarregamento.create(caminhoDTO.tmpCarregamento);
                if (_armazemChegadaId.isFailure || _armazemPartidaId.isFailure || _distancia.isFailure || _energia.isFailure || _tempo.isFailure || _tmpCarregamento.isFailure) {
                    //adds to the message the errors of each value object if they exist
                    let message = "Não foi possviel criar o caminho: \n";
                    if (_armazemChegadaId.isFailure) {
                        message += _armazemChegadaId.errorValue() + "\n";
                    }
                    if (_armazemPartidaId.isFailure) {
                        message += _armazemPartidaId.errorValue() + "\n";
                    }
                    if (_distancia.isFailure) {
                        message += _distancia.errorValue() + "\n";
                    }
                    if (_energia.isFailure) {
                        message += _energia.errorValue() + "\n";
                    }
                    if (_tempo.isFailure) {
                        message += _tempo.errorValue() + "\n";
                    }
                    if (_tmpCarregamento.isFailure) {
                        message += _tmpCarregamento.errorValue() + "\n";
                    }
                    return Result.fail<Caminho>(message);
                }
                const caminho = new Caminho({
                    armazemChegadaId: _armazemChegadaId.getValue(),
                    armazemPartidaId: _armazemPartidaId.getValue(),
                    distancia: _distancia.getValue(),
                    energia: _energia.getValue(),
                    tempo: _tempo.getValue(),
                    tmpCarregamento: _tmpCarregamento.getValue(),
                }, new UniqueEntityID(caminhoDTO.id));
                return Result.ok<Caminho>(caminho);
            } catch (err) {
                console.debug(err);
                return Result.fail<Caminho>(err.toString());
            }
        }
    }
}
