using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

public interface IWarehouseRepository : IRepository<Warehouse, WarehouseId>
{
    Task<Warehouse> GetByIdAsync(WarehouseId id);

    Task<List<Warehouse>> GetAllAsync();

    Task<List<Warehouse>> GetByDesignationAsync(DesignationWarehouse designation);

    Task<List<Warehouse>> GetAllAsync(int page, int size);

    Task<Warehouse> AddAsync(Warehouse warehouse);

    Task<Warehouse> UpdateAsync(Warehouse warehouse);


    //Task<Warehouse> GetByAlphaNumIdAsync(AlphaId id);

    Task<bool> RemoveAsync(Warehouse warehouse);

    Task<bool> ExistsAsync(WarehouseId id);

    Task<int> GetCountAsync();

    Task<Warehouse> GetByWarehouseIdAsync(AlphaId warehouseId);

}