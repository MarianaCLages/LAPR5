using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Products;

public class ProductId : EntityId
{
    [JsonConstructor]
    public ProductId(Guid value) : base(value)
    {
    }

    public ProductId(string value) : base(value)
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