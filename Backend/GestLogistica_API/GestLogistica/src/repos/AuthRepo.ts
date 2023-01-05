import { Service } from "typedi";
import IAuthRepo from "../services/IRepos/IAuthRepo";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IUserAuthDTO from "../dto/IUserAuthDTO";
import * as https from "https";

const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");


@Service()
export default class AuthRepo implements IAuthRepo {
  httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });

  async verifyAuth(token: string): Promise<Result<IUserAuthDTO>> {
    return new Promise((resolve, reject) => {
      const clientId = config.jwtSecret;
      jwt.verify(token, clientId, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(Result.ok(decoded));
        }
      });
    });
  }

  async verifyRole(user: IUserAuthDTO): Promise<Result<string>> {
    const role = await fetch(config.userRepoAPIAddress + user.email,
      {
        method: "get",
        agent: this.httpsAgent
      });
    if (role.status === 200) {
      const json = await role.json();
      return Result.ok(json.role);
    } else {
      return Result.fail(role.body);
    }
  }
}
