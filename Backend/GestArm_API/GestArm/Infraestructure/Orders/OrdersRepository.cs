using GestArm.Domain.Orders;
using GestArm.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestArm.Infrastructure.Orders;

public class OrdersRepository : BaseRepository<Order, OrderId>, IOrdersRepository
{
    //db context
    private readonly GestArmDbContext _context;

    public OrdersRepository(GestArmDbContext context) : base(context.Orders)
    {
        _context = context;
    }

    public async Task<Order> UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<bool> RemoveAsync(Order order)
    {
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<bool> ExistsAsync(OrderId id)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetCountAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<string> GestNextIdAsync(DateTime data)
    {
        var nextId = _context.Orders.Where(var => var.OrderDate.Data.Equals(data.Date)).ToList().Count + 1;
        return nextId.ToString();
    }

    public async Task<Order> AddAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<List<Order>> GetByWarehouseIdAsync(string warehouseId)
    {
        return await _context.Orders.Where(u => u.WarehouseId.Equals(warehouseId)).ToListAsync();
    }

    public async Task<List<Order>> GetByOrderDateAysnc(DateTime date)
    {
        return await _context.Orders.Where(u => u.OrderDate.Data.Equals(date)).ToListAsync();
    }

    public async Task<List<Order>> GetByFilterAsync(string warehouseId, DateTime data)
    {
        return await _context.Orders.Where(u => u.OrderDate.Data.Equals(data) && u.WarehouseId.Equals(warehouseId))
            .ToListAsync();
    }
    
    public async Task<List<Order>> GetByFilterAsyncQuery(string warehouseId, string data)
    {
        DateTime dataT = DateTime.Parse(data);
        
        return await _context.Orders.Where(u => u.OrderDate.Data.Equals(dataT) && u.WarehouseId.Equals(warehouseId))
            .ToListAsync();
    }

    public async Task<Order> GetOrderByDomainIdAsync(string id)
    {
        return await _context.Orders.Where(u => u.OrderDomainId._id.Equals(id))
            .FirstOrDefaultAsync();
    }
    
}