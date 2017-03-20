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
import { GoogleChartsService} from './google-charts.service';

import { AuthGuard} from './auth.guard';
import { VotingEditorComponent } from './voting-editor/voting-editor.component';


export const firebaseConfig = {
   apiKey: "AIzaSyAK4sRUWedyMDZ7HO-NpjUpciiMDdh6i5A",
    authDomain: "voter-55a48.firebaseapp.com",
    databaseURL: "https://voter-55a48.firebaseio.com",
    storageBucket: "voter-55a48.appspot.com",
    messagingSenderId: "322341189522"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

import { Pipe, PipeTransform } from '@angular/core';
import { VotingComponent } from './voting/voting.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';

@Pipe({ name: 'range' })
export class RangePipe implements PipeTransform {
  transform(max: number) {
    return (new Array(max|0)).fill(0).map( (e,idx) => idx);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    VotingsComponent,
    LoginComponent,
    VotingEditorComponent,
    RangePipe,
    VotingComponent,
    GoogleChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [UserDataService, AuthGuard, GoogleChartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
