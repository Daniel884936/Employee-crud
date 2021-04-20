import { Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

export const EMPLOYEE_CHILDREN_ROUTES: Routes = [
  {path: 'edit/:id', component: EditComponent},
  {path: 'list', component: ListComponent},
  {path: 'new', component: NewComponent},
  {path: '**', pathMatch:'full', redirectTo:'list'}
]
