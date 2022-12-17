using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

public class Warehouse : Entity<WarehouseId>, IAggregateRoot
{
    public Warehouse()
    {
    }

    public Warehouse(WarehouseId id, WarehouseCoordinates latitude, WarehouseCoordinates longitude,
        DesignationWarehouse designation, WarehouseAddress address, AlphaId alphaNumId)
    {
        checkId(id);

        Id = id;
        AlphaNumId = alphaNumId;
        Latitude = latitude;
        Longitude = longitude;
        Designation = designation;
        Address = address;
        Activated = new ActivatedWarehouse(true);
    }

    public WarehouseId Id { get; }

    public AlphaId AlphaNumId { get; }
    public WarehouseCoordinates Latitude { get; }

    public ActivatedWarehouse Activated { get; set; }
    public WarehouseCoordinates Longitude { get; }

    public DesignationWarehouse Designation { get; set; }

    public WarehouseAddress Address { get; }

    public void DesactivateWarehouse()
    {
        Activated.DesactivateWarehouse();
    }

    public void ActivateWarehouse()
    {
        Activated.ActivateWarehouse();
    }
    public void ChangeDesignation(string newDesignation)
    {
        Designation = new DesignationWarehouse(newDesignation);
    }

    public void ChangeLatitude(int newLatitudeDegree, int newLatitudeMinute, int newLatitudeSecond)
    {
        Latitude.Degrees = newLatitudeDegree;
        Latitude.Minutes = newLatitudeMinute;
        Latitude.Seconds = newLatitudeSecond;
    }

    public void ChangeLongitude(int newLongitudeDregree, int newLongitudeMinute, int newLongitudeSecond)
    {
        Latitude.Degrees = newLongitudeDregree;
        Latitude.Minutes = newLongitudeMinute;
        Latitude.Seconds = newLongitudeSecond;
    }

    public void ChangeAddress(string newAddressStreet, int newAddressDoorNumber, string newAddressPostalCode,
        string newAddressCity, string newAddressCountry)
    {
        Address.Street = newAddressStreet;
        Address.DoorNumber = newAddressDoorNumber;
        Address.PostalCode = newAddressPostalCode;
        Address.City = newAddressCity;
        Address.Country = newAddressCountry;
    }

    private void checkId(WarehouseId id){

        if(id == null){
            throw new NullReferenceException("Warehouse Id cannot be null");
        }
    }



}