import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempComponent } from './temp/side-nav.component';

const routes: Routes = [
  {
    loadChildren: './change-password/change-password.module#ChangePasswordModule',
    path: 'change-password',
  },
  {
    loadChildren: './change-password/change-password.module#ChangePasswordModule',
    path: 'verify-token',
  },
  {
    loadChildren: './admin-login/admin-login.module#AdminLoginModule',
    path: 'login',
  },
  {
    loadChildren: './activate-user/activate-user.module#ActivateUserModule',
    path: 'update-status-email-verification',
  },
  {
    loadChildren: './influencer-dashboard/influencer-dashboard.module#InfluencerDashboardModule',
    path: 'influencer-dashboard',
  },
  {
    loadChildren: './reflekt-tool/reflekt-tool.module#ReflektToolModule',
    path: 'reflektme-tool/:id',
  },
  {
    loadChildren: './admin-dashboard/admin-dashboard.module#AdminDashboardModule',
    path: 'admin-dashboard',
  },
  {
    loadChildren: './reflekt-tool-new/reflekt-tool.module#ReflektToolModule',
    path: 'reflektme-tool-new',
  },
  {
    path: 'temp',
    component: TempComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
