using System;
using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Armazens
{
    public class ArmazemId : EntityId
    {
        [JsonConstructor]
        public ArmazemId(Guid value) : base(value)
        {
        }

        public ArmazemId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}