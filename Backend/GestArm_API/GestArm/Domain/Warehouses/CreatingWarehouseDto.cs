namespace GestArm.Domain.Warehouses;

public class CreatingWarehouseDto
{
    public CreatingWarehouseDto(int latitudeDegree, int latitudeMinute, int latitudeSecond, int longitudeDegree,
        int longitudeMinute, int longitudeSecond, string designation, string street, int doorNumber, string postalCode,
        string city, string country, string alphaNumId)

    {
        LatitudeDegree = latitudeDegree;
        LatitudeMinute = latitudeMinute;
        LatitudeSecond = latitudeSecond;
        LongitudeDregree = longitudeDegree;
        LongitudeMinute = longitudeMinute;
        LongitudeSecond = longitudeSecond;
        Designation = designation;
        Street = street;
        DoorNumber = doorNumber;
        PostalCode = postalCode;
        City = city;
        Country = country;
        AlphaNumId = alphaNumId;
    }

    public string AlphaNumId { get; }
    public int LatitudeDegree { get; }

    public int LatitudeSecond { get; }

    public int LatitudeMinute { get; }

    public int LongitudeDregree { get; }
    public int LongitudeSecond { get; }
    public int LongitudeMinute { get; }

    public string Designation { get; }

    public string Street { get; }

    public int DoorNumber { get; }

    public string PostalCode { get; }

    public string City { get; }

    public string Country { get; }
}