import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
const routes: Routes = [
  {
    component: ChangePasswordComponent,
    path: '',
    resolve: {}
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ChangePasswordRoutingModule { }
