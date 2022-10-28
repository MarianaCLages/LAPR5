using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Armazens;
using GestArm.Infrastructure.Shared;
using GestArm.Infrastructure;
using GestArm.Domain.Armazens;

namespace GestArm.Infrastructure.Armazens
{
    public class ArmazemRepository : BaseRepository<Armazem, ArmazemId>, IArmazemRepository
    {
        private readonly GestArmDbContext _context;
        public ArmazemRepository(GestArmDbContext context) : base(context.Armazens)
        {
            _context = context;
        }



            //implementar mais tarde
            public Task<Armazem> GetByIdAsync(ArmazemId id)
            {
                throw new NotImplementedException();
            }

            public Task<List<Armazem>> GetAllAsync()
            {
                throw new NotImplementedException();
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

            public Task<Armazem> RemoveAsync(ArmazemId id)
            {
                throw new NotImplementedException();
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

        
    }
}