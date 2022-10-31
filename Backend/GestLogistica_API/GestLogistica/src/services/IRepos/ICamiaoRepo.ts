import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao/camiao";

export default interface ICamiaoRepo extends Repo<Camiao> {
    save(camiao: Camiao): Promise<Camiao>;
}