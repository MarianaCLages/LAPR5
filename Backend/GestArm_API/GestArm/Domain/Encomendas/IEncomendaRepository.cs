using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas
{
    public interface IEncomendasRepository : IRepository<Encomenda, EncomendaId>
    {
        Task<Encomenda> GetByIdAsync(EncomendaId id);

        Task<List<Encomenda>> GetAllAsync();

        Task<Encomenda> AddAsync(Encomenda encomenda);

        Task<Encomenda> UpdateAsync(Encomenda encomenda);

        Task<Encomenda> RemoveAsync(EncomendaId id);

        Task<bool> ExistsAsync(EncomendaId id);

        Task<int> GetCountAsync();
    }
}