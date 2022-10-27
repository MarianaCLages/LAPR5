using System;
using GestArm.Domain.Shared;
using GestArm.Domain.Categories;
using GestArm.Domain.Encomendas;

namespace GestArm.Domain.Encomendas
{
    public class Encomenda : Entity<EncomendaId>, IAggregateRoot
    {
        public DataEntrega DataEntrega { get; private set; }

        public MassaEntrega MassaEntrega { get; private set; }

        public String ArmazemId { get; private set; }

        public TempoEncomenda TempoCarga { get; private set; }

        public TempoEncomenda TempoDescarga { get; private set; }

        public Encomenda()
        {
        }

        public Encomenda(DataEntrega dataEntrega, MassaEntrega massaEntrega, TempoEncomenda tempoCarga,
            TempoEncomenda tempoDescarga, string armazemId)
        {
            Id = new EncomendaId(Guid.NewGuid());
            DataEntrega = dataEntrega;
            MassaEntrega = massaEntrega;
            TempoCarga = tempoCarga;
            TempoDescarga = tempoDescarga;
            ArmazemId = armazemId;
        }

        public void ChangeDataEntrega(DataEntrega dataEntrega)
        {
            DataEntrega = dataEntrega;
        }

        public void ChangeMassaEntrega(MassaEntrega massaEntrega)
        {
            MassaEntrega = massaEntrega;
        }

        public void ChangeTempoCarga(TempoEncomenda tempoCarga)
        {
            TempoCarga = tempoCarga;
        }

        public void ChangeTempoDescarga(TempoEncomenda tempoDescarga)
        {
            TempoDescarga = tempoDescarga;
        }

        public void ChangeArmazemId(string armazemId)
        {
            ArmazemId = armazemId;
        }
    }
}