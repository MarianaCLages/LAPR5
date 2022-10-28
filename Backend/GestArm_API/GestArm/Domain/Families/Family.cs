using GestArm.Domain.Shared;

namespace GestArm.Domain.Families;

public class Family : Entity<FamilyId>, IAggregateRoot
{
    private Family()
    {
        Active = true;
    }

    public Family(string code, string description)
    {
        Id = new FamilyId(code);
        Description = description;
        Active = true;
    }

    public string Description { get; private set; }

    public bool Active { get; private set; }

    public void ChangeDescription(string description)
    {
        if (!Active)
            throw new BusinessRuleValidationException(
                "It is not possible to change the description to an inactive family.");
        Description = description;
    }

    public void MarkAsInative()
    {
        Active = false;
    }
}