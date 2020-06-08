import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from '../admin-login/admin-login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {

  userId: any;
  status: string;
  token: any;
  constructor(private route: ActivatedRoute,
    private loginService: AdminLoginService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams.userId;
    this.status = this.route.snapshot.queryParams.status;
    this.token = this.route.snapshot.queryParams.token;
    // localStorage.setItem('loginToken', this.token);
    // const jwt = localStorage.getItem('loginToken');
    //     const jwtToken = jwt.split('.')[1]
    //     const decodedJwtJsonData = window.atob(jwtToken);
    //     const decodedJwtToken = JSON.parse(decodedJwtJsonData);
    this.loginService.activateUser(this.userId, this.status, this.token).subscribe((result) => {
      if (result.status === 200) {
        this.router.navigate(['']);
        this.toastrService.success('Account activated successfully and Please check your mail');
      } else {
        this.toastrService.error(result.message);
      }
    }, (error) => {
      this.toastrService.error(JSON.stringify(error));
    });
  }
}
