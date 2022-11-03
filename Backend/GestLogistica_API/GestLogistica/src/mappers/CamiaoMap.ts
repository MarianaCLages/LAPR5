import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";

import {ICamiaoPersistence} from "../dataschema/ICamiaoPersistence";

import {ICamiaoDTO} from "../dto/camiao/ICamiaoDTO";
import {Camiao} from "../domain/camiao/camiao";

import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class CamiaoMap extends Mapper<Camiao> {
    public static toDTO(camiao: Camiao): ICamiaoDTO {
        return {
            id: camiao.id.toString(),
            caractCamiao: camiao.caractCamiao.value,
            matriculaCamiao: camiao.matriculaCamiao.value,
            tara: camiao.tara.value,
            capacidadeCarga: camiao.capacidadeCarga.value,
            cargaMax: camiao.cargaMax.value,
            cargaTotal: camiao.cargaTotal.value,
            tempoCarregamento: camiao.tempoCarregamento.value,
        };
    }

    public static toDomain(
        camiao: any | Model<ICamiaoPersistence & Document>
    ): Camiao {
        try {
            const roleOrError = Camiao.create(camiao, new UniqueEntityID(camiao.camiaoId));

            roleOrError.isFailure ? console.log(roleOrError.error) : "";
            return roleOrError.isSuccess ? roleOrError.getValue() : null;
        } catch (err) {
            console.log(err + " " + camiao + " " + camiao.camiaoId + "\n\n\b");
        }

    }

    public static toPersistence(camiao: Camiao): any {
        return {
            domainId: camiao.id.toString(),
            caractCamiao: camiao.caractCamiao.value,
            matriculaCamiao: camiao.matriculaCamiao.value,
            tara: camiao.tara.value,
            capacidadeCarga: camiao.capacidadeCarga.value,
            cargaMax: camiao.cargaMax.value,
            cargaTotal: camiao.cargaTotal.value,
            tempoCarregamento: camiao.tempoCarregamento.value,
        };

    }
}