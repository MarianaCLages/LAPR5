using GestArm.Domain.Warehouses;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Orders;

public class OrdersService : IOrdersService
{
    private readonly IOrdersRepository _repository;
    private readonly IWarehouseRepository _repositoryWarehouse;

    public OrdersService(IOrdersRepository repository, IWarehouseRepository warehouseRepository)
    {
        _repository = repository;
        _repositoryWarehouse = warehouseRepository;
    }

    public async Task<OrderDto> GetByIdAsync(OrderId id)
    {
        var order = await _repository.GetByIdAsync(id);

        return new OrderDto(order.Id, order.OrderDomainId.ToString(), order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId);
    }


    public async Task<OrderDto> AddAsync(CreatingOrderDto dto)
    {
        var verifiy = await _repositoryWarehouse.GetByWarehouseIdAsync(new AlphaId(dto.WarehouseId));

        if (verifiy == null)
            throw new BusinessRuleValidationException("There is no warehouse with the specified ID!");

        var nextId = _repository.GestNextIdAsync(DateTime.Parse(dto.OrderDate));
        
        if (DateTime.Parse(dto.OrderDate) < DateTime.Now) throw new BusinessRuleValidationException("Invalid order date! (The order date must be after today's date)");
            
            var order = new Order(
            new OrderDomainId(nextId.Result, new OrderDate(DateTime.Parse(dto.OrderDate)).ToString("yyMMdd")),
            new OrderDate(DateTime.Parse(dto.OrderDate)), new OrderMass(dto.OrderMass),
            new TimeOrder(dto.ChargingTime), new TimeOrder(dto.UnloadingTime),
            dto.WarehouseId);

        await _repository.AddAsync(order);

        return new OrderDto(order.Id, order.OrderDomainId.ToString(), order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId);
    }

    public async Task<OrderDto> UpdateAsync(OrderId id, CreatingOrderDto dto)
    {
        var order = await _repository.GetByIdAsync(id);

        order.ChangeOrderDate(new OrderDate(DateTime.Parse(dto.OrderDate)));
        order.ChangeChargingTime(new TimeOrder(dto.ChargingTime));
        order.ChangeUnloadingTime(new TimeOrder(dto.UnloadingTime));
        order.ChangeOrderMass(new OrderMass(dto.OrderMass));
        order.ChangeWarehouseId(dto.WarehouseId);

        await _repository.UpdateAsync(order);

        return new OrderDto(order.Id, order.OrderDomainId.ToString(), order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId);
    }
    public async Task<bool> RemoveAsync(OrderId id)
    {
        var order = await _repository.GetByIdAsync(id);

        await _repository.RemoveAsync(order);

        return true;
    }
    public Task<List<OrderDto>> GetAllAsync()
    {
        var orders = _repository.GetAllAsync();

        var orderListDto = orders.Result.Select(order => new OrderDto(order.Id,
            order.OrderDomainId.ToString(), order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId)).ToList();

        return Task.FromResult(orderListDto);
    }

    public async Task<List<OrderDto>> GetByWarehouseIdAsync(string warehouseId)
    {
        var orders = await _repository.GetByWarehouseIdAsync(warehouseId);

        return orders.Select(order => new OrderDto(order.Id, order.OrderDomainId.ToString(),
            order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId)).ToList();
    }

    public async Task<List<OrderDto>> GetByOrderDateAysnc(DateTime data)
    {
        var orders = await _repository.GetByOrderDateAysnc(new OrderDate(data));

        return orders.Select(order => new OrderDto(order.Id, order.OrderDomainId.ToString(),
            order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId)).ToList();
    }

    public async Task<List<OrderDto>> GetByFilterAsyncQuery(string warehouseId, string data)
    {
        var orders = await _repository.GetByFilterAsyncQuery(warehouseId, data);

        return orders.Select(order => new OrderDto(order.Id, order.OrderDomainId.ToString(),
            order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId)).ToList();
    }

    public async Task<List<OrderDto>> GetByFiltering(string warehouseId, DateTime data)
    {
        var orders = await _repository.GetByFilterAsync(warehouseId, data);

        return orders.Select(order => new OrderDto(order.Id, order.OrderDomainId.ToString(),
            order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId)).ToList();
    }

    public async Task<List<OrderDto>> GetOrderByDomainIdAsync(string data, string next)
    {

        data = data.Replace("-", "");

        var sum = data + '/' + next;

        var order =
            await _repository.GetOrderByDomainIdAsync(sum);

        var orderDto = new OrderDto(order.Id, order.OrderDomainId.ToString(), order.OrderDate.ToString(),
            order.OrderMass.ToDouble(),
            order.ChargingTime.ToDouble(), order.UnloadingTime.ToDouble(), order.WarehouseId);
        
        List<OrderDto> list = new List<OrderDto>();
        
        list.Add(orderDto);

        return list;
    }
}