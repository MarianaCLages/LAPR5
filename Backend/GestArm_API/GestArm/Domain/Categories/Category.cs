using GestArm.Domain.Shared;

namespace GestArm.Domain.Categories;

public class Category : Entity<CategoryId>, IAggregateRoot
{
    private Category()
    {
        Active = true;
    }

    public Category(string description)
    {
        Id = new CategoryId(Guid.NewGuid());
        Description = description;
        Active = true;
    }

    public string Description { get; private set; }

    public bool Active { get; private set; }

    public void ChangeDescription(string description)
    {
        if (!Active)
            throw new BusinessRuleValidationException(
                "It is not possible to change the description to an inactive category.");
        Description = description;
    }

    public void MarkAsInative()
    {
        Active = false;
    }
}