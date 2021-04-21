import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationService } from 'src/app/services/validation.service';



@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles:[]
})
export class EmployeeFormComponent implements OnInit {

  private employeId:number;
  formGroup:FormGroup;
  isUpdate:boolean;
  loading:boolean;
  constructor(private readonly _activatedRoute:ActivatedRoute,
              private readonly _employeeService:EmployeeService,
              private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              public  readonly _validationService: ValidationService) {
              this.initForm();
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
    this.addEmployee(employee);
  }

  private maskInvalidControlsAsTouched():void{
    Object.values(this.formGroup.controls).forEach(control=>{
      if(control.invalid)
        control.markAsTouched();
    })
  }

  private updateEmployee(employee:Employee):void{

    this.disabledControls();
    this.loading = true;
    this._employeeService.update(this.employeId,employee).subscribe(data=>{

      console.log(data);
      this.disPlayToast('Updated successfully');
      this._router.navigate(['../../list']);
    },(err)=>{

      console.log(err);
      this.loading = false;
      this.getErrorDialog(err.error?.message).then(res=>{
        if(res.isConfirmed){
          this.enableControls();
        }
      })
    });
  }

  private disabledControls():void{
    Object.values(this.formGroup.controls).forEach(control=>{
      control.disable();
    })
  }

  private enableControls():void{
    Object.values(this.formGroup.controls).forEach(control=>{
      control.enable();
    })
  }


  private addEmployee(employee:Employee):void{

    this.disabledControls();
    this.loading = true;
    this._employeeService.add(employee).subscribe(data=>{

      this.formGroup.reset();
      this.disPlayToast('Saved successfully');
      this.loading = false;
      this.enableControls();
    },(err:any)=>{
        console.log(err);
        this.loading = false;
        this.getErrorDialog(err.error?.message)
        .then(res=>{

          if(res.isConfirmed){
          this.formGroup.reset();
          this.enableControls();
          }
        })
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

  getErrorDialog(text:string){
    return Swal.fire({
      title: 'Something is wrong',
      text: text,
      icon : 'error',
      allowOutsideClick : false
    });
  }

  private disPlayToast(title:string):void{
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-left',
      showConfirmButton: false,
      timer: 3000,
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

