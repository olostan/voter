import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { UserDataService } from '../user-data.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  voting: FirebaseObjectObservable<any>;
  vote: FirebaseObjectObservable<number>;
  apt: string;
  subscription:Subscription;

  constructor(private router:Router, private af: AngularFire, private route: ActivatedRoute, private userData: UserDataService) { }

  votingActive: boolean = false;

  ngOnInit() {
    this.voting = this.af.database.object('/votings/'+this.route.snapshot.params['id']);
    this.subscription = this.voting.subscribe( (v) => {
      this.votingActive = this._votingActive(v);
    })
    this.vote = this.af.database.object('/votes/'+this.route.snapshot.params['id']+'/'+this.userData.apt);
    this.apt = this.userData.apt;
  }
  back() {
    this.router.navigate(['/votings']);
  }
  setVote(event) {
    this.vote.set(event.value);
  }
  _votingActive(voting): boolean {
    if (!voting) return false;
    return voting.endDate>=Date.now();
  }
}
