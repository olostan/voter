import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.css']
})
export class VotingsComponent implements OnInit {
  votings: FirebaseListObservable<any[]>;

  constructor(private router:Router, private af: AngularFire) { }

  ngOnInit() {
    this.votings = this.af.database.list('votings');
  }
  createNew() {
    this.router.navigate(['/new-voting']);
  }
  open(voting) {
    this.router.navigate(['/voting', voting.$key]);
  }
  votingActive(voting): boolean {
    return voting.endDate>=Date.now();
  }
  countVoices(voting) {
    if (!voting.results) return 0;
    return Object.keys(voting.results).reduce((pv,cv) => pv+voting.results[cv],0);
  }

}
