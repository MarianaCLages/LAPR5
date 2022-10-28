using GestArm.Domain.Shared;

namespace GestArm.Domain.Categories;

public class CategoryService
{
    private readonly ICategoryRepository _repo;
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IUnitOfWork unitOfWork, ICategoryRepository repo)
    {
        _unitOfWork = unitOfWork;
        _repo = repo;
    }

    public async Task<List<CategoryDto>> GetAllAsync()
    {
        var list = await _repo.GetAllAsync();

        var listDto = list.ConvertAll(cat => new CategoryDto { Id = cat.Id.AsGuid(), Description = cat.Description });

        return listDto;
    }

    public async Task<CategoryDto> GetByIdAsync(CategoryId id)
    {
        var cat = await _repo.GetByIdAsync(id);

        if (cat == null)
            return null;

        return new CategoryDto { Id = cat.Id.AsGuid(), Description = cat.Description };
    }

    public async Task<CategoryDto> AddAsync(CreatingCategoryDto dto)
    {
        var category = new Category(dto.Description);

        await _repo.AddAsync(category);

        await _unitOfWork.CommitAsync();

        return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
    }

    public async Task<CategoryDto> UpdateAsync(CategoryDto dto)
    {
        var category = await _repo.GetByIdAsync(new CategoryId(dto.Id));

        if (category == null)
            return null;

        // change all field
        category.ChangeDescription(dto.Description);

        await _unitOfWork.CommitAsync();

        return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
    }

    public async Task<CategoryDto> InactivateAsync(CategoryId id)
    {
        var category = await _repo.GetByIdAsync(id);

        if (category == null)
            return null;

        // change all fields
        category.MarkAsInative();

        await _unitOfWork.CommitAsync();

        return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
    }

    public async Task<CategoryDto> DeleteAsync(CategoryId id)
    {
        var category = await _repo.GetByIdAsync(id);

        if (category == null)
            return null;

        if (category.Active)
            throw new BusinessRuleValidationException("It is not possible to delete an active category.");

        _repo.Remove(category);
        await _unitOfWork.CommitAsync();

        return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
    }
}