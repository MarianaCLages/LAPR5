namespace GestArm.Domain.Warehouses;

public interface IWarehouseService
{
    Task<WarehouseDTO> GetByIdAsync(WarehouseId id);

    //Task<WarehouseDTO> GetByAlphaNumIdAsync(AlphaId id);

    Task<List<WarehouseDTO>> GetByDesignationAsync(string designation);

    Task<List<WarehouseDTO>> GetAllAsync();

    Task<WarehouseDTO> AddAsync(CreatingWarehouseDto dto);

    Task<WarehouseDTO> UpdateAsync(WarehouseDTO dto);

    Task<bool> DeleteAsync(WarehouseId id);

    Task<WarehouseDTO> GetByWarehouseIdAsync(string warehouseId);
}