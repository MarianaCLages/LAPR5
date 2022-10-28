using GestArm.Domain.Shared;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GestArm.Infrastructure.Shared;

public class EntityIdValueConverter<TTypedIdValue> : ValueConverter<TTypedIdValue, string>
    where TTypedIdValue : EntityId
{
    public EntityIdValueConverter(ConverterMappingHints mappingHints = null)
        : base(id => id.Value, value => Create(value), mappingHints)
    {
    }

    private static TTypedIdValue Create(string id)
    {
        return Activator.CreateInstance(typeof(TTypedIdValue), id) as TTypedIdValue;
    }
}