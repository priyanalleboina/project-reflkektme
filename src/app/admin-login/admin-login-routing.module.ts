import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { AuthGuardService as AuthGuard } from '../services/guards/auth-guard.service';
const routes: Routes = [
  {
    component: AdminLoginComponent,
    path: '',
    resolve: {}
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminLoginRoutingModule { }
