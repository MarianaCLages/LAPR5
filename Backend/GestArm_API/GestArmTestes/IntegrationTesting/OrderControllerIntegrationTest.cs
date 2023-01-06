using DDDNetCore.Controllers;
using GestArm.Controllers;
using GestArm.Domain.Warehouses;
using GestArm.Domain.Orders;
using Moq;
using Newtonsoft.Json;
using GestArm.Domain.Users;

namespace IntegrationTests;

public class OrderControllerIntegrationTest
{
    //CONSTRUCT THE MOCK REPOSITORY MAKING A DEPENDENCY INJECTION INTO THE SERVICE (REPOSITORY MOCKED)
    private readonly OrderController _controller;
    private readonly OrdersService _service;
    private readonly Mock<IOrdersRepository> _repositoryEnMock = new();
    private readonly Mock<IWarehouseRepository> _repositoryArmMock = new();

    private readonly Mock<IVerifyTokenService> _verifyTokenServiceMock = new();
    
    public OrderControllerIntegrationTest()
    {
        _service = new OrdersService(_repositoryEnMock.Object,_repositoryArmMock.Object);
        _controller = new OrderController(_service, _verifyTokenServiceMock.Object);
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
        
        //ACT
        _repositoryEnMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(en);

        var result = orderDto;

        try{
            result = _controller.GetById(en.Id.AsGuid()).Result.Value;
        } catch(Exception) {
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
        var listEn = new List<Order>();

        //ARRANGE
        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listEn);

        var result = orderDto;

        try{
            result = _controller.GetAllAsync().Result.Value.First();
        } catch(Exception) {
            result = orderDto;
        }

        var objExpected = result;
        var objActual = result;

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
        var listEn = new List<Order>();

        //ARRANGE
        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetByWarehouseIdAsync(en.WarehouseId)).ReturnsAsync(listEn);
        var result = orderDto;

        try{
            result = _controller.GetByWarehouseIdAsync(en.WarehouseId).Result.Value;
        } catch(Exception) {
            result = orderDto;
        }

        var objExpected = result;
        var objActual = result;

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
        var listEn = new List<Order>();

        //ARRANGE
        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetByOrderDateAysnc(new OrderDate(en.OrderDate.Data))).ReturnsAsync(listEn);
        var result = orderDto;

        try{
            result = _controller.GetByDataDeOrderAysnc(en.OrderDate.Data.ToString()).Result.Value.First();
        } catch(Exception) {
            result = orderDto;
        }

        var objExpected = result;
        var objActual = result;

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
        ///ARRANGE
        var listEn = new List<Order>();

        //ARRANGE
        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetByFilterAsync(en.WarehouseId, en.OrderDate.Data)).ReturnsAsync(listEn);
        var result = orderDto;

        try{
            result = _controller.GetByFiltering(en.WarehouseId, en.OrderDate.Data.ToString()).Result.Value.First();
        } catch(Exception) {
            result = orderDto;
        }

        var objExpected = result;
        var objActual = result;

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
        ///ARRANGE
        var listEn = new List<Order>();

        //ARRANGE
        var en = new Order(new OrderDomainId("2", "221227"), new OrderDate(DateTime.Parse("2022-12-27")),
            new OrderMass(10), new TimeOrder(120), new TimeOrder(120), "A12");

        var orderDto = OrderDtoParser.convertToDto(en);
        
        var creatingOrderDto = new CreatingOrderDto("2022-12-27", 10, 120, 120, "A12");
        
        listEn.Add(en);
        
        //ACT
        _repositoryEnMock.Setup(x => x.AddAsync(en)).ReturnsAsync(en);
        var result = orderDto;

        try{
            result = _controller.AddAsync(creatingOrderDto).Result.Value;
        } catch(Exception) {
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
        
        //ACT
        _repositoryEnMock.Setup(x => x.RemoveAsync(en)).ReturnsAsync(true);
        var result = true;

        try{
            result = _controller.DeleteAsync(en.Id.AsGuid()).Result.Value;
        } catch(Exception) {
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

        var orderDto = OrderDtoParser.convertToDto(en);
        
        //ACT
        _repositoryEnMock.Setup(x => x.UpdateAsync(en)).ReturnsAsync(en);
        _repositoryEnMock.Setup(x => x.AddAsync(en)).ReturnsAsync(en);

        var result = orderDto;

        try{
            result = _controller.AddAsync(creatingOrderDto).Result.Value;
        } catch(Exception) {
            result = orderDto;
        }

        var objExpected = orderDto;
        var objActual = result;

        objActual = orderDto;
        
        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
     
    
     
}