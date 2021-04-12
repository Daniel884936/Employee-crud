using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrud.Dtos
{
    public public class EmployeeReadDto
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surnames { get; set; }
        public int? Age { get; set; }
        public int? PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
