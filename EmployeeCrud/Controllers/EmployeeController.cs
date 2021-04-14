using AutoMapper;
using EmployeeCrud.Dtos;
using EmployeeCrud.Models;
using EmployeeCrud.Repository;
using EmployeeCrud.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IMapper mapper, IEmployeeRepository employeeRepository)
        {
            _mapper = mapper;
            _employeeRepository = employeeRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Add(EmployeeCreateDto employeeCreateDto)
        {
            ApiResponse<EmployeeReadDto> response;
            var employee = _mapper.Map<Employee>(employeeCreateDto);
            try
            {
                var emailExist = await _employeeRepository.GetByEmail(employee.Email);
                if(emailExist != null)
                {
                    response = new ApiResponse<EmployeeReadDto>(null)
                    {
                        Message = "Useer Already exist"
                    };
                    return Conflict(response);
                }
                await _employeeRepository.Add(employee);
            }
            catch (Exception ex)
            {
                response = new ApiResponse<EmployeeReadDto>(null)
                {
                    Message = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError,response);
            }
            var employeeReadDto = _mapper.Map<EmployeeReadDto>(employee);
            response = new ApiResponse<EmployeeReadDto>(employeeReadDto)
            {
                Message ="Created"
            };
            return Ok(response);
        }


        [HttpGet("{employeeId}")]
        public async Task<IActionResult> Get(int employeeId)
        {
            ApiResponse<EmployeeReadDto> response;
            Employee employee;
            try
            {
                 employee =  await _employeeRepository.GetById(employeeId);
            }
            catch (Exception ex)
            {
                response = new ApiResponse<EmployeeReadDto>(null)
                {
                    Message = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            var employeeReadDto = _mapper.Map<EmployeeReadDto>(employee);
            response = new ApiResponse<EmployeeReadDto>(employeeReadDto);
            return Ok(response);
        }


        [HttpGet]
        public  IActionResult GetAll()
        {
            ApiResponse<IEnumerable<EmployeeReadDto>> response;
            IEnumerable < Employee> employees;
            try
            {
                employees =  _employeeRepository.GetAll();
            }
            catch (Exception ex)
            {
                response = new ApiResponse<IEnumerable<EmployeeReadDto>>(Array.Empty<EmployeeReadDto>())
                {
                    Message = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            var employeeReadDtos = _mapper.Map<IEnumerable<EmployeeReadDto>>(employees);
            response = new ApiResponse<IEnumerable<EmployeeReadDto>>(employeeReadDtos);
            return Ok(response);
        }




        [HttpPut("{employeeId}")]
        public async Task<IActionResult> Put(int employeeId, EmployeeDto employeeDto)
        {
            ApiResponse<bool> response;
            try
            {
                var employeeTracking = await _employeeRepository.GetById(employeeId);
                if (employeeTracking == null)
                {
                    response = new ApiResponse<bool>(false)
                    {
                        Message = "Employee does not exist"
                    };
                    return NotFound(response);
                }
                var employeeDestination = _mapper.Map<Employee>(employeeDto);
                UpdateEmployeeEntities(employeeTracking, employeeDestination);
                await _employeeRepository.Update(employeeTracking);
            }
            catch (Exception ex)
            {
                response = new ApiResponse<bool>(false)
                {
                    Message = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            response = new ApiResponse<bool>(true)
            {
                Message = "Updated"
            };
            return Ok(response);
        }

        private void UpdateEmployeeEntities(Employee employeeToUpDate, Employee employeeDestination)
        {
            employeeToUpDate.Name = employeeDestination.Name;
            employeeToUpDate.Surnames = employeeDestination.Surnames;
            employeeToUpDate.Age = employeeDestination.Age;
            employeeToUpDate.PhoneNumber = employeeDestination.PhoneNumber;
        }



        [HttpDelete("{employeeId}")]
        public async Task<IActionResult> Remove(int employeeId)
        {
            ApiResponse<bool> response;
            try
            {
                var employeeTracking = await _employeeRepository.GetById(employeeId);
                if (employeeTracking == null)
                {
                    response = new ApiResponse<bool>(false)
                    {
                        Message = "Employee does not exist"
                    };
                    return NotFound(response);
                }
                await _employeeRepository.Delete(employeeTracking);
            }
            catch (Exception ex)
            {
                response = new ApiResponse<bool>(false)
                {
                    Message = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            response = new ApiResponse<bool>(true)
            {
                Message = "Deleted"
            };
            return Ok(response);
        }


    }
}
