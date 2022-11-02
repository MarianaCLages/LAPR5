import { Result } from "../../core/logic/Result";
import ICaminhoDTO from "../../dto/caminho/ICaminhoDTO";
import ICriarCaminhoDTO from "../../dto/caminho/ICriarCaminhoDTO";
import ICaminhoIdDto from "../../dto/caminho/ICaminhoIdDto";

export default interface ICaminhoService  {
  createCaminho(caminhoDTO: ICriarCaminhoDTO): Promise<Result<ICaminhoDTO>>;
  updateCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  getCaminho (caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  getAllCaminhos();
  apagaCaminho(caminhoId : ICaminhoIdDto): Promise<Result<ICaminhoDTO>>;
}
