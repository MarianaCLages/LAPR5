using GestArm.Domain.Shared;

namespace GestArm.Domain.Orders;

public class TimeOrder : ValueObject
{
    public TimeOrder(int minutes)
    {
        IsValid(minutes);
        Minutes = minutes;
    }

    public int Minutes { get; }

    //verifica se os minutos são válidos
    private void IsValid(int minutes)   
    {
        if (minutes < 0) throw new BusinessRuleValidationException("Order time cannot be negative!");
    }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        throw new NotImplementedException();
    }

    public double ToDouble()
    {
        return Minutes;
    }
}