import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AdminLoginService } from '../admin-login/admin-login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public role: any;
  isLoggedIn: any;
  currentPage = '';
  photoCount = 0;
  videoCount = 0;

  constructor(
    private router: Router,
    private dataService: DataService,
    private adminLoginService: AdminLoginService,
    private toastrService: ToastrService,

  ) {
    this.dataService.photoCount.subscribe((e: any) => {
      this.photoCount = e;
      localStorage.setItem('photoCount', (this.photoCount).toString());
    });
    this.dataService.videoCount.subscribe((e: any) => {
      this.videoCount = e;
      localStorage.setItem('videoCount', (this.videoCount).toString());

    });
  }

  ngOnInit() {
    if (this.router.url.split('/')[2]) {
      this.currentPage = this.router.url.split('/')[2];
    }
    this.videoCount = Number(localStorage.getItem('videoCount'));
    this.photoCount = Number(localStorage.getItem('photoCount'));
    console.log(this.photoCount);
    const jwt = localStorage.getItem('loginToken');
    this.role = localStorage.getItem('userRole');
    console.log('role');
    if (jwt) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  logout() {
    let email = '';
    if (localStorage.getItem('admin_email')) {
      email = localStorage.getItem('admin_email');
    } else {
      email = localStorage.getItem('Influencer_email');
    }

    this.adminLoginService.logout(email).subscribe((res) => {
      if (res.status === 200) {
        this.dataService.logoutUser(false);
        localStorage.clear();
        localStorage.clear();
        this.toastrService.success('Logout Successful');
        this.router.navigate(['login']);
      } else {
        console.log('error in logut');
      }
    });

  }
  gotoPage(page, type?) {
    if (type === 'Admin') {
      this.router.navigate(['admin-dashboard/' + page]);
    } else {
      this.router.navigate(['influencer-dashboard/' + page]);
    }
  }
}
