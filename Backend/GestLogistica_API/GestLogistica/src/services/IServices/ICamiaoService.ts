import { Result } from "../../core/logic/Result";
import {ICamiaoDTO} from '../../dto/camiao/ICamiaoDTO';
import { ICriarCamiaoDTO } from "../../dto/camiao/ICriarCamiaoDTO";

export default interface ICamiaoService {
    createCamiao(camiaoDTO: ICriarCamiaoDTO): Promise<Result<ICamiaoDTO>>;
    updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    getCamiao (camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    getAllCamioes() : Promise<Result<Array<ICamiaoDTO>>>;
}