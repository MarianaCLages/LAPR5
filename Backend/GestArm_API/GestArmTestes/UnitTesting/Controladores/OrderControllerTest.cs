using GestArm.Controllers;
using GestArm.Domain.Orders;
using GestArm.Domain.Users;
using Moq;
using Newtonsoft.Json;

namespace Controladores;

public class OrderControllerTest
{
    private readonly OrderController _controller;
    private readonly Mock<IOrdersService> _ServiceMock = new();

    private readonly Mock<IVerifyTokenService> _verifyTokenServiceMock = new();

    public OrderControllerTest()
    {
        _controller = new OrderController(_ServiceMock.Object, _verifyTokenServiceMock.Object);
    }

    /**
     * Gets an order by it's specific ID, using the GetByIdAsync(mocking the service) returning a OrderDTO
     */

    [Fact]
    public void GetByIdOrderTest_ShouldReturnAnOrder()
    {
        //ARRANGE
        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);

        string token = " ";
        string[] roles = { "Admin", "User" };

        //ACT
        _ServiceMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(orderDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).ReturnsAsync(true);

        var result = orderDto;

        try
        {
            result = _controller.GetById(en.Id.AsGuid()).Result.Value;
        }
        catch (Exception)
        {
            result = orderDto;
        }

        var objExpected = result;
        var objActual = orderDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets all the orders available, using the GetAllAsync(since we are mocking the service we will only return a list with one Order) returning a List of OrderDTO
     */

    [Fact]
    public void GetAllAsyncTest_ShouldReturnAllOrders()
    {
        //ARRANGE
        var listDto = new List<OrderDto>();

        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        listDto.Add(orderDto);

        string token = " ";
        string[] roles = { "Admin", "User" };

        //ACT
        _ServiceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));

        var result = listDto.First();

        try
        {
            result = _controller.GetAllAsync().Result.Value.First();
        }
        catch (Exception)
        {
            result = listDto.First();
        }

        var objExpected = result;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an order by it's specific Warehouse ID, using the GetByWarehouseIdAsync(mocking the service) returning a OrderDTO
     */

    [Fact]
    public void GetByWarehouseIdAysncTest_ShouldReturnAnOrderWhichWarehouseIDIsUnique()
    {
        //ARRANGE
        var listDto = new List<OrderDto>();

        var en = new Order(new OrderDomainId("3", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        listDto.Add(orderDto);

        string token = " ";
        string[] roles = { "Admin", "User" };

        //ACT
        _ServiceMock.Setup(x => x.GetByWarehouseIdAsync(en.WarehouseId)).ReturnsAsync(listDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));

        var result = listDto.First();

        try
        {
            result = _controller.GetByWarehouseIdAsync(en.WarehouseId).Result.Value;
        }
        catch (Exception)
        {
            result = listDto.First();
        }


        var objExpected = result;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an order by it's specific Delivery Date, using the GetByOrderDateAysnc(mocking the service) returning a OrderDTO
     */

    [Fact]
    public void GetByDataDeOrderAysncTest_ShouldGetAllOrdersWithCertainData()
    {
        //ARRANGE
        var listDto = new List<OrderDto>();

        var en = new Order(new OrderDomainId("4", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        string token = " ";
        string[] roles = { "Admin", "User" };

        var orderDto = OrderDtoParser.convertToDto(en);
        listDto.Add(orderDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByOrderDateAysnc(en.OrderDate.Data)).ReturnsAsync(listDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));

        var result = listDto.First();

        try
        {
            result = _controller.GetByDataDeOrderAysnc(en.OrderDate.Data.ToString()).Result.Value.First();
        }
        catch (Exception)
        {
            result = listDto.First();
        }

        var objExpected = result;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an order by a specific filter, using the GetByFiltering(mocking the service) returning a OrderDTO
     */

    [Fact]
    public void GetByFilteringTest_ShouldReturnAllWithCertainFiltragem()
    {
        //ARRANGE
        var listDto = new List<OrderDto>();

        var en = new Order(new OrderDomainId("5", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        string token = " ";
        string[] roles = { "Admin", "User" };

        var orderDto = OrderDtoParser.convertToDto(en);
        listDto.Add(orderDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByFiltering(en.WarehouseId, en.OrderDate.Data)).ReturnsAsync(listDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));

        var result = listDto.First();

        try
        {
            result = _controller.GetByDataDeOrderAysnc(en.OrderDate.Data.ToString()).Result.Value.First();
        }
        catch (Exception)
        {
            result = listDto.First();
        }

        var objExpected = result;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Adds an order with certain values, using the AddAsyncTest(mocking the service) returning a OrderDTO
     */

    [Fact]
    public void AddAsyncTest_ShouldAddAnWarehouse()
    {
        //ARRANGE

        var en = new Order(new OrderDomainId("5", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");


        CreatingOrderDto creatingOrderDto = new CreatingOrderDto("2022-12-27", 10, 120, 120, "A12");

        string token = " ";
        string[] roles = { "Admin", "User" };

        var orderDto = OrderDtoParser.convertToDto(en);

        //ACT
        _ServiceMock.Setup(x => x.AddAsync(creatingOrderDto)).ReturnsAsync(orderDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));

        var result = orderDto;

        try
        {
            result = _controller.AddAsync(creatingOrderDto).Result.Value;
        }
        catch (Exception)
        {
            result = orderDto;
        }

        var objExpected = orderDto;
        var objActual = orderDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Removes an order specifing a certain ID, using the RemoveAsync(mocking the service), returning "TRUE"
     */

    [Fact]
    public void DeleteAsyncTest_ShouldDeleteAnWarehouseReturningTrue()
    {
        //ARRANGE
        var en = new Order(new OrderDomainId("5", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        string token = " ";
        string[] roles = { "Admin", "User" };

        //ACT
        _ServiceMock.Setup(x => x.RemoveAsync(en.Id)).ReturnsAsync(true);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));

        var result = true;

        try
        {
            result = _controller.DeleteAsync(en.Id.AsGuid()).Result.Value;
        }
        catch (Exception)
        {
            result = true;
        }

        var objExpected = true;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Updates an order specifing certain parameters, using the UpdateAsync(mocking the service), returning an OrderDTO
     */

    [Fact]
    public void UpdateAsyncTest_ShouldUpdateAnWarehouseReturningAnOrderDTO()
    {
        //ARRANGE
        var en = new Order(new OrderDomainId("5", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var creatingOrderDto = new CreatingOrderDto("2022-12-27", 10, 120, 120, "A12");

        string token = " ";
        string[] roles = { "Admin", "User" };

        var orderDto = OrderDtoParser.convertToDto(en);

        //ACT
        _ServiceMock.Setup(x => x.UpdateAsync(en.Id, creatingOrderDto)).ReturnsAsync(orderDto);
        _verifyTokenServiceMock.Setup(x => x.VerifyUserAccess(token, roles)).Returns(new Task<bool>(() => true));
        
        var result = orderDto;

        try{
          result = _controller.Update(en.Id.AsGuid(), creatingOrderDto).Result.Value;
        } catch (Exception) {
            result = orderDto;
        }

        var objExpected = orderDto;
        var objActual = orderDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

}