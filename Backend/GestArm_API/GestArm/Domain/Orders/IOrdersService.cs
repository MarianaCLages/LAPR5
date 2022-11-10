namespace GestArm.Domain.Orders;

public interface IOrdersService
{
    Task<List<OrderDto>> GetByFiltering(string warehouseId, DateTime data);
    
    Task<List<OrderDto>> GetByFilterAsyncQuery(string warehouseId, string data);

    Task<OrderDto> GetByIdAsync(OrderId id);

    Task<List<OrderDto>> GetByWarehouseIdAsync(string warehouseId);

    Task<List<OrderDto>> GetByOrderDateAysnc(DateTime data);

    Task<OrderDto> AddAsync(CreatingOrderDto dto);
    Task<bool> RemoveAsync(OrderId id);

    Task<OrderDto> UpdateAsync(OrderId id, CreatingOrderDto dto);
    Task<List<OrderDto>> GetAllAsync();

    Task<OrderDto> GetOrderByDomainIdAsync(string nextID, string data);
}