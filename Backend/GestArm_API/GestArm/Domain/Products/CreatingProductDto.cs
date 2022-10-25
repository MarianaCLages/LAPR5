using GestArm.Domain.Categories;

namespace GestArm.Domain.Products
{
    public class CreatingProductDto
    {
        public string Description { get;  set; }

        public CategoryId CategoryId { get;   set; }


        public CreatingProductDto(string description, CategoryId catId)
        {
            this.Description = description;
            this.CategoryId = catId;
        }
    }
}