export interface ITruckPersistence {
    id : string;
    caractTruck : string;
    truckPlate : string;
    weightCapacity : number;
    maxLoadAutonomy : number;
    totalBatCharge : number;
    tare : number;
    chargingTime : number;
    activeTruck : boolean;
}