namespace GestArm.Domain.Shared;

public class OrderNotFoundException : Exception
{
    public OrderNotFoundException(string message) : base(message)
    {
    }

    public OrderNotFoundException(string message, string details) : base(message)
    {
        Details = details;
    }

    public string Details { get; }
}