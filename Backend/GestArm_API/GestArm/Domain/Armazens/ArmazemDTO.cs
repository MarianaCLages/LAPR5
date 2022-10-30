namespace GestArm.Domain.Armazens;

public class ArmazemDTO
{
    public ArmazemDTO(ArmazemId id, int latitudeGrau, int latitudeMinuto, int latitudeSegundo, int longitudeGrau,
        int longitudeMinuto, int longitudeSegundo, string designacao, string rua, int numeroPorta, string codigoPostal,
        string cidade, string pais, string alphaNumId)
    {
        Id = id;
        AlphaNumId = alphaNumId;
        LatitudeGrau = latitudeGrau;
        LatitudeMinuto = latitudeMinuto;
        LatitudeSegundo = latitudeSegundo;
        LongitudeGrau = longitudeGrau;
        LongitudeMinuto = longitudeMinuto;
        LongitudeSegundo = longitudeSegundo;
        Designacao = designacao;
        Rua = rua;
        NumeroPorta = numeroPorta;
        CodigoPostal = codigoPostal;
        Cidade = cidade;
        Pais = pais;
    }


    public ArmazemId Id { get; set; }

    public int LatitudeGrau { get; }

    public int LatitudeSegundo { get; }

    public int LatitudeMinuto { get; }

    public int LongitudeGrau { get; }
    public int LongitudeSegundo { get; }
    public int LongitudeMinuto { get; }

    public string Designacao { get; }

    public string AlphaNumId { get; }

    public string Rua { get; }

    public int NumeroPorta { get; }

    public string CodigoPostal { get; }

    public string Cidade { get; }

    public string Pais { get; }
}