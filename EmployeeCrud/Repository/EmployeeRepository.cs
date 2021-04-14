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
           var employee =  await  _context.Employee.FirstOrDefaultAsync(x => x.EmployeeId == employeId);
           return employee;
        }

        public async Task Delete(Employee employee) {
            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Employee> GetAll() => _context.Employee;

        public async Task Update(Employee employee) {
            _context.Employee.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> Add(Employee employee) {
            await _context.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> GetByEmail(string email)
        {
            var employee = await _context.Employee.FirstOrDefaultAsync(x => x.Email == email);
            return employee;
        }
    }
}
