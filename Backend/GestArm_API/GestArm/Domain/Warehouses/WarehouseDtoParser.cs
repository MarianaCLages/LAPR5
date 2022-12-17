namespace GestArm.Domain.Warehouses;

public class WarehouseDtoParser
{
    public static WarehouseDTO convertToDto(Warehouse warehouse)
    {
        return new WarehouseDTO(warehouse.Id.AsGuid(), warehouse.Latitude.Degrees, warehouse.Latitude.Minutes,
            warehouse.Latitude.Seconds,
            warehouse.Longitude.Degrees, warehouse.Longitude.Minutes, warehouse.Longitude.Seconds,
            warehouse.Designation.Designation, warehouse.Address.Street, warehouse.Address.DoorNumber,
            warehouse.Address.PostalCode,
            warehouse.Address.City, warehouse.Address.Country, warehouse.AlphaNumId.AlphaNumId);
    }
    
    public static ActivatedWarehouseDTO convertToActivateDto(Warehouse warehouse)
    {
        return new ActivatedWarehouseDTO(warehouse.Id.AsGuid(), warehouse.Latitude.Degrees, warehouse.Latitude.Minutes,
            warehouse.Latitude.Seconds,
            warehouse.Longitude.Degrees, warehouse.Longitude.Minutes, warehouse.Longitude.Seconds,
            warehouse.Designation.Designation, warehouse.Address.Street, warehouse.Address.DoorNumber,
            warehouse.Address.PostalCode,
            warehouse.Address.City, warehouse.Address.Country, warehouse.AlphaNumId.AlphaNumId,warehouse.Activated.Activated);
    }
}