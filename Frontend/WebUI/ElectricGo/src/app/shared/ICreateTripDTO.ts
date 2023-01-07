export class ICreateTripDTO{
  truck: string[];
  date: string

  constructor(truck: string[],date: string) {
    this.truck= truck;
    this.date = date;
  }
}
