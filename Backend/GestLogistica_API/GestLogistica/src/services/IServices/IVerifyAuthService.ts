import { Result } from "../../core/logic/Result";
import IUserAuthDTO from "../../dto/IUserAuthDTO";

export default interface IVerifyAuthService {
  VerifyUserJWT(token: string, role: string[]): Promise<Result<IUserAuthDTO>>;
}