using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class MassaEntrega : ValueObject
{
    public MassaEntrega(double massa)
    {
        //check if massa is valid
        isValid(massa);
        Massa = massa;
    }

    private void isValid(double massa)
    {
        if (massa <= 0)
            throw new BusinessRuleValidationException("Massa tem que ser maior que 0");
    }

    public double Massa { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Massa;
    }

    //devolver em tipo primitivo
    public double ToDouble()
    {
        return Massa;
    }
}