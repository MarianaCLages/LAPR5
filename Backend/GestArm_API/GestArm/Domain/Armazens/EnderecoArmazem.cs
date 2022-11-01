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

    public string Rua { get; set; }

    public int NumeroPorta { get; set; }

    public string CodigoPostal { get; set; }

    public string Cidade { get; set; }

    public string Pais { get; set; }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Rua;
        yield return NumeroPorta;
        yield return Cidade;
        yield return Pais;
        yield return CodigoPostal;
    }
}