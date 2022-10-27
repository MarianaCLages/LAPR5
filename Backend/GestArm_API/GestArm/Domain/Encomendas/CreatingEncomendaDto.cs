using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestArm.Domain.Encomendas
{
    public class CreatingEncomendaDto
    {
        public String DataEntrega { get; }
        public float MassaEntrega { get; }
        public int TempoCarga { get; }
        public int TempoDescarga { get; }
        public String ArmazemId { get; }

        public CreatingEncomendaDto(String dataEntrega, float massaEntrega, int tempoCarga, int tempoDescarga,
            String armazemId)
        {
            DataEntrega = dataEntrega;
            MassaEntrega = massaEntrega;
            TempoCarga = tempoCarga;
            TempoDescarga = tempoDescarga;
            ArmazemId = armazemId;
        }
    }
}