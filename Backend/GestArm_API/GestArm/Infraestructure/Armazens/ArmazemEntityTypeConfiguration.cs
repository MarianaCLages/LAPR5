using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GestArm.Infrastructure.Shared;
using GestArm.Domain.Armazens;

namespace GestArm.Infrastructure.Armazens
{
    internal class ArmazemEntityTypeConfiguration : IEntityTypeConfiguration<Armazem>
    {
        public void Configure(EntityTypeBuilder<Armazem> builder)
        {



            builder.ToTable("Armazem");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("Id");
            builder.OwnsOne(e => e.Designacao).Property(e => e.Designacao).HasColumnName("Designacao");
            //builder.Property(e => e.Endereco).HasColumnName("Endereco");
            builder.OwnsOne(e => e.Endereco).Property(e => e.Rua).HasColumnName("Rua");
            builder.OwnsOne(e => e.Endereco).Property(e => e.NumeroPorta).HasColumnName("NumeroPorta");
            builder.OwnsOne(e => e.Endereco).Property(e => e.CodigoPostal).HasColumnName("CodigoPostal");
            builder.OwnsOne(e => e.Endereco).Property(e => e.Cidade).HasColumnName("Cidade");
            builder.OwnsOne(e => e.Endereco).Property(e => e.Pais).HasColumnName("Pais");

            builder.OwnsOne(e => e.Latitude).Property(e => e.Graus).HasColumnName("LatitudeGraus");
            builder.OwnsOne(e => e.Latitude).Property(e => e.Minutos).HasColumnName("LatitudeMinutos");
            builder.OwnsOne(e => e.Latitude).Property(e => e.Segundos).HasColumnName("LatitudeSegundos");

            builder.OwnsOne(e => e.Longitude).Property(e => e.Segundos).HasColumnName("LongitudeSegundos");
            builder.OwnsOne(e => e.Longitude).Property(e => e.Minutos).HasColumnName("LongitudeMinutos");
            builder.OwnsOne(e => e.Longitude).Property(e => e.Graus).HasColumnName("LongitudeGraus");


        }
    }
}