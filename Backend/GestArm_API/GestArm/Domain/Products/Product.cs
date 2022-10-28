using GestArm.Domain.Categories;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Products;

public class Product : Entity<ProductId>, IAggregateRoot
{
    private Product()
    {
        Active = true;
    }

    public Product(string description, CategoryId catId)
    {
        if (catId == null)
            throw new BusinessRuleValidationException("Every product requires a category.");
        Id = new ProductId(Guid.NewGuid());
        Description = description;
        CategoryId = catId;
        Active = true;
    }

    public string Description { get; private set; }

    public CategoryId CategoryId { get; private set; }
    public bool Active { get; private set; }

    public void ChangeDescription(string description)
    {
        if (!Active)
            throw new BusinessRuleValidationException(
                "It is not possible to change the description to an inactive product.");
        Description = description;
    }

    public void ChangeCategoryId(CategoryId catId)
    {
        if (!Active)
            throw new BusinessRuleValidationException(
                "It is not possible to change the category of an inactive product.");
        if (catId == null)
            throw new BusinessRuleValidationException("Every product requires a category.");
        CategoryId = catId;
        ;
    }

    public void MarkAsInative()
    {
        Active = false;
    }
}