using GestArm.Domain.Armazens;
using GestArm.Domain.Categories;
using GestArm.Domain.Encomendas;
using GestArm.Domain.Families;
using GestArm.Domain.Products;
using GestArm.Domain.Shared;
using GestArm.Infrastructure;
using GestArm.Infrastructure.Armazens;
using GestArm.Infrastructure.Categories;
using GestArm.Infrastructure.Encomendas;
using GestArm.Infrastructure.Families;
using GestArm.Infrastructure.Products;
using GestArm.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GestArm;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<GestArmDbContext>(opt =>
            opt.UseMySql(Configuration.GetConnectionString("Default"),
                    new MySqlServerVersion(new Version(10, 4, 17)))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()
        );
        ConfigureMyServices(services);

        services.AddControllers().AddNewtonsoftJson();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();
        else
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }

    public void ConfigureMyServices(IServiceCollection services)
    {
        services.AddTransient<IUnitOfWork, UnitOfWork>();

        services.AddTransient<ICategoryRepository, CategoryRepository>();
        services.AddTransient<CategoryService>();

        services.AddTransient<IProductRepository, ProductRepository>();
        services.AddTransient<ProductService>();

        services.AddTransient<IFamilyRepository, FamilyRepository>();
        services.AddTransient<FamilyService>();

        services.AddTransient<IArmazemRepository, ArmazemRepository>();
        services.AddTransient<IArmazemService>();

        services.AddTransient<IEncomendasRepository, EncomendasRepository>();
        services.AddTransient<IEncomendasService, EncomendasService>();
    }
}