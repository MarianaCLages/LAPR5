using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserEmail : ValueObject
{
    public UserEmail(string email)
    {
        //check if the email is valid
        isValid(email);
        Email = email;
    }

    private void isValid(string email)
    {
        if (email == null)
            throw new BusinessRuleValidationException("Email cannot be null");

        if (email.Length < 5)
            throw new BusinessRuleValidationException("Email needs to be higher than 5 characters");

        if (email.Length > 50)
            throw new BusinessRuleValidationException("Email needs to be lower than 50 characters");

        if (!email.Contains("@"))
            throw new BusinessRuleValidationException("Email needs to contain @");

        if (!email.Contains("."))
            throw new BusinessRuleValidationException("Email needs to contain .");

        if (email.Contains(" "))
            throw new BusinessRuleValidationException("Email cannot contain spaces");
    }

    public string Email { get; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Email;
    }

    public string getValue()
    {
        return Email;
    }
}