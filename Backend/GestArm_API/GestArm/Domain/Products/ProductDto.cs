using GestArm.Domain.Categories;

namespace GestArm.Domain.Products;

public class ProductDto
{
    public ProductDto(Guid Id, string description, CategoryId catId)
    {
        this.Id = Id;
        Description = description;
        CategoryId = catId;
    }

    public Guid Id { get; set; }
    public string Description { get; set; }

    public CategoryId CategoryId { get; set; }
}