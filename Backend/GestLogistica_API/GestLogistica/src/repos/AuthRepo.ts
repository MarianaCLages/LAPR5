import * as https from "https";

import IAuthRepo from "../services/IRepos/IAuthRepo";
import IUserAuthDTO from "../dto/IUserAuthDTO";
import { Result } from "../core/logic/Result";
import { Service } from "typedi";
import config from "../../config";

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

    var token =  await config.jwtTokenClient;

    const role = await fetch(config.userRepoAPIAddress + user.email,
      {
        method: "get",
        agent: this.httpsAgent,
        headers: {
          'Authorization': token,
        }
      });

    if (role.status === 200) {
      const json = await role.json();
      return Result.ok(json.role);
    } else {
      return Result.fail(role.body);
    }
  }
}
