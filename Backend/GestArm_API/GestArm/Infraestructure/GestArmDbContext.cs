using GestArm.Domain.Warehouses;
using GestArm.Domain.Categories;
using GestArm.Domain.Orders;
using GestArm.Domain.Families;
using GestArm.Domain.Products;
using GestArm.Domain.Users;
using GestArm.Infrastructure.Warehouses;
using GestArm.Infrastructure.Categories;
using GestArm.Infrastructure.Orders;
using GestArm.Infrastructure.Products;
using GestArm.Infrastructure.Users;
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

    public DbSet<Order> Orders { get; set; }

    public DbSet<Warehouse> Warehouses { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new OrderEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
    }
}