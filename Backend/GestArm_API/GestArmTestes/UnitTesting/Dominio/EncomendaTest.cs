using GestArm.Domain.Encomendas;
using GestArm.Domain.Shared;

namespace Dominio;

public class EncomendaTest
{
    /*
   * Creates a valid encomenda
   */

    [Fact]
    public void CreateValidEncomendaTest_ShouldCreateAValidEncomenda()
    {
        var dataTeste = DateTime.Today.Add(TimeSpan.FromDays(5));
        var dataFormato = dataTeste.ToString("yyMMdd");
        var en = new Encomenda(new EncomendaDomainId("5", dataFormato),
            new DataEntrega(dataTeste), new MassaEntrega(115), new TempoEncomenda(5),
            new TempoEncomenda(5), "BRG");
        Assert.NotNull(en);
    }

    /*
  * Creates an invalid encomenda throwing a Format Exception
  */

    [Fact]
    public void CreateEncomendaWithInvalidDataEntregaTest_ShouldThrowAFormatException()
    {
        Assert.Throws<FormatException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse("")),
            new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }

    /*
 * Creates an invalid encomenda throwing a NullReferenceException
 */

    [Fact]
    public void CreateEncomendaWithInvalidDataEntregaTest_ShouldThrowAnArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Parse(null)),
            new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }

    /*
* Creates an invalid encomenda throwing a BusinessRuleValidationException
*/

    [Fact]
    public void
        CreateEncomendaWithInvalidDataEntregaBussinessInvalidationTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Subtract(TimeSpan.FromDays(1))),
            new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }

    /*
    *Creates an invalid encomenda throwing a BusinessRuleValidationException
    */
    
    [Fact]
    public void CreateEncomendaWithInvalidMassaEntregaTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(-10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12"));
    }
    
    /*
   *Creates an invalid encomenda throwing a BusinessRuleValidationException
   */

    [Fact]
    public void CreateEncomendaWithInvalidTempoCargaTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(10),
            new TempoEncomenda(-10), new TempoEncomenda(120), "A12"));
    }
    
    /*
   *Creates an invalid encomenda throwing a BusinessRuleValidationException
   */

    [Fact]
    public void CreateEncomendaWithInvalidTempoDescargaTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(10),
            new TempoEncomenda(120), new TempoEncomenda(-10), "A12"));
    }
    
    /*
   *Creates an invalid encomenda throwing a BusinessRuleValidationException
   */

    [Fact]
    public void CreateEncomendaWithInvalidArmazemIDTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Encomenda(new EncomendaDomainId("5", "220505"),
            new DataEntrega(DateTime.Now.Add(TimeSpan.FromDays(1))), new MassaEntrega(-10),
            new TempoEncomenda(120), new TempoEncomenda(120), "A12AAAA"));
    }
}