export class IUserInfoDTO{
  exists: boolean;
  valid: boolean;
  role: string;

  constructor(exists : boolean, valid : boolean, role : string) {
    this.exists = exists;
    this.valid = valid;
    this.role = role;
  }
}
