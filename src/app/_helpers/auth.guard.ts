import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'app/_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authenticationService.CurrentUserValue;

    if (currentUser) {

      // Check if route is restricted by role.
      if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {

        // Role not authorised so redirect to homepage.
        this.router.navigate(['/']);
        return false;
      }

      // User is authorized so allow user to access the route.
      return true;

    }

    // Redirect the user to login page if user is not logged in.
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
