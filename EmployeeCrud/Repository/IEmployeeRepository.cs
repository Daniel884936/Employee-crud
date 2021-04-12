using EmployeeCrud.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeCrud.Repository
{
    public interface IEmployeeRepository
    {
        Task<Employee> GetById(int employeId);
        IEnumerable< Employee> GetAll();
        Task<Employee> Add(Employee employee);
        void Delete(Employee employee);
        void Update(Employee employee);

    }
}
