using GestArm.Domain.Shared;

namespace GestArm.Domain.Families;

public class FamilyId : EntityId
{
    public FamilyId(string value) : base(value)
    {
    }

    override
        protected object createFromString(string text)
    {
        return text;
    }

    override
        public string AsString()
    {
        return Value;
    }
}