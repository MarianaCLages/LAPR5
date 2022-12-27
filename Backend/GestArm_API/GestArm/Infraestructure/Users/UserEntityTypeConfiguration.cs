using GestArm.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestArm.Infrastructure.Users;

internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users").HasKey(e => e.Id);
        builder.OwnsOne(e => e.Name).Property(x => x.Name).HasColumnName("Name").IsRequired();
        builder.OwnsOne(e => e.Email).Property(x => x.Email).HasColumnName("Email").IsRequired();
        builder.OwnsOne(e => e.Role).Property(x => x.Role).HasColumnName("Role").IsRequired();
        builder.OwnsOne(e => e.PhoneNumber).Property(x => x.PhoneNumber).HasColumnName("PhoneNumber").IsRequired();
        builder.OwnsOne(e => e.BirthDate).Property(x => x.BirthDate).HasColumnName("BirthDate").IsRequired();
        builder.OwnsOne(e => e.Activated).Property(x => x.Activated).HasColumnName("Activated").IsRequired();
    }
}