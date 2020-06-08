import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('loginToken');
    const role = localStorage.getItem('userRole');
    if (token) {
      console.log(route.data.roles && route.data.roles.indexOf(role) === -1);
      if (route.data.roles && route.data.roles.indexOf(role) === -1) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
