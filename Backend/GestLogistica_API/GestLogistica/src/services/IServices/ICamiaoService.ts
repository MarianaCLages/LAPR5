import { Result } from "../../core/logic/Result";
import {ICamiaoDTO} from '../../dto/camiao/ICamiaoDTO';
import { ICriarCamiaoDTO } from "../../dto/camiao/ICriarCamiaoDTO";
import { CaractCamiao } from "../../domain/camiao/caractCamiao";

export default interface ICamiaoService {
    createCamiao(camiaoDTO: ICriarCamiaoDTO): Promise<Result<ICamiaoDTO>>;
    updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    
    getCamiao (camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
}