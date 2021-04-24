import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { TablesComponent } from './pages/tables/tables.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../../shared/shared.module';
import { AdministrationModule } from '../administration/administration.module';


@NgModule({
  declarations: [
    DashboardComponent, 
    SidebarComponent, 
    ChartsComponent, 
    TablesComponent, 
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdministrationModule
  ],
  exports:[]
})
export class DashboardModule { }
