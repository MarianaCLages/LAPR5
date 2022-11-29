using GestArm.Domain.Orders;
using GestArm.Domain.Shared;

namespace Dominio;

public class OrderTest
{
    /*
   * Creates a valid order
   */

    [Fact]
    public void CreateValidOrderTest_ShouldCreateAValidOrder()
    {
        var dataTeste = DateTime.Today.Add(TimeSpan.FromDays(5));
        var dataFormato = dataTeste.ToString("yyMMdd");
        var en = new Order(new OrderDomainId("5", dataFormato),
            new OrderDate(dataTeste), new OrderMass(115), new TimeOrder(5),
            new TimeOrder(5), "BRG");
        Assert.NotNull(en);
    }

    /*
  * Creates an invalid order throwing a Format Exception
  */

    [Fact]
    public void CreateOrderWithInvalidOrderDateTest_ShouldThrowAFormatException()
    {
        Assert.Throws<FormatException>(() => new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Parse("")),
            new OrderMass(10),
            new TimeOrder(120), new TimeOrder(120), "A12"));
    }

    /*
    *Creates an invalid order throwing a BusinessRuleValidationException
    */
    
    [Fact]
    public void CreateOrderWithInvalidOrderMassTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Now.Add(TimeSpan.FromDays(1))), new OrderMass(-10),
            new TimeOrder(120), new TimeOrder(120), "A12"));
    }
    
    /*
   *Creates an invalid order throwing a BusinessRuleValidationException
   */

    [Fact]
    public void CreateOrderWithInvalidChargingTimeTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Now.Add(TimeSpan.FromDays(1))), new OrderMass(10),
            new TimeOrder(-10), new TimeOrder(120), "A12"));
    }
    
    /*
   *Creates an invalid order throwing a BusinessRuleValidationException
   */

    [Fact]
    public void CreateOrderWithInvalidUnloadingTimeTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Now.Add(TimeSpan.FromDays(1))), new OrderMass(10),
            new TimeOrder(120), new TimeOrder(-10), "A12"));
    }
    
    /*
   *Creates an invalid order throwing a BusinessRuleValidationException
   */

    [Fact]
    public void CreateOrderWithInvalidWarehouseIDTest_ShouldThrowABusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Order(new OrderDomainId("5", "220505"),
            new OrderDate(DateTime.Now.Add(TimeSpan.FromDays(1))), new OrderMass(-10),
            new TimeOrder(120), new TimeOrder(120), "A12AAAA"));
    }
}