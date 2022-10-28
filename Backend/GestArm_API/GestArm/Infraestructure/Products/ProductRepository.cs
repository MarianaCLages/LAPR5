using GestArm.Domain.Products;
using GestArm.Infrastructure.Shared;

namespace GestArm.Infrastructure.Products;

public class ProductRepository : BaseRepository<Product, ProductId>, IProductRepository
{
    public ProductRepository(GestArmDbContext context) : base(context.Products)
    {
    }
}