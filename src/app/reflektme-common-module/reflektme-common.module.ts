import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PopoverModule } from 'ngx-popover';
import { ChartModule } from 'angular-highcharts';
import { ChipsModule } from 'primeng/chips';
import { SideNavComponent } from 'src/app/side-nav/side-nav.component';
import { DialogModule } from 'primeng/dialog';
import { DragDirective } from 'src/app/services/dragDrop.directive';
import { RatingModule } from 'ng-starrating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReadMoreComponent } from 'src/app/directives/read-more.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SideNavComponent,
    DragDirective,
    ReadMoreComponent
  ],
  exports: [
    FormsModule,
    PopoverModule,
    ChartModule,
    ChipsModule,
    SideNavComponent,
    DialogModule,
    DragDirective,
    RatingModule,
    CurrencyMaskModule,
    ReadMoreComponent,
    NgbProgressbarModule,
    NgbModule
  ],
  imports: [
    CommonModule,
    PopoverModule,
    ChartModule,
    ChipsModule,
    DialogModule,
    RatingModule,
    FormsModule,
    CurrencyMaskModule,
    NgbProgressbarModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReflektMeCommonModule { }
