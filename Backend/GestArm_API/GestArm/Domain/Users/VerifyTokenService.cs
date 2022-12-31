namespace GestArm.Domain.Users;

using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GestArm.Domain.Shared;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;

public class VerifyTokenService : IVerifyTokenService
{
    private readonly IUserRepository _repository;

    private readonly IVerifyTokenRepository _repositoryToken;

    private IConfiguration Configuration { get; }

    public VerifyTokenService(IUserRepository repository, IConfiguration configuration, IVerifyTokenRepository repositoryToken)
    {
        _repository = repository;
        Configuration = configuration;
        _repositoryToken = repositoryToken;
    }

    public async Task<UserDTO> VerifyJWTToken(string token)
    {
        if (token == null)
            return null;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(Configuration.GetConnectionString("Client_Secret"));

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var email = jwtToken.Claims.First(x => x.Type == "email").Value;

            var user = await _repository.GetByEmailAsync(new UserEmail(email));

            if (user == null)
            {
                return null;
            }

            return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
        }
        catch
        {
            return null;
        }
    }

    public async Task<UserCredentialDTO> VerifyGoogleTokenAndGenerateUserCredentials(string token)
    {
        var payload = await this._repositoryToken.GetPayloadFromGoogle(token);

        if (payload == null)
            return null;

        var encrypterToken = await GenerateJWTToken(payload);

        var user = await _repository.GetByEmailAsync(new UserEmail(payload.Email));

        var newUser = false;
        var role = "User";

        var activated = false;

        if (user == null)
        {
            newUser = true;
            activated = true;

        }
        else
        {
            role = user.Role.Role;
            activated = user.Activated.Activated;
        }

        return new UserCredentialDTO(encrypterToken, payload.Name, payload.Email, newUser, role, activated);
    }


    private async Task<string> GenerateJWTToken(GoogleJsonWebSignature.Payload payload)
    {

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(Configuration.GetConnectionString("Client_Secret"));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name, payload.Name),
                    new Claim(ClaimTypes.Email, payload.Email),
            }),

            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        var encrypterToken = tokenHandler.WriteToken(token);

        return encrypterToken;
    }

    // public async Task<UserDTO> VerifyGoogleTokenAndGenerateUserCredentials(string token)
    // {
    //     var payload = await this._repositoryToken.GetPayloadFromGoogle(token);

    //     if (payload == null)
    //         return null;

    //     var encrypterToken = await GenerateJWTToken(payload);

    //     var user = await _repository.GetByEmailAsync(new UserEmail(payload.Email));

    //     if (user == null)
    //     {
    //         return null;
    //     }
    //     return new UserDTO(user.Id, user.Name.Name, user.Role.Role, user.Email.Email, user.PhoneNumber.PhoneNumber, user.Activated.Activated, user.BirthDate.BirthDate.ToString());
    // }



}