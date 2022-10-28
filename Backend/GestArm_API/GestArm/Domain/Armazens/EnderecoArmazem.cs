using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class EnderecoArmazem : ValueObject
{
    public EnderecoArmazem(string rua, int numeroPorta, string codigoPostal, string cidade, string pais)
    {
        Rua = rua;
        NumeroPorta = numeroPorta;
        CodigoPostal = codigoPostal;
        Cidade = cidade;
        Pais = pais;
    }

    public string Rua { get; }

    public int NumeroPorta { get; }

    public string CodigoPostal { get; }

    public string Cidade { get; }

    public string Pais { get; }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Rua;
        yield return NumeroPorta;
        yield return Cidade;
        yield return Pais;
        yield return CodigoPostal;
    }
}