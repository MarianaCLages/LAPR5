using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public class Armazem : Entity<ArmazemId>, IAggregateRoot
{
    public Armazem()
    {
    }

    public Armazem(ArmazemId id, CoordenadasArmazem latitude, CoordenadasArmazem longitude,
        DesignacaoArmazem designacao, EnderecoArmazem endereco,AlphaId alphaNumId)
    {
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

    public DesignacaoArmazem Designacao { get; }

    public EnderecoArmazem Endereco { get; }
}