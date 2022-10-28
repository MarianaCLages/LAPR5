using GestArm.Domain.Armazens;
using GestArm.Domain.Categories;
using GestArm.Domain.Encomendas;
using GestArm.Domain.Families;
using GestArm.Domain.Products;
using GestArm.Infrastructure.Armazens;
using GestArm.Infrastructure.Categories;
using GestArm.Infrastructure.Encomendas;
using GestArm.Infrastructure.Products;
using Microsoft.EntityFrameworkCore;

namespace GestArm.Infrastructure;

public class GestArmDbContext : DbContext
{
    public GestArmDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<Family> Families { get; set; }

    public DbSet<Encomenda> Encomendas { get; set; }

    public DbSet<Armazem> Armazens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new EncomendaEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ArmazemEntityTypeConfiguration());
    }
}