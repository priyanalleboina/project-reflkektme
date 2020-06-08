import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: ToastrService,
    private loaderService: LoaderService,
    private router: Router,
    private dataService: DataService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.toggle(true);
    var authHeaderhandle = next.handle(this.setAuthorizationHeader(request))
      .pipe(
        catchError(event => {
          this.loaderService.toggle(false);
          if (event instanceof HttpErrorResponse) {
            return this.catchError(event);
          }
        }),
        finalize(() => this.loaderService.toggle(false))
      );
    return authHeaderhandle;
  }

  private catchError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    if (error.status == 401) {
      this.dataService.logoutUser(false);
      const role = localStorage.getItem('userRole');
      $('.modal').remove();
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-backdrop');
      if (role === 'ROLE_CUSTOMER' || role === 'ROLE_GUEST_CUSTOMER') {
        console.log('here');
        //  window.location.reload();
        this.router.navigate(['/reflektme-tool/1']);
      } else {
        this.router.navigate(['/login']);
      }
      localStorage.clear();
      this.toastrService.error('Session is expired.');
      return of(false);

    } else {
      return throwError(error);
    }
    // this.toastrService.error('Server error!');
  }

  private setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    // const loginUrl = environment.API_PATH + '/' + environment.copmonentUrl.login.login;
    const tempLoginUrl = environment.API_PATH + '/' + environment.copmonentUrl.login.tempLogin;
    const token = localStorage.getItem('loginToken');
    if (token && (req.url !== tempLoginUrl)) {
      return req.clone({ withCredentials: false, 'setHeaders': { 'Authorization': `Bearer ${token}` } });
    } else {
      return req.clone({ withCredentials: false });
    }
  }
}
