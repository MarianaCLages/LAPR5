using GestArm.Domain.Categories;
using GestArm.Domain.Shared;

namespace GestArm.Domain.Products;

public class ProductService
{
    private readonly IProductRepository _repo;

    private readonly ICategoryRepository _repoCat;
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork, IProductRepository repo, ICategoryRepository repoCategories)
    {
        _unitOfWork = unitOfWork;
        _repo = repo;
        _repoCat = repoCategories;
    }

    public async Task<List<ProductDto>> GetAllAsync()
    {
        var list = await _repo.GetAllAsync();

        var listDto = list.ConvertAll(prod =>
            new ProductDto(prod.Id.AsGuid(), prod.Description, prod.CategoryId));

        return listDto;
    }

    public async Task<ProductDto> GetByIdAsync(ProductId id)
    {
        var prod = await _repo.GetByIdAsync(id);

        if (prod == null)
            return null;

        return new ProductDto(prod.Id.AsGuid(), prod.Description, prod.CategoryId);
    }

    public async Task<ProductDto> AddAsync(CreatingProductDto dto)
    {
        await checkCategoryIdAsync(dto.CategoryId);
        var product = new Product(dto.Description, dto.CategoryId);

        await _repo.AddAsync(product);

        await _unitOfWork.CommitAsync();

        return new ProductDto(product.Id.AsGuid(), product.Description, product.CategoryId);
    }

    public async Task<ProductDto> UpdateAsync(ProductDto dto)
    {
        await checkCategoryIdAsync(dto.CategoryId);
        var product = await _repo.GetByIdAsync(new ProductId(dto.Id));

        if (product == null)
            return null;

        // change all fields
        product.ChangeDescription(dto.Description);
        product.ChangeCategoryId(dto.CategoryId);

        await _unitOfWork.CommitAsync();

        return new ProductDto(product.Id.AsGuid(), product.Description, product.CategoryId);
    }

    public async Task<ProductDto> InactivateAsync(ProductId id)
    {
        var product = await _repo.GetByIdAsync(id);

        if (product == null)
            return null;

        product.MarkAsInative();

        await _unitOfWork.CommitAsync();

        return new ProductDto(product.Id.AsGuid(), product.Description, product.CategoryId);
    }

    public async Task<ProductDto> DeleteAsync(ProductId id)
    {
        var product = await _repo.GetByIdAsync(id);

        if (product == null)
            return null;

        if (product.Active)
            throw new BusinessRuleValidationException("It is not possible to delete an active product.");

        _repo.Remove(product);
        await _unitOfWork.CommitAsync();

        return new ProductDto(product.Id.AsGuid(), product.Description, product.CategoryId);
    }

    private async Task checkCategoryIdAsync(CategoryId categoryId)
    {
        var category = await _repoCat.GetByIdAsync(categoryId);
        if (category == null)
            throw new BusinessRuleValidationException("Invalid Category Id.");
    }
}