import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../../models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  employees:Employee[];
  loading: boolean;
  constructor(private readonly _employeeService:EmployeeService) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this._employeeService.getAll().subscribe(employees=>{
      this.employees = employees;
      this.loading = false;
      console.log(this.employees);
    })
  }

  onDelete(employeeId:number, arrayIndex: number):void{
    Swal.fire({
      title:'Are you sure?',
      text : 'Are you sure that you want to delete it?',
      icon : 'question',
      showConfirmButton : true,
      showCancelButton : true
    }).then(res=>{
      if(res.isConfirmed){
        this._employeeService.delete(employeeId).subscribe(resp=>{
          this.employees.splice(arrayIndex,1);
          this.disPlayToast('Deleted successfully')
        }, (err)=>{
          console.log(err);
        });
      }
    });
  }

  private disPlayToast(title:string):void{
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-left',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: title
    })
  }

}
