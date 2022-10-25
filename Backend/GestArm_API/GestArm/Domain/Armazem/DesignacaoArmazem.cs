using System;
using GestArm.Domain.Shared;


namespace GestArm.Domain.Armazem
{

    public class DesignacaoArmazem : ValueObject
    {

        public String Designacao { get; private set; }

        public DesignacaoArmazem(String designacao)
        {

            checkDesignacao(designacao);
            this.Designacao = designacao;
        }


        private void checkDesignacao(String designacao)
        {

            if (designacao == null)
            {
                throw new BusinessRuleValidationException("A designação não pode estar vazia.");
            }

            if (designacao.Length > 50)
            {
                throw new BusinessRuleValidationException("A designação excede o número de caracteres.");
            }

        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Designacao;
        }



    }
}