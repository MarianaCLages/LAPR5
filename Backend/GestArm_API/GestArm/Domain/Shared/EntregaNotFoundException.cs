namespace GestArm.Domain.Shared;

public class EntregaNotFoundException : Exception
{
    public EntregaNotFoundException(string message) : base(message)
    {
    }

    public EntregaNotFoundException(string message, string details) : base(message)
    {
        Details = details;
    }

    public string Details { get; }
}