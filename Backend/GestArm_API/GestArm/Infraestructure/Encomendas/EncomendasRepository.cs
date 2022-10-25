using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Encomendas;
using GestArm.Infrastructure.Shared;
using GestArm.Infrastructure;


namespace GestArm.Infrastructure.Encomendas
{
    public class EncomendasRepository : BaseRepository<Encomenda, EncomendaId>, IEncomendasRepository
    {
        public EncomendasRepository(GestArmDbContext context) : base(context.Encomendas)
        {
            //implementar mais tarde
            Task<Encomenda> GetByIdAsync(EncomendaId id)
            {
                throw new NotImplementedException();
            }

            Task<List<Encomenda>> GetAllAsync()
            {
                throw new NotImplementedException();
            }

            Task<Encomenda> AddAsync(Encomenda encomenda)
            {
                throw new NotImplementedException();
            }

            Task<Encomenda> UpdateAsync(Encomenda encomenda)
            {
                throw new NotImplementedException();
            }

            Task<Encomenda> RemoveAsync(EncomendaId id)
            {
                throw new NotImplementedException();
            }

            Task<bool> ExistsAsync(EncomendaId id)
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