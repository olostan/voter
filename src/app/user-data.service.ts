import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire,FirebaseAuthState } from 'angularfire2';


const svcUrl = 'https://us-central1-parkstone-vote.cloudfunctions.net/register'

@Injectable()
export class UserDataService {
  public userId: string;
  public apt: string;
  public email: string;


  constructor(private http: Http,private af: AngularFire) {
    af.auth.subscribe((state)=> {
      if (!state) return;
      this.userId = state.auth.uid;
      this.apt = state.auth.displayName;
      this.email = state.auth.email;
    });
  }

  register(email: string, apartment: string, code: string, password: string):Observable<number> {
    return this.http.post(svcUrl+'register',{email, apartment, code, password}).map( (r) => r.status)
  }
}
