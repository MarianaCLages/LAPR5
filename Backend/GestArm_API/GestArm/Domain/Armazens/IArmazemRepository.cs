using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens;

public interface IArmazemRepository : IRepository<Armazem, ArmazemId>
{
    Task<Armazem> GetByIdAsync(ArmazemId id);

    Task<List<Armazem>> GetAllAsync();

    Task<Armazem> GetByDesignacaoAsync(DesignacaoArmazem designacao);

    Task<List<Armazem>> GetAllAsync(int page, int size);

    Task<Armazem> AddAsync(Armazem armazem);
    Task<Armazem> UpdateAsync(Armazem armazem);

    Task<Armazem> GetByAlphaNumIdAsync(AlphaId id);

    Task<Armazem> RemoveAsync(ArmazemId id);

    Task<bool> ExistsAsync(ArmazemId id);

    Task<int> GetCountAsync();
    
    Task<Armazem> GetByArmazemIdAsync(AlphaId armazemId);
    
    
}