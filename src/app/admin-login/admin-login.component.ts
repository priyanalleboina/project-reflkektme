import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminLoginService } from './admin-login.service';
import { Router } from '@angular/router';
import { UserRole } from '../constants/enum';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { AdminDashboardService } from '../admin-dashboard/service/admin-dashboard.service';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginCredentials: any;
  userRoleEnum: any;
  isloginClick: boolean;
  isEditMedia: boolean;
  email: any;
  rememberMe;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;

  constructor(private adminLoginService: AdminLoginService,
    private router: Router,
    private toastrService: ToastrService,
    private dataService: DataService,
    private cookieService: CookieService,
    public app: AppComponent) {
    this.loginCredentials = {};
    this.userRoleEnum = new UserRole();
    this.isEditMedia = false;

  }

  ngOnInit() {
    const jwt = localStorage.getItem('loginToken');
    const role = localStorage.getItem('userRole');
    console.log('this.userRoleEnum===', this.userRoleEnum.roleCustomer);
    console.log('this.role===', role);

    if (jwt) {
      if ((this.userRoleEnum.roleAdmin === role || this.userRoleEnum.roleSuperAdmin === role)) {
        this.router.navigate(['/admin-dashboard']);
      } else if (this.userRoleEnum.roleInfluencer === role) {
        this.router.navigate(['/influencer-dashboard']);
        this.dataService.logoutUser(false);
      } else if (this.userRoleEnum.roleCustomer === role || this.userRoleEnum.roleGuestCustomer === role) {
        console.log('here');
        this.router.navigate(['/reflektme-tool/1']);
        this.dataService.logoutUser(false);
      }
    }
    this.isloginClick = false;
    this.rememberData();
  }
  rememberData() {
    const remembervalue = this.cookieService.get('rememberMe');
    if (this.cookieService.get('rememberMe') === remembervalue) {
      this.loginCredentials.email = this.cookieService.get('email');
      this.loginCredentials.password = this.cookieService.get('password');
      this.rememberMe = remembervalue;
    }
  }
  login() {
    this.isloginClick = true;
    localStorage.clear();
    this.adminLoginService.login(this.loginCredentials).subscribe((res: any) => {
      if (res.status === 200 && res.data) {
        if (this.rememberMe) {
          this.cookieService.set('email', this.loginCredentials.email);
          this.cookieService.set('password', this.loginCredentials.password);
          this.cookieService.set('rememberMe', this.rememberMe.checked);
        }
        else {
          this.cookieService.delete('email');
          this.cookieService.delete('password');
          this.cookieService.delete('rememberMe');
        }
        localStorage.setItem('loginToken', res.data);
        const jwt = localStorage.getItem('loginToken');
        const jwtToken = jwt.split('.')[1]
        const decodedJwtJsonData = window.atob(jwtToken)
        const decodedJwtToken = JSON.parse(decodedJwtJsonData)
        // console.log('decodedJwtToken===', decodedJwtToken);
        if (decodedJwtToken.scopes === this.userRoleEnum.roleAdmin) {
          localStorage.setItem('userRole', this.userRoleEnum.roleAdmin);
          localStorage.setItem('admin_email', decodedJwtToken.sub);
          this.router.navigate(['/admin-dashboard']);
          this.dataService.logoutUser(true);
          this.toastrService.success("Login Successful");
          this.app.headerFooterLoad();
        } else if (decodedJwtToken.scopes === this.userRoleEnum.roleInfluencer) {
          localStorage.setItem('userRole', this.userRoleEnum.roleInfluencer);
          localStorage.setItem('Influencer_email', decodedJwtToken.sub);
          setTimeout(() => {
            this.toastrService.success("Login Successful");
            this.dataService.logoutUser(false);
            this.router.navigate(['/influencer-dashboard']);
          }, 500);
        } else if (decodedJwtToken.scopes === this.userRoleEnum.roleCustomer) {
          localStorage.setItem('userRole', this.userRoleEnum.roleCustomer);
          // this.toastrService.success("Login Successful");
          this.router.navigate(['/reflektme-tool']);
        } else if (decodedJwtToken.scopes === this.userRoleEnum.roleSuperAdmin) {
          localStorage.setItem('userRole', this.userRoleEnum.roleSuperAdmin);
          localStorage.setItem('admin_email', decodedJwtToken.sub);
          this.router.navigate(['/admin-dashboard']);
          this.dataService.logoutUser(true);
          this.toastrService.success("Login Successful");
          this.app.headerFooterLoad();
        } else {
          this.toastrService.error('invalide role');
        }
        //  window.location.reload();
      } else {
        this.toastrService.error(res.message);
      }
      this.loginCredentials = {};
      this.rememberMe = '';
      this.isloginClick = false;
    },
      (error) => {
        this.loginCredentials = {};
        this.isloginClick = false;
        this.toastrService.error(JSON.stringify(error));
      });
  }

  forgotPassword() {
    this.adminLoginService.forgotPassword(this.email).subscribe((result: any) => {
      if (result.status === 200) {
        this.closeModal();
        this.toastrService.success('Reset password link is sent on email');
      } else {
        this.toastrService.error(JSON.stringify(result.message));
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  changePassword() {
    this.adminLoginService.ChangePassword('').subscribe((result: any) => {
      if (result.status === 200) {

      } else {
        this.toastrService.error(JSON.stringify(result.message));
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  tempLoginToReflektmeTool() {
    // this.adminLoginService.tempLogin().subscribe((res: any) => {
    //   if (res.status === 200) {
    //     localStorage.setItem('loginToken', res.data);
    //     const jwt = localStorage.getItem('loginToken');
    //     const jwtToken = jwt.split('.')[1]
    //     const decodedJwtJsonData = window.atob(jwtToken)
    //     const decodedJwtToken = JSON.parse(decodedJwtJsonData);
    //     console.log('decodedJwtToken===', decodedJwtToken);
    //     this.router.navigate(['/reflektme-tool']);
    //   }
    // },
    //   (error) => {
    //     this.toastrService.error(JSON.stringify(error.message));
    //   });
    this.router.navigate(['/reflektme-tool/1']);
  }
  closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.email = '';
  }
}
