using System.ComponentModel.DataAnnotations;

namespace EmployeeCrud.Dtos
{
#warning Dtos Must be plane objects
    public class EmployeeDto
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        [Required]
        [MaxLength(30)]
        public string Surnames { get; set; }
        public int? Age { get; set; }
        public int? PhoneNumber { get; set; }
    }
}
