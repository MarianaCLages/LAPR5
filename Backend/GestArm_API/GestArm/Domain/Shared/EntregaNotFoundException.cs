using System;

namespace GestArm.Domain.Shared
{
    public class EntregaNotFoundException : Exception
    {
        public string Details { get; }

        public EntregaNotFoundException(string message) : base(message)
        {
            
        }

        public EntregaNotFoundException(string message, string details) : base(message)
        {
            this.Details = details;
        }
    }
}