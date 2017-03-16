import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'hammerjs';
import { VotingsComponent } from './votings/votings.component';
import { LoginComponent } from './login/login.component';
import { UserDataService} from './user-data.service';
import { AuthGuard} from './auth.guard';


export const firebaseConfig = {
   apiKey: "AIzaSyAK4sRUWedyMDZ7HO-NpjUpciiMDdh6i5A",
    authDomain: "voter-55a48.firebaseapp.com",
    databaseURL: "https://voter-55a48.firebaseio.com",
    storageBucket: "voter-55a48.appspot.com",
    messagingSenderId: "322341189522"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    VotingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserDataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
