import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingsComponent} from './votings/votings.component';
import { LoginComponent} from './login/login.component';
import { VotingEditorComponent} from './voting-editor/voting-editor.component';
import { VotingComponent} from './voting/voting.component';

import { AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: 'votings', component: VotingsComponent, canActivate:[AuthGuard] },
  { path: 'voting/:id', component: VotingComponent, canActivate:[AuthGuard]},
  { path: 'new-voting', component: VotingEditorComponent, canActivate:[AuthGuard] },
  
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '/votings',
      pathMatch: 'full'
    //children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
