using System;
using System.Collections.Generic;
using GestArm.Domain.Armazens;
using GestArm.Domain.Encomendas;
using GestArm.Domain.Shared;
using Moq;
using Xunit;
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
    public void GetAllAsyncTest()
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
        
        Assert.Equal(obj2StrActual,obj1StrExpected);
    }
    
    [Fact]
    public void GetByIdAsync()
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
        
        Assert.Equal(obj2StrActual,obj1StrExpected);
    }
    
    [Fact]
    public void GetByAlphaNumIdAsync()
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
        
        Assert.Equal(obj2StrActual,obj1StrExpected);
    }
    
    [Fact]
    public void GetByDesignacaoAsync()
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
        
        Assert.Equal(obj2StrActual,obj1StrExpected);
    }
    
    [Fact]
    public void GetByArmazemIdAsync()
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
        
        Assert.Equal(obj2StrActual,obj1StrExpected);
    }
    
    [Fact]
    public void AddAsync()
    {
        //TODO : Implementar este teste
    }
    
    [Fact]
    public void RemoveAsync()
    {
        //TODO : Implementar este teste
    }
    
    
}