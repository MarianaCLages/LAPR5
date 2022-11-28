export class ICreateWarehouseDTO{
  latitudeDegree : number;
  latitudeMinute : number;
  latitudeSecond : number;
  longitudeDregree: number;
  longitudeMinute : number;
  longitudeSecond: number;
  designation: string;
  street: string;
  doorNumber: number;
  postalCode: string;
  city: string;
  country: string;
  alphaNumId : string;

  constructor(latitudeDegree : number, latitudeMinute : number, latitudeSecond : number, longitudeDegree: number, longitudeMinute : number, longitudeSecond: number, designation: string, street: string, doorNumber: number, postalCode: string, city: string, country: string, alphaNumId : string) {
    this.latitudeDegree = latitudeDegree;
    this.latitudeMinute = latitudeMinute;
    this.latitudeSecond = latitudeSecond;
    this.longitudeDregree = longitudeDegree;
    this.longitudeMinute = longitudeMinute;
    this.longitudeSecond = longitudeSecond;
    this.designation = designation;
    this.street = street;
    this.doorNumber = doorNumber;
    this.postalCode = postalCode;
    this.city = city;
    this.country = country;
    this.alphaNumId = alphaNumId;
  }


}
