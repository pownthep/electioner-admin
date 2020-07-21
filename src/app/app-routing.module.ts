import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AddRepComponent } from './add-rep/add-rep.component';
import { SettingComponent } from './setting/setting.component';
import { QrComponent } from './qr/qr.component';

const routes: Routes = [
  {path: 'add', component: AddComponent},
  {path: 'add-rep', component: AddRepComponent},
  {path: 'add-user', component: QrComponent},
  {path: 'setting', component: SettingComponent},
  {path: '', redirectTo: '/add', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

