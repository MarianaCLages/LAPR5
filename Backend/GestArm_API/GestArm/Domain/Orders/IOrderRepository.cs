using GestArm.Domain.Shared;

namespace GestArm.Domain.Orders;

public interface IOrdersRepository : IRepository<Order, OrderId>
{
    Task<Order> GetByIdAsync(OrderId id);

    Task<List<Order>> GetByWarehouseIdAsync(string warehouseId);

    Task<List<Order>> GetByOrderDateAysnc(OrderDate warehouseId);

    Task<List<Order>> GetAllAsync();

    Task<string> GestNextIdAsync(DateTime orderDate);

    Task<Order> AddAsync(Order order);

    Task<Order> UpdateAsync(Order order);

    Task<bool> RemoveAsync(Order order);

    Task<bool> ExistsAsync(OrderId id);

    Task<int> GetCountAsync();

    Task<List<Order>> GetByFilterAsync(string warehouseId, DateTime data);
    
    Task<List<Order>> GetByFilterAsyncQuery(string warehouseId, string data);

    Task<Order> GetOrderByDomainIdAsync(string id);
}