using System.Diagnostics.CodeAnalysis;
using GestArm.Domain.Warehouses;
using GestArm.Domain.Shared;

namespace Dominio;

[SuppressMessage("ReSharper", "ObjectCreationAsStatement")]
public class WarehouseTest
{
    
    /*
     * Creates a valid Warehouse
     */
    
    [Fact]
    public void CreateValidWarehouseTest_ShouldCreateAValidWarehouse()
    {
        var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
            new WarehouseCoordinates(10, 20, 30),
            new WarehouseCoordinates(10, 30, 40),
            new DesignationWarehouse("Designação teste"),
            new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
            new AlphaId("A12"));

        Assert.NotNull(arm);
    }
    
    /*
     * Creates an invalid warehouse throwing an null reference exception
     */

    [Fact]
    public void CreateWarehouseWithInvalidWarehouseIdTest_ShouldThrowsANullReferenceException()
    {
        Assert.Throws<NullReferenceException>(() =>
        {
            new Warehouse(new WarehouseId(null),
                new WarehouseCoordinates(10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
    * Creates an invalid warehouse throwing an format exception
    */

    [Fact]
    public void CreateWarehouseWithInvalidWarehouseIdStringVaziaTest_ShouldThrowsAFormatException()
    {
        Assert.Throws<FormatException>(() =>
        {
            new Warehouse(new WarehouseId(""),
                new WarehouseCoordinates(10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
    * Creates an invalid warehouse throwing an BusinessRuleValidationException
    */

    [Fact]
    public void CreateWarehouseWithInvalidLatitudeDegreesTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-190, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidLatitudeMinutesTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, -20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidLatitudeSecondsTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, 20, -30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidLongitudeDegreesTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, 20, 30),
                new WarehouseCoordinates(-190, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidLongitudeMinutesTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, 20, 30),
                new WarehouseCoordinates(10, -30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidLongitudeSecondsTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, 20, 30),
                new WarehouseCoordinates(10, 30, -40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidDesignationWarehouseTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse(null),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoStreetTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoDoorNumberTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", -10, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoPostalCodeTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoCityTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", null, "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoCountryTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", ""),
                new AlphaId("A12"));
        });
    }
    
    /*
   * Creates an invalid warehouse throwing an BusinessRuleValidationException
   */

    [Fact]
    public void CreateWarehouseWithInvalidAlphaIdTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("AAAAAAAAA"));
        });
    }
}