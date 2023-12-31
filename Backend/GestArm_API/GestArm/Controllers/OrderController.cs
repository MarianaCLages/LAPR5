using GestArm.Domain.Users;
using System.Net;
using GestArm.Domain.Orders;
using GestArm.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace GestArm.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrdersService _service;
   private readonly IVerifyTokenService _serviceJWT;

    public OrderController(IOrdersService service, IVerifyTokenService verifyTokenService)
    {
        _service = service;
        _serviceJWT = verifyTokenService;
    }

    // GET: api/Order/id
    [HttpGet("porId")]
    public async Task<ActionResult<OrderDto>> GetById(Guid id)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var order = await _service.GetByIdAsync(new OrderId(id));

            if (order == null)
                throw new BusinessRuleValidationException("Does not exist nenhuma order com esse ID!");

            return order;
        }
        catch (BusinessRuleValidationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the Order! (No order with that ID was found)");
        }
    }

    //POST: api/Order
    [HttpPost]
    public async Task<ActionResult<OrderDto>> AddAsync(CreatingOrderDto dto)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var order = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("It was not possible to add the order! (Invalid Date!)");
        }
    }

    // PUT: api/Order/id
    [Route("~/api/[controller]/{id:guid}", Name = "UpdateOrder")]
    [HttpPut]
    public async Task<ActionResult<OrderDto>> Update(Guid id, CreatingOrderDto dto)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var order = await _service.GetByIdAsync(new OrderId(id));

            if (order == null) return NotFound();
            
            var cat = await _service.UpdateAsync(new OrderId(id),dto);

            if (cat == null) return NotFound();
            return Ok(cat);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("Error on updating the order! (Please specify a valid date!)");
        }


    }
    //DELETE: api/Order/id
    [Route("~/api/[controller]/{id:guid}", Name = "DeleteOrder")]
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
            var order = await _service.RemoveAsync(new OrderId(id));

            if (order == false)
                throw new BusinessRuleValidationException("No order with that ID was found!");

            return true;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the order! (No order with that ID was found!)");
        }
    }

    //GET: api/Order
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllAsync()
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());


        try
        {
            var orders = await _service.GetAllAsync();

            return orders.ToList();
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the order! (No order was found!)");
        }
    }

    // GET: api/Order/orderDate=orderDate
    [Route("~/api/[controller]/byDate", Name = "GetOrderByDate")]
    [HttpGet("byDate")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByDataDeOrderAysnc(string data)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var orders = await _service.GetByOrderDateAysnc(DateTime.Parse(data));

            if (orders?.Any() != true)
                //_loggerOrders.LogInformation("Nenhuma order foi encontrada com o id de armazém dado");
                return NotFound("No order for that date was found!");

            return orders;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error occured while looking for the order!(Please specify a valid date)");
        }
    }

    // GET: api/Order/Filtering?warehouseId=X&data=Y
    [Route("~/api/[controller]/Filtering", Name = "GetOrderByFilteringmWarehouseEData")]
    [HttpGet("Filtering")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByFiltering(string warehouseId, string data)
    {
        var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var orders = await _service.GetByFiltering(warehouseId, DateTime.Parse(data));

            if (orders?.Any() != true)
                //_loggerOrders.LogInformation("Nenhuma order foi encontrada com o id de armazém dado");
                return NotFound(
                    "No order on that day or with that ID was found");

            return orders;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error has occured while looking for the order! (Please specify a valid date!)");
        }
        
    }

    //MÉTODO UTILIZADO PELO REPOSITÓRIO EM NODE
    // GET: api/Warehouse/search/warehouseId
    [HttpGet]
    [Route("~/api/[controller]/search/{orderId}", Name = "GetOrderByWarehouse")]
    public async Task<ActionResult<OrderDto>> GetByWarehouseIdAsync(string orderId)
    {
         var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouse = await _service.GetByIdAsync(new OrderId(orderId));

            if (warehouse == null) return NotFound("A warehouse with that ID was not found!");

            return warehouse;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error has occured while looking for the order!");
        }
        
    }

    ////MÉTODO UTILIZADO PELO REPOSITÓRIO EM NODE
    // GET: api/Warehouse/search/{date}/{nextID} (Os dois juntos vão fazer o DOMAIN ID da order)
    [Route("~/api/[controller]/search", Name = "GetOrderByDomainID")]
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByOrderDomainIDAsync(string data, string nextID)
    {
         var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var warehouse = await _service.GetOrderByDomainIdAsync(nextID, data);

            if (warehouse == null || warehouse.Count == 0) return NotFound("A order with that ID was not found!");

            return warehouse;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error has occured while looking for the order!");
        }
    }

    //GET : api/Warehouse/filter?warehouseId=X&date=Y
    [Route("~/api/[controller]/filter", Name = "GetByWarehouseFilterID")]
    [HttpGet("{filter}")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByFilterQuery(string warehouseId, DateTime data)
    {
         var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var orders = await _service.GetByFiltering(warehouseId, data);

            if (orders?.Any() != true)
                //_loggerOrders.LogInformation("Nenhuma order foi encontrada com o id de armazém dado");
                return NotFound(
                    "No order on that day or with that ID was found");

            return orders;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error has occured while looking for the order!");
        }
    }

    // GET: api/Order/porWarehouseID?warehouseId=warehouseId
    [Route("~/api/[controller]/byWarehouseID", Name = "GetByWarehouseID")]
    [HttpGet("{byWarehouseID}")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByWarehouseIdAysnc(string warehouseId)
    {
         var auth = await VerifyUserAccess();

        if(auth.StatusCode == HttpStatusCode.Unauthorized)
            return Unauthorized(auth.ReasonPhrase.ToString());

        else if (auth.StatusCode == HttpStatusCode.Forbidden)
            return Forbid(auth.ReasonPhrase?.ToString());

        try
        {
            var orders = await _service.GetByWarehouseIdAsync(warehouseId);

            if (orders?.Any() != true)
                return NotFound("No order with that warehouse id was found!");

            return orders;
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
        catch (Exception)
        {
            return NotFound("An error has occured while looking for the order!");
        }
        
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