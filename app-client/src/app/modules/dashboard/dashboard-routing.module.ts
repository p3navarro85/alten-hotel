import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './pages/charts/charts.component';
import { TablesComponent } from './pages/tables/tables.component';
import { MainComponent } from './pages/main/main.component';
import { AdministrationComponent } from '../administration/administration.component';
// import { AuthGuard } from '../../core/guards/auth.guard';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent 
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'tables',
    component: TablesComponent
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule) 
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class DashboardRoutingModule { }
