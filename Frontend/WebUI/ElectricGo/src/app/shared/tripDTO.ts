export default interface ITripDTO {
  tripIdentifier: string,
  tripTruck: string,
  tripDay: string,
  tripWarehouses: Array<string>,
  tripOrders: [{
    warehouse: string,
    order: string[]
  }]
}
