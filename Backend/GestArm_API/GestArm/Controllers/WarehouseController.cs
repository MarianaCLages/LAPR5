using GestArm.Domain.Warehouses;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarehouseController : ControllerBase
{
    private readonly IWarehouseService _service;

    public WarehouseController(IWarehouseService service)
    {
        _service = service;
    }

    // GET: api/Warehouse/id?id=X
    [HttpGet("id")]
    public async Task<ActionResult<WarehouseDTO>> GetById(Guid id)
    {
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
    public async Task<ActionResult<IEnumerable<WarehouseDTO>>> GetByDesignation(string designation)
    {
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
    public async Task<ActionResult<IEnumerable<WarehouseDTO>>> GetAll()
    {
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
    public async Task<ActionResult<WarehouseDTO>> GetByWarehouseIdAsync(string warehouseId)
    {
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
    public async Task<ActionResult<WarehouseDTO>> GetByWarehouseIdQueryAsync(string warehouseId)
    {
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
}