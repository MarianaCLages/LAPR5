using Microsoft.EntityFrameworkCore;
using GestArm.Domain.Categories;
using GestArm.Domain.Products;
using GestArm.Domain.Families;
using GestArm.Infrastructure.Categories;
using GestArm.Infrastructure.Products;
using GestArm.Infrastructure.Armazens;
using GestArm.Domain.Armazens;

namespace GestArm.Infrastructure
{
    public class GestArmDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Armazem> Armazens { get; set; }

        public GestArmDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ArmazemEntityTypeConfiguration());
        }
    }
}