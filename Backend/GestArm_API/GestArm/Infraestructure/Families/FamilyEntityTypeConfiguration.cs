using GestArm.Domain.Families;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestArm.Infrastructure.Categories;

internal class FamilyEntityTypeConfiguration : IEntityTypeConfiguration<Family>
{
    public void Configure(EntityTypeBuilder<Family> builder)
    {
        //builder.ToTable("Families", SchemaNames.GestArm);
        builder.HasKey(b => b.Id);
        //builder.Property<bool>("_active").HasColumnName("Active");
    }
}