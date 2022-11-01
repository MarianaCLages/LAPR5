using System.Text;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class EncomendaDomainId : ValueObject

{
    private string _id { get; }

    public EncomendaDomainId(string number, string date)
    {
        var sb = new StringBuilder();
        sb.Append(date).Append("/").Append(number);
        _id = sb.ToString();
    }


    public override string ToString()
    {
        return _id;
    }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return _id;
    }
}