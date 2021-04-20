import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles:[]
})
export class EmployeeFormComponent implements OnInit {

  private employeId:number;
  formGroup:FormGroup;
  isUpdate:boolean;
  constructor(private readonly _activatedRoute:ActivatedRoute,
              private readonly _employeeService:EmployeeService,
              private readonly _formBuilder: FormBuilder,
              private readonly _router: Router) {
              this.initForm();
              this.isUpdate = false;
   }

  ngOnInit(): void {
    console.log(this._activatedRoute.snapshot.paramMap.get('id'));
    const employeeId:number = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    if(!Number.isNaN(employeeId)){
      this.isUpdate = true;
      this.formGroup.get('email').disable()
      this.employeId = employeeId;
      this.employeeById(employeeId);
      return;
    }
  }

  public onBackTolist():void{
    if(this.employeId){
      this._router.navigate(['../../list']);
      return;
    }
    this._router.navigate(['../../list']);
  }

  private initForm():void{
    this.formGroup = this._formBuilder.group({
      email : [''],
      name : [''],
      surnames : [''],
      age : [''],
      phoneNumber : ['']
    });
  }

  public  onSubmit():void{
    const employee = this.formGroup.value;
    if(this.employeId){
      this.updateEmployee(employee);
      return;
    }
    console.log(employee)
    this.addEmployee(employee);
  }

  private updateEmployee(employee:Employee):void{
    this._employeeService.update(this.employeId,employee).subscribe(data=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    });
  }

  private addEmployee(employee:Employee):void{
    this._employeeService.add(employee).subscribe(data=>{
      console.log(data);
    },(err:any)=>{
      console.log(err);
    });
  }

  private  employeeById(employeeId:number){
       this._employeeService.getById(employeeId).subscribe(employeeApi=>{
         if(employeeApi){
           this.formGroup.patchValue(employeeApi);
           return;
         }
         this._router.navigate(['../list']);
      })
  }

}
