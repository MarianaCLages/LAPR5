using GestArm.Domain.Warehouses;
using GestArm.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestArm.Infrastructure.Warehouses;

public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
{
    private readonly GestArmDbContext _context;

    public WarehouseRepository(GestArmDbContext context) : base(context.Warehouses)
    {
        _context = context;
    }
    
    /*
    public Task<Warehouse> GetByAlphaNumIdAsync(AlphaId alphaNumId)
    {
        Warehouse warehouse = _context.Warehouses.AsEnumerable().FirstOrDefault(a => a.AlphaNumId.Equals(alphaNumId));
        return Task.FromResult(warehouse);
    }
    */

    public async Task<List<Warehouse>> GetByDesignationAsync(DesignationWarehouse designation)
    {
        return await _context.Warehouses.Where(r => r.Designation.Designation.Equals(designation.Designation))
            .ToListAsync();
        
    }

    public Task<List<Warehouse>> GetAllAsync()
    {
        var warehouses = _context.Warehouses.ToList();
        return Task.FromResult(warehouses);
    }


    public async Task<Warehouse> AddAsync(Warehouse warehouse)
    {
        _context.Warehouses.Add(warehouse);
        await _context.SaveChangesAsync();
        return warehouse;
    }

    public Task<Warehouse> UpdateAsync(Warehouse warehouse)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> RemoveAsync(Warehouse warehouse)
    {
        _context.Warehouses.Remove(warehouse);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<bool> ExistsAsync(WarehouseId id)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetCountAsync()
    {
        throw new NotImplementedException();
    }

    public Task<List<Warehouse>> GetAllAsync(int page, int size)
    {
        throw new NotImplementedException();
    }

    public async Task<Warehouse> GetByWarehouseIdAsync(AlphaId warehouseId)
    {
        return await _context.Warehouses.Where(r => r.AlphaNumId.AlphaNumId.Equals(warehouseId.AlphaNumId))
            .FirstOrDefaultAsync();
    }


}