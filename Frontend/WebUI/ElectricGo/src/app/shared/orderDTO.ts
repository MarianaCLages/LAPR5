export default interface IOrderDTO {
    identifier: string;
    orderDate: Date;
    orderMass: number;
    chargingTime: number;
    unloadingTime: number;
    warehouseId: number;
}