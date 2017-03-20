import { Component, OnInit } from '@angular/core';
import { AngularFire,FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authState: Observable<FirebaseAuthState>;
  constructor(private af: AngularFire, private router:Router) {}

  ngOnInit(): void {
    this.authState = this.af.auth;
  }
  logout() {
    this.af.auth.logout();
    this.router.navigate(['/login']);
  }

}
