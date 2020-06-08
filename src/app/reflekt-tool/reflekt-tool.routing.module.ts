import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReflektToolComponent } from './reflekt-tool.component';
import { AuthGuardService as AuthGuard } from '../services/guards/auth-guard.service';
const routes: Routes = [
  {
    component: ReflektToolComponent,
    path: '',
    resolve: {}
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ReflektToolRoutingModule { }
