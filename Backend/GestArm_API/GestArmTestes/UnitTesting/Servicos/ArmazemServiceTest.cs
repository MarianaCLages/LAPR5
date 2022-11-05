using GestArm.Domain.Armazens;
using Moq;
using Newtonsoft.Json;

namespace Servicos;

public class ArmazemServiceTest
{
    private readonly Mock<IArmazemRepository> _repositoryMock = new();
    private readonly ArmazemService _service;
    
    public ArmazemServiceTest()
    {
        _service = new ArmazemService(_repositoryMock.Object);
    }
    
    /*
     * Gets all armazens, using the GetAllAsync (mocking the repository) returning an ArmazemDTO
     */

    [Fact]
    public void GetAllAsyncTestTest_ShouldGetAllArmazens()
    {
        //ARRANGE
        var list = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var resultDTO = list.ConvertAll(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetAllAsync().Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by ID, using the GetByIdAsync (mocking the repository) returning an ArmazemDTO
    */

    [Fact]
    public void GetByIdAsyncTest_ShouldGetAnArmazemByID()
    {
        //ARRANGE
        var list = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByIdAsync(arm.Id)).ReturnsAsync(arm);

        var resultDTO = list.ConvertAll(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByIdAsync(arm.Id).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by the Domain ID, using the GetByIdAsync (mocking the repository) returning an ArmazemDTO
    */

    [Fact]
    public void GetByAlphaNumIdAsyncTest_ShouldGetAnArmazemByDomainID()
    {
        //ARRANGE
        var list = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByArmazemIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);

        var resultDTO = list.ConvertAll(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByArmazemIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by the designação, using the GetByDesignacaoAsync (mocking the repository) returning an ArmazemDTO
    */

    [Fact]
    public void GetByDesignacaoAsyncTest_ShouldGetAnArmazemByDesignacao()
    {
        //ARRANGE
        var list = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByDesignacaoAsync(arm.Designacao)).ReturnsAsync(list);

        var resultDTO = list.ConvertAll(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByDesignacaoAsync(arm.Designacao.Designacao).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Gets an armazenm by the domain ID (api getter method), using the GetByDesignacaoAsync (mocking the repository) returning an ArmazemDTO
    */

    [Fact]
    public void GetByArmazemIdAsyncTest_ShouldGetAnArmazemByID()
    {
        //ASSERT
        var list = new List<Armazem>();

        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        list.Add(arm);

        //ACT
        _repositoryMock.Setup(x => x.GetByArmazemIdAsync(arm.AlphaNumId)).ReturnsAsync(arm);

        var resultDTO = list.ConvertAll(arn => ArmazemDtoParser.convertToDto(arn));
        var result = _service.GetByArmazemIdAsync(arm.AlphaNumId.AlphaNumId).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.First().ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
    
    /*
    * Adds an armazenm , using the AddAsync (mocking the repository) returning an ArmazemDTO
    */

    [Fact]
    public void AddAsyncTest_ShouldAddAnArmazem()
    {
        //ASSERT
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        CreatingArmazemDto armDto = new CreatingArmazemDto(10, 20, 30, 
            10, 30, 40, "Deisgnação teste", "Rua das flores",
            1, "4000-300", "Pourto", "Pourtougal", "A12");
        
        //ACT
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);

        var resultDTO = ArmazemDtoParser.convertToDto(arm);
        var result = _service.AddAsync(armDto).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
        var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }

    /*
    * Removes an armazenm , using the DeleteAsync (mocking the repository) returning an boolean verification
    */
    
    [Fact]
    public void RemoveAsyncTest_ShouldRemoveAnArmazem()
    {
        //ASSERT
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        //ACT
        _repositoryMock.Setup(x => x.RemoveAsync(arm)).ReturnsAsync(false);

        var resultActual = false;
        var result = _service.DeleteAsync(arm.Id).Result;

        var obj1StrExpected = JsonConvert.SerializeObject(result);
        var obj2StrActual = JsonConvert.SerializeObject(resultActual);

        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    }
}