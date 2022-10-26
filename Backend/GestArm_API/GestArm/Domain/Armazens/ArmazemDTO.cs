using System;



namespace GestArm.Domain.Armazens
{

    public class ArmazemDTO
    {

        //Não sei se isto é preciso no dto..
        public Guid Id { get; set; }

        public string latitude { get; private set; }

        public string longitude { get; private set; }

        public string Designacao { get; private set; }

        public string Endereco { get; private set; }

        //Seguindo o exemplo do CategoryDTO não é preciso de criar DTO Object?
    }
}