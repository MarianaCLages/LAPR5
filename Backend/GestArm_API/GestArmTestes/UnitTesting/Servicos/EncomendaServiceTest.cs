namespace Servicos;

using System;
using System.Collections.Generic;
using GestArm.Domain.Encomendas;
using GestArm.Domain.Shared;
using Moq;
using Xunit;
using Newtonsoft.Json;

public class EncomendaServiceTest
{

    private readonly EncomendasService _service;
    private readonly Mock<IEncomendasRepository> _repositoryMock = new Mock<IEncomendasRepository>();
    
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();

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

        List<EncomendaDto> resultDTO = list.ConvertAll<EncomendaDto>(encomenda => convertToDto(encomenda));
        var result = _service.GetAllAsync();
        
        var obj1Str = JsonConvert.SerializeObject(result);
        var obj2Str = JsonConvert.SerializeObject(resultDTO);
        
        Assert.Equal(obj2Str,obj2Str);
    }

    private EncomendaDto convertToDto(Encomenda encomenda)
    {
        return new EncomendaDto(encomenda.Id, encomenda.DataEntrega.ToString(), encomenda.MassaEntrega.Massa, encomenda.TempoCarga.Minutos,
            encomenda.TempoDescarga.Minutos, encomenda.ArmazemId);
    }
    
}