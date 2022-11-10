namespace GestArm.Domain.Orders;

public class CreatingOrderDto
{
    public CreatingOrderDto(string orderDate, float orderMass, int chargingTime, int unloadingTime,
        string warehouseId)
    {
        OrderDate = orderDate;
        OrderMass = orderMass;
        ChargingTime = chargingTime;
        UnloadingTime = unloadingTime;
        WarehouseId = warehouseId;
    }

    public string OrderDate { get; }
    public float OrderMass { get; }
    public int ChargingTime { get; }
    public int UnloadingTime { get; }
    public string WarehouseId { get; }
}