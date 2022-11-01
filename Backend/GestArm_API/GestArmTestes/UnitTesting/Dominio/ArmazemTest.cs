using GestArm.Domain.Shared;
using GestArm.Domain.Armazens;

namespace Dominio;

public class ArmazemTest
{
    [Fact]
    public void CreateValidArmazemTest()
    {
        Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
            new CoordenadasArmazem(10, 20,30),
            new CoordenadasArmazem(10, 30, 40),
            new DesignacaoArmazem("Designação teste"),
            new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));
        
        Assert.NotNull(arm);
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidArmazemIdTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(null),
                new CoordenadasArmazem(10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (NullReferenceException)
        {
            //Vai falhar porque não é possível criar um armazém sem ID (Referência nula)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidArmazemIdStringVaziaTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(""),
                new CoordenadasArmazem(10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (FormatException)
        {
            //Vai falhar porque não é possível criar um armazém sem ID (String Vazia)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidLatitudeGrausTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem latitude(graus negativos)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidLatitudeMinutosTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, -20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem latitude(minutos negativos)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidLatitudeSegundosTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20,-30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem latitude(segundos negativos)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidLongitudeGrausTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20,30),
                new CoordenadasArmazem(-10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem longitude(graus negativos)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidLongitudeMinutosTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20,30),
                new CoordenadasArmazem(10, -30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem longitude(minutos negativos)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidLongitudeSegundosTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20,30),
                new CoordenadasArmazem(10, 30, -40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem longitude(segundos negativos)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidDesignacaoArmazemTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem(""),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar um armazém sem designação(designação vazia)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoRuaTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma armazem sem um endereço válido (string de rua inválida)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoNumeroPortaTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", -10, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma armazem sem um endereço válido (número de porta invalido)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoCodigoPostalTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma armazem sem um endereço válido (string de codigo postal invalido)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoCidadeTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "", "Pourtougal"),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma armazem sem um endereço válido (string de cidade inválida)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidDesignacaoEndereçoPaisTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", ""),
                new AlphaId("A12"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma armazem sem um endereço válido (string de pais inválida)
        }
        
    }
    
    [Fact]
    public void CreateArmazemWithInvalidAlphaIdTest()
    {
        try
        {
            Armazem arm = new Armazem(new ArmazemId(Guid.NewGuid()),
                new CoordenadasArmazem(-10, 20,30),
                new CoordenadasArmazem(10, 30, 40),
                new DesignacaoArmazem("Designação teste"),
                new EnderecoArmazem("Rua das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("AAAAAAAAA"));
        }
        catch (BusinessRuleValidationException)
        {
            //Vai falhar porque não é possível criar uma armazem sem AlphaIdString (string invalida)
        }
        
    }
    
    
}