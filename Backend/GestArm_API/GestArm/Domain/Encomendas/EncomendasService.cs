namespace GestArm.Domain.Encomendas;

public class EncomendasService : IEncomendasService
{
    private readonly IEncomendasRepository _repository;

    public EncomendasService(IEncomendasRepository repository)
    {
        _repository = repository;
    }

    public async Task<EncomendaDto> GetByIdAsync(EncomendaId id)
    {
        var encomenda = await _repository.GetByIdAsync(id);

        return new EncomendaDto(encomenda.Id, encomenda.DataEntrega.ToString(), encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId);
    }


    public async Task<EncomendaDto> AddAsync(CreatingEncomendaDto dto)
    {
        var encomenda = new Encomenda(new DataEntrega(DateTime.Parse(dto.DataEntrega)),
            new MassaEntrega(dto.MassaEntrega),
            new TempoEncomenda(dto.TempoCarga), new TempoEncomenda(dto.TempoDescarga),
            dto.ArmazemId);

        await _repository.AddAsync(encomenda);

        return new EncomendaDto(encomenda.Id, encomenda.DataEntrega.ToString(), encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId);
    }

    public async Task<bool> RemoveAsync(EncomendaId id)
    {
        var encomenda = _repository.GetByIdAsync(id);

        if (encomenda.IsCanceled || encomenda.IsFaulted) return false;

        await _repository.RemoveAsync(id);
        return true;
    }

    public Task<List<EncomendaDto>> GetAllAsync()
    {
        var encomendas = _repository.GetAllAsync();

        var listaEncomendasDto = new List<EncomendaDto>();
        foreach (var encomenda in encomendas.Result)
        {
            var encomendaDto = new EncomendaDto(encomenda.Id, encomenda.DataEntrega.ToString(),
                encomenda.MassaEntrega.ToDouble(),
                encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId);

            listaEncomendasDto.Add(encomendaDto);
        }

        return Task.FromResult(listaEncomendasDto);
    }
}