using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GestArm.Domain.Encomendas;
using GestArm.Infrastructure.Shared;

namespace GestArm.Infrastructure.Encomendas
{
    internal class EncomendaEntityTypeConfiguration: IEntityTypeConfiguration<Encomenda>
    {
        public void Configure(EntityTypeBuilder<Encomenda> builder)
        {
            builder.ToTable("Encomenda");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("Id");
            builder.Property(e => e.DataEntrega).HasColumnName("DataEntrega");
            builder.Property(e => e.MassaEntrega).HasColumnName("MassaEntrega");
            builder.Property(e => e.TempoCarga).HasColumnName("TempoCarga");
            builder.Property(e => e.TempoDescarga).HasColumnName("TempoDescarga");
            builder.Property(e => e.ArmazemId).HasColumnName("ArmazemId");
        }
    }
}