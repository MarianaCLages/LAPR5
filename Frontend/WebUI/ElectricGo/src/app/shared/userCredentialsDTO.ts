export class IUserCredentialsDTO{
  role: string;
  email: string;
  userName: string;


  constructor(userName : string, role : string, email : string) {
    this.userName = userName;
    this.role = role;
    this.email = email;

  }
}
