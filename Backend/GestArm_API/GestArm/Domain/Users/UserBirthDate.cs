using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserBirthDate : ValueObject
{
    public UserBirthDate(DateTime birthDate)
    {
        //check if the user name is valid
        isValid(birthDate);
        BirthDate = birthDate;
    }

    private void isValid(DateTime birthDate)
    {
        if (birthDate == null)
            throw new BusinessRuleValidationException("BirthDate cannot be null!");

        if (birthDate > DateTime.Now) 
            throw new BusinessRuleValidationException("The birth date cannot be in the future!");
    }

    public DateTime BirthDate { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return BirthDate;
    }

    public DateTime getValue()
    {
        return BirthDate;
    }
}