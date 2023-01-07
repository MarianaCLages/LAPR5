using GestArm.Domain.Users;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using System.Net;

namespace GestArm.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    private readonly IVerifyTokenService _serviceJWT;

    private IConfiguration Configuration { get; }

    public UserController(IUserService service, IConfiguration configuration, IVerifyTokenService verifyTokenService)
    {
        _service = service;
        Configuration = configuration;
        _serviceJWT = verifyTokenService;

    }

    [HttpPost("newUser")]
    public async Task<ActionResult<UserCredentialDTO>> NewUserInformation([FromBody] string credential)
    {
        try
        {
            var userCredentials = await _serviceJWT.VerifyGoogleTokenAndGenerateUserCredentials(credential);

            if (userCredentials == null)
            {
                return BadRequest(new { message = "Invalid Google Token!" });
            }

            return userCredentials;
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
            var userCredentials = await _serviceJWT.VerifyGoogleTokenAndGenerateUserCredentials(credential);

            if (userCredentials == null)
            {
                return BadRequest(new { message = "Invalid Google Token!" });
            }

            return userCredentials;
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
            var userDTO = await _serviceJWT.VerifyJWTToken(credential);

            var newUser = false;
            var role = "User";
            var email = "";
            var name = "";

            var activated = false;

            if (userDTO == null)
            {
                var userTemp = await _serviceJWT.VerifyGoogleTokenAndGenerateUserCredentials(credential);

                newUser = true;
                activated = true;
                email = userTemp.Email;
                name = userTemp.Name;
                role = userTemp.Role;

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
            var userDTO = await (_serviceJWT.VerifyJWTToken(credential));

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
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());
        
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
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());
        
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

    // PUT: api/User/anonymizeUser?email=XXXX
    [Route("~/api/[controller]/anonymizeUser", Name = "AnonymizeUser")]
    [HttpPatch("anonymize")]
    public async Task<ActionResult<UserDTO>> AnonymizeAsync(string email)
    {
        try
        {
            var user = await _service.GetByEmail(email);

            if (user == null) return NotFound();

            var cat = await _service.AnonymizeUser(email);

            if (cat == null) return NotFound();

            await _service.SpecialSoftDeleteAsync(email);

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

    //PATCH: api/User/byEmailDelete?email=XXXX
    [Route("~/api/[controller]/byEmailDelete", Name = "SoftDeleteUser")]
    [HttpPatch("byEmailDelete")]
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
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());
        
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
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());
        
        try
        {
            var user = await _service.GetByEmail(email);

            if (user == null)
                return NotFound("No user with that email was found!");

            Console.WriteLine("User: " + user.Id + " " + user.Email + " " + user.Role);
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
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());
        
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
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

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

    private async Task<HttpResponseMessage> VerifyUserAccess() {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if(token == null) {
            return new HttpResponseMessage(HttpStatusCode.Unauthorized)
            {
                Content = new StringContent("No Authorization header is present")
            };
        }
        
        string[] role = {"Admin"};

        if(await this._serviceJWT.VerifyUserAccess(token, role)) {
             return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("User is authorized")
            };
        }

        else {
            return new HttpResponseMessage(HttpStatusCode.Forbidden)
            {
                Content = new StringContent("User is not authorized")
            };
        }

    }

}