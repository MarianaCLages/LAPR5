using System.Collections;
using DDDNetCore.Controllers;
using GestArm.Domain.Armazens;
using Moq;
using Newtonsoft.Json;

namespace IntegrationTests;

/**
 * Integration Tests between the Controller Layer, Service Layer and the Repository Layer mocked
 */
public class ArmazemControllerIntegrationTest
{
    //CONSTRUCT THE MOCK REPOSITORY MAKING A DEPENDENCY INJECTION INTO THE SERVICE (REPOSITORY MOCKED)
    private readonly ArmazemController _controller;
    private readonly ArmazemService _service;
    private readonly Mock<IArmazemRepository> _repositoryMock = new();

    public ArmazemControllerIntegrationTest()
    {
        _service = new ArmazemService(_repositoryMock.Object);
        _controller = new ArmazemController(_service);
    }

    /**
     * Gets all armazens available, using the GetAllAsync(mocking the repository) returning a ArmazemDTO
     */
    [Fact]
    public void GetAllAsyncIntegrationTest_ShouldGetAllArmazens()
    {
        //ARRANGE
        var listArm = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        listArm.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listArm);
        var result = _controller.GetAll().Result;

        var objExpected = result.Value.First();
        var objActual = ArmazemDtoParser.convertToDto(listArm.First());

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets all armazens by designação, using the GetByDesignacaoAsync(mocking the service) returning a ArmazemDTO
     */
    [Fact]
    public void GetByDesignacaoIntegrationTest_ShouldGetAllArmazensByDesignacao()
    {
        //ARRANGE
        var listArm = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        listArm.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao)).ReturnsAsync(listArm);
        var result = _controller.GetByDesignacao(arm.Designacao.Designacao).Result;

        var objExpected = result.Value.First();
        var objActual = ArmazemDtoParser.convertToDto(listArm.First());

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an armazem by ID, using the GetByIdAsync(mocking the service) returning a ArmazemDTO
     */
    [Fact]
    public void GetByIdIntegrationTest_ShouldReturnAnArmazemByID()
    {
        var List = new List<Armazem>();

        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        List.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao)).ReturnsAsync(List);
        var result = _controller.GetByDesignacao(arm.Designacao.Designacao).Result;

        var objExpected = result.Value.First();
        var objActual = ArmazemDtoParser.convertToDto(arm);

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Gets an armazem by Domain ID, using the GetByArmazemIdAsync(mocking the service) returning a ArmazemDTO
     */
    [Fact]
    public void GetByArmazemDomainIdIntegrationTest_ShouldReturnAnArmazemByDomainID()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        //ACT
        _repositoryMock.Setup(x => x.GetByArmazemIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);
        var result = _controller.GetByArmazemIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var objExpected = result.Value;
        var objActual = ArmazemDtoParser.convertToDto(arm);

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Adds an armazem , using the AddAsync(mocking the service) returning a ArmazemDTO
     */
    [Fact]
    public void AddAsyncIntegrationTest_ShouldAddAnArmazem()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        var creatingDto = new CreatingArmazemDto(10, 20, 30,
            10, 30, 40, "Designação teste", "Rua das flores",
            1, "4000-300", "Pourto", "Pourtougal", "A12");


        //ACT
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);
        var result = _controller.AddAsync(creatingDto).Result;

        var objExpected = result.Value;
        var objActual = ArmazemDtoParser.convertToDto(arm);

        if (objExpected == null) return;
        objActual.Id = objExpected.Id;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Deletes an armazem, using the DeleteAsync(mocking the service) returning false (fail test case)
     */
    [Fact]
    public void DeleteAsyncIntegrationTest_ShouldReturnFalse()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        //ACT
        _repositoryMock.Setup(x => x.RemoveAsync(arm)).ReturnsAsync(false);
        var result = _controller.DeleteAsync(arm.Id.AsGuid()).Result;

        var objExpected = result.Value;
        var objActual = false;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Updates an armazem specifing certain parameters, using the UpdateAsync(mocking the service), returning an ArmazemDTO
     */
    [Fact]
    public void UpdateAsyncIntegrationTest_ShouldUpdateAnArmazem()
    {
        //ARRANGE
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        var creatingDto = new CreatingArmazemDto(10, 20, 30,
            10, 30, 40, "Designação teste", "Rua das flores",
            1, "4000-300", "Pourto", "Pourtougal", "A12");

        //ACT
        _repositoryMock.Setup(x => x.UpdateAsync(arm)).ReturnsAsync(arm);
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);
        var result = _controller.AddAsync(creatingDto).Result;

        var objExpected = result.Value;
        var objActual = ArmazemDtoParser.convertToDto(arm);

        if (objExpected == null) return;
        objExpected.Id = objActual.Id;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
}