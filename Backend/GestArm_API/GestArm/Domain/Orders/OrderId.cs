using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Orders;

public class OrderId : EntityId
{
    [JsonConstructor]
    public OrderId(string value) : base(value)
    {
    }

    public OrderId(Guid value) : base(value)
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