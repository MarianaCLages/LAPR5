import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from "mongoose";

import { ICamiaoPersistence } from "../dataschema/ICamiaoPersistence";

import { ICamiaoDTO } from "../dto/camiao/ICamiaoDTO";
import { Camiao } from "../domain/camiao/camiao";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class CamiaoMap extends Mapper<Camiao> {
    public static toDTO(camiao: Camiao): ICamiaoDTO {
        return {
            id: camiao.id.toString(),
            caractCamiao: camiao.caractCamiao.toString(),
            matriculaCamiao: camiao.matriculaCamiao.toString(),
            tara: camiao.tara.toString(),
            capacidadeCarga: camiao.capacidadeCarga.toString(),
            cargaMax: camiao.cargaMax.toString(),
            cargaTotal: camiao.cargaTotal.toString(),
            tempoCarregamento: camiao.tempoCarregamento.toString(),
        };
    }

    public static toDomain(
        camiao: any | Model<ICamiaoPersistence & Document>
    ): Camiao {
        const roleOrError = Camiao.create(camiao, new UniqueEntityID(camiao.camiaoId));

        roleOrError.isFailure ? console.log(roleOrError.error) : "";
        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }

    public static toPersistence(camiao: Camiao): any {
        return {
            id: camiao.id,
            caractCamiao: camiao.caractCamiao,
            matriculaCamiao: camiao.matriculaCamiao,
            tara: camiao.tara,
            capacidadeCarga: camiao.capacidadeCarga,
            cargaMax: camiao.cargaMax,
            cargaTotal: camiao.cargaTotal,
            tempoCarregamento: camiao.tempoCarregamento,
        };
    }
}