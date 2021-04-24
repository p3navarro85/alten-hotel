import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ckeditor4-angular';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';

// user import
import { UserMainComponent } from './components/user/main/main.component';
import { GridUserComponent } from './components/user/grid/grid.component';
import { ModalUserComponent } from './components/user/modal/modal.component';
import { NewUserFormComponent } from './components/user/new-form/new-form.component';

import { SharedModule } from '../../shared/shared.module';

import { NgxPaginationModule } from 'ngx-pagination';												 
import { DataTablesModule } from 'angular-datatables';

//Room imports
import { RoomMainComponent } from './components/room/main/main.component';
import { ModalRoomComponent } from './components/room/modal/modal.component';
import { NewRoomFormComponent } from './components/room/new-form/new-form.component';
import { GridRoomComponent } from './components/room/grid/grid.component';
import { ReservationMainComponent } from './components/reservation/main/main.component';
import { GridReservationComponent } from './components/reservation/grid/grid.component';
import { ModalReservationComponent } from './components/reservation/modal/modal.component';
import { NewReservationFormComponent } from './components/reservation/new-form/new-form.component';



@NgModule({
  declarations: [
    AdministrationComponent, 
    UserMainComponent,
    ModalUserComponent,
    GridUserComponent,
    NewUserFormComponent,
    RoomMainComponent,
    GridRoomComponent,
    ModalRoomComponent,
    NewRoomFormComponent,
    ReservationMainComponent,
    GridReservationComponent,
    ModalReservationComponent,
    NewReservationFormComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,				
    SharedModule,
    CKEditorModule,
    DataTablesModule
  ],
  exports: []
})
export class AdministrationModule { }
