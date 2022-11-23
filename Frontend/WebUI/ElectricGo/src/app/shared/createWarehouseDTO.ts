export interface ICreateWarehouseDTO{
  alphaNumericId : string;
  latitudeDegree : number;
  latitudeMinutes : number;
  latitudeSeconds : number;
  longitudeDegree: number;
  longitudeMinutes : number;
  longitudeSeconds: number;
  designation: string;
  street: string;
  doorNumber: number;
  postalCode: string;
  city: string;
  country: string;
}
