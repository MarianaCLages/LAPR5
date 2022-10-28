namespace GestArm.Domain.Shared;

public class ArmazemNotFoundExeption : Exception
{
    public ArmazemNotFoundExeption(string message) : base(message)
    {
    }

    public ArmazemNotFoundExeption(string message, string details) : base(message)
    {
        Details = details;
    }

    public string Details { get; }
}