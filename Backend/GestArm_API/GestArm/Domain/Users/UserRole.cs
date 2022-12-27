using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserRole : ValueObject
{
    public UserRole(string role)
    {
        //check if the role is valid
        IsValid(role);
        Role = role;
    }

    private void IsValid(string role)
    {
        switch (role)
        {
            case "Admin":
                break;
            case "User":
                break;
            case "LogisticManager":
                break;
            case "WarehouseManager":
                break;
            case "FleetManager":
                break;
            default:
                throw new BusinessRuleValidationException("Role is not valid!");
        }
    }

    public string Role { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Role;
    }

    public string GetValue()
    {
        return Role;
    }

}