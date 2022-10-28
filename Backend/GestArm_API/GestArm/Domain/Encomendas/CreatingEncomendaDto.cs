namespace GestArm.Domain.Encomendas;

public class CreatingEncomendaDto
{
    public CreatingEncomendaDto(string dataEntrega, float massaEntrega, int tempoCarga, int tempoDescarga,
        string armazemId)
    {
        DataEntrega = dataEntrega;
        MassaEntrega = massaEntrega;
        TempoCarga = tempoCarga;
        TempoDescarga = tempoDescarga;
        ArmazemId = armazemId;
    }

    public string DataEntrega { get; }
    public float MassaEntrega { get; }
    public int TempoCarga { get; }
    public int TempoDescarga { get; }
    public string ArmazemId { get; }
}