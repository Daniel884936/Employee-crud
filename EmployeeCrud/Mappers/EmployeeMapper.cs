using AutoMapper;
using EmployeeCrud.Dtos;
using EmployeeCrud.Models;

namespace EmployeeCrud.Mappers
{
    public class EmployeeMapper: Profile
    {
        public EmployeeMapper()
        {
            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<Employee, EmployeeReadDto>();
            CreateMap<EmployeeDto, Employee>();
        }
    }
}
