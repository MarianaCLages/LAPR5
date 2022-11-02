import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";
import {ICaminhoPersistence} from "../dataschema/ICaminhoPersistence";

import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";
import {Caminho} from "../domain/caminho/caminho";

import {Role} from "../domain/role";

import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class CaminhoMap extends Mapper<Caminho> {
    public static toDTO(caminho: Caminho): ICaminhoDTO {


        return {
            id: caminho.id.toString(),
            armazemChegadaId: caminho.caminhoChegadaId.toString().toString(),
            armazemPartidaId: caminho.caminhoArmazemPartidaId.toString().toString(),
            energia: caminho.caminhoEnergia.value,
            tempo: caminho.caminhoTempo.value,
            distancia: caminho.caminhoDistancia.value,
            tmpCarregamento: caminho.caminhoTmpCarregamento.value,
        };
    }

    public static toDomain(
        caminho: any | Model<ICaminhoPersistence & Document>
    ): Caminho {
        const roleOrError = Caminho.createWithId(caminho);

        roleOrError.isFailure ? console.log(roleOrError.error) : "";

        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }

    public static toPersistence(caminho: Caminho): any {

        return {
            id: caminho.id,
            armazemChegadaId: caminho.caminhoChegadaId,
            armazemPartidaId: caminho.caminhoArmazemPartidaId,
            energia: caminho.caminhoEnergia,
            tempo: caminho.caminhoTempo,
            distancia: caminho.caminhoDistancia,
            tmpCarregamento: caminho.caminhoTmpCarregamento,
        };
    }
}
