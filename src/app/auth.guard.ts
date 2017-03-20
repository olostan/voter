import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserDataService} from './user-data.service';
import { AngularFire } from 'angularfire2';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userData: UserDataService, private router: Router, private af:AngularFire) {
    /*af.auth.subscribe((state) => {
      console.log("Auth:",state);
    })*/
  };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.af.auth
        //.do((state) => console.log("Auth state:",state))
        .map((state)=> {
          let authed = state!=null;
          if (!authed) this.router.navigate(['/login']) 
          else {
            //let apt = state.auth.displayName.match(/#(\d+)/);
            //console.log(apt[1]);
            this.userData.apt = state.auth.displayName;
          }
          return authed;
        });
      /*console.log("Checking auth");
      //console.log(this.af.auth.getAuth());
      let url: string = state.url;
      if (this.userData.userId) return true;
      this.userData.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;*/
  }
}
