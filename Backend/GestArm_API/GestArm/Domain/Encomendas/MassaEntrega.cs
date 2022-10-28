using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class MassaEntrega : ValueObject
{
    public MassaEntrega(double massa)
    {
        Massa = massa;
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