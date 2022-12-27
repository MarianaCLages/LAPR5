using GestArm.Domain.Users;
using GestArm.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestArm.Infrastructure.Users;

public class UserRepository : BaseRepository<User, UserID>, IUserRepository
{
    private readonly GestArmDbContext _context;

    public UserRepository(GestArmDbContext context) : base(context.Users)
    {
        _context = context;
    }
    
    public Task<List<User>> GetAllAsync()
    {
        var users = _context.Users.ToList();
        return Task.FromResult(users);
    }


    public async Task<User> AddAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
       _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> GetByIdAsync(UserID userId)
    {
        return await _context.Users.Where(r => r.Id.Equals(userId))
            .FirstOrDefaultAsync();
    }

    public async Task<List<User>> GetByUserNameAsync(UserName userName)
    {
        return await _context.Users.Where(r => r.Name.Name.Equals(userName.Name))
            .ToListAsync();
    }

    public async Task<User> GetByEmailAsync(UserEmail email)
    {
        return await _context.Users.Where(r => r.Email.Email.Equals(email.Email))
            .FirstOrDefaultAsync();
    }

    public async Task<User> GetByPhoneNumberAsync(UserPhoneNumber phoneNumber)
    {
        return await _context.Users.Where(r => r.PhoneNumber.PhoneNumber.Equals(phoneNumber.PhoneNumber))
            .FirstOrDefaultAsync();
    }
}