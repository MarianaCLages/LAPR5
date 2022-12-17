namespace GestArm.Domain.Warehouses;

public interface IWarehouseService
{
    Task<ActivatedWarehouseDTO> GetByIdAsync(WarehouseId id);

    //Task<WarehouseDTO> GetByAlphaNumIdAsync(AlphaId id);

    Task<List<ActivatedWarehouseDTO>> GetByDesignationAsync(string designation);

    Task<List<ActivatedWarehouseDTO>> GetAllAsync();

    Task<WarehouseDTO> AddAsync(CreatingWarehouseDto dto);

    Task<WarehouseDTO> UpdateAsync(WarehouseDTO dto);

    Task<bool> DeleteAsync(WarehouseId id);

    Task<ActivatedWarehouseDTO> GetByWarehouseIdAsync(string warehouseId);

    Task<bool> DesactivateWarehouseAsync(ActivatedWarehouseDTO dto);
    
    Task<bool> ActivateWarehouseAsync(ActivatedWarehouseDTO dto);
}