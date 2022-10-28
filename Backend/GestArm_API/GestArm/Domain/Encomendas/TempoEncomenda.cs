using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class TempoEncomenda : ValueObject
{
    public TempoEncomenda(int minutos)
    {
        IsValid();
        Minutos = minutos;
    }

    public int Minutos { get; }

    //verifica se os minutos são válidos
    private void IsValid()
    {
        if (Minutos < 0) throw new BusinessRuleValidationException("O tempo de entrega não pode ser negativo");
    }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        throw new NotImplementedException();
    }

    public double ToDouble()
    {
        return Minutos;
    }
}