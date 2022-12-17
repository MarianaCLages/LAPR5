namespace GestArm.Domain.Warehouses;

public class ActivatedWarehouseDTO
{
    public ActivatedWarehouseDTO(Guid id, int latitudeDegree, int latitudeMinute, int latitudeSecond, int longitudeDregree,
        int longitudeMinute, int longitudeSecond, string designation, string street, int doorNumber, string postalCode,
        string city, string country, string alphaNumId,bool activated)
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
        Activated = activated;
    }


    public Guid Id { get; set; }
    
    public bool Activated { get; }

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