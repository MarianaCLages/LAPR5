using GestArm.Domain.Shared;

namespace GestArm.Domain.Orders;

public class OrderMass : ValueObject
{
    public OrderMass(double mass)
    {
        //check if mass is valid
        isValid(mass);
        Mass = mass;
    }

    private void isValid(double mass)
    {
        if (mass <= 0)
            throw new BusinessRuleValidationException("Mass needs to be higher than 0");
    }

    public double Mass { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Mass;
    }

    //devolver em tipo primitivo
    public double ToDouble()
    {
        return Mass;
    }
}