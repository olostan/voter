import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserDataService} from './user-data.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userData: UserDataService, private router: Router) {};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;
      if (this.userData.userId) return true;
      this.userData.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
  }
}
