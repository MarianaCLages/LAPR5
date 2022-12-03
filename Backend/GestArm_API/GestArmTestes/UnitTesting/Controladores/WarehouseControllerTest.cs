using DDDNetCore.Controllers;
using GestArm.Domain.Warehouses;
using Moq;
using Newtonsoft.Json;

namespace Controladores;

public class WarehouseControllerTest
{
    private readonly WarehouseController _controller;
    private readonly Mock<IWarehouseService> _ServiceMock = new();
    
    public WarehouseControllerTest()
    {
        _controller = new WarehouseController(_ServiceMock.Object);
    }

    /**
     * Gets all warehouses available, using the GetAllAsync(mocking the service) returning a WarehouseDTO
     */
    
    [Fact]
    public void GetAllAsyncTest_ShouldGetAllWarehouses()
    {
        //ARRANGE
        var listDto = new List<WarehouseDTO>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));
        
        var armDto = WarehouseDtoParser.convertToDto(arm);
        listDto.Add(armDto);
        
        //ACT
        _ServiceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listDto);
        var result = _controller.GetAll().Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();
        
        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Gets all warehouses by designação, using the GetByDesignationAsync(mocking the service) returning a WarehouseDTO
     */

    [Fact]
    public void GetByDesignationTest_ShouldGetAllWarehousesByDesignation()
    {
        //ARRANGE
        var listDto = new List<WarehouseDTO>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));


        var armDto = WarehouseDtoParser.convertToDto(arm);
        listDto.Add(armDto);
        
        //ACT
        _ServiceMock.Setup(x => x.GetByDesignationAsync(arm.Designation.Designation)).ReturnsAsync(listDto);
        var result = _controller.GetByDesignation(arm.Designation.Designation).Result;

        var objExpected = result.Value;
        var objActual = listDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an warehouse by ID, using the GetByIdAsync(mocking the service) returning a WarehouseDTO
     */
    
    [Fact]
    public void GetByIdTest_ShouldReturnAnWarehouseByID()
    {
        
        //ARRANGE
        var listDto = new List<WarehouseDTO>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));


        var armDto = WarehouseDtoParser.convertToDto(arm);
        listDto.Add(armDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(armDto);
        var result = _controller.GetById(arm.Id.AsGuid()).Result;

        var objExpected = result.Value;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ARRANGE
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Gets an warehouse by Domain ID, using the GetByWarehouseIdAsync(mocking the service) returning a WarehouseDTO
     */
    
    [Fact]
    public void GetByWarehouseDomainIdTest_ShouldReturnAnWarehouseByDomainID()
    {
        
        //ARRANGE
        var listDto = new List<WarehouseDTO>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));


        var armDto = WarehouseDtoParser.convertToDto(arm);
        listDto.Add(armDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByWarehouseIdAsync(arm.AlphaNumId.AlphaNumId)).ReturnsAsync(armDto);
        var result = _controller.GetByWarehouseIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var objExpected = result.Value;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ARRANGE
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Adds an warehouse , using the AddAsync(mocking the service) returning a WarehouseDTO
     */

    [Fact]
    public void AddAsyncTest_ShouldAddAnWarehouse()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
        new WarehouseCoordinates(12, 13, 14),
        new WarehouseCoordinates(15, 12, 13),
        new DesignationWarehouse("Designação teste"),
        new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
        new AlphaId("C12"));

        var armDto = WarehouseDtoParser.convertToDto(arm);

        CreatingWarehouseDto createDTO = new CreatingWarehouseDto(12, 13, 14, 15, 12, 13, "Designação teste",
        "Street das flores", 1, "4000-300", "Pourto", "Pourtougal", "C12");
        
        //ACT
        _ServiceMock.Setup(x => x.AddAsync(createDTO)).ReturnsAsync(armDto);
        var result = _controller.AddAsync(createDTO).Result;

        var objExpected = armDto;
        var objActual = armDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ACT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Deletes an warehouse , using the DeleteAsync(mocking the service) returning false (fail test case)
     */

    [Fact]
    public void DeleteAsyncTest_ShouldReturnFalse()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(12, 13, 14),
            new WarehouseCoordinates(15, 12, 13),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));
        
        //ACT
        _ServiceMock.Setup(x => x.DeleteAsync(arm.Id)).ReturnsAsync(false);
        var result = _controller.DeleteAsync(arm.Id.AsGuid()).Result;

        var objExpected = false;
        var objActual = result.Value;
        
        //ACT
        Assert.Equal(objExpected, objActual);
    }
    
    /**
     * Updates an warehouse specifing certain parameters, using the UpdateAsync(mocking the service), returning an WarehouseDTO
     */
    
    [Fact]
    public void UpdateAsyncTest_ShouldUpdateAnWarehouse()
    {
        //ARRANGE
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(12, 13, 14),
            new WarehouseCoordinates(15, 12, 13),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        var armDto = WarehouseDtoParser.convertToDto(arm);

        CreatingWarehouseDto createDTO = new CreatingWarehouseDto(12, 13, 14, 15, 12, 13, "Designação teste",
            "Street das flores", 1, "4000-300", "Pourto", "Pourtougal", "C12");
        
        //ACT
        _ServiceMock.Setup(x => x.UpdateAsync(armDto)).ReturnsAsync(armDto);
        _ServiceMock.Setup(x => x.AddAsync(createDTO)).ReturnsAsync(armDto);
        var result = _controller.AddAsync(createDTO).Result;

        var objExpected = armDto;
        var objActual = armDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ACT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
}