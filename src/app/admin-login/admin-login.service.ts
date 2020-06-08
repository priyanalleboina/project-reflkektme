import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  constructor(public httpService: HttpService) { }

  public login(loginInfo): Observable<any> {
    const url = environment.copmonentUrl.login.login;
    return this.httpService.post<any>(url, loginInfo);
  }

  public activateUser(userId, status, token): Observable<any> {
    const url = environment.copmonentUrl.login.activateUser;
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('status', status);
    params = params.append('token', token);

    return this.httpService.get<any>(url, { params: params });
  }

  public ChangePassword(userData): Observable<any> {
    const url = environment.copmonentUrl.login.changePassword;
    return this.httpService.post<any>(url, userData);
  }

  public forgotPassword(email): Observable<any> {
    const url = environment.copmonentUrl.login.forgotPassword;
    let params = new HttpParams();
    params = params.set('email', email);
    return this.httpService.post<any>(url, params);
  }
  public tempLogin(): Observable<any> {
    const url = environment.copmonentUrl.login.tempLogin;
    return this.httpService.get<any>(url);
  }

  public logout(email): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', email);
    const url = environment.copmonentUrl.logout.logout;
    return this.httpService.delete(url, { params: params });
  }

}
