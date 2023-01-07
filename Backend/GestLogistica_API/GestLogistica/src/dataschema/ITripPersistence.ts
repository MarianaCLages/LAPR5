export interface ITripPersistence {
    id : string;
    tripIdentifier : string;
    tripTruck : string;
    tripDay : string;
    tripWarehouses : string[];
    tripOrders: [{
        warehouse: string,
        order: string[]
    }]
}