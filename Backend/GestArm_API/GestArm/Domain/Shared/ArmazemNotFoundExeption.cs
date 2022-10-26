using System;

namespace GestArm.Domain.Shared
{
    public class ArmazemNotFoundExeption : Exception
    {
        public string Details { get; }

        public ArmazemNotFoundExeption(string message) : base(message)
        {
            
        }

        public ArmazemNotFoundExeption(string message, string details) : base(message)
        {
            this.Details = details;
        }
    }
}