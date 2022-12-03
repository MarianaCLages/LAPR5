using System.Text.RegularExpressions;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

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
        var rg = new Regex("C[0-9]{2}");

        if (alphaNumId.Length != 3)
            throw new BusinessRuleValidationException("AlphaId exceeds character number");
        if (!rg.IsMatch(alphaNumId))
            throw new BusinessRuleValidationException("AlphaId has unsuported characters!");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return AlphaNumId;
    }
}