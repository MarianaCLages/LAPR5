using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Armazens;

public class ArmazemId : EntityId
{
    [JsonConstructor]
    public ArmazemId(Guid value) : base(value)
    {

    }

    public ArmazemId(string value) : base(value)
    {
    }

    override
        protected object createFromString(string text)
    {
        return new Guid(text);
    }

    override
        public string AsString()
    {
        var obj = (Guid)ObjValue;
        return obj.ToString();
    }


    public Guid AsGuid()
    {
        return (Guid)ObjValue;
    }
}