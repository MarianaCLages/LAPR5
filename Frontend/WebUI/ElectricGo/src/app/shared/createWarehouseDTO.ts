export interface ICreateWarehouseDTO{
  latitudeDegree : number;
  latitudeMinute : number;
  latitudeSecond : number;
  longitudeDegree: number;
  longitudeMinute : number;
  longitudeSecond: number;
  designation: string;
  street: string;
  doorNumber: number;
  postalCode: string;
  city: string;
  country: string;
  alphaNumId : string;
}
