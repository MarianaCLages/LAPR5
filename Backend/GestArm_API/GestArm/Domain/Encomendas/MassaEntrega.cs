using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class MassaEntrega : ValueObject
{
    public double Massa { get; }

    public MassaEntrega(double massa)
    {
        this.Massa = massa;
    }

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