import {Repo} from "../../core/infra/Repo";

export default interface IArmazemRepo extends Repo<any> {
    exists(armazemId: string): Promise<boolean>;
}