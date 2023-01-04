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
    console.log(role);
    if (role.status === 200) {
      const json = await role.json();
      console.log(json);
      return Result.ok(json.role);
    } else {
      return Result.fail(role.body);
    }
    /*
    return await fetch(config.userRepoAPIAddress + user.email,
      {
        method: "get",
        agent: this.httpsAgent
      }).then(response => {
      response.json();
    }).then(json => {
      console.log(JSON.stringify(json));
      return Result.ok(json);
    }).catch(err => {
      console.log(err);
      return Result.fail(err);
    });*/
  }

}
/*
return await fetch(config.userRepoAPIAddress + user.email,
  {
    method: "get",
    agent: this.httpsAgent
  }).then(response => {
  if (response.status === 200) {
    return (Result.ok(response.json()));
  } else {
    return (Result.fail(response.statusText));
  }
});*/
