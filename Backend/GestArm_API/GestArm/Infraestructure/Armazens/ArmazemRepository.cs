using GestArm.Domain.Armazens;
using GestArm.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestArm.Infrastructure.Armazens;

public class ArmazemRepository : BaseRepository<Armazem, ArmazemId>, IArmazemRepository
{
    private readonly GestArmDbContext _context;

    public ArmazemRepository(GestArmDbContext context) : base(context.Armazens)
    {
        _context = context;
    }
    
    /*
    public Task<Armazem> GetByAlphaNumIdAsync(AlphaId alphaNumId)
    {
        Armazem armazem = _context.Armazens.AsEnumerable().FirstOrDefault(a => a.AlphaNumId.Equals(alphaNumId));
        return Task.FromResult(armazem);
    }
    */

    public async Task<List<Armazem>> GetByDesignacaoAsync(DesignacaoArmazem designacao)
    {
        return await _context.Armazens.Where(r => r.Designacao.Designacao.Equals(designacao.Designacao))
            .ToListAsync();
        
    }

    public Task<List<Armazem>> GetAllAsync()
    {
        var armazens = _context.Armazens.ToList();
        return Task.FromResult(armazens);
    }


    public async Task<Armazem> AddAsync(Armazem armazem)
    {
        _context.Armazens.Add(armazem);
        await _context.SaveChangesAsync();
        return armazem;
    }

    public Task<Armazem> UpdateAsync(Armazem armazem)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> RemoveAsync(Armazem armazem)
    {
        _context.Armazens.Remove(armazem);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<bool> ExistsAsync(ArmazemId id)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetCountAsync()
    {
        throw new NotImplementedException();
    }

    public Task<List<Armazem>> GetAllAsync(int page, int size)
    {
        throw new NotImplementedException();
    }

    public async Task<Armazem> GetByArmazemIdAsync(AlphaId armazemId)
    {
        return await _context.Armazens.Where(r => r.AlphaNumId.AlphaNumId.Equals(armazemId.AlphaNumId))
            .FirstOrDefaultAsync();
    }
}