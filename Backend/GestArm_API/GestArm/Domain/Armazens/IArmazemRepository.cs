using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Armazens
{
    public interface IArmazemRepository : IRepository<Armazem, ArmazemId>
    {
        Task<Armazem> GetByIdAsync(ArmazemId id) { throw new NotImplementedException(); }

        Task<List<Armazem>> GetAllAsync() { throw new NotImplementedException(); }

        Task<List<Armazem>> GetAllAsync(int page, int size) { throw new NotImplementedException(); }

        Task<Armazem> AddAsync(Armazem armazem) { throw new NotImplementedException(); }

        Task<Armazem> UpdateAsync(Armazem armazem) { throw new NotImplementedException(); }

        Task<Armazem> RemoveAsync(ArmazemId id) { throw new NotImplementedException(); }

        Task<bool> ExistsAsync(ArmazemId id) { throw new NotImplementedException(); }

        Task<int> GetCountAsync() { throw new NotImplementedException(); }
    }

}