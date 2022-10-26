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
        public ArmazemRepository(GestArmDbContext context) : base(context.Armazens)
        {
            //implementar mais tarde
            Task<Armazem> GetByIdAsync(ArmazemId id)
            {
                throw new NotImplementedException();
            }

            Task<List<Armazem>> GetAllAsync()
            {
                throw new NotImplementedException();
            }

            Task<Armazem> AddAsync(Armazem armazem)
            {
                throw new NotImplementedException();
            }

            Task<Armazem> UpdateAsync(Armazem armazem)
            {
                throw new NotImplementedException();
            }

            Task<Armazem> RemoveAsync(ArmazemId id)
            {
                throw new NotImplementedException();
            }

            Task<bool> ExistsAsync(ArmazemId id)
            {
                throw new NotImplementedException();
            }

            Task<int> GetCountAsync()
            {
                throw new NotImplementedException();
            }

        }
    }
}