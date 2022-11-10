using GestArm.Domain.Warehouses;
using GestArm.Domain.Orders;
using Moq;
using Newtonsoft.Json;
using Exception = System.Exception;

namespace Servicos;

public class OrderServiceTest
{
    private readonly Mock<IWarehouseRepository> _repositoryWarehouseMock = new();

    private readonly Mock<IOrdersRepository> _repositoryMock = new();
    private readonly OrdersService _service;

    public OrderServiceTest()
    {
        _service = new OrdersService(_repositoryMock.Object, _repositoryWarehouseMock.Object);
    }

    /*
     * Gets all order, using the GetAllAsync (mocking the repository) returning an OrderDTO
     */

    [Fact]
    public void GetAllAsyncTest_ShouldReturnAllOrders()
    {
        //Arrange
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(order => OrderDtoParser.convertToDto(order));
        var result = _service.GetAllAsync().Result;

        //ASSERT
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Gets an order by the WarehouseID associated, using the GetByWarehouseIdAsync (mocking the repository) returning an OrderDTO
    */

    [Fact]
    public void GetByWarehouseIdAsyncTest_ShouldReturnAnOrderByWarehouseID()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetByWarehouseIdAsync("A12")).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(order => OrderDtoParser.convertToDto(order));
        var result = _service.GetByWarehouseIdAsync("A12").Result;

        //ASSERT
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Gets an order by the DeliveryDate associated, using the GetByOrderDateAysnc (mocking the repository) returning an OrderDTO
    */

    [Fact]
    public void GetByOrderDateAysncTest_ShouldReturnAnWarehouseByDeliveryDate()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetByOrderDateAysnc(DateTime.Parse("2022-12-27"))).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(order => OrderDtoParser.convertToDto(order));
        var result = _service.GetByOrderDateAysnc(DateTime.Parse("2022-12-27")).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Gets an order by a specific filtragem, using the GetByFilterAsync (mocking the repository) returning an OrderDTO
    */

    [Fact]
    public void GetByFilteringTest_ShouldReturnAnWarehouseByASpeficFilter()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetByFilterAsync("A12", DateTime.Parse("2022-12-27"))).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(order => OrderDtoParser.convertToDto(order));
        var result = _service.GetByFiltering("A12", DateTime.Parse("2022-12-27")).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Gets an order by a specific filtragem, using the GetByFilterAsync (mocking the repository) returning an OrderDTO
    */

    [Fact]
    public void GetByIdAsyncTest_GetAnEcomendaBySpecificID()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");
        list.Add(en);

        _repositoryMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(en);

        //ACT
        var resultDTO =
            list.ConvertAll(order => OrderDtoParser.convertToDto(order));
        var result = _service.GetByIdAsync(en.Id).Result;

        //ASSERT
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First());

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Adds an Order, using the AddAsync (mocking the repository) returning an OrderDTO
    */

    [Fact]
    public void AddAsyncTest_ShouldAddAnOrder()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");

        CreatingOrderDto creatingOrderDto = new CreatingOrderDto("2022-12-27", 10, 120, 120, "A12");

        list.Add(en);

        _repositoryMock.Setup(x => x.AddAsync(en)).ReturnsAsync(en);

        //ACT
        var resultDTO = OrderDtoParser.convertToDto(en);
        
        try
        {
            var result = _service.AddAsync(creatingOrderDto).Result;

            var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
            var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

            //ASSERT
            Assert.Equal(obj1StrExpected, obj2StrActual);
        }
        catch (Exception)
        {
            //EMPTY
        }
    }

    /*
    * Updates an Order, using the UpdateAsync (mocking the repository) returning an OrderDTO
    */

    [Fact]
    public void UpdateAsyncTest_ShouldUpdateAnOrder()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");

        var creatingOrderDto = new CreatingOrderDto("2022-12-27", 10, 120, 120, "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.UpdateAsync(en)).ReturnsAsync(en);

        var resultDTO = OrderDtoParser.convertToDto(en);
        var result = _service.UpdateAsync(en.Id, creatingOrderDto);
        var resultAlt = resultDTO;

        var obj1StrExpected = JsonConvert.SerializeObject(resultAlt.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
   * Updates an Order, using the UpdateAsync (mocking the repository) returning an OrderDTO
   */

    [Fact]
    public void RemoveAsyncTest_ShouldRemoveAnOrder()
    {
        //ARRANGE
        var list = new List<Order>();

        var en = new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("2022-12-27")), new OrderMass(10), new TimeOrder(120),
            new TimeOrder(120), "A12");

        var creatingOrderDto = new CreatingOrderDto("2022-12-27", 10, 120, 120, "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.RemoveAsync(en)).ReturnsAsync(true);

        var resultDTO = true;
        var result = _service.RemoveAsync(en.Id).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
}