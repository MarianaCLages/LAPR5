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
import ICamiaoCaractDTO from "../dto/camiao/ICamiaoCaractDTO";

@Service()
export default class CamiaoService implements ICamiaoService {
    constructor(
        @Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo
    ) {
    }

    public async createCamiao(camiaoDTO: ICriarCamiaoDTO): Promise<Result<ICamiaoDTO>> {

        try {
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

    public async getByCaract(caract: ICamiaoCaractDTO): Promise<Result<Array<ICamiaoDTO>>> {
        try {
            const camiao = await this.camiaoRepo.getByCaractAsync(caract.caractCamiao);

            if (camiao === null) {
                return Result.fail("Camião não encontrado!");
            } else {
                const camioesDTO = camiao.getValue().map(cam => CamiaoMap.toDTO(cam));
                return Result.ok(camioesDTO);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllCamioes() : Promise<Result<Array<ICamiaoDTO>>> {
        const camioes = await this.camiaoRepo.getAllCamioes();

        const camioesDTO = camioes.getValue().map(cam => CamiaoMap.toDTO(cam));
        return Result.ok(camioesDTO);
    }

    public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {

        const camiao = await this.camiaoRepo.findByCaractCamiao(camiaoDTO.caractCamiao);

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