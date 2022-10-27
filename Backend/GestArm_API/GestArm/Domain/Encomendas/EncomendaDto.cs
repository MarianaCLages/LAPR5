namespace GestArm.Domain.Encomendas
{
    public class EncomendaDto
    {
        public EncomendaId Id { get; set; }
        public String DataEntrega { get; set; }
        public double MassaEntrega { get; set; }
        public double TempoCarga { get; set; }
        public double TempoDescarga { get; set; }
        public String ArmazemId { get; set; }


        public EncomendaDto(EncomendaId id, String dataEntrega, double massaEntrega, double tempoCarga,
            double tempoDescarga, String armazemId)
        {
            Id = id;
            DataEntrega = dataEntrega;
            MassaEntrega = massaEntrega;
            TempoCarga = tempoCarga;
            TempoDescarga = tempoDescarga;
            ArmazemId = armazemId;
        }
    }
}