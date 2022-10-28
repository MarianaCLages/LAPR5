using GestArm.Domain.Shared;

namespace GestArm.Domain.Families;

public class FamilyService
{
    private readonly IFamilyRepository _repo;
    private readonly IUnitOfWork _unitOfWork;

    public FamilyService(IUnitOfWork unitOfWork, IFamilyRepository repo)
    {
        _unitOfWork = unitOfWork;
        _repo = repo;
    }

    public async Task<List<FamilyDto>> GetAllAsync()
    {
        var list = await _repo.GetAllAsync();

        var listDto = list.ConvertAll(fam => new FamilyDto { Id = fam.Id.AsString(), Description = fam.Description });

        return listDto;
    }

    public async Task<FamilyDto> GetByIdAsync(FamilyId id)
    {
        var fam = await _repo.GetByIdAsync(id);

        if (fam == null)
            return null;

        return new FamilyDto { Id = fam.Id.AsString(), Description = fam.Description };
    }

    public async Task<FamilyDto> AddAsync(FamilyDto dto)
    {
        var family = new Family(dto.Id, dto.Description);

        await _repo.AddAsync(family);

        await _unitOfWork.CommitAsync();

        return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
    }

    public async Task<FamilyDto> UpdateAsync(FamilyDto dto)
    {
        var family = await _repo.GetByIdAsync(new FamilyId(dto.Id));

        if (family == null)
            return null;

        // change all field
        family.ChangeDescription(dto.Description);

        await _unitOfWork.CommitAsync();

        return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
    }

    public async Task<FamilyDto> InactivateAsync(FamilyId id)
    {
        var family = await _repo.GetByIdAsync(id);

        if (family == null)
            return null;

        // change all fields
        family.MarkAsInative();

        await _unitOfWork.CommitAsync();

        return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
    }

    public async Task<FamilyDto> DeleteAsync(FamilyId id)
    {
        var family = await _repo.GetByIdAsync(id);

        if (family == null)
            return null;

        if (family.Active)
            throw new BusinessRuleValidationException("It is not possible to delete an active family.");

        _repo.Remove(family);
        await _unitOfWork.CommitAsync();

        return new FamilyDto { Id = family.Id.AsString(), Description = family.Description };
    }
}