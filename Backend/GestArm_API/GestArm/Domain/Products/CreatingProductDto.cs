using GestArm.Domain.Categories;

namespace GestArm.Domain.Products;

public class CreatingProductDto
{
    public CreatingProductDto(string description, CategoryId catId)
    {
        Description = description;
        CategoryId = catId;
    }

    public string Description { get; set; }

    public CategoryId CategoryId { get; set; }
}