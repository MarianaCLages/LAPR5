using GestArm.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestArm.Infrastructure.Products;

internal class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        //builder.ToTable("Products", SchemaNames.GestArm);
        builder.HasKey(b => b.Id);
    }
}