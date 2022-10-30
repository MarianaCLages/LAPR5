import { Result } from "../../core/logic/Result";
import ICaminhoDTO from "../../dto/caminho/ICaminhoDTO";
import ICriarCaminhoDTO from "../../dto/caminho/ICriarCaminhoDTO";
import { CaminhoId } from "../../domain/caminho/caminhoId";

export default interface ICaminhoService  {
  createCaminho(caminhoDTO: ICriarCaminhoDTO): Promise<Result<ICaminhoDTO>>;
  updateCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  getCaminho (caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  apagaCaminho(caminhoId : CaminhoId): Promise<Result<ICaminhoDTO>>;
}
