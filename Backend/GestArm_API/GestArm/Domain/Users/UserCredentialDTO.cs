using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public class UserCredentialDTO {
    public UserCredentialDTO(string token, string userName, string email, bool newUser, string role, bool activated) {
        Token = token;
        Name = userName;
        Email = email;
        NewUser = newUser ;
        Role = role;
        Activated = activated;
    }

    public bool Activated { get; set; }
    public string Token { get; set; }
    public string Name { get; set; }

    public string Email { get; set; }

    public bool NewUser { get; set; }

    public string Role  { get; set; }
   
}