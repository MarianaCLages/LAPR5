using System;
using GestArm.Domain.Shared;
using GestArm.Domain.Armazens;

namespace GestArm.Domain.Armazens
{
    public class Armazem : Entity<ArmazemId>, IAggregateRoot
    {

        public ArmazemId Id { get; private set; }
        public CoordenadasArmazem Latitude { get; private set; }

        public CoordenadasArmazem Longitude { get; private set; }

        public DesignacaoArmazem Designacao { get; private set; }

        public EnderecoArmazem Endereco { get; private set; }

        public Armazem()
        {
        }

        public Armazem(ArmazemId id, CoordenadasArmazem latitude, CoordenadasArmazem longitude, DesignacaoArmazem designacao, EnderecoArmazem endereco)
        {
            Id = id;
            Latitude = latitude;
            Longitude = longitude;
            Designacao = designacao;
            Endereco = endereco;
        }


    }

}