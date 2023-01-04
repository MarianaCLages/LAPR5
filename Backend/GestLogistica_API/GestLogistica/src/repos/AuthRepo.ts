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

  verifyRole(user: IUserAuthDTO): Promise<Result<string>> {
    return new Promise(async (resolve, reject) => {
      await fetch(config.userRepoAPIAddress + user.email,
        {
          method: "get",
          agent: this.httpsAgent
        }).then(response => {
        if (response.status === 200) {
          resolve(Result.ok(response.json()));
        } else {
          resolve(Result.fail(response.statusText));
        }
      })
    });
  }
}