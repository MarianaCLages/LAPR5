using GestArm.Domain.Categories;
using GestArm.Infrastructure.Shared;

namespace GestArm.Infrastructure.Categories
{
    public class CategoryRepository : BaseRepository<Category, CategoryId>, ICategoryRepository
    {
    
        public CategoryRepository(GestArmDbContext context):base(context.Categories)
        {
           
        }


    }
}