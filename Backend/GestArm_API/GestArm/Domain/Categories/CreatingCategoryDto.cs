namespace GestArm.Domain.Categories;

public class CreatingCategoryDto
{
    public CreatingCategoryDto(string description)
    {
        Description = description;
    }

    public string Description { get; set; }
}