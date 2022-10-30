using GestArm.Domain.Encomendas;
using GestArm.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestArm.Infrastructure.Encomendas;

public class EncomendasRepository : BaseRepository<Encomenda, EncomendaId>, IEncomendasRepository
{
    //db context
    private readonly GestArmDbContext _context;

    public EncomendasRepository(GestArmDbContext context) : base(context.Encomendas)
    {
        _context = context;
    }

    public async Task<Encomenda> UpdateAsync(Encomenda encomenda)
    {
        _context.Encomendas.Update(encomenda);
        await _context.SaveChangesAsync();
        return encomenda;
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
    public async Task<List<Encomenda>> GetByArmazemIdAsync(string armazemId)
    {
        return  await _context.Encomendas.Where(u => u.ArmazemId.Equals(armazemId)).ToListAsync();
    }
    
    public async Task<List<Encomenda>> GetByDataEntregaAysnc(DateTime date)
    {
        return  await _context.Encomendas.Where(u => u.DataEntrega.Data.Equals(date)).ToListAsync();
    }
    
}