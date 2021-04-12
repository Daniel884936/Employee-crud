using EmployeeCrud.Models;
using Microsoft.EntityFrameworkCore;


// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeCrud.Data
{
    public partial class EmployeeCrudContext : DbContext
    {

        public EmployeeCrudContext(DbContextOptions<EmployeeCrudContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employee { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {

                entity.HasKey(e => e.EmployeeId);

                entity.HasIndex(e => e.Email)
                    .HasName("UN_EMPLOYEE_EMAIL")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.Surnames)
                    .IsRequired()
                    .HasMaxLength(80)
                    .IsUnicode(false);
            });
        }
    }
}
