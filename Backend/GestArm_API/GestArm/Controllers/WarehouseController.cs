using GestArm.Domain.Warehouses;
using GestArm.Domain.Shared;
using GestArm.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DDDNetCore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarehouseController : ControllerBase
{
    private readonly IWarehouseService _service;

    private readonly IVerifyTokenService _serviceJWT;

    public WarehouseController(IWarehouseService service, IVerifyTokenService verifyTokenService)
    {
        _service = service;
        _serviceJWT = verifyTokenService;
    }

    // GET: api/Warehouse/id?id=X
    [HttpGet("id")]
    public async Task<ActionResult<ActivatedWarehouseDTO>> GetById(Guid id)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouse = await _service.GetByIdAsync(new WarehouseId(id));

            if (warehouse == null) return NotFound("No warehouse with that Id was found!");

            return warehouse;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("No warehouse with that Id was found!");
        }
        
    }

    // GET: api/Warehouse/designation?designation=designation
    [HttpGet("designation")]
    public async Task<ActionResult<IEnumerable<ActivatedWarehouseDTO>>> GetByDesignation(string designation)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouse = await _service.GetByDesignationAsync(designation);

            if (warehouse == null) return NotFound("No warehouse with that designation was found!");

            return warehouse;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("No warehouse with that designation was found!!");
        }
    }

    // GET: api/Warehouse
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivatedWarehouseDTO>>> GetAll()
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouses = await _service.GetAllAsync();

            if (warehouses == null) return NotFound("No warehouse was found!");

            return warehouses;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("No warehouse was found!");
        }
    }

    //POST: api/Warehouse
    [HttpPost]
    public async Task<ActionResult<WarehouseDTO>> AddAsync(CreatingWarehouseDto dto)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouseCheck = await _service.GetByWarehouseIdAsync(dto.AlphaNumId);

            if (warehouseCheck != null)
                throw new BusinessRuleValidationException("There is already a warehouse with that alphaNumeric ID!");

            var warehouse = await _service.AddAsync(dto);
            
            return CreatedAtAction(nameof(GetById), new { id = warehouse.Id }, warehouse);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return BadRequest("An error occured creating the warehouse! (Please specify a valid AlphaID!)");
        }
    }

    // GET: api/Warehouse/search/warehouseId
    //MÉTODO DO REPOSITORIO WAREHOUSE NO NODE
    [HttpGet]
    [Route("~/api/[controller]/search/{warehouseId}", Name = "GetWarehousePorIDEspecifico")]
    public async Task<ActionResult<ActivatedWarehouseDTO>> GetByWarehouseIdAsync(string warehouseId)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouse = await _service.GetByWarehouseIdAsync(warehouseId);

            if (warehouse == null) return NotFound("No warehouse with that AlphaNumericID was found!");

            return warehouse;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("No warehouse with that AlphaNumericID was found!");
        }
    }
    
    [HttpGet ("byAlphaId")]
    public async Task<ActionResult<ActivatedWarehouseDTO>> GetByWarehouseIdQueryAsync(string warehouseId)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouse = await _service.GetByWarehouseIdAsync(warehouseId);

            if (warehouse == null) return NotFound("No warehouse with that AlphaNumericID was found!");

            return warehouse;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("No warehouse with that AlphaNumericID was found!");
        }
    }

    // PUT: api/Warehouse
    [Route("~/api/[controller]", Name = "UpdateWarehouse")]
    [HttpPut]
    public async Task<ActionResult<WarehouseDTO>> UpdateAsync(WarehouseDTO dto)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouseCheck = await _service.GetByWarehouseIdAsync(dto.AlphaNumId);

            if (warehouseCheck.Id != dto.Id)
                throw new BusinessRuleValidationException("There is already a warehouse with that alphaNumeric ID!");
            
            var arm = await _service.UpdateAsync(dto);

            if (arm == null) return NotFound("It wasn't possible to find the given warehouse!");
            return Ok(arm);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return BadRequest("An error occured creating the warehouse! (Please specify a valid AlphaID!)");
        }
    }

    // DELETE: api/Warehouse/id
    [Route("~/api/[controller]/{id:guid}", Name = "DeleteWarehouse")]
    [HttpDelete]
    public async Task<ActionResult<bool>> DeleteAsync(Guid id)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var arm = await _service.DeleteAsync(new WarehouseId(id));

            if (arm == false) return NotFound("It wasn't possible to find the given warehouse!");

            return Ok();
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return BadRequest("An error has occured creating the warehouse! (Please specify a valid ID, following the rules of GUID!)");
        }
    }
    
    //delete=id do armazem
    // GET: api/Warehouse/delete?delete=delete
    [HttpPut("delete")]
    public async Task<ActionResult<bool>> DesactivateAsync(string delete)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        var warehouseCheck = await _service.GetByWarehouseIdAsync(delete);

        if (warehouseCheck == null) return NotFound("No warehouse with that AlphaNumericID was found!");

        var boolean = await _service.DesactivateWarehouseAsync(warehouseCheck);

        return boolean;
    }
    
    //activate= id do armazem
    // GET: api/Warehouse/activate?activate=activate
    [HttpPut("activate")]
    public async Task<ActionResult<bool>> ActivateAsync(string activate)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());
        
        var warehouseCheck = await _service.GetByWarehouseIdAsync(activate);

        if (warehouseCheck == null) return NotFound("No warehouse with that AlphaNumericID was found!");

        var boolean = await _service.ActivateWarehouseAsync(warehouseCheck);

        return boolean;
    }

    private async Task<HttpResponseMessage> VerifyUserAccess() {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if(token == null) {
            return new HttpResponseMessage(HttpStatusCode.Unauthorized)
            {
                Content = new StringContent("No Authorization header is present")
            };
        } 

        string[] role = {"Admin", "LogisticManager", "FleetManager" , "WarehouseManager"};

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