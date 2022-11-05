using GestArm.Controllers;
using GestArm.Domain.Encomendas;
using Moq;
using Newtonsoft.Json;

namespace Controladores;

public class EncomendaControllerTest
{
    private readonly EncomendaController _controller;
    private readonly Mock<IEncomendasService> _ServiceMock = new();
    
    public EncomendaControllerTest()
    {
        _controller = new EncomendaController(_ServiceMock.Object);
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
        _ServiceMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(encomendaDto);

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
        var listDto = new List<EncomendaDto>();

        var en = new Encomenda(new EncomendaDomainId("2", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        listDto.Add(encomendaDto);

        //ACT
        _ServiceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listDto);

        var result = _controller.GetAllAsync().Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();

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
        var listDto = new List<EncomendaDto>();

        var en = new Encomenda(new EncomendaDomainId("3", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        listDto.Add(encomendaDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByArmazemIdAsync(en.ArmazemId)).ReturnsAsync(listDto);
        var result = _controller.GetByArmazemIdAysnc(en.ArmazemId).Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();

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
        var listDto = new List<EncomendaDto>();

        var en = new Encomenda(new EncomendaDomainId("4", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        listDto.Add(encomendaDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByDataEntregaAysnc(en.DataEntrega.Data)).ReturnsAsync(listDto);
        var result = _controller.GetByDataDeEntregaAysnc(en.DataEntrega.Data).Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();

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
        //ARRANGE
        var listDto = new List<EncomendaDto>();

        var en = new Encomenda(new EncomendaDomainId("5", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        var encomendaDto = EncomendaDtoParser.convertToDto(en);
        listDto.Add(encomendaDto);

        //ACT
        _ServiceMock.Setup(x => x.GetByFiltragemAysnc(en.ArmazemId, en.DataEntrega.Data)).ReturnsAsync(listDto);
        var result = _controller.GetByFiltragemAysnc(en.ArmazemId, en.DataEntrega.Data.ToString()).Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();

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
        //ARRANGE

        var en = new Encomenda(new EncomendaDomainId("5", "221227"), new DataEntrega(DateTime.Parse("2022-12-27")),
            new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120), "A12");


        CreatingEncomendaDto creatingEncomendaDto = new CreatingEncomendaDto("2022-12-27", 10, 120, 120, "A12");
        
        var encomendaDto = EncomendaDtoParser.convertToDto(en);

        //ACT
        _ServiceMock.Setup(x => x.AddAsync(creatingEncomendaDto)).ReturnsAsync(encomendaDto);
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
        _ServiceMock.Setup(x => x.RemoveAsync(en.Id)).ReturnsAsync(true);
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
        _ServiceMock.Setup(x => x.UpdateAsync(en.Id,creatingEncomendaDto)).ReturnsAsync(encomendaDto);
        var result = _controller.Update(en.Id.AsGuid(),creatingEncomendaDto).Result;

        var objExpected = encomendaDto;
        var objActual = encomendaDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
}