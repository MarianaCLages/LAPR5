using GestArm.Domain.Shared;
using Newtonsoft.Json;

namespace GestArm.Domain.Users;

public class UserID : EntityId
{
    [JsonConstructor]
    public UserID(string value) : base(value)
    {
    }

    public UserID(Guid value) : base(value)
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