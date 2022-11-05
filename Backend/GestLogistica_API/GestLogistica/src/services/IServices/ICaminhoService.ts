import { Result } from "../../core/logic/Result";
import ICaminhoDTO from "../../dto/caminho/ICaminhoDTO";
import ICriarCaminhoDTO from "../../dto/caminho/ICriarCaminhoDTO";
import ICaminhoIdDto from "../../dto/caminho/ICaminhoIdDto";
import ICaminhoArmazemPartidaIdDTO from "../../dto/caminho/ICaminhoArmazemPartidaIdDTO";
import ICaminhoArmazemChegadaIdDTO from "../../dto/caminho/ICaminhoArmazemChegadaIdDTO";

export default interface ICaminhoService  {
  createCaminho(caminhoDTO: ICriarCaminhoDTO): Promise<Result<ICaminhoDTO>>;
  updateCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  getCaminho (caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  getAllCaminhos(): Promise<Result<ICaminhoDTO[]>>;
  getByArmazemPartidaId(armazemPartidaId: ICaminhoArmazemPartidaIdDTO): Promise<Result<ICaminhoDTO[]>>;
  getByArmazemChegadaId(armazemChegadaId: ICaminhoArmazemChegadaIdDTO): Promise<Result<ICaminhoDTO[]>>;
  apagaCaminho(caminhoId : ICaminhoIdDto): Promise<Result<ICaminhoDTO>>;
}
