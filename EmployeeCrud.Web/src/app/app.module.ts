import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EditComponent } from './pages/employee/edit/edit.component';
import { ListComponent } from './pages/employee/list/list.component';
import { NewComponent } from './pages/employee/new/new.component';
import { EmployeeFormComponent } from './shared/employee-form/employee-form.component';
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EditComponent,
    ListComponent,
    NewComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
