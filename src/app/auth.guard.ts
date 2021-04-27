import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; import { Injectable } from '@angular/core';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private loginservice: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean {
    if (this.loginservice.isLoggedin) {
      // if we return true user is allowed to access that route
      return true;
    } else {
      // if we return false user is not allowed to access
      return false;
    }
  }

}