using GestArm.Domain.Warehouses;
using Moq;
using Newtonsoft.Json;

namespace Servicos;

public class WarehouseServiceTest
{
    private readonly Mock<IWarehouseRepository> _repositoryMock = new();
    private readonly WarehouseService _service;
    
    public WarehouseServiceTest()
    {
        _service = new WarehouseService(_repositoryMock.Object);
    }
    
    /*
     * Gets all warehouses, using the GetAllAsync (mocking the repository) returning an WarehouseDTO
     */

    [Fact]
    public void GetAllAsyncTest_ShouldGetAllWarehouses()
    {
        //ARRANGE
        var list = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var resultDTO = list.ConvertAll(arn => WarehouseDtoParser.convertToActivateDto(arn));
        var result = _service.GetAllAsync().Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by ID, using the GetByIdAsync (mocking the repository) returning an WarehouseDTO
    */

    [Fact]
    public void GetByIdAsyncTest_ShouldGetAnWarehouseByID()
    {
        //ARRANGE
        var list = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(arm);

        var resultDTO = list.ConvertAll(arn => WarehouseDtoParser.convertToActivateDto(arn));
        var result = _service.GetByIdAsync(arm.Id).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by the Domain ID, using the GetByIdAsync (mocking the repository) returning an WarehouseDTO
    */

    [Fact]
    public void GetByAlphaNumIdAsyncTest_ShouldGetAnWarehouseByDomainID()
    {
        //ARRANGE
        var list = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByWarehouseIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);

        var resultDTO = list.ConvertAll(arn => WarehouseDtoParser.convertToActivateDto(arn));
        var result = _service.GetByWarehouseIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by the designação, using the GetByDesignationAsync (mocking the repository) returning an WarehouseDTO
    */

    [Fact]
    public void GetByDesignationAsyncTest_ShouldGetAnWarehouseByDesignation()
    {
        //ARRANGE
        var list = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByDesignationAsync(arm.Designation)).ReturnsAsync(list);

        var resultDTO = list.ConvertAll(arn => WarehouseDtoParser.convertToActivateDto(arn));
        var result = _service.GetByDesignationAsync(arm.Designation.Designation).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by the domain ID (api getter method), using the GetByDesignationAsync (mocking the repository) returning an WarehouseDTO
    */

    [Fact]
    public void GetByWarehouseIdAsyncTest_ShouldGetAnWarehouseByID()
    {
        //ASSERT
        var list = new List<Warehouse>();

        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByWarehouseIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);

        var resultDTO = list.ConvertAll(arn => WarehouseDtoParser.convertToActivateDto(arn));
        var result = _service.GetByWarehouseIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Adds an armazenm , using the AddAsync (mocking the repository) returning an WarehouseDTO
    */

    [Fact]
    public void AddAsyncTest_ShouldAddAnWarehouse()
    {
        //ASSERT
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));

        CreatingWarehouseDto armDto = new CreatingWarehouseDto(10, 20, 30, 
            10, 30, 40, "Deisgnação teste", "Street das flores",
            1, "4000-300", "Pourto", "Pourtougal", "C12");
        
        //ACT
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);

        var resultDTO = WarehouseDtoParser.convertToDto(arm);
        var result = _service.AddAsync(armDto).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Removes an armazenm , using the DeleteAsync (mocking the repository) returning an boolean verification
    */
    
    [Fact]
    public void RemoveAsyncTest_ShouldRemoveAnWarehouse()
    {
        //ASSERT
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("C12"));
        
        //ACT
        _repositoryMock.Setup(x => x.RemoveAsync(arm)).ReturnsAsync(false);

        var resultActual = false;
        var result = _service.DeleteAsync(arm.Id).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
}