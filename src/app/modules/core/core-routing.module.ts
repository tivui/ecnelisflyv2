import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CoreRoutingModule { }
