namespace GestArm.Domain.Orders;

//Método para os testes
public class OrderDtoParser
{
    public static OrderDto convertToDto(Order order)
    {
        return new OrderDto(order.Id, order.OrderDomainId.ToString(), order.OrderDate.ToString(),
            order.OrderMass.Mass, order.ChargingTime.Minutes,
            order.UnloadingTime.Minutes, order.WarehouseId);
    }
}