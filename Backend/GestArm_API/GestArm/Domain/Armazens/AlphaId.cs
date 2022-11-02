using System.Text.RegularExpressions;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class AlphaId : ValueObject
{
    public AlphaId(string alphaNumId)
    {
        checkAlphaId(alphaNumId);
        AlphaNumId = alphaNumId;
    }

    public string AlphaNumId { get; set; }

    private void checkAlphaId(string alphaNumId)
    {
        var rg = new Regex(@"^[a-zA-Z0-9\s,]*$");

        if (alphaNumId.Length != 3)
            throw new BusinessRuleValidationException("O AlphaId excede o número de caracteres.");
        if (!rg.IsMatch(alphaNumId))
            throw new BusinessRuleValidationException("O AlphaId apresenta caracteres não suportados.");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return AlphaNumId;
    }
}