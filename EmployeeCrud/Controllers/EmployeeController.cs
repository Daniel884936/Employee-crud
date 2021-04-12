using EmployeeCrud.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EmployeeCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Add(EmployeeCreateDto employee)
        {
            return Ok("");
        }
    }
}
