using System.Data;
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
    [HttpGet("porId")]
    public async Task<ActionResult<EncomendaDto>> GetById(Guid id)
    {
        try
        {
            var encomenda = await _service.GetByIdAsync(new EncomendaId(id));

            if (encomenda == null)
                throw new BusinessRuleValidationException("Não existe nenhuma encomenda com esse ID!");

            return encomenda;
        }
        catch (BusinessRuleValidationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return NotFound("Ocorreu um erro aquando a procura da Encomenda! (Não foi encontrado nenhuma encomenda com esse ID!)");
        }
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
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Ocorreu um erro aquando a procura da Encomenda! (Não foi encontrado nenhuma encomenda com esse ID!)");
        }
    }

    //DELETE: api/Encomenda/id
    [Route("~/api/[controller]/{id:guid}", Name = "DeleteEntrega")]
    [HttpDelete]
    public async Task<ActionResult<bool>> DeleteAsync(Guid id)
    {
        try
        {
            var encomenda = await _service.RemoveAsync(new EncomendaId(id));

            if (encomenda == false)
                throw new BusinessRuleValidationException("Não foi encontrado nenhuma Encomenda com esse ID!");

            return true;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Ocorreu um erro aquando a procura da Encomenda! (Não foi encontrado nenhuma encomenda com esse ID!)");
        }
    }

    //GET: api/Encomenda
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetAllAsync()
    {
        var encomendas = await _service.GetAllAsync();

        return encomendas.ToList();
    }
    
    // GET: api/Encomenda/dataEntrega=dataEntrega
    [Route("~/api/[controller]/porData", Name = "GetEncomendaPorData")]
    [HttpGet ("porData")]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByDataDeEntregaAysnc(DateTime data)
    {
        var encomendas = await _service.GetByDataEntregaAysnc(data);

        if (encomendas?.Any() != true)
            //_loggerEncomendas.LogInformation("Nenhuma encomenda foi encontrada com o id de armazém dado");
            return NotFound("Não foi encontrado nenhuma encomenda que tenha uma entrega nesse dia");

        return encomendas;
    }

    // GET: api/Encomenda/porFiltragem?armazemId=X&data=Y
    [Route("~/api/[controller]/porFiltragem", Name = "GetEncomendaPorFiltragemArmazemEData")]
    [HttpGet("porFiltragem")]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByFiltragemAysnc(string armazemId, string data)
    {
        var encomendas = await _service.GetByFiltragemAysnc(armazemId, DateTime.Parse(data));

        if (encomendas?.Any() != true)
            //_loggerEncomendas.LogInformation("Nenhuma encomenda foi encontrada com o id de armazém dado");
            return NotFound(
                "Não foi encontrado nenhuma encomenda que tenha uma entrega nesse dia ou um com um id de armazém associado");

        return encomendas;
    }
    
    //MÉTODO UTILIZADO PELO REPOSITÓRIO EM NODE
    // GET: api/Armazem/search/armazemId
    [HttpGet]
    [Route("~/api/[controller]/search/{encomendaId}", Name = "GetEncomendaPorArmazem")]
    public async Task<ActionResult<EncomendaDto>> GetByArmazemIdAsync(string encomendaId)
    {
        var armazem = await _service.GetByIdAsync(new EncomendaId(encomendaId));

        if (armazem == null) return NotFound("Não foi encontrado um armazem com esse ID!");

        return armazem;
    }
    
    ////MÉTODO UTILIZADO PELO REPOSITÓRIO EM NODE
    // GET: api/Armazem/search/{data}/{nextID} (Os dois juntos vão fazer o DOMAIN ID da entrega)
    [HttpGet]
    [Route("~/api/[controller]/search/{data}/{nextID}", Name = "GetEncomendaPorEncomendaDomainID")]
    public async Task<ActionResult<EncomendaDto>> GetByEncomendaDomainIDAsync(string nextID, string data)
    {
        var armazem = await _service.GetEncomendaByDomainIdAsync(data,nextID);

        if (armazem == null) return NotFound("Não foi encontrado um armazem com esse ID!");

        return armazem;
    }
    
    //GET : api/Armazem/filtro?armazemId=X&data=Y
    [Route("~/api/[controller]/filtro", Name = "GetByArmazemFiltroID")]
    [HttpGet ("{filtro}")]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByFiltragemQuery(string armazemId, DateTime data)
    {
        var encomendas = await _service.GetByFiltragemAysnc(armazemId, data);

        if (encomendas?.Any() != true)
            //_loggerEncomendas.LogInformation("Nenhuma encomenda foi encontrada com o id de armazém dado");
            return NotFound(
                "Não foi encontrado nenhuma encomenda que tenha uma entrega nesse dia ou um com um id de armazém associado");

        return encomendas;
    }
    
    // GET: api/Encomenda/porArmazemID?armazemId=armazemId
    [Route("~/api/[controller]/porArmazemID", Name = "GetByArmazemID")]
    [HttpGet ("{porArmazemID}")]
    public async Task<ActionResult<IEnumerable<EncomendaDto>>> GetByArmazemIdAysnc(string armazemId)
    {
        var encomendas = await _service.GetByArmazemIdAsync(armazemId);

        if (encomendas?.Any() != true)
            return NotFound("Não foi encontrado nenhuma encomenda que tenha esse id de armazém associado");

        return encomendas;
    }
    
}