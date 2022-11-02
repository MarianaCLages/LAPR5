using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class EnderecoArmazem : ValueObject
{
    public EnderecoArmazem(string rua, int numeroPorta, string codigoPostal, string cidade, string pais)
    {
        checkRua(rua);
        checkNumeroPorta(numeroPorta);
        checkCodigoPostal(codigoPostal);
        checkCidade(cidade);
        checkPais(pais);

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


    private void checkRua(string rua)
    {

        if (rua == null || rua == "")
            throw new BusinessRuleValidationException("Rua não pode ser vazia");
    }

    private void checkNumeroPorta(int nrPorta)
    {
        if (nrPorta < 0)
            throw new BusinessRuleValidationException("Numero de porta não pode ser negativo");
    }

    private void checkCodigoPostal(string codigoPostal){
        if(codigoPostal == null || codigoPostal == "")
            throw new BusinessRuleValidationException("Codigo postal não pode ser vazio");
    }

    private void checkCidade(string cidade){
        if(cidade == null || cidade == "")
            throw new BusinessRuleValidationException("Cidade não pode ser vazia");
    }

    private void checkPais(string pais){
        if(pais == null || pais == "")
            throw new BusinessRuleValidationException("Pais não pode ser vazio");
    }

    

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Rua;
        yield return NumeroPorta;
        yield return Cidade;
        yield return Pais;
        yield return CodigoPostal;
    }
}