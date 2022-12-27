namespace GestArm.Domain.Users;

public class CreateUserDTO
{
    public CreateUserDTO(string userName, string role, string email, string phoneNumber, string birthDate)
    {
        Name = userName;
        Role = role;
        Email = email;
        PhoneNumber = phoneNumber;
        Activated = true;
        BirthDate = birthDate;
    }

    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string PhoneNumber { get; set; }
    public string BirthDate { get; set; }
    public bool Activated { get; set; }
}