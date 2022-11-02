using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class Armazem : Entity<ArmazemId>, IAggregateRoot
{
    public Armazem()
    {
    }

    public Armazem(ArmazemId id, CoordenadasArmazem latitude, CoordenadasArmazem longitude,
        DesignacaoArmazem designacao, EnderecoArmazem endereco, AlphaId alphaNumId)
    {
        checkId(id);

        Id = id;
        AlphaNumId = alphaNumId;
        Latitude = latitude;
        Longitude = longitude;
        Designacao = designacao;
        Endereco = endereco;
    }

    public ArmazemId Id { get; }

    public AlphaId AlphaNumId { get; }
    public CoordenadasArmazem Latitude { get; }

    public CoordenadasArmazem Longitude { get; }

    public DesignacaoArmazem Designacao { get; set; }

    public EnderecoArmazem Endereco { get; }

    public void ChangeDesignacao(string novaDesignacao)
    {
        Designacao = new DesignacaoArmazem(novaDesignacao);
    }

    public void ChangeLatitude(int newLatitudeGrau, int newLatitudeMinuto, int newLatitudeSegundo)
    {
        Latitude.Graus = newLatitudeGrau;
        Latitude.Minutos = newLatitudeMinuto;
        Latitude.Segundos = newLatitudeSegundo;
    }

    public void ChangeLongitude(int newLongitudeGrau, int newLongitudeMinuto, int newLongitudeSegundo)
    {
        Latitude.Graus = newLongitudeGrau;
        Latitude.Minutos = newLongitudeMinuto;
        Latitude.Segundos = newLongitudeSegundo;
    }

    public void ChangeEndereco(string newEnderecoRua, int newEnderecoNumeroPorta, string newEnderecoCodigoPostal,
        string newEnderecoCidade, string newEnderecoPais)
    {
        Endereco.Rua = newEnderecoRua;
        Endereco.NumeroPorta = newEnderecoNumeroPorta;
        Endereco.CodigoPostal = newEnderecoCodigoPostal;
        Endereco.Cidade = newEnderecoCidade;
        Endereco.Pais = newEnderecoPais;
    }

    private void checkId(ArmazemId id){

        if(id == null){
            throw new NullReferenceException("Id do armazem não pode ser nulo");
        }
    }



}