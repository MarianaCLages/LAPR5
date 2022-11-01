using GestArm.Domain.Armazens;
using GestArm.Domain.Shared;
using Moq;
using Newtonsoft.Json;

namespace Servicos;

public class ArmazemServiceTest
{
    private readonly ArmazemService _service;
    private readonly Mock<IArmazemRepository> _repositoryMock = new Mock<IArmazemRepository>();
    
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();

    public ArmazemServiceTest()
    {
        _service = new ArmazemService(_repositoryMock.Object);
    }
    
    [Fact]
    public void GetAllAsyncTestTest()
    {
        var list = new List<Armazem>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        list.Add(arm);
        
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        List<ArmazemDTO> resultDTO = list.ConvertAll<ArmazemDTO>(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetAllAsync().Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByIdAsyncTest()
    {
        var list = new List<Armazem>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        list.Add(arm);
        
        _repositoryMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(arm);

        List<ArmazemDTO> resultDTO = list.ConvertAll<ArmazemDTO>(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByIdAsync(arm.Id).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByAlphaNumIdAsyncTest()
    {
        var list = new List<Armazem>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        list.Add(arm);
        
        _repositoryMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(arm);

        List<ArmazemDTO> resultDTO = list.ConvertAll<ArmazemDTO>(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByIdAsync(arm.Id).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByDesignacaoAsyncTest()
    {
        var list = new List<Armazem>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        list.Add(arm);
        
        _repositoryMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao)).ReturnsAsync(arm);

        List<ArmazemDTO> resultDTO = list.ConvertAll<ArmazemDTO>(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByDesignacaoAsync(arm.Designacao).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByArmazemIdAsyncTest()
    {
        var list = new List<Armazem>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        list.Add(arm);
        
        _repositoryMock.Setup(x => x.GetByArmazemIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);

        List<ArmazemDTO> resultDTO = list.ConvertAll<ArmazemDTO>(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByArmazemIdAsync(arm.AlphaNumId.AlphaNumId).Result;
        
        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void AddAsyncTest()
    {
        //TODO : Implementar este teste
    }
    
    [Fact]
    public void RemoveAsyncTest()
    {
        //TODO : Implementar este teste
    }
    
    
}