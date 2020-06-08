import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  constructor(public httpService: HttpService) { }

  public verifyToken(email, token): Observable<any> {
    const url = environment.copmonentUrl.login.verifyToken;
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('token', token)
    return this.httpService.get<any>(url, { params: params });
  }
  public changePassword(data): Observable<any> {
    const url = environment.copmonentUrl.login.changePassword;
    let params = new HttpParams();
    params = params.set('email', data.email);
    params = params.set('password', data.password);
    return this.httpService.post<any>(url, params);
  }
}
