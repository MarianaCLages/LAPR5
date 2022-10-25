using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestArm.Domain.Encomendas
{
    public class CreatingEncomendaDto
    {
        public String DataEntrega { get; set; }
        public float MassaEntrega { get; set; }
        public double TempoCarga { get; set; }
        public double TempoDescarga { get; set; }
        public String ArmazemId { get; set; }

        public CreatingEncomendaDto(String dataEntrega, float massaEntrega, double tempoCarga, double tempoDescarga, String armazemId)
        {
            DataEntrega = dataEntrega;
            MassaEntrega = massaEntrega;
            TempoCarga = tempoCarga;
            TempoDescarga = tempoDescarga;
            ArmazemId = armazemId;
        }
    }
}