import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EMPLOYEE_CHILDREN_ROUTES } from './pages/employee/user.routes';

const routes: Routes = [
  {path: 'employee',
   component:EmployeeComponent,
   children: EMPLOYEE_CHILDREN_ROUTES
  },
  {path:'**',pathMatch:'full', redirectTo:'employee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
