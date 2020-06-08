import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../services/guards/auth-guard.service';
import { AddInfluencerComponent } from './add-influencer/add-influencer.component';
import { InfluencerPhotosComponent } from './influencer-photos/influencer-photos.component';
import { InfluencerVideosComponent } from './influencer-videos/influencer-videos.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { LibraryComponent } from './library/library.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { SizeChartComponent } from './size-chart/size-chart.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddAdminComponent } from './add-admin/add-admin.component'

const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: AddInfluencerComponent,
    path: 'add-influencer',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: AddAdminComponent,
    path: 'add-admin',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SUPER_ADMIN'] }
  },
  {
    component: AdminProfileComponent,
    path: 'admin-profile',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: InfluencerPhotosComponent,
    path: 'influencer-photos',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: InfluencerVideosComponent,
    path: 'influencer-videos',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: UploadMediaComponent,
    path: 'upload-media',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: LibraryComponent,
    path: 'library',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: ManageProfileComponent,
    path: 'profile',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  },
  {
    component: SizeChartComponent,
    path: 'size-charts',
    resolve: {},
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] }
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminDashboardRoutingModule { }
