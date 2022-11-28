using System.Globalization;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Orders;

public class OrderDate : ValueObject
{
    public OrderDate(DateTime data)
    {
        Data = data;
    }

    public DateTime Data { get; }

    //verifica se a data é válida e se é maior que a data atual
    private void IsValid(DateTime data)
    {
        if (data > DateTime.Now) return;

        throw new BusinessRuleValidationException("Invalid order date!");
        
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