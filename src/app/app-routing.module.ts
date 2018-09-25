import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent} from './details/details.component';
import { PostsComponent} from './posts/posts.component';
import { AddComponent } from './add/add.component';
import { ConfigComponent } from './config/config.component';
import { PartyComponent } from './party/party.component';
import { MultichainComponent } from './multichain/multichain.component';
import { DecryptComponent } from './decrypt/decrypt.component';
import { ListstreamsComponent } from './liststreams/liststreams.component';
import {  DashboardComponent } from './dashboard/dashboard.component';
import { AddRepComponent } from './add-rep/add-rep.component';
import { ListitemsComponent } from './listitems/listitems.component';

const routes: Routes = [
  {path: 'details/:id', component: DetailsComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'add', component: AddComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'party', component: PartyComponent},
  {path: 'multichain', component: MultichainComponent},
  {path: 'decrypt', component: DecryptComponent},
  {path: 'stream', component: ListstreamsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-rep', component: AddRepComponent},
  {path: 'listitems', component: ListitemsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

