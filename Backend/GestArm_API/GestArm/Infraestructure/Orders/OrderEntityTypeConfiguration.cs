using GestArm.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestArm.Infrastructure.Orders;

internal class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Order")
            .HasKey(e => e.Id);
        //mapeia cada value object
        //id de dominio
        builder.OwnsOne(e => e.OrderDomainId).Property(x => x._id).HasColumnName("OrderDomainId")
            .IsRequired();
        //data de order
        builder.OwnsOne(e => e.OrderDate).Property(x => x.Data).HasColumnName("OrderDate").IsRequired();
        //mass de order
        builder.OwnsOne(e => e.OrderMass).Property(x => x.Mass).HasColumnName("OrderMass").IsRequired();
        //time de carga
        builder.OwnsOne(e => e.ChargingTime).Property(x => x.Minutes).HasColumnName("ChargingTime").IsRequired();
        //time de descarga
        builder.OwnsOne(e => e.UnloadingTime).Property(x => x.Minutes).HasColumnName("UnloadingTime").IsRequired();

        //Id do Warehouse
        builder.Property<string>("WarehouseId").IsRequired();
    }
}