import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';



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

  isInValidField(controlName:string):boolean{
    const control =  this.formGroup.get(controlName);
    return !control.valid && control.touched;
  }

   hasRequiredError(controlName:string):boolean {
    const control =  this.formGroup.get(controlName);
    return control.errors?.required && control.touched;
  }

  hasMaxLengthError(controlName:string):boolean{
    const control =  this.formGroup.get(controlName);
    return control.errors?.maxlength && control.touched;
  }

  hasMinError(controlName:string):boolean{
    const control =  this.formGroup.get(controlName);
    return control.errors?.min && control.touched;
  }

  hasMaxError(controlName:string):boolean{
    const control =  this.formGroup.get(controlName);
    return control.errors?.max && control.touched;
  }

   get hasEmailFormatError():boolean {
    const control =  this.formGroup.get('email');
    return control.errors?.email && control.touched;
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
      email : ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      name : ['',[Validators.required, Validators.maxLength(30)]],
      surnames : ['',[Validators.required, Validators.maxLength(30)]],
      age : ['',[Validators.required, Validators.max(2147483647), Validators.min(-2147483647)]],
      phoneNumber : ['',[Validators.required,Validators.max(2147483647),Validators.min(-2147483647)]]
    });
  }

  public  onSubmit():void{
    console.log(this.formGroup)
    if(!this.formGroup.valid){
      this.maskInvalidControlsAsTouched();
      return;
    }
    const employee = this.formGroup.value;
    if(this.employeId){
      this.updateEmployee(employee);
      return;
    }
    console.log(employee)
    this.addEmployee(employee);
  }

  private maskInvalidControlsAsTouched():void{
    Object.values(this.formGroup.controls).forEach(control=>{
      if(control.invalid)
        control.markAsTouched();
    })
  }

  private updateEmployee(employee:Employee):void{
    this._employeeService.update(this.employeId,employee).subscribe(data=>{
      console.log(data);
      this.disPlayToast('Updated successfully');
    },(err)=>{
      console.log(err);
    });
  }

  private addEmployee(employee:Employee):void{
    this._employeeService.add(employee).subscribe(data=>{
      console.log(data);
      this.formGroup.reset();
      this.disPlayToast('Saved successfully');
    },(err:any)=>{
      console.log(err);
    });
  }

  private employeeById(employeeId:number){
       this._employeeService.getById(employeeId).subscribe(employeeApi=>{
         if(employeeApi){
           this.formGroup.patchValue(employeeApi);
           return;
         }
         this._router.navigate(['../list']);
      });
  }

  private disPlayToast(title:string):void{
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-left',
      showConfirmButton: false,
      timer: 2500,
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

