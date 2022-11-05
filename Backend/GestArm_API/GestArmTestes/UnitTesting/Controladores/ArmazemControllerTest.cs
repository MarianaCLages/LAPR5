using DDDNetCore.Controllers;
using GestArm.Domain.Armazens;
using GestArm.Domain.Shared;
using Moq;
using Newtonsoft.Json;

namespace Controladores;

public class ArmazemControllerTest
{
    private readonly ArmazemController _controller;
    private readonly Mock<IArmazemService> _ServiceMock = new();

    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();


    public ArmazemControllerTest()
    {
        _controller = new ArmazemController(_ServiceMock.Object);
    }

    [Fact]
    public void GetAllAsyncTest()
    {
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        var armDto = ArmazemDtoParser.convertToDto(arm);

        listDto.Add(armDto);

        _ServiceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(listDto);
        var result = _controller.GetAll().Result;

        var objExpected = result.Value.First();
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    [Fact]
    public void GetByDesignacaoTest()
    {
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        var armDto = ArmazemDtoParser.convertToDto(arm);

        listDto.Add(armDto);

        _ServiceMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao.Designacao)).ReturnsAsync(listDto);
        var result = _controller.GetByDesignacao(arm.Designacao.Designacao).Result;

        var objExpected = result.Value;
        var objActual = listDto;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    [Fact]
    public void GetByIdTest()
    {
        var listDto = new List<ArmazemDTO>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));


        var armDto = ArmazemDtoParser.convertToDto(arm);

        listDto.Add(armDto);

        _ServiceMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(armDto);
        var result = _controller.GetById(arm.Id.AsGuid()).Result;

        var objExpected = result.Value;
        var objActual = listDto.First();

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    [Fact]
    public void AddAsyncTest()
    {

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
        new CoordenadasArmazem(12, 13, 14),
        new CoordenadasArmazem(15, 12, 13),
        new DesignacaoArmazem("Designação teste"),
        new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
        new AlphaId("A12"));

        var armDto = ArmazemDtoParser.convertToDto(arm);

        CreatingArmazemDto createDTO = new CreatingArmazemDto(12, 13, 14, 15, 12, 13, "Designação teste",
        "Rua das flores", 1, "4000-300", "Pourto", "Pourtougal", "A12");


        _ServiceMock.Setup(x => x.AddAsync(createDTO)).ReturnsAsync(armDto);
        var result = _controller.AddAsync(createDTO).Result;

        var objExpected = armDto;
        var objActual = result.Value;

        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);

        Console.WriteLine(obj1StrExpected);
        Console.WriteLine(obj2StrActual);

        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    [Fact]
    public void DeleteAsyncTest()
    {
        //TODO: implementar este teste
    }
}