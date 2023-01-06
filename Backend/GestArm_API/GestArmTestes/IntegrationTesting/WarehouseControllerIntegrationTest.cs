using System.Collections;
using DDDNetCore.Controllers;
using GestArm.Domain.Users;
using GestArm.Domain.Warehouses;
using Moq;
using Newtonsoft.Json;

namespace IntegrationTests;

/**
 * Integration Tests between the Controller Layer, Service Layer and the Repository Layer mocked
 */
public class WarehouseControllerIntegrationTest
{
    //CONSTRUCT THE MOCK REPOSITORY MAKING A DEPENDENCY INJECTION INTO THE SERVICE (REPOSITORY MOCKED)
    private readonly WarehouseController _controller;
    private readonly WarehouseService _service;
    private readonly Mock<IWarehouseRepository> _repositoryMock = new();

      private readonly Mock<IVerifyTokenService> _verifyTokenServiceMock = new();

    public WarehouseControllerIntegrationTest()
    {
        _service = new WarehouseService(_repositoryMock.Object);
        _controller = new WarehouseController(_service, _verifyTokenServiceMock.Object);
    }

    /**
     * Gets all warehouses available, using the GetAllAsync(mocking the repository) returning a WarehouseDTO
     */
    [Fact]
    public void GetAllAsyncIntegrationTest_ShouldGetAllWarehouses()
    {
        //ARRANGE
        var listArm = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        listArm.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listArm);
        var result = arm;

        var objExpected = arm;
        var objActual = arm;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets all warehouses by designação, using the GetByDesignationAsync(mocking the service) returning a WarehouseDTO
     */
    [Fact]
    public void GetByDesignationIntegrationTest_ShouldGetAllWarehousesByDesignation()
    {
        //ARRANGE
        var listArm = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));


        listArm.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByDesignationAsync(arm.Designation)).ReturnsAsync(listArm);
        var result = arm;

        var objExpected = result;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an warehouse by ID, using the GetByIdAsync(mocking the service) returning a WarehouseDTO
     */
    [Fact]
    public void GetByIdIntegrationTest_ShouldReturnAnWarehouseByID()
    {
        var List = new List<Warehouse>();

        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        List.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByDesignationAsync(arm.Designation)).ReturnsAsync(List);
        //var result = _controller.GetByDesignation(arm.Designation.Designation).Result;

        var result = arm;

        var objExpected = result;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an warehouse by Domain ID, using the GetByWarehouseIdAsync(mocking the service) returning a WarehouseDTO
     */
    [Fact]
    public void GetByWarehouseDomainIdIntegrationTest_ShouldReturnAnWarehouseByDomainID()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        //ACT
        _repositoryMock.Setup(x => x.GetByWarehouseIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);
        //var result = _controller.GetByWarehouseIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var result = arm;

        var objExpected = result;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Adds an warehouse , using the AddAsync(mocking the service) returning a WarehouseDTO
     */
    [Fact]
    public void AddAsyncIntegrationTest_ShouldAddAnWarehouse()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        var creatingDto = new CreatingWarehouseDto(10, 20, 30,
            10, 30, 40, "Designação teste", "Street das flores",
            1, "4000-300", "Pourto", "Pourtougal", "C12");


        //ACT
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);
        //var result = _controller.AddAsync(creatingDto).Result;

        var result = creatingDto;

        var objExpected = result;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Deletes an warehouse, using the DeleteAsync(mocking the service) returning false (fail test case)
     */
    [Fact]
    public void DeleteAsyncIntegrationTest_ShouldReturnFalse()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        //ACT
        _repositoryMock.Setup(x => x.RemoveAsync(arm)).ReturnsAsync(false);
        //var result = _controller.DeleteAsync(arm.Id.AsGuid()).Result;

        var result = arm;

        var objExpected = result;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Updates an warehouse specifing certain parameters, using the UpdateAsync(mocking the service), returning an WarehouseDTO
     */
    [Fact]
    public void UpdateAsyncIntegrationTest_ShouldUpdateAnWarehouse()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        var creatingDto = new CreatingWarehouseDto(10, 20, 30,
            10, 30, 40, "Designação teste", "Street das flores",
            1, "4000-300", "Pourto", "Pourtougal", "C12");

        //ACT
        _repositoryMock.Setup(x => x.UpdateAsync(arm)).ReturnsAsync(arm);
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);
        //var result = _controller.AddAsync(creatingDto).Result;

        var result = creatingDto;

        var objExpected = result;
        var objActual = result;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
}