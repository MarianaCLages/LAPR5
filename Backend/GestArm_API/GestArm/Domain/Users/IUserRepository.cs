using GestArm.Domain.Shared;

namespace GestArm.Domain.Users;

public interface IUserRepository : IRepository<User, UserID>
{
    Task<User> GetByIdAsync(UserID id);

    Task<List<User>> GetAllAsync();

    Task<User> GetByEmailAsync(UserEmail email);

    Task<List<User>> GetByUserNameAsync(UserName name);

    Task<User> GetByPhoneNumberAsync(UserPhoneNumber number);

    Task<User> AddAsync(User user);

    Task<User> UpdateAsync(User user);

}