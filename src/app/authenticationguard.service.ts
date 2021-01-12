import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private router:Router){}

  canActivate(ActivatedRouteSnapshot, RouterStateSnapshot): boolean {
    if (!this.authenticationService.isLoggedIn){
      this.router.navigate(['sign_in']);
      return false;
    }else {
      return true;
    }
  }
  
}
