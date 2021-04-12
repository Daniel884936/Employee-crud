using System.ComponentModel.DataAnnotations;

namespace EmployeeCrud.Dtos
{
#warning Dtos Must be plane objects
    public class EmployeeReadDto: EmployeeDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [EmailAddress]
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
    }
}
