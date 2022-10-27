import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from "mongoose";
import { ICaminhoPersistence } from "../dataschema/ICaminhoPersistence";

import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";
import { Caminho } from "../domain/caminho/caminho";

import { Role } from "../domain/role";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class CaminhoMap extends Mapper<Role> {
  public static toDTO(caminho: Caminho): ICaminhoDTO {
    return {
      id: caminho.id.toString(),
      armazemChegadaId: caminho.caminhoArmazemChegadaId.toString(),
      armazemPartidaId: caminho.caminhoArmazemPartidaId.toString(),
      energia: caminho.caminhoEnergia.toString(),
      tempo: caminho.caminhoTempo.toString(),
      distancia: caminho.caminhoDistancia.toString(),
      tmpCarregamento: caminho.caminhoTmpCarregamento.toString(),
    } as ICaminhoDTO;
  }

  public static toDomain(
    caminho: any | Model<ICaminhoPersistence & Document>
  ): Caminho {
    const roleOrError = Caminho.create(caminho, new UniqueEntityID(caminho.caminhoId));

    roleOrError.isFailure ? console.log(roleOrError.error) : "";

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence(caminho: Caminho): any {
    return {
        id: caminho.id.toString(),
        armazemChegadaId: caminho.caminhoArmazemChegadaId.toString(),
        armazemPartidaId: caminho.caminhoArmazemPartidaId.toString(),
        energia: caminho.caminhoEnergia.toString(),
        tempo: caminho.caminhoTempo.toString(),
        distancia: caminho.caminhoDistancia.toString(),
        tmpCarregamento: caminho.caminhoTmpCarregamento.toString(),
    };
  }
}
