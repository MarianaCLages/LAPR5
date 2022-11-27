export interface ICreateOrderDTO {
    orderId: string;
    orderDate: Date;
    orderMass: number;
    chargingTime: number;
    unloadingTime: number;
    warehouseId: number;
}
  