using GestArm.Domain.Families;
using GestArm.Infrastructure.Shared;

namespace GestArm.Infrastructure.Families;

public class FamilyRepository : BaseRepository<Family, FamilyId>, IFamilyRepository
{
    public FamilyRepository(GestArmDbContext context) : base(context.Families)
    {
    }
}