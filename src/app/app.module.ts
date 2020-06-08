import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepsModule } from 'primeng/steps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { NgxGaugeModule } from 'ngx-gauge';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { HttpInterceptorService } from './services/httpinterceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataService } from './services/data.service';
import { PageTitleService } from './services/page-title.service';
import { ReflektMeCommonModule } from './reflektme-common-module/reflektme-common.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { TempComponent } from './temp/side-nav.component';
import { ToolcompComponent } from './toolcomp/toolcomp.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    TempComponent,
    ToolcompComponent,
    CreateaccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StepsModule,
    BrowserAnimationsModule,
    TabViewModule,
    NgxGaugeModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    ToastrModule.forRoot(),
    ReflektMeCommonModule,
  ],
  exports: [
    ToolcompComponent,
  ],
  providers: [HttpService,
    PageTitleService,
    CookieService,
    DataService,
    {
      multi: true, provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(titleService: PageTitleService) {
    titleService.init();
  }
}
