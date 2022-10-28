namespace GestArm.Domain.Encomendas;

public class EncomendaDto
{
    public EncomendaDto(EncomendaId id, string dataEntrega, double massaEntrega, double tempoCarga,
        double tempoDescarga, string armazemId)
    {
        Id = id;
        DataEntrega = dataEntrega;
        MassaEntrega = massaEntrega;
        TempoCarga = tempoCarga;
        TempoDescarga = tempoDescarga;
        ArmazemId = armazemId;
    }

    public EncomendaId Id { get; set; }
    public string DataEntrega { get; set; }
    public double MassaEntrega { get; set; }
    public double TempoCarga { get; set; }
    public double TempoDescarga { get; set; }
    public string ArmazemId { get; set; }
}