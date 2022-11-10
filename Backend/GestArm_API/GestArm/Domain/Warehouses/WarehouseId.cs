using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Warehouses;

public class WarehouseId : EntityId
{
    [JsonConstructor]
    public WarehouseId(Guid value) : base(value)
    {
    }

    public WarehouseId(string value) : base(value)
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