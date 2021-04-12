using EmployeeCrud.Data;
using EmployeeCrud.Models;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeCrud.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeCrudContext _context;
        public EmployeeRepository(EmployeeCrudContext context)
        {
            _context = context;
        }
        public void Add(Employee employee) => _context.Employees.Add(employee);
        public Employee GetById(int employeId) =>
            _context.Employees.FirstOrDefault(x => x.EmployeeId == employeId);

        public void Delete(Employee employee) => _context.Employees.Remove(employee);

        public IEnumerable<Employee> GetAll() => _context.Employees;

        public void Update(Employee employee) => _context.Employees.Update(employee);
    }
}
