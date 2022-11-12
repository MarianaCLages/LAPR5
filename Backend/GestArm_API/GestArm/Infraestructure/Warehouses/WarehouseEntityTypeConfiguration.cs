using GestArm.Domain.Warehouses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestArm.Infrastructure.Warehouses;

internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
{
    public void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        builder.ToTable("Warehouse");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).HasColumnName("Id");
        builder.OwnsOne(e => e.AlphaNumId).Property(e => e.AlphaNumId).HasColumnName("AlphaNumId").IsRequired();
        builder.OwnsOne(e => e.Designation).Property(e => e.Designation).HasColumnName("Designation").IsRequired();
        //builder.Property(e => e.Address).HasColumnName("Address");
        builder.OwnsOne(e => e.Address).Property(e => e.Street).HasColumnName("Street").IsRequired();
        builder.OwnsOne(e => e.Address).Property(e => e.DoorNumber).HasColumnName("DoorNumber").IsRequired();
        builder.OwnsOne(e => e.Address).Property(e => e.PostalCode).HasColumnName("PostalCode").IsRequired();
        builder.OwnsOne(e => e.Address).Property(e => e.City).HasColumnName("City").IsRequired();
        builder.OwnsOne(e => e.Address).Property(e => e.Country).HasColumnName("Country").IsRequired();

        builder.OwnsOne(e => e.Latitude).Property(e => e.Degrees).HasColumnName("LatitudeDegrees").IsRequired();
        builder.OwnsOne(e => e.Latitude).Property(e => e.Minutes).HasColumnName("LatitudeMinutes").IsRequired();
        builder.OwnsOne(e => e.Latitude).Property(e => e.Seconds).HasColumnName("LatitudeSeconds").IsRequired();

        builder.OwnsOne(e => e.Longitude).Property(e => e.Seconds).HasColumnName("LongitudeSeconds").IsRequired();
        builder.OwnsOne(e => e.Longitude).Property(e => e.Minutes).HasColumnName("LongitudeMinutes").IsRequired();
        builder.OwnsOne(e => e.Longitude).Property(e => e.Degrees).HasColumnName("LongitudeDegrees").IsRequired();
    }
}