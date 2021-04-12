using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrud.Responses
{
    public class ApiResponse<T>
    {
        public ApiResponse(T data) {
            Data = data;
            Message = ""; 
        }
        public T Data { get; set; }
        public string Message { get; set; }
    }
}
