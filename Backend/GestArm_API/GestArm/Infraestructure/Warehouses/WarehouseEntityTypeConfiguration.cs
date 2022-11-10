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
        builder.OwnsOne(e => e.AlphaNumId).Property(e => e.AlphaNumId).HasColumnName("AlphaNumId");
        builder.OwnsOne(e => e.Designation).Property(e => e.Designation).HasColumnName("Designation");
        //builder.Property(e => e.Address).HasColumnName("Address");
        builder.OwnsOne(e => e.Address).Property(e => e.Street).HasColumnName("Street");
        builder.OwnsOne(e => e.Address).Property(e => e.DoorNumber).HasColumnName("DoorNumber");
        builder.OwnsOne(e => e.Address).Property(e => e.PostalCode).HasColumnName("PostalCode");
        builder.OwnsOne(e => e.Address).Property(e => e.City).HasColumnName("City");
        builder.OwnsOne(e => e.Address).Property(e => e.Country).HasColumnName("Country");

        builder.OwnsOne(e => e.Latitude).Property(e => e.Degrees).HasColumnName("LatitudeDegrees");
        builder.OwnsOne(e => e.Latitude).Property(e => e.Minutes).HasColumnName("LatitudeMinutes");
        builder.OwnsOne(e => e.Latitude).Property(e => e.Seconds).HasColumnName("LatitudeSeconds");

        builder.OwnsOne(e => e.Longitude).Property(e => e.Seconds).HasColumnName("LongitudeSeconds");
        builder.OwnsOne(e => e.Longitude).Property(e => e.Minutes).HasColumnName("LongitudeMinutes");
        builder.OwnsOne(e => e.Longitude).Property(e => e.Degrees).HasColumnName("LongitudeDegrees");
    }
}