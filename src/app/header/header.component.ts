import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AdminDashboardService } from '../admin-dashboard/service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  user: any = {};
  role: any;
  isLoggedIn = false;
  data: any = {};
  isInfluencer = false;
  searchBar: any;
  searchValue: any;
  constructor(
    private dataService: DataService,
    private router: Router,
    private adminDashboardService: AdminDashboardService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    const jwt = localStorage.getItem('loginToken');
    if (jwt) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.dataService.currentInfluencerData.subscribe((ele: any) => {
      this.user = ele;
    });
    this.dataService.adminProfile.subscribe(res => { this.data = res });
  }
  getAdminInfo() {
    let email_admin = localStorage.getItem('admin_email');
    this.adminDashboardService.getUserByEmail(email_admin).subscribe((res) => {
      this.data = res['data'];
    },
      (err) => {
        this.toastrService.error(JSON.stringify(err.message));
      });
  }
  ngOnInit() {
    this.getAdminInfo();
    // const jwt = localStorage.getItem('loginToken');
    this.role = localStorage.getItem('userRole');
    if (localStorage.getItem('InfluencerData') && this.role === 'ROLE_INFLUENCER') {
      this.user = JSON.parse(localStorage.getItem('InfluencerData'));
      this.isInfluencer = true;
    } else {
      this.user = JSON.parse(localStorage.getItem('InfluencerData'));
    }
    // if (jwt) {
    //   this.isLoggedIn = true;
    // } else {
    //   this.isLoggedIn = false;
    // }

    this.subscription = this.dataService.searchBarFlag.subscribe(res => {
      this.searchBar = res;
      this.cd.detectChanges();
    });

  }
  gotoPage(page, type?) {
    if (type === 'Admin') {
      this.router.navigate(['admin-dashboard/' + page]);
    } else {
      this.router.navigate(['influencer-dashboard/' + page]);
    }
  }
  profileSearch(searchValue) {
    this.dataService.searchProfileData(searchValue.trim());
  }
  getAlldata(search) {
    this.dataService.searchProfileData(search);
  }
  getAlldataInput(search) {
    if (search == '') {
      this.dataService.searchProfileData(search);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
