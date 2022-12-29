namespace GestArm.Domain.Users;
using GestArm.Domain.Shared;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<UserDTO> GetByIdAsync(UserID id)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user == null) return null;

        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    }

    public async Task<UserDTO> GetByEmail(string email)
    {
        var user = await _repository.GetByEmailAsync(new UserEmail(email));

        if (user == null) return null;

        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    }

    public async Task<List<UserDTO>> GetByUserName(string name)
    {
        var list = await _repository.GetByUserNameAsync(new UserName(name));

        if (list.Count == 0)
        {
            return null;
        }

        var listDto = list.ConvertAll(user =>
            new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString()));

        return listDto;
    }

    public async Task<UserDTO> GetByPhoneNumber(string phoneNumber)
    {
        var user = await _repository.GetByPhoneNumberAsync(new UserPhoneNumber(phoneNumber));

        if (user == null) return null;

        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    }

    public async Task<List<UserDTO>> GetAllAsync()
    {
        var list = await _repository.GetAllAsync();

        var listDto = list.ConvertAll(user =>
            new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString()));

        return listDto;
    }

    public async Task<UserDTO> AddAsync(CreateUserDTO dto)
    {
        await VerifyParams(dto);

        var user = new User(new UserName(dto.Name), new UserEmail(dto.Email), new UserRole(dto.Role), new UserPhoneNumber(dto.PhoneNumber), new UserBirthDate(DateTime.Parse(dto.BirthDate)));

        await _repository.AddAsync(user);

        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    }

     public async Task<UserDTO> AdminUpdateAsync(UserDTO dto, string email)
    {
        var user = await _repository.GetByEmailAsync(new UserEmail(email));

        if (user == null) return null;

        if (dto.BirthDate != null)
        {
            user.ChangeBirthDate(new UserBirthDate(DateTime.Parse(dto.BirthDate)));
        }
        if (dto.Email != null)
        {
            user.ChangeEmail(new UserEmail(dto.Email));
        }
        if (dto.Name != null)
        {
            user.ChangeName(new UserName(dto.Name));
        }
        if (dto.PhoneNumber != null)
        {
            user.ChangePhoneNumber(new UserPhoneNumber(dto.PhoneNumber));
        }

        if(dto.Role != null)
        {
            user.ChangeRole(new UserRole(dto.Role));
        }

        await _repository.UpdateAsync(user);

        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    }


    public async Task<UserDTO> UpdateAsync(UserDTO dto, string email)
    {
        var user = await _repository.GetByEmailAsync(new UserEmail(email));

        if (user == null) return null;

        if (dto.BirthDate != null)
        {
            user.ChangeBirthDate(new UserBirthDate(DateTime.Parse(dto.BirthDate)));
        }
        if (dto.Email != null)
        {
            user.ChangeEmail(new UserEmail(dto.Email));
        }
        if (dto.Name != null)
        {
            user.ChangeName(new UserName(dto.Name));
        }
        if (dto.PhoneNumber != null)
        {
            user.ChangePhoneNumber(new UserPhoneNumber(dto.PhoneNumber));
        }

        if (dto.Role != null)
        {
            user.ChangeRole(new UserRole(dto.Role));
        }

        await _repository.UpdateAsync(user);

        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    }

    public async Task<UserDTO> AnonymizeUser(string email)
    {
        var user = await _repository.GetByEmailAsync(new UserEmail(email));

        if (user == null) return null;

        user.ChangeName(new UserName(user.GetHashCodeName()));
        user.ChangePhoneNumber(new UserPhoneNumber(user.GetHashCode().ToString()));
        return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
        }


    public async Task<bool> SoftDeleteAsync(string email)
    {
        var user = await _repository.GetByEmailAsync(new UserEmail(email));

        if (user == null) return false;

        if (user.Activated.Activated)
            user.DesactivateUser();
        else
            user.ActivateUser();

        await _repository.UpdateAsync(user);

        return true;
    }

    public async Task<bool> UpdateUserRole(string userRole, string userEmail)
    {
        //Condition to verify the user logged can change the role or not!!

        var user = await _repository.GetByEmailAsync(new UserEmail(userEmail));

        if (user == null) throw new BusinessRuleValidationException("No User found with that email!");

        user.ChangeRole(new UserRole(userRole));

        await _repository.UpdateAsync(user);

        return true;
    }

    private async Task<bool> VerifyParams(CreateUserDTO dto)
    {
        var userVerify = await _repository.GetByEmailAsync(new UserEmail(dto.Email));

        if (userVerify != null) throw new BusinessRuleValidationException("There already exists a user with that email!");

        userVerify = await _repository.GetByPhoneNumberAsync(new UserPhoneNumber(dto.PhoneNumber));

        if (userVerify != null) throw new BusinessRuleValidationException("There already exists a user with that user phone number!");

        return true;
    }

}