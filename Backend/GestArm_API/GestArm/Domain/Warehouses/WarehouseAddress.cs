using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

public class WarehouseAddress : ValueObject
{
    public WarehouseAddress(string street, int doorNumber, string postalCode, string city, string country)
    {
        checkStreet(street);
        checkDoorNumber(doorNumber);
        checkPostalCode(postalCode);
        checkCity(city);
        checkCountry(country);

        Street = street;
        DoorNumber = doorNumber;
        PostalCode = postalCode;
        City = city;
        Country = country;
    }

    public string Street { get; set; }

    public int DoorNumber { get; set; }

    public string PostalCode { get; set; }

    public string City { get; set; }

    public string Country { get; set; }


    private void checkStreet(string street)
    {

        if (street == null || street == "")
            throw new BusinessRuleValidationException("Street cannot be empty");
    }

    private void checkDoorNumber(int nrPorta)
    {
        if (nrPorta < 0)
            throw new BusinessRuleValidationException("Door number cannot be negative");
    }

    private void checkPostalCode(string postalCode){
        if(postalCode == null || postalCode == "")
            throw new BusinessRuleValidationException("Postal code cannot be empty");
    }

    private void checkCity(string city){
        if(city == null || city == "")
            throw new BusinessRuleValidationException("City cannot be empty");
    }

    private void checkCountry(string country){
        if(country == null || country == "")
            throw new BusinessRuleValidationException("Country cannot be empty");
    }

    

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Street;
        yield return DoorNumber;
        yield return City;
        yield return Country;
        yield return PostalCode;
    }
}