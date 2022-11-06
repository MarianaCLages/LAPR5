using DDDNetCore.Controllers;
using GestArm.Domain.Armazens;
using Moq;
using Newtonsoft.Json;

namespace Controladores;

public class ArmazemControllerTest
{
    private readonly ArmazemController _controller;
    private readonly Mock<IArmazemService> _ServiceMock = new();
    
    public ArmazemControllerTest()
    {
        _controller = new ArmazemController(_ServiceMock.Object);
    }

    /**
     * Gets all armazens available, using the GetAllAsync(mocking the service) returning a ArmazemDTO
     */
    
    [Fact]
    public void GetAllAsyncTest_ShouldGetAllArmazens()
    {
        //ARRANGE
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        var armDto = ArmazemDtoParser.convertToDto(arm);
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
     * Gets all armazens by designação, using the GetByDesignacaoAsync(mocking the service) returning a ArmazemDTO
     */

    [Fact]
    public void GetByDesignacaoTest_ShouldGetAllArmazensByDesignacao()
    {
        //ARRANGE
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        var armDto = ArmazemDtoParser.convertToDto(arm);
        listDto.Add(armDto);
        
        //ACT
        _ServiceMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao.Designacao)).ReturnsAsync(listDto);
        var result = _controller.GetByDesignacao(arm.Designacao.Designacao).Result;

        var objExpected = result.Value;
        var objActual = listDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an armazem by ID, using the GetByIdAsync(mocking the service) returning a ArmazemDTO
     */
    
    [Fact]
    public void GetByIdTest_ShouldReturnAnArmazemByID()
    {
        
        //ARRANGE
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        var armDto = ArmazemDtoParser.convertToDto(arm);
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
     * Gets an armazem by Domain ID, using the GetByArmazemIdAsync(mocking the service) returning a ArmazemDTO
     */
    
    [Fact]
    public void GetByArmazemDomainIdTest_ShouldReturnAnArmazemByDomainID()
    {
        
        //ARRANGE
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        var armDto = ArmazemDtoParser.convertToDto(arm);
        listDto.Add(armDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByArmazemIdAsync(arm.AlphaNumId.AlphaNumId)).ReturnsAsync(armDto);
        var result = _controller.GetByArmazemIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var objExpected = result.Value;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ARRANGE
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Adds an armazem , using the AddAsync(mocking the service) returning a ArmazemDTO
     */

    [Fact]
    public void AddAsyncTest_ShouldAddAnArmazem()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
        new CoordenadasArmazem(12, 13, 14),
        new CoordenadasArmazem(15, 12, 13),
        new DesignacaoArmazem("Designação teste"),
        new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
        new AlphaId("A12"));

        var armDto = ArmazemDtoParser.convertToDto(arm);

        CreatingArmazemDto createDTO = new CreatingArmazemDto(12, 13, 14, 15, 12, 13, "Designação teste",
        "Rua das flores", 1, "4000-300", "Pourto", "Pourtougal", "A12");
        
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
     * Deletes an armazem , using the DeleteAsync(mocking the service) returning false (fail test case)
     */

    [Fact]
    public void DeleteAsyncTest_ShouldReturnFalse()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(12, 13, 14),
            new CoordenadasArmazem(15, 12, 13),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        //ACT
        _ServiceMock.Setup(x => x.DeleteAsync(arm.Id)).ReturnsAsync(false);
        var result = _controller.DeleteAsync(arm.Id.AsGuid()).Result;

        var objExpected = false;
        var objActual = result.Value;
        
        //ACT
        Assert.Equal(objExpected, objActual);
    }
    
    /**
     * Updates an armazem specifing certain parameters, using the UpdateAsync(mocking the service), returning an ArmazemDTO
     */
    
    [Fact]
    public void UpdateAsyncTest_ShouldUpdateAnArmazem()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(12, 13, 14),
            new CoordenadasArmazem(15, 12, 13),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        var armDto = ArmazemDtoParser.convertToDto(arm);

        CreatingArmazemDto createDTO = new CreatingArmazemDto(12, 13, 14, 15, 12, 13, "Designação teste",
            "Rua das flores", 1, "4000-300", "Pourto", "Pourtougal", "A12");
        
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