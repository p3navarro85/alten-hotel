import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { UserMainComponent } from './components/user/main/main.component';
import { RoomMainComponent } from './components/room/main/main.component';
import { ReservationMainComponent } from './components/reservation/main/main.component';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = 
  [
    { 
      path: '', 
      component: AdministrationComponent 
    },
    { 
      path: 'rooms', 
      component: RoomMainComponent 
    },
    { 
      path: 'reservations', 
      component: ReservationMainComponent 
    },
    {
      path: 'users', 
      component: UserMainComponent,
      // canActivate: [AuthGuard]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AdministrationRoutingModule { }
