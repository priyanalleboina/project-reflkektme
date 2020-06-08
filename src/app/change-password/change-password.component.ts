import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: any = {};
  email: any;
  token: any;
  isCPwdVisible = false;
  isCnfPwdVisible = false;
  constructor(
    public changePasswordService: ChangePasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private location: Location

  ) {
    this.email = this.route.snapshot.queryParams.email;
    this.token = this.route.snapshot.queryParams.token;
    this.user.email = this.email;
  }

  ngOnInit() {
      this.activateUserAccount();
  }
  activateUserAccount() {
    if (this.token && this.email) {
      this.changePasswordService.verifyToken(this.email, this.token).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.user.email = this.email;
          } else {
            this.router.navigate([`/login`]);
            this.toastrService.error(res.message);
          }
        }, (error) => {
          this.router.navigate([`/login`]);
        });
    } else {
      this.router.navigate([`/login`]);
    }
  }

  noSpace(event) {
    if (event.keyCode === 32 || event.which === 32 || event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
    }
  }

  changePassword() {
    this.changePasswordService.changePassword(this.user).subscribe(
      (res: any) => {
        const routeToGoBack = '/login';
        if (res.status === 200) {
          this.toastrService.success('Password changed succefully.');
          this.router.navigate(['/login']);
          this.location.replaceState(routeToGoBack);
        } else {
          this.toastrService.error(res.message);
          this.router.navigate(['/login']);
          this.location.replaceState(routeToGoBack);

        }
      });
  }
  checkSpecialChar(str) {
    if (/^[a-zA-Z0-9- ]*$/.test(str) === false) {
      return true;
    } else {
      return false;
    }
  }
  checkAlphanumeric(str) {
    if (/^(?=.*?[a-z])(?=.*?\d)[a-z\d]+$/i.test(str) === false) {
      return true;
    } else {
      return false;
    }
  }

}
