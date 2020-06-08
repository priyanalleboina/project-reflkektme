import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfluencerDashboardComponent } from './influencer-dashboard.component';
import { InfluencerDashboardRoutingModule } from './influencer-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { ReflektMeCommonModule } from '../reflektme-common-module/reflektme-common.module';
import { ViewDetailsComponentProduct } from './view-details/view-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    InfluencerDashboardComponent,
    SettingsComponent,
    ViewDetailsComponentProduct,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfluencerDashboardRoutingModule,
    ReflektMeCommonModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  // exports: [InfluencerLibraryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InfluencerDashboardModule { }
