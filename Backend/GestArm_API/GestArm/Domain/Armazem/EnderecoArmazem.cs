using System;
using GestArm.Domain.Shared;


namespace GestArm.Domain.Armazem
{

    public class EnderecoArmazem : ValueObject
    {
        public String Rua { get; private set; }

        public int NumeroPorta { get; private set; }

        public String CodigoPostal { get; private set; }

        public String Cidade { get; private set; }

        public String Pais { get; private set; }

        public EnderecoArmazem(string rua, int numeroPorta, string codigoPostal, string cidade, string pais)
        {
            this.Rua = rua;
            this.NumeroPorta = numeroPorta;
            this.CodigoPostal = codigoPostal;
            this.Cidade = cidade;
            this.Pais = pais;
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

}