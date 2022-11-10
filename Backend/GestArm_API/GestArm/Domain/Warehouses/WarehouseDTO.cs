namespace GestArm.Domain.Warehouses;

public class WarehouseDTO
{
    public WarehouseDTO(Guid id, int latitudeDegree, int latitudeMinute, int latitudeSecond, int longitudeDregree,
        int longitudeMinute, int longitudeSecond, string designation, string street, int doorNumber, string postalCode,
        string city, string country, string alphaNumId)
    {
        Id = id;
        AlphaNumId = alphaNumId;
        LatitudeDegree = latitudeDegree;
        LatitudeMinute = latitudeMinute;
        LatitudeSecond = latitudeSecond;
        LongitudeDregree = longitudeDregree;
        LongitudeMinute = longitudeMinute;
        LongitudeSecond = longitudeSecond;
        Designation = designation;
        Street = street;
        DoorNumber = doorNumber;
        PostalCode = postalCode;
        City = city;
        Country = country;
    }


    public Guid Id { get; set; }

    public int LatitudeDegree { get; }

    public int LatitudeSecond { get; }

    public int LatitudeMinute { get; }

    public int LongitudeDregree { get; }
    public int LongitudeSecond { get; }
    public int LongitudeMinute { get; }

    public string Designation { get; }

    public string AlphaNumId { get; }

    public string Street { get; }

    public int DoorNumber { get; }

    public string PostalCode { get; }

    public string City { get; }

    public string Country { get; }
}