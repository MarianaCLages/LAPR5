using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas;

public interface IEncomendasRepository : IRepository<Encomenda, EncomendaId>
{
    Task<Encomenda> GetByIdAsync(EncomendaId id);

    Task<List<Encomenda>> GetByArmazemIdAsync(string armazemId);

    Task<List<Encomenda>> GetByDataEntregaAysnc(DateTime armazemId);

    Task<List<Encomenda>> GetAllAsync();

    Task<string> GestNextIdAsync(DateTime dataEntrega);

    Task<Encomenda> AddAsync(Encomenda encomenda);

    Task<Encomenda> UpdateAsync(Encomenda encomenda);

    Task<bool> RemoveAsync(Encomenda encomenda);

    Task<bool> ExistsAsync(EncomendaId id);

    Task<int> GetCountAsync();

    Task<List<Encomenda>> GetByFiltragemAsync(string armazemId, DateTime data);
    
    Task<List<Encomenda>> GetByFiltragemAsyncQuery(string armazemId, string data);

    Task<Encomenda> GetEncomendaByDomainIdAsync(string id);
}