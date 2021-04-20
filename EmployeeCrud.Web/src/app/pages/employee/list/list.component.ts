import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  employees:Employee[];
  constructor(private readonly _employeeService:EmployeeService) {
    this.employees = [];
  }

  ngOnInit(): void {

    this._employeeService.getAll().subscribe(employees=>{
      this.employees = employees;
      console.log(this.employees);
    })
  }

  onDelete(employeeId:number, arrayIndex: number):void{
    this._employeeService.delete(employeeId).subscribe(resp=>{
      this.employees.splice(arrayIndex,1);
    });
  }
}
