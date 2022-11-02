using GestArm.Domain.Shared;
using GestArm.Domain.Armazens;

namespace Dominio;

public class ArmazemTest
{
    [Fact]
    public void CreateValidArmazemTest()
    {
        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20, 30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        Assert.NotNull(arm);
    }

    [Fact]
    public void CreateArmazemWithInvalidArmazemIdTest()
    {
        Assert.Throws<NullReferenceException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(null),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidArmazemIdStringVaziaTest()
    {
        Assert.Throws<FormatException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(""),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidLatitudeGrausTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-190, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidLatitudeMinutosTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, -20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }

    [Fact]
    public void CreateArmazemWithInvalidLatitudeSegundosTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, -30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }

    [Fact]
    public void CreateArmazemWithInvalidLongitudeGrausTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(-190, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }

    [Fact]
    public void CreateArmazemWithInvalidLongitudeMinutosTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, -30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidLongitudeSegundosTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, -40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoArmazemTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem(null),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoRuaTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoNumeroPortaTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", -10, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoCodigoPostalTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoCidadeTest()
    {
        Assert.Throws<BusinessRuleValidationException>((() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", null, "Pourtougal"),
                new AlphaId("A12"));
        }));
    }

    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoPaisTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", ""),
                new AlphaId("A12"));
        });
    }

    [Fact]
    public void CreateArmazemWithInvalidAlphaIdTest()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20, 30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("AAAAAAAAA"));
        });
    }
}