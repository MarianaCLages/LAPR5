using System.Globalization;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class DataEntrega : ValueObject
{
    public DataEntrega(DateTime data)
    {
        IsValid(data);
        Data = data;
    }

    public DateTime Data { get; }

    //verifica se a data é válida e se é maior que a data atual
    private void IsValid(DateTime data)
    {
        if (data > DateTime.Now) return;

        throw new BusinessRuleValidationException("Data de entrega inválida");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Data;
    }

    //ToString
    public string ToString(string type)
    {
        return Data.ToString(type);
    }

    public override string ToString()
    {
        return Data.ToString(CultureInfo.InvariantCulture);
    }
}