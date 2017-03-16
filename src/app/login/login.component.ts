import { Component, OnInit } from '@angular/core';

type LoginMode = 'login' | 'register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private mode: LoginMode = 'login';
  constructor() { }

  ngOnInit() {
  }

}
