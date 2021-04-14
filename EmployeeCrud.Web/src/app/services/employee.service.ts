import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//TODO: Terminar
export class EmployeeService {

  baseUrl = "https://localhost:5001/api";
  constructor(private readonly _http: HttpClient) { }


  getById(userId:number):Observable<Employee>{
     return this._http.get<Employee>(`/employee/${userId}`);
  }

  delete(userId:number):Observable<any>{
    return this._http.delete(`/employee/${userId}`);
  }

  getAll():Observable<any[]>{
    return this._http.get<any[]>(`/employee`);
  }

  add(employee:Employee):Observable<any>{
    return this._http.post(`/employee`,employee);
  }

  update(employee:Employee):Observable<any>{
  return this._http.put(`/employee`,employee);
  }
}
