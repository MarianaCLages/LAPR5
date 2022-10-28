using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class DesignacaoArmazem : ValueObject
{
    public DesignacaoArmazem(string designacao)
    {
        checkDesignacao(designacao);
        Designacao = designacao;
    }

    public string Designacao {get;}


    private void checkDesignacao(string designacao)
    {
        if (designacao == null) throw new BusinessRuleValidationException("A designação não pode estar vazia.");

        if (designacao.Length > 50)
            throw new BusinessRuleValidationException("A designação excede o número de caracteres.");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Designacao;
    }
}