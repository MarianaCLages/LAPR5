using System;
using DDDSample1.Domain.Shared;


namespace GestArm.Domain.Armazem
{



    public class Armazem : Entity<ArmazemId>, IAggregateRoot
    {

        public CoordenadasArmazem Latitude { get; private set; }

        public CoordenadasArmazem Longitude { get; private set; }

        public DesignacaoArmazem Designacao { get; private set; }

        public EnderecoArmazem Endereco { get; private set; }

        public Armazem(CoordenadasArmazem latitude, CoordenadasArmazem longitude, DesignacaoArmazem designacao, EnderecoArmazem endereco)
        {
            this.Id = new ArmazemId(Guid.NewGuid());
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Designacao = designacao;
            this.Endereco = endereco;
        }



    }

}