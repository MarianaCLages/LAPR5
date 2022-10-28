using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Categories;

public class CategoryId : EntityId
{
    [JsonConstructor]
    public CategoryId(Guid value) : base(value)
    {
    }

    public CategoryId(string value) : base(value)
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