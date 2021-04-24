import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = 
  [
    { 
      path: '', 
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { 
      path: 'dashboard', 
      component: DashboardComponent,
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },
    { 
      path: 'home', 
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'administration', loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
