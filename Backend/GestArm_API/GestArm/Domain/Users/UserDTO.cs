namespace GestArm.Domain.Users;

public class UserDTO
{
    public UserDTO(UserID id, string userName, string role, string email, string phoneNumber, bool activated, string birthDate)
    {
        Id = id;
        Name = userName;
        Role = role;
        Email = email;
        PhoneNumber = phoneNumber;
        Activated = activated;
        BirthDate = birthDate;
    }

    public UserID Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string PhoneNumber { get; set; }
    public string BirthDate { get; set; }
    public bool Activated { get; set; }
}