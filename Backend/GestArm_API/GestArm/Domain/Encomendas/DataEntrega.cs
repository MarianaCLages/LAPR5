using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas
{
    public class DataEntrega : ValueObject
    {
        public DateTime Data { get; }

        public DataEntrega(DateTime data)
        {
            IsValid(data);
            Data = data;
        }

        //verifica se a data é válida e se é maior que a data atual
        private void IsValid(DateTime data)
        {
            if (data > DateTime.Now)
            {
                return;
            }

            throw new BusinessRuleValidationException("Data de entrega inválida");
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Data;
        }

        //ToString
        public override string ToString()
        {
            return Data.ToString(CultureInfo.CurrentCulture);
        }
    }
}