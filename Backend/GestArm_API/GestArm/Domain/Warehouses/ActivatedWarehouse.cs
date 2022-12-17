using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

public class ActivatedWarehouse : ValueObject
{

    public ActivatedWarehouse(bool activated)
    {
        Activated = activated;
    }
    
    
    public bool Activated { get; set; }

    public void ActivateWarehouse()
    {
        Activated = true;
    }

    public void DesactivateWarehouse()
    {
        Activated = false;
    }
    
    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Activated;
    }
}