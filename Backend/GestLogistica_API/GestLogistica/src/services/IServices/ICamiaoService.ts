import { Result } from "../../core/logic/Result";
import {ICamiaoDTO} from '../../dto/camiao/ICamiaoDTO';
import { ICriarCamiaoDTO } from "../../dto/camiao/ICriarCamiaoDTO";
import ICamiaoCaractDTO from "../../dto/camiao/ICamiaoCaractDTO";
import ICamiaoMatriculaDTO from "../../dto/camiao/ICamiaoMatriculaDTO";

export default interface ICamiaoService {
    createCamiao(camiaoDTO: ICriarCamiaoDTO): Promise<Result<ICamiaoDTO>>;
    updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    getAllCamioes() : Promise<Result<Array<ICamiaoDTO>>>;
    getByCaract(caract: ICamiaoCaractDTO): Promise<Result<Array<ICamiaoDTO>>>;
    getByMatricula(matricula: ICamiaoMatriculaDTO): Promise<Result<Array<ICamiaoDTO>>>;
    deleteCamiao(camiaoId: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
}