import { Result } from "../../core/logic/Result";
import ICaminhoDTO from "../../dto/caminho/ICaminhoDTO";

export default interface ICaminhoService  {
  createCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
  updateCaminho(caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;

  getCaminho (caminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
}
