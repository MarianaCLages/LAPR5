using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

public class WarehouseCoordinates : ValueObject
{
    public WarehouseCoordinates(int degrees, int minutes, int seconds)
    {
        checkDegrees(degrees);
        checkMinutes(minutes);
        checkSeconds(seconds);

        Degrees = degrees;
        Minutes = minutes;
        Seconds = seconds;
    }

    public int Degrees { get; set; }

    public int Minutes { get; set; }

    public int Seconds { get; set; }

    private void checkDegrees(int degrees)
    {
        if (degrees < -180 || degrees > 180)
            throw new BusinessRuleValidationException("Coordinate degrees must be between 180 and -180");
    }

    private void checkMinutes(int minutes)
    {
        if (minutes < 0 || minutes > 60)
            throw new BusinessRuleValidationException("Coordinate minutes must be between 0 and 60");
    }

    private void checkSeconds(int seconds)
    {
        if (seconds < 0 || seconds > 60)
            throw new BusinessRuleValidationException("Coordinate seconds must be between 0 and 60");
    }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Degrees;
        yield return Minutes;
        yield return Seconds;
    }
}