using EmployeeCrud.Data;
using EmployeeCrud.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrud.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeCrudContext _context;
        public EmployeeRepository(EmployeeCrudContext context)
        {
            _context = context;
        }
        //public void Add(Employee employee) => _context.Employees.Add(employee);
        public async Task<Employee> GetById(int employeId)
        {
           var employee =  await  _context.Employees.FirstOrDefaultAsync(x => x.EmployeeId == employeId);
           return employee;
        }

        public void Delete(Employee employee) => _context.Employees.Remove(employee);

        public IEnumerable<Employee> GetAll() => _context.Employees;

        public void Update(Employee employee) => _context.Employees.Update(employee);

        public async Task<Employee> Add(Employee employee) {
            await _context.AddAsync(employee);
            return employee;
        }
        
    }
}
