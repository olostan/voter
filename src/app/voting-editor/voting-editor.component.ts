import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { UserDataService}  from '../user-data.service';


@Component({
  selector: 'app-voting-editor',
  templateUrl: './voting-editor.component.html',
  styleUrls: ['./voting-editor.component.css']
})
export class VotingEditorComponent implements OnInit {
  name: string = '';
  numberOfOptions: string = "2";
  options: Array<string> = [];
  desc: string = '';
  endDate: number;
  message: string;
  processing: boolean = false;

  constructor(private af: AngularFire, private router: Router, private userData: UserDataService) { }

  isValid() {
    let numOptions = Number.parseInt(this.numberOfOptions);
    return !!this.name && this.options.length>=numOptions &&
           this.options.every((v,idx) => idx>=numOptions||(v!=='' && v!==undefined))
           && this.endDate;
  }

  create() {
    this.processing = true;
     this.af.database.list('votings').push({
       name:this.name,
       numberOfOptions: this.numberOfOptions,
       options: this.options, 
       desc: this.desc,
       endDate: this.endDate,
       creator: this.userData.apt, 
       created: Date.now()
     }).then( () => {
         this.processing = false;
         this.router.navigate(['/votings']);
     }, (err) => {
       console.log(err);
       this.message = 'Щось не так. Перевірте правильність заповнення форми!';
       this.processing = false;
     });
  }

  ngOnInit() {
  }
  endChanged(date) {
    this.endDate = Date.parse(date);
  }

}
