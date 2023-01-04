import { Result } from "../../core/logic/Result";
import IUserAuthDTO from "../../dto/IUserAuthDTO";

export default interface IAuthRepo {
  verifyAuth(token: string): Promise<Result<IUserAuthDTO>>;

  verifyRole(user: IUserAuthDTO): Promise<Result<string>>;
}