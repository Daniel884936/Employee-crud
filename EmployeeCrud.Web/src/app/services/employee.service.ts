import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseUrl = "https://localhost:5001/api";

  constructor(private readonly _http: HttpClient) { }


  getById(employeeId:number):Observable<Employee>{
     return this._http.get<Employee>(`${this.baseUrl}/employee/${employeeId}`)
     .pipe(map((data:any)=>{
      return data.data;
    }));
  }

  delete(employeeId:number):Observable<boolean>{
    return this._http.delete(`${this.baseUrl}/employee/${employeeId}`)
    .pipe(map((data:any)=>{
      return data.data;
    }));
  }

  getAll():Observable<Employee[]>{
    return this._http.get<Employee[]>(`${this.baseUrl}/employee`)
    .pipe(map((data:any)=>{
      return data.data;
    }));
  }

  add(employee:Employee):Observable<any>{
    return this._http.post<any>(`${this.baseUrl}/employee`,employee)
    .pipe(map((data:any)=>{
      return data.data;
    }));
  }

  update(employeeId:number, employee:Employee):Observable<any>{
  return this._http.put<any>(`${this.baseUrl}/employee/${employeeId}`,employee)
  .pipe(map((data:any)=>{
    return data.data;
  }));
  }
}
