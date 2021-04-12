using System.ComponentModel.DataAnnotations;

namespace EmployeeCrud.Dtos
{
#warning Dtos Must be plane objects

    public class EmployeeCreateDto : EmployeeDto
    {
        [Required]
        [MaxLength(30)]
        [EmailAddress]
        public string Email { get; set; }
    }
}
