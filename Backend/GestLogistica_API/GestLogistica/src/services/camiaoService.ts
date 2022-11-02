import { Service, Inject } from "typedi";
import config from "../../config";

import ICamiaoService from "../services/IServices/ICamiaoService";
import { ICamiaoDTO } from "../dto/camiao/ICamiaoDTO";
import { Camiao } from "../domain/camiao/camiao";
import { CamiaoMap } from "../mappers/CamiaoMap";

import { Result } from "../core/logic/Result";
import ICamiaoRepo from "./IRepos/ICamiaoRepo";
import { ICriarCamiaoDTO } from "../dto/camiao/ICriarCamiaoDTO";

@Service()
export default class CamiaoService implements ICamiaoService {
    constructor(
        @Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo
    ) {}

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
        }
        catch (e) {
            throw e;
        }
    }

    public async getCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        throw new Error("Method not implemented.");
    }

    public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        throw new Error("Method not implemented.");
    }
}