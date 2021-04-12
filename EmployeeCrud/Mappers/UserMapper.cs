using AutoMapper;
using EmployeeCrud.Dtos;
using EmployeeCrud.Models;

namespace EmployeeCrud.Mappers
{
    public class UserMapper: Profile
    {
        public UserMapper()
        {
            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<Employee, EmployeeReadDto>();

        }
    }
}
