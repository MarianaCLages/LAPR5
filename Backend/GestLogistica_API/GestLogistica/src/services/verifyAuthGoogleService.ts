import { Inject, Service } from "typedi";
import IVerifyAuthService from "./IServices/IVerifyAuthService";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IAuthRepo from "./IRepos/IAuthRepo";
import IUserAuthDTO from "../dto/IUserAuthDTO";

@Service()
export default class VerifyAuthGoogleService implements IVerifyAuthService {

  constructor(
    @Inject(config.repos.auth.name) private authRepo: IAuthRepo
  ) {
  }

  async VerifyUserJWT(token: string, roleExpected: string[]): Promise<Result<IUserAuthDTO>> {
    try {
      if (token.startsWith("Bearer ")) {
        token = token.substring(7, token.length);
      }
      const user: Result<IUserAuthDTO> = await this.authRepo.verifyAuth(token);
      const role: Result<string> = await this.authRepo.verifyRole(user.getValue());

      if (!role.isSuccess) {
        return Result.fail("The user does not exist");
      } else {
        if (roleExpected.includes(role.getValue())) {
          return Result.ok();
        } else {
          return Result.fail("The user is not authorized");
        }
      }
    } catch (error) {
      return Result.fail("Not authorized");
    }
  }
}