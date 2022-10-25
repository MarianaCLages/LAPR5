using System;
using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Encomendas
{
    public class EncomendaId : EntityId
    {

        [JsonConstructor]
        public EncomendaId(string value) : base(value)
        {
        }

        public EncomendaId(Guid value) : base(value)
        {
        }

        override
        protected Object createFromString(String text)
        {
            return new Guid(text);
        }

        override
        public String AsString()
        {
            Guid obj = (Guid)base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid()
        {
            return (Guid)base.ObjValue;
        }
    }
}
 