using GestArm.Domain.Families;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace GestArm.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FamiliesController : ControllerBase
{
    private readonly FamilyService _service;

    public FamiliesController(FamilyService service)
    {
        _service = service;
    }

    // GET: api/Families
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FamilyDto>>> GetAll()
    {
        return await _service.GetAllAsync();
    }

    // GET: api/Families/F1
    [HttpGet("{id}")]
    public async Task<ActionResult<FamilyDto>> GetGetById(string id)
    {
        var fam = await _service.GetByIdAsync(new FamilyId(id));

        if (fam == null) return NotFound();

        return fam;
    }

    // POST: api/Families
    [HttpPost]
    public async Task<ActionResult<FamilyDto>> Create(FamilyDto dto)
    {
        var fam = await _service.AddAsync(dto);

        return CreatedAtAction(nameof(GetGetById), new { id = fam.Id }, fam);
    }


    // PUT: api/Families/F5
    [HttpPut("{id}")]
    public async Task<ActionResult<FamilyDto>> Update(string id, FamilyDto dto)
    {
        if (id != dto.Id) return BadRequest();

        try
        {
            var fam = await _service.UpdateAsync(dto);

            if (fam == null) return NotFound();
            return Ok(fam);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }

    // Inactivate: api/Families/F5
    [HttpDelete("{id}")]
    public async Task<ActionResult<FamilyDto>> SoftDelete(string id)
    {
        var fam = await _service.InactivateAsync(new FamilyId(id));

        if (fam == null) return NotFound();

        return Ok(fam);
    }

    // DELETE: api/Families/F5
    [HttpDelete("{id}/hard")]
    public async Task<ActionResult<FamilyDto>> HardDelete(string id)
    {
        try
        {
            var fam = await _service.DeleteAsync(new FamilyId(id));

            if (fam == null) return NotFound();

            return Ok(fam);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }
}