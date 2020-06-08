import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReflektToolComponent } from './reflekt-tool.component';
import { FormsModule } from '@angular/forms';
import { ReflektMeCommonModule } from '../reflektme-common-module/reflektme-common.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GuestModelComponent } from './guest-model/guest-model.component';
import { ReflektToolRoutingModule } from './reflekt-tool.routing.module';

@NgModule({
  declarations: [
    ReflektToolComponent,
    CreateAccountComponent,
    GuestModelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReflektMeCommonModule,
    ReflektToolRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReflektToolModule { }
