import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ReflektMeCommonModule } from '../reflektme-common-module/reflektme-common.module';
import { AddInfluencerComponent } from './add-influencer/add-influencer.component';
import { InfluencerPhotosComponent } from './influencer-photos/influencer-photos.component';
import { InfluencerVideosComponent } from './influencer-videos/influencer-videos.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { LibraryComponent } from './library/library.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { SizeChartComponent } from './size-chart/size-chart.component';
import { DetailsComponent } from './details/details.component';
import { ViewDetailsComponentProduct } from './view-details/view-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { NgbModule, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, CustomDateParserFormatter } from '../services/date.formater.service';
import { AddAdminComponent } from './add-admin/add-admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddInfluencerComponent,
    InfluencerPhotosComponent,
    InfluencerVideosComponent,
    UploadMediaComponent,
    LibraryComponent,
    ManageProfileComponent,
    SizeChartComponent,
    DetailsComponent,
    ViewDetailsComponentProduct,
    AdminProfileComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminDashboardRoutingModule,
    ReflektMeCommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AdminDashboardModule { }
