import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(public router: Router) {
    this.currentUrl = this.router.url;
    // router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.previousUrl = this.currentUrl;
    //     this.currentUrl = event.url;
    //   };
    // });
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          // window.localStorage.setItem('previousUrl', this.router.url);
          this.previousUrl = this.router.url;
        }
      });
  }

  getPreviousUrl() {
    return this.previousUrl;
  }
}
