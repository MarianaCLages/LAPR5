namespace GestArm.Domain.Shared;

public class WarehouseNotFoundExeption : Exception
{
    public WarehouseNotFoundExeption(string message) : base(message)
    {
    }

    public WarehouseNotFoundExeption(string message, string details) : base(message)
    {
        Details = details;
    }

    public string Details { get; }
}