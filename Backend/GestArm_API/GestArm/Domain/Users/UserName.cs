using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserName : ValueObject
{
    public UserName(string name)
    {
        //check if the user name is valid
        IsValid(name);
        Name = name;
    }

    private void IsValid(string name)
    {
        if (name == null)
            throw new BusinessRuleValidationException("Name cannot be null");

        if (name.Length < 5)
            throw new BusinessRuleValidationException("Name needs to be higher than 5 characters");

        if (name.Length > 50)
            throw new BusinessRuleValidationException("Name needs to be lower than 50 characters");
    }

    public string Name { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Name;
    }

    public string GetValue()
    {
        return Name;
    }
}