using System;
using DDDSample1.Domain.Shared;


namespace GestArm.Domain.Armazem
{

    public class EnderecoArmazem : ValueObject
    {
        public String Endereco { get; private set; }


        public EnderecoArmazem(string endereco)
        {
            this.Endereco = endereco;
        }

        private void checkEndereco(string endereco)
        {


        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Endereco;
        }
    }

}