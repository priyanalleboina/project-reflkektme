import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivateUserRoutingModule } from './activate-user-routing.module';
import { ActivateUserComponent } from './activate-user.component';

@NgModule({
  declarations: [
    ActivateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ActivateUserRoutingModule
  ]
})
export class ActivateUserModule { }
