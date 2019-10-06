import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'app/_models';
import { UserService } from 'app/_services';
import { AuthenticationService } from 'app/_services';

@Injectable()
export class SingleUserResolverService implements Resolve<Observable<User>> {

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>  {

    const currentUser = this.authenticationService.CurrentUserValue;
    const data = this.userService.getById(currentUser.id);
    return data;
  }

}
