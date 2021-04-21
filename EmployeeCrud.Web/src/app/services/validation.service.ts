import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }


  public isInValidField(formGroup: FormGroup,controlName:string):boolean{
    const control = formGroup.get(controlName);
    return control.invalid && control.touched;
  }

  public hasRequiredError(formGroup: FormGroup,controlName:string):boolean {
    const control =  formGroup.get(controlName);
    return control.errors?.required && control.touched;
  }

  public hasMaxLengthError(formGroup: FormGroup,controlName:string):boolean{
    const control =  formGroup.get(controlName);
    return control.errors?.maxlength && control.touched;
  }

  public hasMinError(formGroup: FormGroup,controlName:string):boolean{
    const control =  formGroup.get(controlName);
    return control.errors?.min && control.touched;
  }

  public hasMaxError(formGroup: FormGroup,controlName:string):boolean{
    const control = formGroup.get(controlName);
    return control.errors?.max && control.touched;
  }

  public hasEmailFormatError(formGroup: FormGroup):boolean {
    const control =  formGroup.get('email');
    return control.errors?.email && control.touched;
  }
}
