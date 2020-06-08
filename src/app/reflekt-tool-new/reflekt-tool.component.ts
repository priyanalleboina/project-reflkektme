import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ReflektmeService } from '../reflekt-tool-new/service/reflektme.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { AdminLoginService } from '../admin-login/admin-login.service';
import { UserRole, MediaType } from '../constants/enum';
import { FileHandle } from '../services/dragDrop.directive';
import { GuestModelComponent } from './guest-model/guest-model.component';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-reflekt-tool',
  templateUrl: './reflekt-tool.component.html',
  styleUrls: ['./reflekt-tool.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReflektToolComponent implements OnInit {

  loginData: any = {};
  userRoleEnum: any;
  mediaTypeEnum: any;
  rememberMeCred: any;
  @ViewChild('ProfileModal',{ static: false }) profileModal;
  constructor(
    private reflektmeService: ReflektmeService,
    private toastrService: ToastrService,
    private dataService: DataService,
    private cookieServiceTool: CookieService,
    private cd: ChangeDetectorRef,
    private adminLoginService: AdminLoginService
  ) {
    // this.isGuestCame = false;
    // this.isCreateAccountCame = false;
    // this.iseditRefleKtSize = false;
    // this.loginData = { email: '', password: '' };
    // this.forgot = { fEmail: '' }
    this.userRoleEnum = new UserRole();
    this.mediaTypeEnum = new MediaType();
  }

  ngOnInit() {
    this.rememberData();
  }
  rememberData() {
    const remembervalue = this.cookieServiceTool.get('rememberMeTool');
    if (this.cookieServiceTool.get('rememberMeTool') === remembervalue) {
      this.loginData.email = this.cookieServiceTool.get('emailTool');
      this.loginData.password = this.cookieServiceTool.get('passwordTool');
      this.rememberMeCred = remembervalue;
    }
  }
  // opnReflektModal (){
  //     alert("working")
  //     $('#reflektSize').modal('show');
  // }
  login() {
    this.loginData.token="12345";
    this.reflektmeService.login(this.loginData).subscribe((res: any) => {
      if (res.status === 200 && res.token) {
        console.log(this.rememberMeCred);
        if (this.rememberMeCred) {
          this.cookieServiceTool.set('emailTool', this.loginData.email);
          this.cookieServiceTool.set('passwordTool', this.loginData.password);
          this.cookieServiceTool.set('rememberMeTool', this.rememberMeCred.checked);
        }
        else {
          this.cookieServiceTool.delete('emailTool');
          this.cookieServiceTool.delete('passwordTool');
          this.cookieServiceTool.delete('rememberMeTool');
        }
        localStorage.setItem('cusromerloginToken', res.token);
        const jwt = localStorage.getItem('cusromerloginToken');
        const jwtToken = jwt.split('.')[1]
        const decodedJwtJsonData = window.atob(jwtToken)
        const decodedJwtToken = JSON.parse(decodedJwtJsonData)
        if (decodedJwtToken.scopes === this.userRoleEnum.roleCustomer) {
          localStorage.setItem('custermInfo', JSON.stringify(res.data));
          this.loginData = {};
          this.toastrService.success('Login Successfull');
          // this.opnReflektModal();
          // setTimeout(() => {
            this.profileModal.openmodal();
          // }, 100);
          // $('#tempPopup').modal('hide');
          localStorage.setItem('userRole', this.userRoleEnum.roleCustomer);

        } else {
          this.toastrService.error('You are not registered as customer portal.');
        }
      } else if (res.status === 4002) {
        this.toastrService.error('Email or Password is Incorrect');
      } else {
        this.toastrService.error('The email Id is not associated with Reflektme tool or there is an Error.');
      }
      this.loginData = {};
      this.rememberMeCred = '';
    }, (error) => {
      this.loginData = {};
      this.toastrService.error(JSON.stringify(error.message));
    });
  }


}
