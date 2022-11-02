using GestArm.Domain.Armazens;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public class EncomendasService : IEncomendasService
{
    private readonly IEncomendasRepository _repository;
    private readonly IArmazemRepository _repositoryArmazem;

    public EncomendasService(IEncomendasRepository repository, IArmazemRepository armazemRepository)
    {
        _repository = repository;
        _repositoryArmazem = armazemRepository;
    }

    public async Task<EncomendaDto> GetByIdAsync(EncomendaId id)
    {
        var encomenda = await _repository.GetByIdAsync(id);

        return new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(), encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId);
    }


    public async Task<EncomendaDto> AddAsync(CreatingEncomendaDto dto)
    {

        var verifiy = _repositoryArmazem.GetByArmazemIdAsync(new AlphaId(dto.ArmazemId));
        
        if (verifiy.Result == null)
        {
            throw new BusinessRuleValidationException("Não existe nenhum armazém com esse ID especificado!");
        }
        
        var nextId = _repository.GestNextIdAsync(DateTime.Parse(dto.DataEntrega));
        
        var encomenda = new Encomenda(
            new EncomendaDomainId(nextId.Result, new DataEntrega(DateTime.Parse(dto.DataEntrega)).ToString("yyMMdd")),
            new DataEntrega(DateTime.Parse(dto.DataEntrega)),new MassaEntrega(dto.MassaEntrega),
            new TempoEncomenda(dto.TempoCarga), new TempoEncomenda(dto.TempoDescarga),
            dto.ArmazemId);
        
        await _repository.AddAsync(encomenda);

        return new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(), encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId);
    }

    public async Task<EncomendaDto> UpdateAsync(EncomendaId id, CreatingEncomendaDto dto)
    {
        var encomenda = await _repository.GetByIdAsync(id);

        encomenda.ChangeDataEntrega(new DataEntrega(DateTime.Parse(dto.DataEntrega)));
        encomenda.ChangeTempoCarga(new TempoEncomenda(dto.TempoCarga));
        encomenda.ChangeTempoDescarga(new TempoEncomenda(dto.TempoDescarga));
        encomenda.ChangeMassaEntrega(new MassaEntrega(dto.MassaEntrega));
        encomenda.ChangeArmazemId(dto.ArmazemId);

        await _repository.UpdateAsync(encomenda);

        return new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(), encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
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

        var listaEncomendasDto = encomendas.Result.Select(encomenda => new EncomendaDto(encomenda.Id,
            encomenda.EncomendaDomainId.ToString(), encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId)).ToList();

        return Task.FromResult(listaEncomendasDto);
    }

    public async Task<List<EncomendaDto>> GetByArmazemIdAsync(string armazemId)
    {
        var encomendas = await _repository.GetByArmazemIdAsync(armazemId);

        return encomendas.Select(encomenda => new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(),
            encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId)).ToList();
    }

    public async Task<List<EncomendaDto>> GetByDataEntregaAysnc(DateTime data)
    {
        var encomendas = await _repository.GetByDataEntregaAysnc(data);

        return encomendas.Select(encomenda => new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(),
            encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId)).ToList();
    }

    public async Task<List<EncomendaDto>> GetByFiltragemAysnc(string armazemId, DateTime data)
    {
        var encomendas = await _repository.GetByFiltragemAsync(armazemId, data);

        return encomendas.Select(encomenda => new EncomendaDto(encomenda.Id, encomenda.EncomendaDomainId.ToString(),
            encomenda.DataEntrega.ToString(),
            encomenda.MassaEntrega.ToDouble(),
            encomenda.TempoCarga.ToDouble(), encomenda.TempoDescarga.ToDouble(), encomenda.ArmazemId)).ToList();
    }
}