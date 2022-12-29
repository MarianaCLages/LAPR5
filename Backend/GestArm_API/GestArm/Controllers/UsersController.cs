using System.Data;
using GestArm.Domain.Users;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace GestArm.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;
    
    public UserController(IUserService service)
    {
        _service = service;
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

    // PUT: api/Order/id
    [Route("~/api/[controller]/changeByEmail", Name = "UpdateUser")]
    [HttpPut ("changeByEmail")]
    public async Task<ActionResult<UserDTO>> UpdateAsync(string email, UserDTO userReceived)
    {
        try
        {
            var user = await _service.GetByEmail(email);
            
            if (user == null) return NotFound();
            
            var cat = await _service.UpdateAsync(userReceived, email);

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
    //DELETE: api/User/byEmailDelete?email=XXXX
    [Route("~/api/[controller]/byEmailDelete", Name = "SoftDeleteUser")]
    [HttpDelete ("byEmailDelete")]
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

            if(users.Count() == 0)
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

             if(users.Count() == 0)
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