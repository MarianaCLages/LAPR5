using DDDNetCore.Controllers;
using GestArm.Domain.Armazens;
using Moq;
using GestArm.Domain.Shared;
using Newtonsoft.Json;
namespace Controladores;

public class ArmazemControllerTest
{
    
    private readonly ArmazemController _controller;
    private readonly Mock<IArmazemService> _ServiceMock = new Mock<IArmazemService>();
    
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();
    
    
    public ArmazemControllerTest()
    {
        _controller = new ArmazemController(_ServiceMock.Object);
    }
    
    [Fact]
    public void GetAllAsyncTest()
    {
        var listDto = new List<ArmazemDTO>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        ArmazemDTO armDto = ArmazemDtoParser.convertToDto(arm);
        
        listDto.Add(armDto);
        
        _ServiceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listDto);
        var result = _controller.GetAll().Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByDesignacaoTest()
    {
        var listDto = new List<ArmazemDTO>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        ArmazemDTO armDto = ArmazemDtoParser.convertToDto(arm);
        
        listDto.Add(armDto);
        
        _ServiceMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao)).ReturnsAsync(armDto);
        var result = _controller.GetByDesignacao(arm.Designacao.Designacao).Result;

        var objExpected = result.Value;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void GetByIdTest()
    {
        var listDto = new List<ArmazemDTO>();

        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        ArmazemDTO armDto = ArmazemDtoParser.convertToDto(arm);
        
        listDto.Add(armDto);
        
        _ServiceMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(armDto);
        var result = _controller.GetById(arm.Id.AsGuid()).Result;

        var objExpected = result.Value;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        Assert.Equal(obj1StrExpected,obj2StrActual);
    }
    
    [Fact]
    public void AddAsyncTest()
    {
       //TODO: implementar este teste
    }
    
    [Fact]
    public void DeleteAsyncTest()
    {
       //TODO: implementar este teste
    }
    
    
}