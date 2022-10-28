using GestArm.Domain.Encomendas;
using GestArm.Infrastructure.Shared;

namespace GestArm.Infrastructure.Encomendas;

public class EncomendasRepository : BaseRepository<Encomenda, EncomendaId>, IEncomendasRepository
{
    //db context
    private readonly GestArmDbContext _context;

    public EncomendasRepository(GestArmDbContext context) : base(context.Encomendas)
    {
        _context = context;
    }

    public Task<Encomenda> UpdateAsync(Encomenda encomenda)
    {
        throw new NotImplementedException();
    }

    public Task<Encomenda> RemoveAsync(EncomendaId id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ExistsAsync(EncomendaId id)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetCountAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Encomenda> AddAsync(Encomenda encomenda)
    {
        _context.Encomendas.Add(encomenda);
        await _context.SaveChangesAsync();
        return encomenda;
    }
}