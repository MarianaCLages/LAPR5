export default interface IUserAuthDTO {
  unique_name: string,
  email: string,
  nbf: number,
  exp: number,
  iat: number
}