using GestArm.Domain.Encomendas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestArm.Infrastructure.Encomendas;

internal class EncomendaEntityTypeConfiguration : IEntityTypeConfiguration<Encomenda>
{
    public void Configure(EntityTypeBuilder<Encomenda> builder)
    {
        builder.ToTable("Encomenda")
            .HasKey(e => e.Id);
        //mapeia cada value object
        //id de dominio
        builder.OwnsOne(e => e.EncomendaDomainId).Property(x => x._id).HasColumnName("EncomendaDomainId")
            .IsRequired();
        //data de entrega
        builder.OwnsOne(e => e.DataEntrega).Property(x => x.Data).HasColumnName("DataEntrega").IsRequired();
        //massa de entrega
        builder.OwnsOne(e => e.MassaEntrega).Property(x => x.Massa).HasColumnName("MassaEntrega").IsRequired();
        //tempo de carga
        builder.OwnsOne(e => e.TempoCarga).Property(x => x.Minutos).HasColumnName("TempoCarga").IsRequired();
        //tempo de descarga
        builder.OwnsOne(e => e.TempoDescarga).Property(x => x.Minutos).HasColumnName("TempoDescarga").IsRequired();

        //Id do Armazem
        builder.Property<string>("ArmazemId").IsRequired();
    }
}