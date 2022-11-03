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

    // GET: api/Armazem/id
    [HttpGet("{id}")]
    public async Task<ActionResult<ArmazemDTO>> GetById(Guid id)
    {
        var armazem = await _service.GetByIdAsync(new ArmazemId(id));

        if (armazem == null) return NotFound();

        return armazem;
    }

    // GET: api/Armazem/designacao?designacao=designacao
    [HttpGet("{designacao:alpha}")]
    public async Task<ActionResult<ArmazemDTO>> GetByDesignacao(string designacao)
    {
        var armazem = await _service.GetByDesignacaoAsync(new DesignacaoArmazem(designacao));

        if (armazem == null) return NotFound();

        return armazem;
    }

    // GET: api/Armazens
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArmazemDTO>>> GetAll()
    {
        return await _service.GetAllAsync();
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

            return CreatedAtAction(nameof(GetById), new { id = armazem.Id }, armazem);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }

    // GET: api/Armazem/search/armazemId
    [HttpGet]
    [Route("~/api/[controller]/search/{armazemId}", Name = "GetArmazemPorIDEspecifico")]
    public async Task<ActionResult<ArmazemDTO>> GetByArmazemIdAsync(string armazemId)
    {
        var armazem = await _service.GetByArmazemIdAsync(armazemId);

        if (armazem == null) return NotFound("Não foi encontrado um armazem com esse ID!");

        return armazem;
    }

    // PUT: api/Armazem/atualizar/id
    [Route("~/api/[controller]/{id:guid}", Name = "UpdateArmazem")]
    [HttpPut]
    public async Task<ActionResult<ArmazemDTO>> UpdateAsync(Guid id, ArmazemDTO dto)
    {
        if (id != dto.Id) return BadRequest();

        try
        {
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
    public async Task<ActionResult<ArmazemDTO>> DeleteAsync(Guid id)
    {
        try
        {
            var arm = await _service.DeleteAsync(new ArmazemId(id));

            if (arm == null) return NotFound("Não foi possível encontrar o armazém introduzido!");

            return Ok(arm);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }
}