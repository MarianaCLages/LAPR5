using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserActivate : ValueObject
{

    public UserActivate(bool activated)
    {
        Activated = activated;
    }
    
    
    public bool Activated { get; set; }

    public void ActivateUser()
    {
        Activated = true;
    }

    public void DesactivateUser()
    {
        Activated = false;
    }
    
    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Activated;
    }
}