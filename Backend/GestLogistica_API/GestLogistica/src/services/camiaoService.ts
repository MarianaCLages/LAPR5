import {Inject, Service} from "typedi";
import config from "../../config";

import ICamiaoService from "../services/IServices/ICamiaoService";
import {ICamiaoDTO} from "../dto/camiao/ICamiaoDTO";
import {Camiao} from "../domain/camiao/camiao";
import {CamiaoMap} from "../mappers/CamiaoMap";

import {Result} from "../core/logic/Result";
import ICamiaoRepo from "./IRepos/ICamiaoRepo";
import {ICriarCamiaoDTO} from "../dto/camiao/ICriarCamiaoDTO";
import {CapacidadeCarga} from "../domain/camiao/capacidadeCarga";
import {CargaMaxima} from "../domain/camiao/cargaMaxima";
import {MatriculaCamiao} from "../domain/camiao/matriculaCamiao";
import {Tara} from "../domain/camiao/tara";
import {TempoCarregamento} from "../domain/camiao/tempoCarregamento";

@Service()
export default class CamiaoService implements ICamiaoService {
    constructor(
        @Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo
    ) {
    }

    public async createCamiao(camiaoDTO: ICriarCamiaoDTO): Promise<Result<ICamiaoDTO>> {

        try {
            // not allow duplicate matriculaCamiao
            const camiao = await this.camiaoRepo.findByMatriculaCamiao(camiaoDTO.matriculaCamiao);
            if (camiao !== null) {
                return Result.fail<ICamiaoDTO>("Matricula Camiao já existe");
            }
            const camiaoOrError = await Camiao.create(camiaoDTO);
            if (camiaoOrError.isFailure) {
                return Result.fail<ICamiaoDTO>(camiaoOrError.errorValue());
            }
            const camiaoResult = camiaoOrError.getValue();
            await this.camiaoRepo.save(camiaoResult);
            const camiaoDTOResult = CamiaoMap.toDTO(camiaoResult) as ICamiaoDTO;
            return Result.ok<ICamiaoDTO>(camiaoDTOResult);
        } catch (e) {
            console.debug(e.message + " " + e.stack + " " + e.name);
            throw e;
        }
    }

    public async getCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        throw new Error("Method not implemented.");
    }

    public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {

        const camiao = await this.camiaoRepo.findByDomainId(camiaoDTO.caractCamiao);

        if (camiao === null) {
            return Result.fail<ICamiaoDTO>("Camiao não existe");
        }

        camiao.capacidadeCarga = CapacidadeCarga.create(camiaoDTO.capacidadeCarga).getValue();
        camiao.cargaMax = CargaMaxima.create(camiaoDTO.cargaMax).getValue();
        camiao.matriculaCamiao = MatriculaCamiao.create(camiaoDTO.matriculaCamiao).getValue();
        camiao.tara = Tara.create(camiaoDTO.tara).getValue();
        camiao.tempoCarregamento = TempoCarregamento.create(camiaoDTO.tempoCarregamento).getValue();

        const camiaoUpdateError = await this.camiaoRepo.update(camiao);
        const camiaoDTOResult = CamiaoMap.toDTO(camiaoUpdateError.getValue());

        return Result.ok<ICamiaoDTO>(camiaoDTOResult);

    }
}