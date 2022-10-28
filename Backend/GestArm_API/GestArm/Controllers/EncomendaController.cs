using GestArm.Domain.Encomendas;
using Microsoft.AspNetCore.Mvc;

namespace GestArm.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EncomendaController : ControllerBase
{
    private readonly IEncomendasService _service;

    public EncomendaController(IEncomendasService service)
    {
        _service = service;
    }

    // GET: api/Encomenda/id
    [HttpGet("{id}")]
    public async Task<ActionResult<EncomendaDto>> GetById(Guid id)
    {
        var encomenda = await _service.GetByIdAsync(new EncomendaId(id));

        if (encomenda == null) return NotFound();

        return encomenda;
    }

    //POST: api/Encomenda
    [HttpPost]
    public async Task<ActionResult<EncomendaDto>> AddAsync(CreatingEncomendaDto dto)
    {
        var encomenda = await _service.AddAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = encomenda.Id }, encomenda);
    }

    //DELETE: api/Encomenda
    [HttpDelete]
    public async Task<ActionResult<bool>> DeleteAsync(EncomendaDto encomendaDto)
    {
        var encomenda = await _service.RemoveAsync(encomendaDto.Id);

        return true;
    }

    //GET: api/Encomenda
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetAllAsync()
    {
        var encomendas = await _service.GetAllAsync();

        return encomendas.ToList();
    }
}