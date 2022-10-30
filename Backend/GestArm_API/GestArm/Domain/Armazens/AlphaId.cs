using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class AlphaId : ValueObject
{

    public AlphaId(string alphaNumId)
    {
        AlphaNumId = alphaNumId;
    }

    public string AlphaNumId { get; }

    private void checkAlphaId()
    {

        if (AlphaNumId.Length != 3)
            throw new BusinessRuleValidationException("O AlphaId excede o número de caracteres.");

    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return AlphaNumId;
    }
}