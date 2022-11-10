using GestArm.Domain.Shared;

namespace GestArm.Domain.Warehouses;

public class DesignationWarehouse : ValueObject
{
    public DesignationWarehouse(string designation)
    {
        checkDesignation(designation);
        Designation = designation;
    }

    public string Designation { get; set; }


    private void checkDesignation(string designation)
    {
        if (designation == null) throw new BusinessRuleValidationException("Designation cannot be empty");

        if (designation.Length > 50)
            throw new BusinessRuleValidationException("Designation exceeds number of characters");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Designation;
    }
}