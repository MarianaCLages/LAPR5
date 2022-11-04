import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao/camiao";
import { CaractCamiao } from "../../domain/camiao/caractCamiao";
import {Result} from "../../core/logic/Result";

export default interface ICamiaoRepo extends Repo<Camiao> {
    findByMatriculaCamiao(matriculaCamiao: string): Promise<Result<Camiao>>;
    save(camiao: Camiao): Promise<Camiao>;
    //findByDomainId(caractCamiao: CaractCamiao | string): Promise<Camiao>; 
    update(camiao: Camiao): Promise<Result<Camiao>>;
    findByCaractCamiao(caractCam: string): Promise<Camiao>;
}