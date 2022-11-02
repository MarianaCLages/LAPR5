import {Inject, Service} from "typedi";
import config from "../../config";
import {Caminho} from "../domain/caminho/caminho";
import ICaminhoRepo from "../services/IRepos/ICaminhoRepo";
import ICaminhoService from "./IServices/ICaminhoService";
import {Result} from "../core/logic/Result";
import ICaminhoDTO from "../dto/caminho/ICaminhoDTO";
import {CaminhoMap} from "../mappers/CaminhoMap";
import ICriarCaminhoDTO from "../dto/caminho/ICriarCaminhoDTO";
import {CaminhoId} from "../domain/caminho/caminhoId";
import IArmazemRepo from "../services/IRepos/IArmazemRepo";
import https = require("https");
import { CaminhoEnergia } from "../domain/caminho/caminhoEnergia";
import { CaminhoTempo } from "../domain/caminho/caminhoTempo";
import { CaminhoTmpCarregamento } from "../domain/caminho/caminhoTmpCarregamento";
import { CaminhoArmazemChegadaId } from "../domain/caminho/caminhoArmazemChegadaId";
import { CaminhoArmazemPartidaId } from "../domain/caminho/caminhoArmazemPartidaId";
import { CaminhoDistancia } from "../domain/caminho/caminhoDistancia";
import ICaminhoIdDto from "../dto/caminho/ICaminhoIdDto";


@Service()
export default class CaminhoService implements ICaminhoService {
    httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });

    constructor(
        @Inject(config.repos.caminho.name) private caminhoRepo: ICaminhoRepo,
        @Inject(config.repos.armazem.name) private armazemRepo: IArmazemRepo
    ) {
    }

    public async getCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>> {
        try {
            const caminho = await this.caminhoRepo.findByDomainId(caminhoDTO.id);

            if (caminho === null) {
                return Result.fail<ICaminhoDTO>("Caminho não foi encontrado!");
            } else {
                const caminhoDTOResult = CaminhoMap.toDTO(caminho);
                return Result.ok<ICaminhoDTO>(caminhoDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createCaminho(caminhoDTO: ICriarCaminhoDTO): Promise<Result<ICaminhoDTO>> {
        try {

            //check if armazem exists
            const armazemChegada = caminhoDTO.armazemChegadaId;
            const armazemPartida = caminhoDTO.armazemPartidaId;

            const armazemChegadaResult = await this.armazemRepo.exists(armazemChegada);
            const armazemPartidaResult = await this.armazemRepo.exists(armazemPartida);

            if (armazemChegadaResult === false) {
                return Result.fail<ICaminhoDTO>("Armazem de chegada não foi encontrado!");
            }

            if (armazemPartidaResult === false) {
                return Result.fail<ICaminhoDTO>("Armazem de partida não foi encontrado!");
            }
            const caminhoOrError = Caminho.create(caminhoDTO);


            if (caminhoOrError.isFailure) {
                return Result.fail<ICaminhoDTO>(caminhoOrError.errorValue());
            }

            const caminhoResult = caminhoOrError.getValue();

            await this.caminhoRepo.save(caminhoResult);


            const caminhoDTOResult = CaminhoMap.toDTO(caminhoResult);
            return Result.ok<ICaminhoDTO>(caminhoDTOResult);

        } catch (e) {
            console.debug(e.message);
            return Result.fail<ICaminhoDTO>(e.message);
        }

    }

    public async updateCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>> {

        const armazemChegada = caminhoDTO.armazemChegadaId;
        const armazemPartida = caminhoDTO.armazemPartidaId;

        const armazemChegadaResult = await this.armazemRepo.exists(armazemChegada);
        const armazemPartidaResult = await this.armazemRepo.exists(armazemPartida);

        if (armazemChegadaResult === false) {
            return Result.fail<ICaminhoDTO>("Armazem de chegada não foi encontrado!");
        }

        if (armazemPartidaResult === false) {
            return Result.fail<ICaminhoDTO>("Armazem de partida não foi encontrado!");
        }

        const caminho = await this.caminhoRepo.findByDomainId(caminhoDTO.id);

        if (caminho === null) return Result.fail<ICaminhoDTO>("O caminho não foi encontrado!");

        caminho.caminhoEnergia = CaminhoEnergia.create(caminhoDTO.energia).getValue();
        caminho.caminhoTempo = CaminhoTempo.create(caminhoDTO.tempo).getValue();
        caminho.caminhoTmpCarregamento = CaminhoTmpCarregamento.create(caminhoDTO.tmpCarregamento).getValue();
        caminho.caminhoDistancia = CaminhoDistancia.create(caminhoDTO.distancia).getValue();
        caminho.caminhoChegadaId = CaminhoArmazemChegadaId.create(caminhoDTO.armazemChegadaId).getValue();
        caminho.caminhoArmazemPartidaId = CaminhoArmazemPartidaId.create(caminhoDTO.armazemPartidaId).getValue();

        const caminhoUpdatedOrError = await this.caminhoRepo.update(caminho);
        const caminhoDTOResult = CaminhoMap.toDTO(caminhoUpdatedOrError.getValue());

        caminhoDTOResult.id = caminhoDTO.id;

        return Result.ok<ICaminhoDTO>(caminhoDTOResult);
    }

    public async getAllCaminhos() {
        const caminhos = await this.caminhoRepo.getAllCaminhos();
        const caminhosDTO = caminhos.map(caminho => CaminhoMap.toDTO(caminho));
        return caminhosDTO;
    }

  public async apagaCaminho(caminhoId: ICaminhoIdDto): Promise<Result<ICaminhoDTO>> {
    try {
      const caminho = await this.caminhoRepo.findByDomainId(caminhoId.id);
            if (caminho === null) {
                return Result.fail<ICaminhoDTO>("Caminho não foi encontrado! O id especificado não existe");
            } else {
                await this.caminhoRepo.delete(caminho);

                const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
                return Result.ok<ICaminhoDTO>(caminhoDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

}
