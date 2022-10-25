using System;
using GestArm.Domain.Shared;
using GestArm.Domain.Categories;
using GestArm.Domain.Encomendas;

namespace GestArm.Domain.Encomendas
{
    public class Encomenda : Entity<EncomendaId>, IAggregateRoot
    {
        public EncomendaId Id { get; private set; }
        public DateTime DataEntrega { get; private set; }

        public float MassaEntrega { get; private set; }

        public String ArmazemId { get; private set; }

        public double TempoCarga { get; private set; }

        public double TempoDescarga { get; private set; }

        public Encomenda()
        {
        }

        public Encomenda(EncomendaId id, DateTime dataEntrega, float massaEntrega, double tempoCarga, double tempoDescarga, string armazemId)
        {
            Id = id;
            DataEntrega = dataEntrega;
            MassaEntrega = massaEntrega;
            TempoCarga = tempoCarga;
            TempoDescarga = tempoDescarga;
            ArmazemId = armazemId;
        }

        public void ChangeDataEntrega(DateTime dataEntrega)
        {
            DataEntrega = dataEntrega;
        }

        public void ChangeMassaEntrega(float massaEntrega)
        {
            MassaEntrega = massaEntrega;
        }

        public void ChangeTempoCarga(double tempoCarga)
        {
            TempoCarga = tempoCarga;
        }

        public void ChangeTempoDescarga(double tempoDescarga)
        {
            TempoDescarga = tempoDescarga;
        }

    }

}