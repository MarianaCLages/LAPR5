export default interface ITripDTO {
  domainId: string,
  tripIdentifier: string,
  tripTruck: string,
  tripDay: string,
  tripWarehouses: Array<string>,
  tripOrders: Array<string>
}