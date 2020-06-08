import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfluencerDashboardComponent } from './influencer-dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService as AuthGuard } from '../services/guards/auth-guard.service';
const routes: Routes = [
  {
    component: InfluencerDashboardComponent,
    path: '',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_INFLUENCER'] }
  },
  {
    component: SettingsComponent,
    path: 'profile',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_INFLUENCER'] }
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class InfluencerDashboardRoutingModule { }
