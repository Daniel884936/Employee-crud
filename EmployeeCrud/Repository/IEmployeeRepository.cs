using EmployeeCrud.Models;
using System.Collections.Generic;

namespace EmployeeCrud.Repository
{
    public interface IEmployeeRepository
    {
        Employee GetById(int employeId);
        IEnumerable< Employee> GetAll();
        void Add(Employee employee);
        void Delete(Employee employee);
        void Update(Employee employee);

    }
}
