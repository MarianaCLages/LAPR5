using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas
{
    public interface IEncomendasRepository: IRepository<Encomenda,EncomendaId>
    {
        Task<Encomenda> GetByIdAsync(EncomendaId id){throw new NotImplementedException();}

        Task<List<Encomenda>> GetAllAsync(){throw new NotImplementedException();}

        Task<List<Encomenda>> GetAllAsync(int page, int size){throw new NotImplementedException();}

        Task<Encomenda> AddAsync(Encomenda encomenda){throw new NotImplementedException();}

        Task<Encomenda> UpdateAsync(Encomenda encomenda){throw new NotImplementedException();}

        Task<Encomenda> RemoveAsync(EncomendaId id){throw new NotImplementedException();}

        Task<bool> ExistsAsync(EncomendaId id){throw new NotImplementedException();}

        Task<int> GetCountAsync(){throw new NotImplementedException();}

        
    }
}
