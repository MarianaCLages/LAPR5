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
    
    //DELETE: api/Armazem
    [HttpDelete]
    public async Task<ActionResult<bool>> DeleteAsync(ArmazemDTO armazemDTO)
    {
        var armazem = await _service.RemoveAsync(armazemDTO.Id);

        return true;
    }
    
    //POST: api/Armazem
    [HttpPost]
    public async Task<ActionResult<ArmazemDTO>> AddAsync(CreatingArmazemDto dto)
    {
        try
        {
            System.Diagnostics.Debug.WriteLine("VALOR DA LONGITUDE TESTE" + dto.LongitudeGrau+ "" + dto.LongitudeMinuto + "" + dto.LongitudeSegundo+ "\n\n\n\n");
            var armazem = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = armazem.Id }, armazem);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new {Message = ex.Message});
        }
        
    }
    
}