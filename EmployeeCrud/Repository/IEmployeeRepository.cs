using EmployeeCrud.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeCrud.Repository
{
    public interface IEmployeeRepository
    {
        Task<Employee> GetById(int employeId);
        Task<Employee> GetByEmail(string email);

        IEnumerable< Employee> GetAll();
        Task<Employee> Add(Employee employee);
        Task Delete(Employee employee);
        Task Update(Employee employee);

    }
}
