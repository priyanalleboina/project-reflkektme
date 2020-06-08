import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Location } from '@angular/common';
import { UserRole } from './constants/enum';
import {
  Router, Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'reflektme';
  loader = false;
  userRoleEnum: any;
  role: any;
  isLoggedIn = false;
  constructor(
    private loaderService: LoaderService,
    public location: Location,
    private router: Router,
    private dataService: DataService
  ) {
    this.loaderService.change.subscribe((loader) => {
      // tslint:disable-next-line:ban
      setTimeout(() => {
        this.loader = loader;
      }, 200);
      // this.cdr.detectChanges();
    });
    this.userRoleEnum = new UserRole();
    this.dataService.logOut.subscribe((isLogout) => {
      this.isLoggedIn = isLogout;
    });
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      this.loader = false;
    }

    // Set loader state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loader = false;
    }
    if (event instanceof NavigationError) {
      this.loader = false;
    }
  }
  ngOnInit() {
    const jwt = localStorage.getItem('loginToken');
    this.role = localStorage.getItem('userRole');
    console.log('role', this.role);

    if (jwt && (this.role === this.userRoleEnum.roleAdmin || this.role === this.userRoleEnum.roleSuperAdmin
      || this.role === this.userRoleEnum.roleInfluencer)) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    console.log('isLoggedIn', this.isLoggedIn);
  }
  ngAfterViewInit() {
    // this.loaderService.change.subscribe((loader) => {
    //   // tslint:disable-next-line:ban
    //   setTimeout(() => {
    //     this.loader = loader;
    //   }, 200);
    //   // this.cdr.detectChanges();
    // });
  }

  headerFooterLoad() {
    this.dataService.logOut.subscribe((isLogout) => {
      this.isLoggedIn = isLogout;
    });
  }

}
