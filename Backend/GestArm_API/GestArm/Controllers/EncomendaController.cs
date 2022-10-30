using GestArm.Domain.Encomendas;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace GestArm.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EncomendaController : ControllerBase
{
    private readonly IEncomendasService _service;
    //private ILogger<Encomenda> _loggerEncomendas;

    public EncomendaController(IEncomendasService service)
    {
        _service = service;
    }

    // GET: api/Encomenda/id
    [HttpGet("{id}")]
    public async Task<ActionResult<EncomendaDto>> GetById(Guid id)
    {
        var encomenda = await _service.GetByIdAsync(new EncomendaId(id));

        if (encomenda == null) return NotFound("Não existe nenhuma encomenda com esse ID!");

        return encomenda;
    }

    //POST: api/Encomenda
    [HttpPost]
    public async Task<ActionResult<EncomendaDto>> AddAsync(CreatingEncomendaDto dto)
    {
        try
        {
            var encomenda = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = encomenda.Id }, encomenda);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new {Message = ex.Message});
        }
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
    
    // GET: api/Encomenda/armazemId=armazemId
    [Route("~/api/[controller]/{armazemId:alpha}", Name = "GetEncomendaPorIdDeArmazem")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByArmazemIdAysnc(string armazemId)
    {
        var encomendas = await _service.GetByArmazemIdAsync(armazemId);

        if (encomendas?.Any() != true) return NotFound("Não foi encontrado nenhuma encomenda que tenha esse id de armazém associado");

        return encomendas;
    }
    
    
    
    // GET: api/Encomenda/dataEntrega=dataEntrega
    [Route("~/api/[controller]/{data:datetime}", Name = "GetEncomendaPorData")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByDataDeEntregaAysnc(DateTime data)
    {
        var encomendas = await _service.GetByDataEntregaAysnc(data);

        if (encomendas?.Any() != true)
        {
            //_loggerEncomendas.LogInformation("Nenhuma encomenda foi encontrada com o id de armazém dado");
            return NotFound("Não foi encontrado nenhuma encomenda que tenha uma entrega nesse dia");
        }

        return encomendas;
    }
    
    // GET: api/Encomenda/dataEntrega=dataEntrega
    [Route("~/api/[controller]/filtragem", Name = "GetByFiltragemViaQueryString")]
    [Route("~/api/[controller]/{armazemId:alpha}/{data:datetime}", Name = "GetByFiltragem")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByFiltragemAysnc(string armazemId,DateTime data)
    {
        var encomendas = await _service.GetByFiltragemAysnc(armazemId,data);

        if (encomendas?.Any() != true)
        {
            //_loggerEncomendas.LogInformation("Nenhuma encomenda foi encontrada com o id de armazém dado");
            return NotFound("Não foi encontrado nenhuma encomenda que tenha uma entrega nesse dia ou um com um id de armazém associado");
        }

        return encomendas;
    }
    
}