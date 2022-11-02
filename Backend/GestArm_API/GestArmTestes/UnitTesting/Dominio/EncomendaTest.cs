using GestArm.Domain.Encomendas;
using GestArm.Domain.Shared;

namespace Dominio;

public class EncomendaTest
{
    [Fact]
    public void CreateValidEncomendaTest()
    {
        var dataTeste = DateTime.Today.Add(TimeSpan.FromDays(5));
        var dataFormato = dataTeste.ToString("yyMMdd");
        var en = new Encomenda(new EncomendaDomainId("5", dataFormato),
            new DataEntrega(dataTeste), new MassaEntrega(115), new TempoEncomenda(5),
            new TempoEncomenda(5), "BRG");
        Assert.NotNull(en);
    }

    [Fact]
    public void CreateEncomendaWithInvalidDataEntregaTest()
    {
        Assert.Throws<FormatException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("")),
            new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }

    [Fact]
    public void CreateEncomendaWithInvalidDataEntregaBussinessInvalidationTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Subtract(TimeSpan.FromDays(1))),
            new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }

    [Fact]
    public void CreateEncomendaWithInvalidMassaEntregaTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(-10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }

    [Fact]
    public void CreateEncomendaWithInvalidTempoCargaTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(10),
            new TempoEncomenda(-10), new TempoEncomenda(120), "A12"));
    }

    [Fact]
    public void CreateEncomendaWithInvalidTempoDescargaTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(-10), "A12"));
    }

    [Fact]
    public void CreateEncomendaWithInvalidArmazemIDTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(-10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12AAAA"));
    }
}