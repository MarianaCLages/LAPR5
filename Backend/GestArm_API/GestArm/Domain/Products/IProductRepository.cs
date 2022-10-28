using GestArm.Domain.Shared;

namespace GestArm.Domain.Products;

public interface IProductRepository : IRepository<Product, ProductId>
{
}