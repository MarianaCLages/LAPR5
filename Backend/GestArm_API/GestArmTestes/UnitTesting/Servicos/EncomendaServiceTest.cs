using GestArm.Domain.Encomendas;
using Moq;
using Newtonsoft.Json;

namespace Servicos;

public class EncomendaServiceTest
{

    private readonly EncomendasService _service;
    private readonly Mock<IEncomendasRepository> _repositoryMock = new Mock<IEncomendasRepository>();
    
    public EncomendaServiceTest()
    {
        _service = new EncomendasService(_repositoryMock.Object);
    }

    [Fact]
    public void GetAllAsyncTest()
    {
        var list = new List<Encomenda>();

        Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")) , new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120),"A12");
        list.Add(en);
        
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        List<EncomendaDto> resultDTO = list.ConvertAll<EncomendaDto>(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetAllAsync().Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByArmazemIdAsyncTest()
    {
        var list = new List<Encomenda>();

        Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")) , new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120),"A12");
        list.Add(en);
        
        _repositoryMock.Setup(x => x.GetByArmazemIdAsync("A12")).ReturnsAsync(list);

        List<EncomendaDto> resultDTO = list.ConvertAll<EncomendaDto>(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByArmazemIdAsync("A12").Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByDataEntregaAysncTest()
    {
        var list = new List<Encomenda>();

        Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")) , new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120),"A12");
        list.Add(en);
        
        _repositoryMock.Setup(x => x.GetByDataEntregaAysnc(DateTime.Parse("2022-12-27"))).ReturnsAsync(list);

        List<EncomendaDto> resultDTO = list.ConvertAll<EncomendaDto>(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByDataEntregaAysnc(DateTime.Parse("2022-12-27")).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByFiltragemAysncTest()
    {
        var list = new List<Encomenda>();

        Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")) , new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120),"A12");
        list.Add(en);
        
        _repositoryMock.Setup(x => x.GetByFiltragemAsync("A12",DateTime.Parse("2022-12-27"))).ReturnsAsync(list);

        List<EncomendaDto> resultDTO = list.ConvertAll<EncomendaDto>(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByFiltragemAysnc("A12",DateTime.Parse("2022-12-27")).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByIdAsyncTest()
    {
        var list = new List<Encomenda>();

        Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")) , new MassaEntrega(10), new TempoEncomenda(120), new TempoEncomenda(120),"A12");
        list.Add(en);
        
        _repositoryMock.Setup(x => x.GetByIdAsync(en.Id)).ReturnsAsync(en);

        List<EncomendaDto> resultDTO = list.ConvertAll<EncomendaDto>(encomenda => EncomendaDtoParser.convertToDto(encomenda));
        var result = _service.GetByIdAsync(en.Id).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First());
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void AddAsyncTest()
    {
       //TODO : Add a encomenda
    }
    
    [Fact]
    public void UpdateAsyncTest()
    {
        //TODO : Update a encomenda
    }
    
    [Fact]
    public void RemoveAsyncTest()
    {
        //TODO : Remove a encomenda
    }
    
}