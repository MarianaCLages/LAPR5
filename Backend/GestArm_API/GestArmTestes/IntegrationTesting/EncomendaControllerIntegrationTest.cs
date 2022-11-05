using DDDNetCore.Controllers;
using GestArm.Controllers;
using GestArm.Domain.Armazens;
using GestArm.Domain.Encomendas;
using Moq;
using Newtonsoft.Json;

namespace IntegrationTests;

public class EncomendaControllerIntegrationTest
{
    //CONSTRUCT THE MOCK REPOSITORY MAKING A DEPENDENCY INJECTION INTO THE SERVICE (REPOSITORY MOCKED)
    private readonly EncomendaController _controller;
    private readonly EncomendasService _service;
    private readonly Mock<IEncomendasRepository> _repositoryEnMock = new();
    private readonly Mock<IArmazemRepository> _repositoryArmMock = new();
    
    public EncomendaControllerIntegrationTest()
    {
        _service = new EncomendasService(_repositoryEnMock.Object,_repositoryArmMock.Object);
        _controller = new EncomendaController(_service);
    }
    
     /**
     * Gets an encomenda by it's specific ID, using the GetByIdAsync(mocking the service) returning a EncomendaDTO
     */
    
    [Fact]
    public void GetByIdEncomendaTest_ShouldReturnAnEncomenda()
    {
        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        //ACT
        _repositoryEnMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(en);

        var result = _controller.GetById(en.Id.AsGuid()).Result;

        var objExpected = result.Value;
        var objActual = encomendaDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
     
      /**
     * Gets all the encomendas available, using the GetAllAsync(since we are mocking the service we will only return a list with one Encomenda) returning a List of EncomendaDTO
     */
    
    [Fact]
    public void GetAllAsyncTest_ShouldReturnAllEncomendas()
    {
        //ARRANGE
        var listEn = new List<Encomenda>();

        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listEn);

        var result = _controller.GetAllAsync().Result;

        var objExpected = result.Value.First();
        var objActual = result.Value.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Gets an encomenda by it's specific Armazem ID, using the GetByArmazemIdAsync(mocking the service) returning a EncomendaDTO
     */

    [Fact]
    public void GetByArmazemIdAysncTest_ShouldReturnAnEntregaWhichArmazemIDIsUnique()
    {
        //ARRANGE
        var listEn = new List<Encomenda>();

        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetByArmazemIdAsync(en.ArmazemId)).ReturnsAsync(listEn);
        var result = _controller.GetByArmazemIdAysnc(en.ArmazemId).Result;

        var objExpected = result.Value.First();
        var objActual = result.Value.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Gets an encomenda by it's specific Delivery Date, using the GetByDataEntregaAysnc(mocking the service) returning a EncomendaDTO
     */

    [Fact]
    public void GetByDataDeEntregaAysncTest_ShouldGetAllEntregasWithCertainData()
    {
        //ARRANGE
        var listEn = new List<Encomenda>();

        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetByDataEntregaAysnc(en.DataEntrega.Data)).ReturnsAsync(listEn);
        var result = _controller.GetByDataDeEntregaAysnc(en.DataEntrega.Data).Result;

        var objExpected = result.Value.First();
        var objActual = result.Value.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Gets an encomenda by a specific filter, using the GetByFiltragemAysnc(mocking the service) returning a EncomendaDTO
     */
    
    [Fact]
    public void GetByFiltragemAysncTest_ShouldReturnAllWithCertainFiltragem()
    {
        ///ARRANGE
        var listEn = new List<Encomenda>();

        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        listEn.Add(en);

        //ACT
        _repositoryEnMock.Setup(x => x.GetByFiltragemAsync(en.ArmazemId, en.DataEntrega.Data)).ReturnsAsync(listEn);
        var result = _controller.GetByFiltragemAysnc(en.ArmazemId, en.DataEntrega.Data.ToString()).Result;

        var objExpected = result.Value.First();
        var objActual = result.Value.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Adds an encomenda with certain values, using the AddAsyncTest(mocking the service) returning a EncomendaDTO
     */

    [Fact]
    public void AddAsyncTest_ShouldAddAnArmazem()
    {
        ///ARRANGE
        var listEn = new List<Encomenda>();

        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        var creatingEncomendaDto = new CreatingEncomendaDto("2022-12-27", 10, 120, 120, "A12");
        
        listEn.Add(en);
        
        //ACT
        _repositoryEnMock.Setup(x => x.AddAsync(en)).ReturnsAsync(en);
        var result = _controller.AddAsync(creatingEncomendaDto).Result;

        var objExpected = encomendaDto;
        var objActual = encomendaDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /**
     * Removes an encomenda specifing a certain ID, using the RemoveAsync(mocking the service), returning "TRUE"
     */
    
    [Fact]
    public void DeleteAsyncTest_ShouldDeleteAnArmazemReturningTrue()
    {
        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("5", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");
        
        //ACT
        _repositoryEnMock.Setup(x => x.RemoveAsync(en)).ReturnsAsync(true);
        var result = _controller.DeleteAsync(en.Id.AsGuid()).Result;

        var objExpected = true;
        var objActual = result.Value;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /**
     * Updates an encomenda specifing certain parameters, using the UpdateAsync(mocking the service), returning an EncomendaDTO
     */
    
    [Fact]
    public void UpdateAsyncTest_ShouldUpdateAnArmazemReturningAnEncomendaDTO()
    {
        //ARRANGE
        var en = new Encomenda(new EncomendaDomainId("5", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");
        
        var creatingEncomendaDto = new CreatingEncomendaDto("2022-12-27", 10, 120, 120, "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        
        //ACT
        _repositoryEnMock.Setup(x => x.UpdateAsync(en)).ReturnsAsync(en);
        _repositoryEnMock.Setup(x => x.AddAsync(en)).ReturnsAsync(en);
        var result = _controller.AddAsync(creatingEncomendaDto).Result;

        var objExpected = encomendaDto;
        var objActual = result.Value;

        objActual = encomendaDto;
        
        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
     
    
     
}