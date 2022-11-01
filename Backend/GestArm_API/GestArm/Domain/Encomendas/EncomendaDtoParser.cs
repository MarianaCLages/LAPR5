namespace GestArm.Domain.Encomendas;

//Método para os testes
public class EncomendaDtoParser
{
    public static EncomendaDto convertToDto(Encomenda encomenda)
    {
        return new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(), encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.Massa, encomenda.TempoCarga.Minutos,
            encomenda.TempoDescarga.Minutos, encomenda.ArmazemId);
    }
}