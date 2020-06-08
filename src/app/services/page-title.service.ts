import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

const APP_TITLE = 'Reflektme!';
const SEPARATOR = ' | ';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

  }
  static ucFirst(name) {
    if (!name) { return name; }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  init() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => route.firstChild),
      switchMap((route) => route.data),
      map((data) => {
        if (data.title) {
          return data.title;
        } else {
          return this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) { acc += SEPARATOR; }
            return this.router.url.split('/').reduce((acc1, frag1) => {
              if (acc1 && frag1) { acc1 += SEPARATOR; }
              return acc1 + PageTitleService.ucFirst(frag1);
            });
          });
        }
      })
    )
      .subscribe((pathString) => {
        const data = pathString.split('|');
        this.titleService.setTitle(`${APP_TITLE} ${data[0]}`);
      });
  }

}
