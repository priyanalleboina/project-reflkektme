import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateUserComponent } from './activate-user.component';

const routes: Routes = [
  {
    component: ActivateUserComponent,
    path: '',
    resolve: {}
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ActivateUserRoutingModule { }
