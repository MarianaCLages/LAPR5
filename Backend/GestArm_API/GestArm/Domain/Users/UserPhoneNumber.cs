using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserPhoneNumber : ValueObject
{
    public UserPhoneNumber(string phoneNumber)
    {
        //check if the phone number is valid
        isValid(phoneNumber);
        PhoneNumber = phoneNumber;
    }

    private void isValid(string phoneNumber)
    {
        if (phoneNumber == null)
            throw new BusinessRuleValidationException("Phone Number cannot be null");

        if (phoneNumber.Length != 9)
            throw new BusinessRuleValidationException("Phone Number needs to be 9 characters");

        if (phoneNumber.Contains(" "))
            throw new BusinessRuleValidationException("Phone Number cannot contain spaces");
    }

    public string PhoneNumber { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return PhoneNumber;
    }

    public string getValue()
    {
        return PhoneNumber;
    }
}