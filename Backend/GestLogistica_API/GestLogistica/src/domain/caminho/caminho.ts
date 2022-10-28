import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

import { CaminhoId } from "../caminho/caminhoId";
import { CaminhoArmazemPartidaId } from "../caminho/caminhoArmazemPartidaId";
import { CaminhoArmazemChegadaId } from "../caminho/caminhoArmazemChegadaId";
import { CaminhoDistancia } from "../caminho/caminhoDistancia";
import { CaminhoEnergia } from "../caminho/caminhoEnergia";
import { CaminhoTempo } from "../caminho/caminhoTempo";
import { CaminhoTmpCarregamento } from "../caminho/caminhoTmpCarregamento";

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
  get id(): UniqueEntityID {
    return this._id;
  }

  get caminhoId(): CaminhoId {
    return new CaminhoId(this.caminhoId.toValue());
  }

  get caminhoArmazemPartidaId(): CaminhoArmazemPartidaId {
    return this.props.armazemPartidaId;
  }

  get caminhoChegadaId(): CaminhoArmazemChegadaId {
    return this.props.armazemChegadaId;
  }

  get caminhoDistancia(): CaminhoDistancia {
    return this.props.distancia;
  }

  get caminhoEnergia(): CaminhoEnergia {
    return this.props.energia;
  }

  get caminhoTempo(): CaminhoTempo {
    return this.props.tempo;
  }

  get caminhoTmpCarregamento(): CaminhoTmpCarregamento {
    return this.props.tmpCarregamento;
  }

  set caminhoArmazemPartidaId(value: CaminhoArmazemPartidaId) {
    this.props.armazemPartidaId = value;
  }

  set caminhoArmazemChegadaId(value: CaminhoArmazemChegadaId) {
    this.props.armazemChegadaId = value;
  }

  set caminhoDistancia(value: CaminhoDistancia) {
    this.props.distancia = value;
  }

  set caminhoEnergia(value: CaminhoEnergia) {
    this.props.energia = value;
  }

  set caminhoTempo(value: CaminhoTempo) {
    this.props.tempo = value;
  }

  set caminhoTmpCarregamento(value: CaminhoTmpCarregamento) {
    this.props.tmpCarregamento = value;
  }

  private constructor(props: CaminhoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    caminhoDTO: ICaminhoDTO,
    id?: UniqueEntityID
  ): Result<Caminho> {
    const guardedProps = [
      {
        argument: caminhoDTO.armazemPartidaId,
        argumentName: "armazemPartidaId",
      },
      {
        argument: caminhoDTO.armazemChegadaId,
        argumentName: "armazemChegadaId",
      },
      { argument: caminhoDTO.energia, argumentName: "energia" },
      { argument: caminhoDTO.distancia, argumentName: "distancia" },
      { argument: caminhoDTO.tempo, argumentName: "tempo" },
      { argument: caminhoDTO.tmpCarregamento, argumentName: "tmpCarregamento" },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Caminho>(guardResult.message);
    } else {
      const caminho = new Caminho(
        {
          armazemChegadaId: new CaminhoArmazemChegadaId({
            value: caminhoDTO.armazemChegadaId,
          }),
          armazemPartidaId: new CaminhoArmazemPartidaId({
            value: caminhoDTO.armazemPartidaId,
          }),
          distancia: new CaminhoDistancia({ value: caminhoDTO.distancia }),
          energia: new CaminhoEnergia({ value: caminhoDTO.energia }),
          tempo: new CaminhoTempo({ value: caminhoDTO.tempo }),
          tmpCarregamento: new CaminhoTmpCarregamento({
            value: caminhoDTO.tmpCarregamento,
          }),
        },
        id
      );

      return Result.ok<Caminho>(caminho);
    }
  }
}
