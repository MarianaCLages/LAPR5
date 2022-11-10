namespace GestArm.Domain.Warehouses;

public class WarehouseService : IWarehouseService
{
    private readonly IWarehouseRepository _repository;

    public WarehouseService(IWarehouseRepository repository)
    {
        _repository = repository;
    }

    public async Task<WarehouseDTO> GetByIdAsync(WarehouseId id)
    {
        var warehouse = await _repository.GetByIdAsync(id);

        if (warehouse == null) return null;

        return new WarehouseDTO(warehouse.Id.AsGuid(), warehouse.Latitude.Degrees, warehouse.Latitude.Minutes,
            warehouse.Latitude.Seconds,
            warehouse.Longitude.Degrees, warehouse.Longitude.Minutes, warehouse.Longitude.Seconds,
            warehouse.Designation.Designation, warehouse.Address.Street, warehouse.Address.DoorNumber,
            warehouse.Address.PostalCode, warehouse.Address.City, warehouse.Address.Country,
            warehouse.AlphaNumId.AlphaNumId);
    }

    public async Task<List<WarehouseDTO>> GetByDesignationAsync(string designation)
    {
        var list = await _repository.GetByDesignationAsync(new DesignationWarehouse(designation));

        if (list.Count == 0)
        {
            return null;
        }

        var listDto = list.ConvertAll(arm =>
            new WarehouseDTO(arm.Id.AsGuid(), arm.Latitude.Degrees, arm.Latitude.Minutes, arm.Latitude.Seconds,
                arm.Longitude.Degrees,
                arm.Longitude.Minutes, arm.Longitude.Seconds, arm.Designation.Designation, arm.Address.Street,
                arm.Address.DoorNumber, arm.Address.PostalCode, arm.Address.City, arm.Address.Country,
                arm.AlphaNumId.AlphaNumId));

        return listDto;
    }

    public async Task<List<WarehouseDTO>> GetAllAsync()
    {
        var list = await _repository.GetAllAsync();

        var listDto = list.ConvertAll(arm =>
            new WarehouseDTO(arm.Id.AsGuid(), arm.Latitude.Degrees, arm.Latitude.Minutes, arm.Latitude.Seconds,
                arm.Longitude.Degrees,
                arm.Longitude.Minutes, arm.Longitude.Seconds, arm.Designation.Designation, arm.Address.Street,
                arm.Address.DoorNumber, arm.Address.PostalCode, arm.Address.City, arm.Address.Country,
                arm.AlphaNumId.AlphaNumId));

        return listDto;
    }


    public async Task<WarehouseDTO> AddAsync(CreatingWarehouseDto dto)
    {
        var warehouse = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(dto.LatitudeDegree, dto.LatitudeMinute, dto.LatitudeSecond),
            new WarehouseCoordinates(dto.LongitudeDregree, dto.LongitudeMinute, dto.LongitudeSecond),
            new DesignationWarehouse(dto.Designation),
            new WarehouseAddress(dto.Street, dto.DoorNumber, dto.PostalCode, dto.City, dto.Country),
            new AlphaId(dto.AlphaNumId));

        await _repository.AddAsync(warehouse);

        return new WarehouseDTO(warehouse.Id.AsGuid(), warehouse.Latitude.Degrees, warehouse.Latitude.Minutes,
            warehouse.Latitude.Seconds,
            warehouse.Longitude.Degrees, warehouse.Longitude.Minutes, warehouse.Longitude.Seconds,
            warehouse.Designation.Designation, warehouse.Address.Street, warehouse.Address.DoorNumber,
            warehouse.Address.PostalCode, warehouse.Address.City, warehouse.Address.Country,
            warehouse.AlphaNumId.AlphaNumId);
    }

    public async Task<WarehouseDTO> GetByWarehouseIdAsync(string warehouseId)
    {
        var warehouse = await _repository.GetByWarehouseIdAsync(new AlphaId(warehouseId));

        if (warehouse == null) return null;

        return new WarehouseDTO(warehouse.Id.AsGuid(), warehouse.Latitude.Degrees, warehouse.Latitude.Minutes,
            warehouse.Latitude.Seconds,
            warehouse.Longitude.Degrees, warehouse.Longitude.Minutes, warehouse.Longitude.Seconds,
            warehouse.Designation.Designation, warehouse.Address.Street, warehouse.Address.DoorNumber,
            warehouse.Address.PostalCode, warehouse.Address.City, warehouse.Address.Country,
            warehouse.AlphaNumId.AlphaNumId);
    }

    public async Task<WarehouseDTO> UpdateAsync(WarehouseDTO dto)
    {
        var warehouse = await _repository.GetByIdAsync(new WarehouseId(dto.Id));

        if (warehouse == null)
            return null;

        await _repository.RemoveAsync(warehouse);

        // change all field
        warehouse.ChangeDesignation(dto.Designation);
        warehouse.ChangeLatitude(dto.LatitudeDegree, dto.LatitudeMinute, dto.LatitudeSecond);
        warehouse.ChangeLongitude(dto.LongitudeDregree, dto.LongitudeMinute, dto.LongitudeSecond);
        warehouse.ChangeAddress(dto.Street, dto.DoorNumber, dto.PostalCode, dto.City, dto.Country);

        await _repository.AddAsync(warehouse);

        return new WarehouseDTO(warehouse.Id.AsGuid(), warehouse.Latitude.Degrees, warehouse.Latitude.Minutes,
            warehouse.Latitude.Seconds,
            warehouse.Longitude.Degrees, warehouse.Longitude.Minutes, warehouse.Longitude.Seconds,
            warehouse.Designation.Designation, warehouse.Address.Street, warehouse.Address.DoorNumber,
            warehouse.Address.PostalCode, warehouse.Address.City, warehouse.Address.Country,
            warehouse.AlphaNumId.AlphaNumId);
    }

    public async Task<bool> DeleteAsync(WarehouseId id)
    {
        var warehouse = await _repository.GetByIdAsync(id);

        if (warehouse == null)
            return false;

        await _repository.RemoveAsync(warehouse);

        return true;
    }
}