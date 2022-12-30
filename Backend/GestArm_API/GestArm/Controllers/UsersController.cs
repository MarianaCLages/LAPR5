using System.Data;
using GestArm.Domain.Users;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Google.Apis.Auth;

namespace GestArm.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    private IConfiguration Configuration { get; }

    public UserController(IUserService service, IConfiguration configuration)
    {
        _service = service;
        Configuration = configuration;
    }

    private async Task<UserDTO> ValidateJWTToken(string token)
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

            var user = await _service.GetByEmail(email);

            if (user == null)
            {
                return null;
            }

            return user;
        }
        catch
        {
            return null;
        }
    }

    [HttpPost("newUser")]
    public async Task<ActionResult<UserCredentialDTO>> NewUserInformation([FromBody] string credential)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> { Configuration.GetConnectionString("Client_ID") }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);

            if (payload.Name == null || payload.Email == null)
            {
                return BadRequest(new { message = "Invalid Google Token!" });
            }

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

            var newUser = false;
            var role = "User";

            var activated = false;

            var user = await _service.GetByEmail(payload.Email);

            if (user == null)
            {
                newUser = true;
                activated = true;

            }
            else
            {
                role = user.Role;
                activated = user.Activated;
            }

            return new UserCredentialDTO(encrypterToken, payload.Name, payload.Email, newUser, role, activated);
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
              
    }


    // GET: api/User/loginWithGoogle
    [HttpPost("loginWithGoogle")]
    public async Task<ActionResult<UserCredentialDTO>> LoginWithGoogle([FromBody] string credential)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> { Configuration.GetConnectionString("Client_ID") }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);

            if (payload.Name == null || payload.Email == null)
            {
                return BadRequest(new { message = "Invalid Google Token!" });
            }

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

            var newUser = false;
            var role = "User";

            var activated = false;

            var user = await _service.GetByEmail(payload.Email);

            if (user == null)
            {
                newUser = true;
                activated = true;

            }
            else
            {
                role = user.Role;
                activated = user.Activated;
            }

            return new UserCredentialDTO(encrypterToken, payload.Name, payload.Email, newUser, role, activated);
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    // Post: api/User/getUserRole
    [HttpPost("getUserRole")]
    public async Task<ActionResult<UserCredentialDTO>> GetUserRole([FromBody] string credential)
    {
        try
        {
            var userDTO = await (ValidateJWTToken(credential));

            var newUser = false;
            var role = "User";
            var email = "";
            var name = "";

            var activated = false;

            if (userDTO == null)
            {
                newUser = true;
                activated = true;

                var userTemp = LoginWithGoogle(credential);
                
                email = userTemp.Result.Value.Email;
                name = userTemp.Result.Value.Name;
                role = userTemp.Result.Value.Role;

            }
            else
            {
                email = userDTO.Email;
                name = userDTO.Name;
                role = userDTO.Role;
                activated = userDTO.Activated;
            }

            return new UserCredentialDTO(credential, name, email, newUser, role, activated);
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    // Post: api/User/getProfileInfo
    [HttpPost("getProfileInfo")]
    public async Task<ActionResult<UserDTO>> GetProfileInfo([FromBody] string credential)
    {
        try
        {
            var userDTO = await (ValidateJWTToken(credential));

            if (userDTO != null)
            {
                return userDTO;
            }
            return BadRequest(new { message = "No user with that email was found!" });
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }


    // GET: api/User/byId?id=XXXX
    [HttpGet("byId")]
    public async Task<ActionResult<UserDTO>> GetById(Guid id)
    {
        try
        {
            var user = await _service.GetByIdAsync(new UserID(id));

            if (user == null)
                throw new BusinessRuleValidationException("Does not exist an user wtih that ID!");

            return user;
        }
        catch (BusinessRuleValidationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the user! (No user with that ID was found)");
        }
    }

    //POST: api/User
    [HttpPost]
    public async Task<ActionResult<UserDTO>> AddAsync(CreateUserDTO dto)
    {
        try
        {
            var user = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("It was not possible to add the user! (Invalid Date!)");
        }
    }

    // PUT: api/Order/byEmail?email=XXXX (body: UserDTO)
    [Route("~/api/[controller]/adminByEmail", Name = "AdminUpdateUser")]
    [HttpPut("byEmail")]
    public async Task<ActionResult<UserDTO>> AdminUpdateAsync(string email, UserDTO userReceived)
    {
        try
        {
            var user = await _service.GetByEmail(email);

            if (user == null) return NotFound();

            var cat = await _service.AdminUpdateAsync(userReceived, email);

            if (cat == null) return NotFound();

            return Ok(cat);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Error on updating the user! (Please specify a valid date!)");
        }
    }

    // PUT: api/User/anonymize?email=XXXX
    [Route("~/api/[controller]/anonymize", Name = "AnonymizeUser")]
    [HttpPut("anonymize")]
    public async Task<ActionResult<UserDTO>> AnonymizeAsync(string email)
    {
        try
        {
            var user = await _service.GetByEmail(email);

            if (user == null) return NotFound();

            var cat = await _service.AnonymizeUser(email);

            if (cat == null) return NotFound();

            return Ok(cat);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Error on updating the user! (Please specify a valid email!)");
        }
    }

    //DELETE: api/User/byEmailDelete?email=XXXX
    [Route("~/api/[controller]/byEmailDelete", Name = "SoftDeleteUser")]
    [HttpDelete("byEmailDelete")]
    public async Task<ActionResult<bool>> SoftDeleteAsync(string email)
    {
        try
        {
            var order = await _service.SoftDeleteAsync(email);

            if (order == false)
                throw new BusinessRuleValidationException("No user with that email was found!");

            return true;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the user! (No user with that email was found!)");
        }
    }

    //GET: api/User
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllAsync()
    {
        try
        {
            var users = await _service.GetAllAsync();

            if (users.Count() == 0)
                throw new BusinessRuleValidationException("No users were found!");

            return users.ToList();
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the user! (No user was found!)");
        }
    }

    // GET: api/User/byEmail?email=XXXX
    [Route("~/api/[controller]/byEmail", Name = "GetUserByEmail")]
    [HttpGet("byEmail")]
    public async Task<ActionResult<UserDTO>> GetByEmailAsync(string email)
    {
        try
        {
            var user = await _service.GetByEmail(email);

            if (user == null)
                return NotFound("No user with that email was found!");

            return user;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the order!(Please specify a valid email address)");
        }
    }

    // GET: api/User/byPhoneNumber?phoneNumber=XXXX
    [Route("~/api/[controller]/byPhoneNumber", Name = "GetUserByPhoneNumber")]
    [HttpGet("byPhoneNumber")]
    public async Task<ActionResult<UserDTO>> GetByPhoneNumber(string phoneNumber)
    {
        try
        {
            var user = await _service.GetByPhoneNumber(phoneNumber);

            if (user == null)
                return NotFound("No user with that phoneNumber was found!");

            return user;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the order!(Please specify a valid phoneNumber)");
        }
    }

    // GET: api/User/byUserName?userName=XXXX
    [Route("~/api/[controller]/byUserName", Name = "GetUserByUserName")]
    [HttpGet("byUserName")]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetByUserName(string userName)
    {
        try
        {
            var users = await _service.GetByUserName(userName);

            if (users.Count() == 0)
                throw new BusinessRuleValidationException("No users were found!");

            return users.ToList();
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the order! (No user was found!)");
        }
    }

}