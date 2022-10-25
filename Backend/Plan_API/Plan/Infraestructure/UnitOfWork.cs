using System.Threading.Tasks;
using GestArm.Domain.Shared;

namespace GestArm.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly GestArmDbContext _context;

        public UnitOfWork(GestArmDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}