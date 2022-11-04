using GestArm.Domain.Armazens;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArmazemController : ControllerBase
{
    private readonly IArmazemService _service;

    public ArmazemController(IArmazemService service)
    {
        _service = service;
    }

    // GET: api/Armazem/id?id=X
    [HttpGet("id")]
    public async Task<ActionResult<ArmazemDTO>> GetById(Guid id)
    {
        try
        {
            var armazem = await _service.GetByIdAsync(new ArmazemId(id));

            if (armazem == null) return NotFound("Não foi encontrado nenhum armazém com esse ID!");

            return armazem;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Não foi encontrado nenhum armazém com esse ID!");
        }
        
    }

    // GET: api/Armazem/designacao?designacao=designacao
    [HttpGet("designacao")]
    public async Task<ActionResult<IEnumerable<ArmazemDTO>>> GetByDesignacao(string designacao)
    {
        try
        {
            var armazem = await _service.GetByDesignacaoAsync(designacao);

            if (armazem == null) return NotFound("Não foi encontrado nenhum armazém com essa designaçao");

            return armazem;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception e)
        {
            return NotFound("Não foi encontrado nenhum armazém com essa designaçao!");
        }
    }

    // GET: api/Armazem
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArmazemDTO>>> GetAll()
    {
        try
        {
            var armazens = await _service.GetAllAsync();

            if (armazens == null) return NotFound("Não foi encontrado nenhum armazém!");

            return armazens;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Não foi encontrado nenhum armazém!");
        }
    }

    //POST: api/Armazem
    [HttpPost]
    public async Task<ActionResult<ArmazemDTO>> AddAsync(CreatingArmazemDto dto)
    {
        try
        {
            var armazemCheck = await _service.GetByArmazemIdAsync(dto.AlphaNumId);

            if (armazemCheck != null)
                throw new BusinessRuleValidationException("Armazem com esse AlphaNumeric ID já existe!");

            var armazem = await _service.AddAsync(dto);

            return armazem;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }

    // GET: api/Armazem/search/armazemId
    //MÉTODO DO REPOSITORIO ARMAZEM NO NODE
    [HttpGet]
    [Route("~/api/[controller]/search/{armazemId}", Name = "GetArmazemPorIDEspecifico")]
    public async Task<ActionResult<ArmazemDTO>> GetByArmazemIdAsync(string armazemId)
    {
        try
        {
            var armazem = await _service.GetByArmazemIdAsync(armazemId);

            if (armazem == null) return NotFound("Não foi encontrado um armazem com esse Alpha numérico ID!");

            return armazem;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Não foi encontrado um armazem com esse Alpha numérico ID!");
        }
    }
    
    [HttpGet ("porAlphaId")]
    public async Task<ActionResult<ArmazemDTO>> GetByArmazemIdQueryAsync(string armazemId)
    {
        try
        {
            var armazem = await _service.GetByArmazemIdAsync(armazemId);

            if (armazem == null) return NotFound("Não foi encontrado um armazem com esse Alpha numérico ID!");

            return armazem;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Não foi encontrado um armazem com esse Alpha numérico ID!");
        }
    }

    // PUT: api/Armazem
    [Route("~/api/[controller]", Name = "UpdateArmazem")]
    [HttpPut]
    public async Task<ActionResult<ArmazemDTO>> UpdateAsync(ArmazemDTO dto)
    {
        try
        {
            var armazemCheck = await _service.GetByArmazemIdAsync(dto.AlphaNumId);

            if (armazemCheck.Id != dto.Id)
                throw new BusinessRuleValidationException("Armazem com esse AlphaNumeric ID já existe!");
            
            var arm = await _service.UpdateAsync(dto);

            if (arm == null) return NotFound("Não foi possível encontrar o armazém introduzido!");
            return Ok(arm);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }

    // DELETE: api/Armazem/id
    [Route("~/api/[controller]/{id:guid}", Name = "DeleteArmazem")]
    [HttpDelete]
    public async Task<ActionResult<bool>> DeleteAsync(Guid id)
    {
        try
        {
            var arm = await _service.DeleteAsync(new ArmazemId(id));

            if (arm == false) return NotFound("Não foi possível encontrar o armazém introduzido!");

            return Ok();
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }
}