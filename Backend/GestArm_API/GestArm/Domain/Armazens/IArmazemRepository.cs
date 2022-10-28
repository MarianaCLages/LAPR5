using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Shared;
using GestArm.Infrastructure;

namespace GestArm.Domain.Armazens
{
    public interface IArmazemRepository : IRepository<Armazem, ArmazemId>
    {


        Task<Armazem> GetByIdAsync(ArmazemId id); 

        Task<List<Armazem>> GetAllAsync(); 

        Task<List<Armazem>> GetAllAsync(int page, int size); 

        Task<Armazem> AddAsync(Armazem armazem);
        Task<Armazem> UpdateAsync(Armazem armazem); 

        Task<Armazem> RemoveAsync(ArmazemId id); 

        Task<bool> ExistsAsync(ArmazemId id); 

        Task<int> GetCountAsync(); 
    }
}

