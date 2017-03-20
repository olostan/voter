import { Component, OnInit } from '@angular/core';
import { UserDataService} from '../user-data.service';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';



type LoginMode = 'login' | 'register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private mode: LoginMode = 'login';

  email: string;
  password: string;
  code: string;
  apartment: string;
  processing: boolean;

  errorMessage: string = '';

  constructor(private userData: UserDataService,public af: AngularFire,private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    return this.af.auth.login({ email: this.email, password: this.password })
      .then(() => {
        console.log("Logged in!");
        this.router.navigate(['/votings']);
      })
  }
  login() {
    this.processing = true; 
    this.doLogin().then( () => this.processing = false, (err) => {
      this.processing = false;
      console.log("login result:",err);
      switch(err['code']) {
        case 'auth/invalid-email': this.errorMessage = 'Формат електронної адреси (email) невірний'; break;
        case 'auth/user-not-found': this.errorMessage = 'Поштова адреса незареєстрованна '; break;
        case 'auth/wrong-password': this.errorMessage = 'Пароль не вірний'; break;

        default: this.errorMessage=`Невідома помилка (${err['code']}: ${err.message})`; break;
        
      }
      
    });
  }

  register() {
    console.log("---registring", this);
    this.processing = true;
    this.errorMessage = '';
    this.userData.register(this.email,this.apartment,this.code, this.password).subscribe(() => {
      this.processing = false;
      this.doLogin();
      console.log("Everything is ok!")
    },(error) => {
      this.processing = false;

      console.log(error);
      switch(error.status) {
        case 200: break;
        case 400: this.errorMessage='Заповніть усі поля'; break;
        case 404: this.errorMessage='Невідома квартира'; break;
        case 409: this.errorMessage='Квартира вже зареестрована'; break;
        case 401: this.errorMessage='Невірний код підтверження'; break;
        case 402: this.errorMessage='Пароль повинен бути мінімум 6 символів'; break;
        case 403: this.errorMessage='Невірний формат поштової адреси (email)'; break;

        default: this.errorMessage=`Невідома помилка (${error.status})`; break;

      }
    });

  }
  auth(email: string, password: string) {

  }

}
