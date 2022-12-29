namespace GestArm.Domain.Users;

public interface IUserService
{
    Task<UserDTO> GetByIdAsync(UserID id);

    Task<UserDTO> GetByEmail(string email);

    Task<List<UserDTO>> GetByUserName(string name);

    Task<UserDTO> GetByPhoneNumber(string phoneNumber);

    Task<List<UserDTO>> GetAllAsync();

    Task<UserDTO> AddAsync(CreateUserDTO dto);

    Task<UserDTO> UpdateAsync(UserDTO dto,string email);

    Task<UserDTO> AdminUpdateAsync(UserDTO dto,string email);

    Task<UserDTO> AnonymizeUser(string email);

    Task<bool> SoftDeleteAsync(string email);

    Task<bool> UpdateUserRole(string userRole, string userEmail);

}