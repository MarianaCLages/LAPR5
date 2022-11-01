using GestArm.Domain.Shared;
using GestArm.Domain.Encomendas;

namespace Dominio;


public class EncomendaTest
{
    [Fact]
    public void CreateValidEncomendaTest()
    {
        Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12");

        Assert.NotNull(en);
    }

    [Fact]
    public void CreateEncomendaWithInvalidDataEntregaTest()
    {
        try
        {
            Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("")), new MassaEntrega(10),
                new TempoEncomenda(120), new TempoEncomenda(120), "A12");
        }
        catch (FormatException)
        {
            //Vai falhar porque não é possível criar uma encomenda sem Data entrega (String não reconhecida pelo parser)
        }
        
    }

    [Fact]
    public void CreateEncomendaWithInvalidDataEntregaBussinessInvalidationTest()
    {

        try
        {
            Encomenda en = new Encomenda(new DataEntrega(DateTime.Now), new MassaEntrega(10), new TempoEncomenda(120),
                new TempoEncomenda(120),
                "A12");
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma encomenda sem Data entrega (O tempo da entrega é superior ao do momento)
        }
        
    }

    [Fact]
    public void CreateEncomendaWithInvalidMassaEntregaTest()
    {
        try
        {
            Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(-10),
                new TempoEncomenda(120), new TempoEncomenda(120), "A12");
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma encomenda sem Massa de entrega (valor negativo)
        }
        
    }

    [Fact]
    public void CreateEncomendaWithInvalidTempoCargaTest()
    {
        try
        {
            Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10),
                new TempoEncomenda(-10), new TempoEncomenda(120), "A12");
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma encomenda sem TempoCarga (valor negativo)
        }
    }

    [Fact]
    public void CreateEncomendaWithInvalidTempoDescargaTest()
    {
        try
        {
            Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(10),
                new TempoEncomenda(120), new TempoEncomenda(-10), "A12");
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma encomenda sem temoDescarga (valor negativo)
        }
    }

    [Fact]
    public void CreateEncomendaWithInvalidArmazemIDTest()
    {
        try
        {
            Encomenda en = new Encomenda(new DataEntrega(DateTime.Parse("2022-12-27")), new MassaEntrega(-10),
                new TempoEncomenda(120), new TempoEncomenda(120), "A12AAAA");
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma encomenda sem armazemId (tem mais que 3 carateres)
        }
    }
}