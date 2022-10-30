import { Service, Inject } from "typedi";
import config from "../../config";
import { Caminho } from "../domain/caminho/caminho";
import ICaminhoRepo from "../services/IRepos/ICaminhoRepo";
import ICaminhoService from "./IServices/ICaminhoService";
import { Result } from "../core/logic/Result";
import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";
import { CaminhoMap } from "../mappers/CaminhoMap";
import ICriarCaminhoDTO from "../dto/caminho/ICriarCaminhoDTO";
import { CaminhoId } from "../domain/caminho/caminhoId";

@Service()
export default class CaminhoService implements ICaminhoService {
  constructor(
    @Inject(config.repos.caminho.name) private caminhoRepo: ICaminhoRepo
  ) {}

  public async getCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>> {
    try {
      const caminho = await this.caminhoRepo.findByDomainId(caminhoDTO.id);

      if (caminho === null) {
        return Result.fail<ICaminhoDTO>("Caminho não foi encontrado!");
      } else {
        const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
        return Result.ok<ICaminhoDTO>(caminhoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createCaminho(caminhoDTO:ICriarCaminhoDTO): Promise<Result<ICaminhoDTO>> {
    try {
      const caminhoOrError = await Caminho.create(caminhoDTO);

      if (caminhoOrError.isFailure) {
        return Result.fail<ICaminhoDTO>(caminhoOrError.errorValue());
      }

      const caminhoResult = caminhoOrError.getValue();

      await this.caminhoRepo.save(caminhoResult);

      const caminhoDTOResult = CaminhoMap.toDTO(caminhoResult) as ICaminhoDTO;
      return Result.ok<ICaminhoDTO>(caminhoDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>> {
    try {
      const caminho = await this.caminhoRepo.findByDomainId(caminhoDTO.id);

      if (caminho === null) {
        return Result.fail<ICaminhoDTO>("Caminho não foi encontrado! O id especificado não existe");
      } else {

        await this.caminhoRepo.save(caminho);

        const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
        return Result.ok<ICaminhoDTO>(caminhoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async apagaCaminho(caminhoId : CaminhoId): Promise<Result<ICaminhoDTO>> {
    try {
      const caminho = await this.caminhoRepo.findByDomainId(caminhoId);

      if (caminho === null) {
        return Result.fail<ICaminhoDTO>("Caminho não foi encontrado! O id especificado não existe");
      } else {

        await this.caminhoRepo.delete(caminho.caminhoId);

        const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
        return Result.ok<ICaminhoDTO>(caminhoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

}
