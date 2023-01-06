export class ICreateTripDTO{
  tripIdentifier: string;
  tripTruck: string;
  tripDay: string;
  tripWarehouses: string;
  tripOrders: string;


  constructor(tripIdentifier : string, tripTruck : string, tripDay : string, tripWarehouses : string, tripOrders : string) {

    this.tripIdentifier = tripIdentifier;
    this.tripTruck = tripTruck;
    this.tripDay = tripDay;
    this.tripWarehouses = tripWarehouses;
    this.tripOrders = tripOrders;
  }
}
