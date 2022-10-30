using GestArm.Domain.Shared;
using System.Text.RegularExpressions;

namespace GestArm.Domain.Armazens;

public class AlphaId : ValueObject
{
    public AlphaId(string alphaNumId)
    {
        checkAlphaId(alphaNumId);
        AlphaNumId = alphaNumId;
    }

    public string AlphaNumId { get; }

    private void checkAlphaId(string alphaNumId)
    {
        Regex rg = new Regex(@"^[a-zA-Z0-9\s,]*$");

        if (alphaNumId.Length != 3 && !rg.IsMatch(alphaNumId))
            throw new BusinessRuleValidationException("O AlphaId excede o número de caracteres.");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return AlphaNumId;
    }
}