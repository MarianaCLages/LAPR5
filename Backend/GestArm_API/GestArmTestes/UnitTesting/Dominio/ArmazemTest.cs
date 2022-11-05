using System.Diagnostics.CodeAnalysis;
using GestArm.Domain.Armazens;
using GestArm.Domain.Shared;

namespace Dominio;

[SuppressMessage("ReSharper", "ObjectCreationAsStatement")]
public class ArmazemTest
{
    
    /*
     * Creates a valid Armazem
     */
    
    [Fact]
    public void CreateValidArmazemTest_ShouldCreateAValidArmazem()
    {
        var arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        Assert.NotNull(arm);
    }
    
    /*
     * Creates an invalid armazem throwing an null reference exception
     */

    [Fact]
    public void CreateArmazemWithInvalidArmazemIdTest_ShouldThrowsANullReferenceException()
    {
        Assert.Throws<NullReferenceException>(() =>
        {
            new Armazem(new ArmazemId(null),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
    * Creates an invalid armazem throwing an format exception
    */

    [Fact]
    public void CreateArmazemWithInvalidArmazemIdStringVaziaTest_ShouldThrowsAFormatException()
    {
        Assert.Throws<FormatException>(() =>
        {
            new Armazem(new ArmazemId(""),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
    * Creates an invalid armazem throwing an BusinessRuleValidationException
    */

    [Fact]
    public void CreateArmazemWithInvalidLatitudeGrausTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-190, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidLatitudeMinutosTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, -20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidLatitudeSegundosTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, -30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidLongitudeGrausTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(-190, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidLongitudeMinutosTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, -30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidLongitudeSegundosTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, -40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoArmazemTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem(null),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoRuaTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoNumeroPortaTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", -10, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoCodigoPostalTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoCidadeTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", null, "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoPaisTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", ""),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid armazem throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateArmazemWithInvalidAlphaIdTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("AAAAAAAAA"));
        });
    }
}