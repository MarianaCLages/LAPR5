import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao/camiao";
import { CaractCamiao } from "../../domain/camiao/caractCamiao";
import {Result} from "../../core/logic/Result";
import {MatriculaCamiao} from "../../domain/camiao/matriculaCamiao";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface ICamiaoRepo extends Repo<Camiao> {
    save(camiao: Camiao): Promise<Camiao>;
    findByDomainId(caractCamiao: CaractCamiao | string): Promise<Camiao>; 
    update(camiao: Camiao): Promise<Result<Camiao>>;
    findByCaractCamiao(caractCam: string): Promise<Camiao>;
    getAllCamioes() : Promise<Result<Array<Camiao>>>;
    getByCaractAsync(caract: CaractCamiao | string): Promise<Result<Array<Camiao>>>;
    getByMatriculaAsync(matricula: MatriculaCamiao | string): Promise<Result<Array<Camiao>>>;
    deleteCamiao(domainId: UniqueEntityID | string): Promise<boolean>;
}