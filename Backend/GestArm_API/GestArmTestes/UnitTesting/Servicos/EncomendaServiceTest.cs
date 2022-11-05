using GestArm.Domain.Armazens;
using GestArm.Domain.Encomendas;
using Moq;
using Newtonsoft.Json;

namespace Servicos;

public class EncomendaServiceTest
{
    private readonly Mock<IArmazemRepository> _repositoryArmazemMock = new();

    private readonly Mock<IEncomendasRepository> _repositoryMock = new();
    private readonly EncomendasService _service;

    public EncomendaServiceTest()
    {
        _service = new EncomendasService(_repositoryMock.Object, _repositoryArmazemMock.Object);
    }

    /*
     * Gets all encomenda, using the GetAllAsync (mocking the repository) returning an EncomendaDTO
     */
    
    [Fact]
    public void GetAllAsyncTest_ShouldReturnAllEncomendas()
    {
        //Arrange
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(list);
        
        var resultDTO =
            list.ConvertAll(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetAllAsync().Result;

        //ASSERT
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Gets an encomenda by the ArmazemID associated, using the GetByArmazemIdAsync (mocking the repository) returning an EncomendaDTO
    */
    
    [Fact]
    public void GetByArmazemIdAsyncTest_ShouldReturnAnEncomendaByArmazemID()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetByArmazemIdAsync("A12")).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByArmazemIdAsync("A12").Result;

        //ASSERT
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an encomenda by the DeliveryDate associated, using the GetByDataEntregaAysnc (mocking the repository) returning an EncomendaDTO
    */

    [Fact]
    public void GetByDataEntregaAysncTest_ShouldReturnAnArmazemByDeliveryDate()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetByDataEntregaAysnc(DateTime.Parse("2022-12-27"))).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByDataEntregaAysnc(DateTime.Parse("2022-12-27")).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an encomenda by a specific filtragem, using the GetByFiltragemAsync (mocking the repository) returning an EncomendaDTO
    */

    [Fact]
    public void GetByFiltragemAysncTest_ShouldReturnAnArmazemByASpeficFilter()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.GetByFiltragemAsync("A12", DateTime.Parse("2022-12-27"))).ReturnsAsync(list);

        var resultDTO =
            list.ConvertAll(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByFiltragemAysnc("A12", DateTime.Parse("2022-12-27")).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Gets an encomenda by a specific filtragem, using the GetByFiltragemAsync (mocking the repository) returning an EncomendaDTO
    */
    
    [Fact]
    public void GetByIdAsyncTest_GetAnEcomendaBySpecificID()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");
        list.Add(en);

        _repositoryMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(en);

        //ACT
        var resultDTO =
            list.ConvertAll(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByIdAsync(en.Id).Result;

        //ASSERT
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First());

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Adds an Encomenda, using the AddAsync (mocking the repository) returning an EncomendaDTO
    */

    [Fact]
    public void AddAsyncTest_ShouldAddAnEncomenda()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");
        
        CreatingEncomendaDto creatingEncomendaDto = new CreatingEncomendaDto("2022-12-27", 10, 120, 120, "A12");
        
        list.Add(en);

        _repositoryMock.Setup(x => x.AddAsync(en)).ReturnsAsync(en);

        //ACT
        var resultDTO = EncomendaDtoParser.convertToDto(en);
            
        var result = _service.AddAsync(creatingEncomendaDto).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Updates an Encomenda, using the UpdateAsync (mocking the repository) returning an EncomendaDTO
    */

    [Fact]
    public void UpdateAsyncTest_ShouldUpdateAnEncomenda()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");

        var creatingEncomendaDto = new CreatingEncomendaDto("2022-12-27", 10, 120, 120, "A12");
        list.Add(en);

        //ACT
        _repositoryMock.Setup(x => x.UpdateAsync(en)).ReturnsAsync(en);
        
        var resultDTO = EncomendaDtoParser.convertToDto(en);
        var result = _service.UpdateAsync(en.Id,creatingEncomendaDto);
        var resultAlt = resultDTO;
        
        var obj1StrExpected = JsonConvert.SerializeObject(resultAlt.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
   * Updates an Encomenda, using the UpdateAsync (mocking the repository) returning an EncomendaDTO
   */

    [Fact]
    public void RemoveAsyncTest_ShouldRemoveAnEncomenda()
    {
        //ARRANGE
        var list = new List<Encomenda>();

        var en = new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10), new TempoEncomenda(120),
            new TempoEncomenda(120), "A12");

        var creatingEncomendaDto = new CreatingEncomendaDto("2022-12-27", 10, 120, 120, "A12");
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