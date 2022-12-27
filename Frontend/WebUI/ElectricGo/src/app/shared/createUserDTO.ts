export class ICreateUserDTO{
  userName: string;
  role: string;
  email: string;
  phoneNumber : string;
  birthDate : string;


  constructor(userName : string, role : string, email : string, phoneNumber : string, birthDate : string) {

    this.userName = userName;
    this.role = role;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
  }
}
