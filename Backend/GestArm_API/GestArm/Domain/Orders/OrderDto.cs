namespace GestArm.Domain.Orders;

public class OrderDto
{
    public OrderDto(OrderId id, string identifier, string orderDate, double orderMass,
        double chargingTime,
        double unloadingTime, string warehouseId)
    {
        Id = id;
        Identifier = identifier;
        OrderDate = orderDate;
        OrderMass = orderMass;
        ChargingTime = chargingTime;
        UnloadingTime = unloadingTime;
        WarehouseId = warehouseId;
    }

    public OrderId Id { get; set; }
    public string Identifier { get; set; }
    public string OrderDate { get; set; }
    public double OrderMass { get; set; }
    public double ChargingTime { get; set; }
    public double UnloadingTime { get; set; }
    public string WarehouseId { get; set; }
}