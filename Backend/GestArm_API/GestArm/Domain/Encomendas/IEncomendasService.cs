using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestArm.Domain.Encomendas;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Encomendas
{

    public class IEncomendasService
    {
        private readonly IEncomendasRepository _repository;

        public IEncomendasService(IEncomendasRepository repository)
        {
            _repository = repository;
        }

        public async Task<EncomendaDto> GetByIdAsync(EncomendaId id)
        {
            var encomenda = await _repository.GetByIdAsync(id);

            if (encomenda == null)
            {
                return null;
            }

            return new EncomendaDto(encomenda.Id, encomenda.DataEntrega.ToString(), encomenda.MassaEntrega, encomenda.TempoCarga, encomenda.TempoDescarga, encomenda.ArmazemId);
        }


        public async Task<EncomendaDto> AddAsync(CreatingEncomendaDto dto)
        {
            var encomenda = new Encomenda(new EncomendaId(Guid.NewGuid()), DateTime.Parse(dto.DataEntrega), dto.MassaEntrega, dto.TempoCarga, dto.TempoDescarga, dto.ArmazemId);

            await _repository.AddAsync(encomenda);

            return new EncomendaDto(encomenda.Id, encomenda.DataEntrega.ToString(), encomenda.MassaEntrega, encomenda.TempoCarga, encomenda.TempoDescarga, encomenda.ArmazemId);
        }

        public async Task<bool> RemoveAsync(EncomendaDto dto)
        {
            var encomenda = _repository.GetByIdAsync(dto.Id);

            if (encomenda != null)
            {
                await _repository.RemoveAsync(encomenda.Id);
                return true;
            }
            else
            {
                throw new NotFound();
            }
        }

    }
}